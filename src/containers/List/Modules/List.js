/**
 * Created by Administrator on 2017/10/28.
 */
import React, { Component } from 'react';
// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/test';
import * as types from '../../../contants/actionTypes/test';
// components
import RefreshListView from '../../../components/_common/RefreshListView/RefreshListView';

class List extends Component {

	componentDidMount() {
		this.fetchData();
	}

	fetchData(refreshState = 1) {
		const { actions } = this.props;

		actions.request({
			type: types.LIST_GET,
			method: 'get',
			onSuccess: () => {},
			onError: () => {}
		}, refreshState);
	}

	render() {
		const {
			testReducer,
			actions
		} = this.props;

		return (
			<RefreshListView
				data={testReducer.data}
				headerType={'float'}
				refreshState={testReducer.status}
				onHeaderRefresh={(refreshState) => { this.fetchData(refreshState); }}
				onFooterRefresh={(refreshState) => { this.fetchData(refreshState); }}
				renderItem={(item, index) => <div key={index} className="g-bg-white g-fs-28 g-pd" style={{ height: '50px', width: '100%' }}>{item.name}</div>}
			/>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	testReducer: state.testReducer,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
	actions: bindActionCreators(actions, dispatch)
});


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(List);