
const homeRoutes = [
    {
        path: '/home',
        getComponents: (nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('./Modules/Home').default);
            }, 'home');
        }
    }
];

export default homeRoutes;