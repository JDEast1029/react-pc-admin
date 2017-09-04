/**
 * 网络状态
 * 适合包裹一进入就去请求的页面，
 * 不适合通过在页面中进行操作来请求，因为该组件默认页面为 空页面
 */
import React, { Component } from 'react';

import Empty from './Empty';
import Error from './Error';
import './NetStates.scss';

class NetStates extends Component {

    renderView() {
        const { netState } = this.props;

        switch(netState) {
            case 'empty':
                return <Empty />;
            case 404:
            case 'error':
                return <Error netState={netState} />;
            case 'success':
            default:
                return React.Children.map(this.props.children, child => child);
                // return <div />
        }
    }

    render() {
        return (
            <div>
                {this.renderView()}
            </div>
        );
    }
}

export default NetStates;