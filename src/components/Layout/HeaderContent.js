import React, { Component } from 'react';
import { Layout, Icon, Avatar } from 'antd';

const { Header } = Layout;

class HeaderContent extends Component {
    render() {
        const { collapsed, toggle } = this.props;

        return (
            <Header style={{ background: '#fff', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Icon
                  className="trigger"
                  type={collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={toggle}
                />

				<Avatar
					src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
				/>
            </Header>
        )
    }
}

export default HeaderContent;