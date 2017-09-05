import loginRoutes from 'containers/Login/App';
import homeRoutes from 'containers/Home/App';

const routes = [
    //登陆页
    ...loginRoutes,
    //主页
    ...homeRoutes,

    {
        path: '/',
        onEnter:(nextState, replace) => { replace('/login');}
    },
    {
        path: '*',
        getComponents: (nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('./Empty').default);
            }, 'empty');
        }
    }
];

export default routes;