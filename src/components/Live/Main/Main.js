/**
 * Created by Administrator on 2017/10/19.
 */
import React, { Component } from 'react';
import * as types from '../../../contants/actionTypes/test';
import ScrollView from 'components/_common/RefreshListView/RefreshListView';

class Main extends Component {

	componentDidMount() {
		this.fetchData();
	}

	fetchData(refreshState = 0) {
		const { actions } = this.props;

		actions.request({
			type: types.LIST_GET,
			method: 'get',
			onSuccess: () => {},
			onError: () => {}
		}, refreshState);
	}

	render() {
		const { testReducer } = this.props;

		return (
			<div className="flex-main-s topic-main-flex">
				<div className="chat-list-container">
					<ScrollView
						data={testReducer.data}
						// refreshState={}
						onHeaderRefresh={(refreshState) => { this.fetchData(refreshState); }}
						renderItem={(item, index) => <div key={index} className="g-bg-white g-fs-28 g-pd" style={{ height: '50px', width: '100%' }}>{item.name}</div>}
					/>
				</div>
			</div>
		);
	}
}

export default Main;