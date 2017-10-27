/**
 * 网络状态
 * 适合包裹一进入就去请求的页面，
 * 不适合通过在页面中进行操作来请求，因为该组件默认页面为 空页面
 */
import React, { Component } from 'react';
import PropType from 'prop-types';

import NetError from './NetError';
import SystemError from './SystemError';
import PageLoading from './PageLoading';
import './NetStates.scss';

/**
 * 页面状态
 * @type {{IDLE: number, PAGE_LOADING: number, NET_ERROR: number, SERVER_ERROR: number}}
 */
const PageStatus = {
	IDLE: 0,
	PAGE_LOADING: 1,
	NET_ERROR: 2,
	SYSTEM_ERROR: 3
};

class NetStates extends Component {

    renderView() {
		const { pageStatus } = this.props;

		switch (pageStatus.code) {
			case PageStatus.NET_ERROR:
				return (
					<NetError />
				);
			case PageStatus.SYSTEM_ERROR:
				return (
					<SystemError />
				);
			case PageStatus.PAGE_LOADING:
				return (
					<PageLoading />
				);
			case PageStatus.IDLE:
			default:
				return this.renderIdlePage();
		}
    }

	/**
	 * 渲染业务页面，并传递当前AppContainer 是否正在加载
	 * @returns {*}
	 */
	renderIdlePage() {
		const { pageStatus, children } = this.props;
		return React.Children.map(children, (child) => {
			if (!child) return;

			return (
				React.cloneElement(child, {
					children: child.props.children,
					isParentLoading: pageStatus.code === 1
				}))
		})
	}

    render() {
        return (
            <div>
                {this.renderView()}
            </div>
        );
    }
}

NetStates.propTypes = {
	isEmpty: PropType.bool,              //内容是否为空
};

NetStates.defaultProps = {
	isEmpty: false
};

export default NetStates;