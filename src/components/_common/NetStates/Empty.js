/**
 * 数据为空
 */
import React, { Component } from 'react';
import SymbolIcon from 'components/_common/Icon/SymbolIcon';

class Empty extends Component {
    render() {
        return (
			<div className="net-state">
				<SymbolIcon icon="icon-empty" className="empty-icon" />
			</div>
        );
    }
}

export default Empty;