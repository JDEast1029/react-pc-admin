import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import loginReducer from './login/root';
import testReducer from './test/test';

const rootReducer = combineReducers({
    routing: routerReducer,
    loginReducer,
	testReducer
});

export default rootReducer;