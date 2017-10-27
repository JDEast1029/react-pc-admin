/**
 * Created by Administrator on 2017/10/27.
 */
import * as types from '../../contants/actionTypes/test';

const initState = {
	data: []
};

const testReducer = (state = initState, action) => {
	switch(action.type) {
		case types.LIST_GET + '_SUCCESS':
			state = {
				data: [...state.data, ...action.data]
			};
			return state;
		default:
			return state;
	}
};

export default testReducer;