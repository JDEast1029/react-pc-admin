import loginRoutes from 'containers/Login/App';

const routes = [
    ...loginRoutes,

    {
        path: '/',
        onEnter:(nextState, replace) => { replace('/login');}
    }
];

export default routes;