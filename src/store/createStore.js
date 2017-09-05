const isDebug = (process.env.NODE_ENV !== 'production');
// const DevTools = isDebug ? require('./devtools/DevTools').default : null ;

import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import thunk from 'redux-thunk';
import net from '../utils/middleware/net';
import rootReducer from '../reducers';

//添加路由的中间件,可以通过store.dispatch(push('/login'))来切换路由
const router = routerMiddleware(browserHistory);
let enhancer;

if(isDebug) {
    enhancer = compose(
        applyMiddleware(thunk, router, net),
        // applyMiddleware(thunk),
        // DevTools.instrument()
    );
} else {
    enhancer = applyMiddleware(thunk, router);
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