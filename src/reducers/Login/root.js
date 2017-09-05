/**
 * login Reducer 
 */
import * as types from '../../contants/actionTypes/login';

const initState = {
    isLogin: false
};

const loginReducer = (state = initState, action) => {
    switch(action.type) {
        case types.LOGIN_GET + '_LOADING':
            state = {
                ...state,
                isLoading: true
            };
            return state;
		case types.LOGIN_GET + '_EMPTY':
        	state = {
				...state,
				netState: 'empty'
			};
        	return state;
        case types.LOGIN_GET + '_ERROR':
            state = {
                ...state,
                netState: action.status
            };
            return state;
        default:
            return state;
    }
};

export default loginReducer;