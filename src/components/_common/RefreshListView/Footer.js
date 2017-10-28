/**
 * Created by Administrator on 2017/10/27.
 */
import React, { Component } from 'react';

const RefreshState = {
	IDLE: 0,
	HEADER_REFRESHING: 1,
	FOOTER_REFRESHING: 2,
	NO_MORE_DATA: 3,
	FAILURE: 4
};

const footerRefreshingText = '数据加载中…';
const footerFailureText = '点击重新加载';
const footerNoMoreDataText = '已加载全部数据';

class Footer extends Component {

	render() {
		const { state } = this.props;

		switch (state) {
			case RefreshState.FOOTER_REFRESHING:
				return <div className="g-text-c g-pd-s">{footerRefreshingText}</div>;
			case RefreshState.FAILURE:
				return <div className="g-text-c g-pd-s">{footerFailureText}</div>;
			case RefreshState.NO_MORE_DATA:
				return <div className="g-text-c g-pd-s">{footerNoMoreDataText}</div>;
			case RefreshState.IDLE:
			default:
				return <div/>;
		}
	}
}

export default Footer;