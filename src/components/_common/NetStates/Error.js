/**
 * 网络错误
 */
import React, { Component } from 'react';
import SymbolIcon from 'components/_common/Icon/SymbolIcon';

class Error extends Component {

	/**
	 * 其他网络错误
	 * @returns {XML}
	 */
	renderErrorView() {
		return (
			<div className="net-state" onClick={() => location.reload()}>
				<SymbolIcon icon="icon-error" className="error-icon" />
				<p>页面出错了!!!</p>
			</div>
		);
	}

	/**
	 * 404错误
	 * @returns {XML}
	 */
	render404Error() {
		return (
			<div className="net-state" onClick={() => location.reload()}>
				<SymbolIcon icon="icon-404-1" className="error-icon" />
				<p>网络连接异常，请点击刷新</p>
			</div>
		)
	}

    render() {
		const { netState } = this.props;

        if (netState === 404) {
        	return this.render404Error();
		} else {
        	return this.renderErrorView();
		}
    }
}

export default Error;