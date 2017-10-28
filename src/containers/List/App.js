/**
 * Created by Administrator on 2017/10/28.
 */
const liveRoutes = [
	{
		path: '/list',
		getComponents: (nextState, callback) => {
			require.ensure([], (require) => {
				callback(null, require('./Modules/List').default);
			}, 'list');
		}
	}
];

export default liveRoutes;