/**
 * Created by Administrator on 2017/10/27.
 */
import * as types from '../../contants/actionTypes/test';

const initState = {
	data: [],
	status: 0,
};

//相应的状态 数据和status有待确定
const testReducer = (state = initState, action) => {
	switch(action.type) {
		case types.LIST_GET + '_ON':
			state = {
				...state,
				status: action.refreshState || 0
			};
			return state;
		case types.LIST_GET + '_SUCCESS':
			state = {
				data: [...state.data, ...action.data],
				status: 0               //根据数据isEnd判断
			};
			return state;
		case types.LIST_GET + '_ERROR':
			state = {
				...state,
				data: action.refreshState === 1 ? [] : state.data,
				status: 4
			};
			return state;
		case types.LIST_GET + '_REFRESH':
			state = {
				...state,
				data: action.data,
				status: 0               //根据数据isEnd判断
			};
			return state;
		default:
			return state;
	}
};

export default testReducer;