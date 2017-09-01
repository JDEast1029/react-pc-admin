const isDebug = (process.env.NODE_ENV !== 'production');
// const DevTools = isDebug ? require('./devtools/DevTools').default : null ;

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import net from '../utils/middleware/net';
import rootReducer from '../reducers';

let enhancer;

if(isDebug) {
    enhancer = compose(
        applyMiddleware(thunk, net),
        // applyMiddleware(thunk),
        // DevTools.instrument()
    );
} else {
    enhancer = applyMiddleware(thunk);
}

// 创建 store
const store = createStore(
    rootReducer,
    {},
    enhancer
);

export default store;