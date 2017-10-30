/**
 * AT
 * RefreshListView 常量
 */
export const RefreshState  = {
	IDLE: 0,
	HEADER_REFRESHING: 1,
	FOOTER_REFRESHING: 2,
	NO_MORE_DATA: 3,
	FAILURE: 4
};

export const FooterStateText = {
	REFRESHING: '数据加载中…',
	FAILURE: '点击重新加载',
	NO_MORE_DATA: '已加载全部数据'
};

export const RefreshStateText = {
	CONTENT_DOWN: '下拉刷新',
	CONTENT_OVER: '释放立即刷新',
	CONTENT_REFRESH: '正在刷新...'
};
