import Login from './Modules/Login';

const loginRoutes = [
    {
        path: '/login',
        getComponents(nextState, callback) {
            require.ensure([], function(require) {
                callback(null, Login);
            }, 'login');
        },
    }
]

export default  loginRoutes;