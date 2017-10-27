import loginRoutes from '../containers/Login/App';
import layout from '../containers/Layout/App';

import liveRoutes from '../containers/Live/App';

const routes = [
    {
        path: '/',
        onEnter:(nextState, replace) => { replace('/login');}
    },
    //登录页路由
    ...loginRoutes,
	...liveRoutes,
    //主页路由
    ...layout,

    {
        path: '*',
        getComponents: (nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('containers/NotFound/NotFound').default);
            }, 'not-found');
        }
    }
];

export default routes;