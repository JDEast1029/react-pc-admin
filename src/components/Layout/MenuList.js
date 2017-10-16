import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class MenuList extends Component {
  constructor(props) {
    super(props);
    this.handleOnItemClick = this.handleOnItemClick.bind(this);
  }

  handleOnItemClick(e) {
    const { router } = this.props;
    
    console.log(e, this.props.router);
    router.push('/login')
  }

  render() {
    return (
      <Menu
        theme="dark"
        defaultOpenKeys={['1']}
        defaultSelectedKeys={['1']}
        mode="inline"
        onClick={this.handleOnItemClick}
      >
        <Menu.Item key="login">
          <Icon type="dot-chart" />
          <span>首页</span>
        </Menu.Item>
      </Menu>
    );
  }
}

export default MenuList;
