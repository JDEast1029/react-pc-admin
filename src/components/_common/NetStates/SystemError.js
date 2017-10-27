/**
 * 系统错误
 */
import React, { Component } from 'react';
import SymbolIcon from 'components/_common/Icon/SymbolIcon';

class SystemError extends Component {

	render() {
		return (
			<div className="net-state" onClick={() => location.reload()}>
				<SymbolIcon icon="icon-404-1" className="error-icon" />
				<p>系统错误，请点击刷新</p>
			</div>
		)
	}
}

export default SystemError;
