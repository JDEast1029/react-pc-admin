import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import loginReducer from './Login/root';

const rootReducer = combineReducers({
    routing: routerReducer,
    loginReducer
});

export default rootReducer;