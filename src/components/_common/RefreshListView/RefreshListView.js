/**
 * 带有下拉刷新和上拉加载的List
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { Motion, spring } from 'react-motion';
//components
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const RefreshState = {
	IDLE: 0,
	HEADER_REFRESHING: 1,
	FOOTER_REFRESHING: 2,
	NO_MORE_DATA: 3,
	FAILURE: 4
};

class ScrollView extends Component {
	static propTypes = {
		damping: PropTypes.number, //阻尼(0-1)
		onHeaderRefresh: PropTypes.func,
		onFooterRefresh: PropTypes.func,
		refreshState: PropTypes.number,
		data: PropTypes.array
	};

	static defaultProps = {
		damping: 0.4,
		onHeaderRefresh: () => {},
		onFooterRefresh: () => {},
		refreshState: 0,
		data: []
	};

	constructor(props) {
		super(props);
		this.state = {
			distance: 0
		};
		//手势事件
		this.handleOnTouchStart = this.handleOnTouchStart.bind(this);
		this.handleOnTouchMove = this.handleOnTouchMove.bind(this);
		this.handleOnTouchEnd = this.handleOnTouchEnd.bind(this);
		this.handleOnTouchCancel = this.handleOnTouchCancel.bind(this);
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
		this.headerHeight = findDOMNode(this.header).clientHeight;
	}

	/**
	 * 手势事件
	 * @param event
	 */
	handleOnTouchStart(event) {
		this.touch = event.targetTouches[0];
		this.clientY = this.touch.clientY;
		this.clientX = this.touch.clientX;
	}

	handleOnTouchMove(event) {
		const { damping  } = this.props;
		let clientY = event.targetTouches[0].clientY;
		let clientX = event.targetTouches[0].clientX;
		if (clientY > this.clientY && (clientY - this.clientY >= clientX - this.clientX)) {
			let distance = (clientY - this.clientY) * damping * damping;
			this.setState({distance});
		}
	}

	handleOnTouchEnd(event) {
		if (this.state.distance < this.headerHeight * 1.2) {
			//下拉距离不够，不执行刷新回调
			this.setState({distance: 0});
		} else {
			this.onHeaderRefresh();
			this.setState({distance: this.headerHeight});
			setTimeout(() => {
				this.setState({distance: 0});
			}, 2000)
		}
	}

	handleOnTouchCancel(event) {

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
		const { refreshState, data, renderItem, headerHeight } = this.props;
		const { distance } = this.state;

        return (
        	<Motion style={{distance: spring(distance, {stiffness: 130, damping: 17})}}>
				{({distance}) => {
					return (
						<div
							style={{
								transform: `translateY(${distance - (headerHeight || 26)}px)`
							}}
							onTouchStart={this.handleOnTouchStart}
							onTouchMove={this.handleOnTouchMove}
							onTouchEnd={this.handleOnTouchEnd}
							onTouchCancel={this.handleOnTouchCancel}
						>
							<Header ref={(ref) => this.header = ref} />
							<Main data={data} renderItem={renderItem} />
							<Footer state={refreshState}/>
						</div>
					)
				}}
			</Motion>
        );
    }
}

export default ScrollView;