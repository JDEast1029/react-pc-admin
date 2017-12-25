
const componentsRoutes = [
	{
		path: '/components',
		getComponents: (nextState, callback) => {
			require.ensure([], (require) => {
				callback(null, require('./Modules/ComponentsList').default);
			}, 'components');
		}
	}
];

export default componentsRoutes;