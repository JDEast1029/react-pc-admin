/**
 * 带有下拉刷新和上拉加载的List
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { findDOMNode } from 'react-dom';
import { Motion, spring } from 'react-motion';
//components
import FloatHeader from './FloatHeader';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Top from './Top';
//styles
import './Styles.scss';
//const
import { RefreshState } from './Constants';

class ScrollView extends Component {
	static propTypes = {
		damping: PropTypes.number, //阻尼(0-1)
		onHeaderRefresh: PropTypes.func,
		onFooterRefresh: PropTypes.func,
		refreshState: PropTypes.number,
		headerType: PropTypes.oneOf(['normal', 'float']),//下拉刷新组件类型
		data: PropTypes.array,
		onEndReachedThreshold: PropTypes.number,       //(0-1)注意此参数是一个比值而非像素单位。比如，0.5表示距离内容最底部的距离为当前列表可见长度的一半时触发。
		goTop: PropTypes.bool,                         //是否显示返回顶部按钮
		container: PropTypes.string,                     //滚动容器class
	};

	static defaultProps = {
		damping: 0.4,
		onHeaderRefresh: () => {},
		onFooterRefresh: () => {},
		refreshState: 0,
		headerType: 'normal',
		data: [],
		onEndReachedThreshold: 0.2,
		goTop: true,
		container: '.scroll-container'
	};

	constructor(props) {
		super(props);
		this.state = {
			distance: 0
		};
		//手势事件
		this.handleOnTouchStart          = this.handleOnTouchStart.bind(this);
		this.handleOnTouchMove           = this.handleOnTouchMove.bind(this);
		this.handleOnTouchEnd            = this.handleOnTouchEnd.bind(this);
		//scroll监听
		this.handleOnScroll              = this.handleOnScroll.bind(this);
		//list状态事件
		this.onHeaderRefresh             = this.onHeaderRefresh.bind(this);
		this.onEndReached                = this.onEndReached.bind(this);
		this.shouldStartHeaderRefreshing = this.shouldStartHeaderRefreshing.bind(this);
		this.shouldStartFooterRefreshing = this.shouldStartFooterRefreshing.bind(this);

		this.touch = null;
		this.clientY = 0;
		this.clientX = 0;
		this.headerHeight = 0;

		this.container = props.container;
	}

	componentDidMount() {
		//获取下拉加载组件高度
		this.headerHeight = findDOMNode(this.header.refs.header).clientHeight;

		this.scrollContainer = (this.container)
			? document.querySelector(this.container)
			: window;
	}

	componentWillReceiveProps(nextProps) {
		switch (nextProps.refreshState) {
			case RefreshState.HEADER_REFRESHING:
				if (nextProps.headerType === 'float') {
					this.setState({distance: findDOMNode(this.header).clientHeight});
				} else {
					this.setState({distance: this.headerHeight});
				}
				break;
			case RefreshState.IDLE:
			default:
				this.setState({distance: 0});
				break;
		}
	}

	/**
	 * 手势事件
	 * @param event
	 */
	handleOnTouchStart(event) {
		if (findDOMNode(this.scroll).scrollTop === 0 && this.shouldStartHeaderRefreshing()) {
			let e = event || window.event;
			this.touch = e.targetTouches[0];
			this.clientY = this.touch.clientY;
			this.clientX = this.touch.clientX;
		}
	}

	/**
	 * 触摸滑动事件
	 * ①(内容)向下拉到底部，不能往下拉，但是可以往上拉
	 * ②(内容)向上拉到顶部，不能往上拉，但是可以往下拉
	 * ③(内容)既不能往下拉也不能往下拉
	 *
	 * 1为允许，0为禁止，高位表示向上方向，低位表示向下方向
	 *
	 * -------------------------------------- 防止微信露底 ---------------------------------------
	 * 可以拉的方向(height)                 拉的方向(touch)                 能否继续拉
	 *        00 ③                            10 (下拉)                       0 (阻止)
	 *        00 ③                            01 (上滑)                       0
	 *        01 ②                            10                              0
	 *        01 ②                            01                              1 (允许)
	 *        10 ①                            10                              1
	 *        10 ①                            01                              1
	 * -------------------------------------- 防止微信露底 ---------------------------------------
	 * @param event
	 */
	handleOnTouchMove(event) {
		// 高位表示向上滚动, 底位表示向下滚动: 1容许 0禁止
		let status = '11',
			e = event || window.event,
			currentY = e.touches[0].clientY,
			ele = this.scrollContainer,
			scrollTop = ele.scrollTop,
			offsetHeight = ele.offsetHeight,
			scrollHeight = ele.scrollHeight;
		if (scrollTop === 0) {
			// 如果内容小于容器则同时禁止上下滚动
			status = offsetHeight >= scrollHeight ? '00' : '01';
		} else if (scrollTop + offsetHeight >= scrollHeight) {
			// 已经滚到底部了只能向上滚动
			status = '10';
		}
		if (status !== '11') {
			// 判断当前的滚动方向
			let direction = currentY - this.clientY > 0 ? '10' : '01';
			// console.log(direction);
			// 操作方向和当前允许状态求与运算，运算结果为0，就说明不允许该方向滚动，则禁止默认事件，阻止滚动
			if (!(parseInt(status, 2) & parseInt(direction, 2))) {
				e.preventDefault();
				e.stopPropagation();
				// return;
			}
		}

		if (findDOMNode(this.scroll).scrollTop === 0 && this.shouldStartHeaderRefreshing()) {
			const {damping} = this.props;
			let clientY = e.targetTouches[0].clientY;
			let clientX = e.targetTouches[0].clientX;
			if (clientY > this.clientY && (clientY - this.clientY >= clientX - this.clientX)) {
				let distance = (clientY - this.clientY) * damping * damping;
				this.setState({distance});
			}
		}
	}

	handleOnTouchEnd(event) {
		if (this.state.distance < this.headerHeight * 1.2) {
			//下拉距离不够，不执行刷新回调
			this.setState({distance: 0});
		} else {
			this.onHeaderRefresh();
		}
	}

	/**
	 * 滚动事件监听
	 */
	handleOnScroll() {
		const { onEndReachedThreshold } = this.props;
		if (!!this.scroll) {
			let scrollTop = findDOMNode(this.scroll).scrollTop;
			let clientHeight = findDOMNode(this.scroll).clientHeight;
			let scrollHeight = findDOMNode(this.scroll).scrollHeight;
			// if (scrollTop + clientHeight >= scrollHeight - clientHeight * onEndReachedThreshold) {
			if (scrollTop + clientHeight >= scrollHeight) {
				this.onEndReached();
			}
		}
	}

	/**
	 * 下拉，上拉回调
	 */
	onHeaderRefresh() {
		if (this.shouldStartHeaderRefreshing()) {
			this.props.onHeaderRefresh && this.props.onHeaderRefresh(RefreshState.HEADER_REFRESHING)
		}
	}

	onEndReached() {
		if (this.shouldStartFooterRefreshing()) {
			this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FOOTER_REFRESHING)
		}
	}

	shouldStartHeaderRefreshing() {
		return !(
			this.props.refreshState === RefreshState.HEADER_REFRESHING
			|| this.props.refreshState === RefreshState.FOOTER_REFRESHING
		);
	}

	shouldStartFooterRefreshing() {
		let {refreshState, data} = this.props;
		if (data.length === 0) {
			return false
		}

		return (refreshState === RefreshState.IDLE)
	}

    render() {
		const {
			data,
			renderItem,
			scrollHeight,
			headerType,
			goTop,
			refreshState,
			onFooterRefresh,
			header,
			container,
			className
		} = this.props;
		const { distance } = this.state;

        return (
        	<Motion style={{distance: spring(distance, {stiffness: 130, damping: 17})}}>
				{({distance}) => {
					return (
						<div
							ref={(ref) => this.scroll = ref}
							style={{
								height: scrollHeight || window.innerHeight
							}}
							className={
								classnames(
									("scroll-list"),
									(className),
									(container&&container.replace('.',''))
								)
							}
							onScroll={this.handleOnScroll}
							onTouchStart={this.handleOnTouchStart}
							onTouchMove={this.handleOnTouchMove}
							onTouchEnd={this.handleOnTouchEnd}
						>
							{
								headerType === 'normal' ?
									<Header
										ref={(ref) => this.header = ref}
										height={distance}
										refreshState={refreshState}
										content={header}
									/>
									:
									<FloatHeader
										ref={(ref) => this.header = ref}
										height={distance}
										refreshState={refreshState}
									/>
							}

							<Main data={data} renderItem={renderItem} />

							<Footer
								state={refreshState}
								onFooterRefresh={onFooterRefresh}
							/>

							{goTop &&
							<Top
								onClick={(event) => {
									event.preventDefault();
									event.stopPropagation();
									findDOMNode(this.scroll).scrollTop = 0
								}}
							/>}
						</div>
					)
				}}
			</Motion>
        );
    }
}

export default ScrollView;