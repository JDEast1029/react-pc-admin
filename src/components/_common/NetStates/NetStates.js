/**
 * 网络状态
 * 适合包裹一进入就去请求的页面，
 * 不适合通过在页面中进行操作来请求，因为该组件默认页面为 空页面
 */
import React, { Component } from 'react';
import PropType from 'prop-types';

import Empty from './Empty';
import Error from './Error';
import './NetStates.scss';

class NetStates extends Component {

    renderView() {
        const { netState, isEmpty } = this.props;

        switch(netState) {
            case 404:
            case 'error':
                return <Error netState={netState} />;
            case 'success':
            	if (isEmpty) {
					return <Empty />;
				}
				return React.Children.map(this.props.children, child => child);
            default:
                return React.Children.map(this.props.children, child => child);
                // return <div /> loading
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

NetStates.propTypes = {
	isEmpty: PropType.bool,              //内容是否为空
};

NetStates.defaultProps = {
	isEmpty: false
};

export default NetStates;