import Login from './Modules/Login';

const loginRoutes = [
    {
        path: '/login',
        getComponents: (nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('./Modules/Login').default);
            }, 'login');
        }
    },
    {
        path: '/home',
        getComponents: (nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('./Modules/Home').default);
            }, 'home');
        }
    }
];

export default loginRoutes;