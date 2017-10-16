import Layout from './Modules/Layout';
import Home from '../Home/Modules/Home';

const layoutRoutes = [
    {
        path: '/home',
        component: Layout,
        indexRoute: { component: Home },
        childRoutes: [
            
        ]
    }
];

export default layoutRoutes;