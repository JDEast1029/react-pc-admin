/**
 * 单次网络请求
 */
import axios from 'axios';
import { message } from 'antd';
import NProgress from './nprogress/nprogressConfig';
import API from '../../contants/ApiRoot';

const allowedMethod = ['POST', 'GET'];

const createRequest = (method, url, params) => {
    if (method === 'GET') {
		return axios.get(url, {
			params: {
				...params
			}
		})
	} else if (method === 'POST') {
		return axios.post(url, {
			...params
		})
	} else {
		console.error('Unknowe method');
		return null;
	}
};

export const singleRequest = (store, next, action) => {
    const {
		type,
		params,
		onSuccess,
		onError,
		refreshState
	} = action;

    let url = API[type];
    //如果url为空，则不处理
	if (!url) {
		return next(action);
    }

    //将请求method转成大写
    let method = action.method.toUpperCase();
    //不是合法method则不处理
    if (allowedMethod.indexOf(method) === -1) {
        return next(action);
    }
    
    let request = null;
    //开始请求,分发正在请求的actionType
    NProgress.set(0.4);
    next({
        type: type + '_ON',
		refreshState: refreshState
    });

    request = createRequest(method, url, params);

	request && request.then((response) => {
		NProgress.done();
		
		if (response.data.status) {
        	//请求成功回调
			onSuccess && onSuccess(response);
			//分发请求成功的actionType
			if (refreshState === 1) {
				return next({
					type: type + '_REFRESH',
					data: response.data.data,
				});
			} else {
				return next({
					type: type + '_SUCCESS',
					data: response.data.data,
				});
			}
		} else {
			//服务器返回的请求失败回调
			onError && onError(response.data.msg);
		}
	}).catch((error) => {
		NProgress.done();

		if (error.response) {
			//请求已经发出，但是服务器响应返回的状态吗不在2xx的范围内
			//分发请求失败的actionType
			return next({
				type: type + '_ERROR',
				code: error.response.status === 404 ? 2 : 3,
				refreshState: refreshState
			});

		} else {
			//一些错误是在设置请求的时候触发
			console.log('Error', error.message);
		}
	})
};

export const concurrentRequest = (store, next, action) => {
    let data = action.data;
    let requestArr = [];
    for (let i = 0; i < data.length; i++) {
        //将请求method转成大写
	    let method = data[i].method.toUpperCase();
        let url = API[data[i].type];
        //如果url为空或者不是合法method，则不处理
        //开始请求,分发正在请求的actionType
        NProgress.set(0.4);
        store.dispatch({
            type: data[i].type + '_CONCURRENT_LOADING'
        });
	    if (!url || allowedMethod.indexOf(method) === -1) {
	    	return next(action);
        }
    
        requestArr[i] = createRequest(method, url, action.params);
    }

    axios.all(requestArr)
    .then(axios.spread(function (...responseArr) {
        NProgress.done();
        // Both requests are now complete 
        console.log(...responseArr)
    }))
    .catch((...errorArr) => {
        NProgress.done();
        console.log(JSON.stringify(errorArr))
    });
};