/**
 * Created by AT on 2017/10/27.
 */
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { RefreshState, RefreshStateText } from './Constants';

class Header extends Component {
	componentDidMount() {
		this.headerHeight = findDOMNode(this.refs.header).clientHeight;
	}

	renderContent() {
		const { content, height, refreshState } = this.props;

		if (!React.isValidElement(content)) {
			if (this.headerHeight < (height | 0)) {          // (height | 0) 去掉小数部分，防止出现正在刷新完成以后还会出现'释放立即刷新的字样'
				return RefreshStateText.CONTENT_OVER;
			}
			switch (refreshState) {
				case RefreshState.IDLE:
					return RefreshStateText.CONTENT_DOWN;
				case RefreshState.HEADER_REFRESHING:
					return RefreshStateText.CONTENT_REFRESH;
				default:
					break;
			}
		} else {
			return content;
		}
	}

	render() {
		const { height = 0 } = this.props;

		return (
			<div style={{
				height: height,
				position: 'relative',
				overflow: 'hidden'
			}}>
				<div ref='header' className="g-flex refresh-header">
					{this.renderContent()}
				</div>
			</div>
		);
	}
}

export default Header;