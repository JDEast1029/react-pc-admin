/**
 * 网络状态
 */
import React, { Component } from 'react';

import Empty from './Empty';
import Error from './Error';

class NetStates extends Component {

    renderView() {
        const { netState } = this.props;

        switch(netState) {
            case 'empty':
                return <Empty />;
            case 'success':
                return React.Children.map(this.props.children, child => child);
            case 'error': 
            default:
                return <Error />;
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