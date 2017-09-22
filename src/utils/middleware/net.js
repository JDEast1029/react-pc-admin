/**
 * 网络请求中间件封装
 */
import axios from 'axios';
import { message } from 'antd';
import NProgress from './nprogress/nprogressConfig';
import API from '../../contants/ApiRoot';
import { singleRequest, concurrentRequest } from './request';

const net = (store) => (next) => (action) => {
	if (action.type === 'CONCURRENT_REQUEST') {
		concurrentRequest(store, next, action)
	} else {
		singleRequest(store, next, action)
	}
};

export default net;