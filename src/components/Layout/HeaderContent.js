import React, { Component } from 'react';
import { Layout, Icon } from 'antd';

const { Header } = Layout;

class HeaderContent extends Component {
    render() {
        const { collapsed, toggle } = this.props;

        return (
            <Header style={{ background: '#fff', padding: '0 0 0 20px' }}>
                <Icon
                  className="trigger"
                  type={collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={toggle}
                />
                
            </Header>
        )
    }
}

export default HeaderContent;