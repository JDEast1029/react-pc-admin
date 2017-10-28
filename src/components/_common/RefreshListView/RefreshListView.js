/**
 * 带有下拉刷新和上拉加载的List
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { Motion, spring } from 'react-motion';
//components
import FloatHeader from './FloatHeader';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
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
	};

	static defaultProps = {
		damping: 0.4,
		onHeaderRefresh: () => {},
		onFooterRefresh: () => {},
		refreshState: 0,
		headerType: 'normal',
		data: [],
		onEndReachedThreshold: 0.2
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
	}

	componentDidMount() {
		//获取下拉加载组件高度
		this.headerHeight = findDOMNode(this.header.refs.header).clientHeight;
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
			this.touch = event.targetTouches[0];
			this.clientY = this.touch.clientY;
			this.clientX = this.touch.clientX;
		}
	}

	handleOnTouchMove(event) {
		if (findDOMNode(this.scroll).scrollTop === 0 && this.shouldStartHeaderRefreshing()) {
			const {damping} = this.props;
			let clientY = event.targetTouches[0].clientY;
			let clientX = event.targetTouches[0].clientX;
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
			refreshState,
			onFooterRefresh
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
							className="scroll-list"
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

							<div style={{position: 'absolute', right: 50, bottom: 50}}
								 onClick={() => {findDOMNode(this.scroll).scrollTop = 0}}
							>
								Top
							</div>
						</div>
					)
				}}
			</Motion>
        );
    }
}

export default ScrollView;