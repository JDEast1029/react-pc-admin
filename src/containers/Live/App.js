/**
 * 直播
 */
const liveRoutes = [
	{
		path: '/live',
		getComponents: (nextState, callback) => {
			require.ensure([], (require) => {
				callback(null, require('./Modules/LiveMain').default);
			}, 'live');
		}
	}
];

export default liveRoutes;
