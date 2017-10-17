import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
const { Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
import Header from '../../../components/Layout/HeaderContent';
import Breadcrumb from '../../../components/Layout/Breadcrumb';
import MenuList from '../../../components/Layout/MenuList';
import './styles.scss';

class PageFrame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { router, location } = this.props;
    const { pathname } = location;

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />

          <MenuList 
            router={router}
			path={pathname}
          />
        </Sider>
        <Layout>
          <Header
              toggle={this.toggle}  
              collapsed={this.state.collapsed}            
          />

          <Content style={{ margin: '0 16px' }}>

            <Breadcrumb breadcrumb={[]} />

            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>

          </Content>

          <Footer style={{ textAlign: 'center' }}>
            react-pc-admin ©2017 Created by AT
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default PageFrame;
