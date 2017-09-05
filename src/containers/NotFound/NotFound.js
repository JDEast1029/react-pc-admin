/**
 * 没有路由匹配的页面
 */
import React, { Component } from 'react';
import SymbolIcon from 'components/_common/Icon/SymbolIcon'; 
import './NotFound.scss';

class Empty extends Component {
    render() {
        return (
            <div className="not-exist">
                <SymbolIcon icon="icon-not-exist" className="not-exist-icon" />
            </div>
        );
    }
}

export default Empty;