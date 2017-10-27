import Layout from './Modules/Layout';
import Home from '../Home/Modules/Home';

import liveRoutes from '../Live/App';

const layoutRoutes = [
    {
        path: '/home',
        component: Layout,
        indexRoute: { component: Home },
        childRoutes: [
			// ...liveRoutes
        ]
    }
];

export default layoutRoutes;