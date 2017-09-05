
const loginRoutes = [
    {
        path: '/login',
        getComponents: (nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('./Modules/Login').default);
            }, 'login');
        }
    }
];

export default loginRoutes;