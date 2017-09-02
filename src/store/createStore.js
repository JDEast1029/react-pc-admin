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

/**
 * warning.js:11 <Provider> does not support changing `store` on the fly 问题
 * 按照文档，但没有效果
 */
if (module.hot && process.env.NODE_ENV !== 'production') {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
}


export default store;