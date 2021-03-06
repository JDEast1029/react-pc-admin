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
		router.push(`/${e.keyPath[0]}`);
	}

	getSelectItem() {
		const { path } = this.props;
		return path.split('/');
	}

	render() {
		const pathArray = this.getSelectItem();

		return (
			<Menu
				theme="dark"
				openKeys={[pathArray[1]]}                                 // 打开二级菜单
				selectedKeys={[pathArray[pathArray.length - 1]]}          // 选中的Item
				mode="inline"
				onClick={this.handleOnItemClick}
			>
				<Menu.Item key="home">
					<Icon type="dot-chart"/>
					<span className="g-white">首页</span>
				</Menu.Item>
				<Menu.Item key="live">
					<Icon type="play-circle"/>
					<span className="g-white">直播</span>
				</Menu.Item>
				<Menu.Item key="list">
					<Icon type="ellipsis"/>
					<span className="g-white">列表</span>
				</Menu.Item>
			</Menu>
		);
	}
}

export default MenuList;
