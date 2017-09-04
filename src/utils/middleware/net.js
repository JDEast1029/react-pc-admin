/**
 * 网络请求中间件封装
 */
import axios from 'axios';
import { message } from 'antd';
import NProgress from './nprogress/nprogressConfig';
import API from '../../contants/ApiRoot';

const net = (store) => (next) => (action) => {
	const {
		type,
		params,
		onSuccess,
		onError
	} = action;

    //如果url为空，则不处理
    let url = API[type];
	if (!url) {
		return next(action);
	}

	//将请求method转成大写
	let method = action.method.toUpperCase();
	let request = null;

    //开始请求,分发正在请求的actionType
    NProgress.set(0.4);
    store.dispatch({
        type: type + '_LOADING'
    });


	if (method === 'GET') {
		request = axios.get(url, {
			params: {
				...params
			}
		})
	} else if (method === 'POST') {
		request = axios.post(url, {
			...params
		})
	} else {
		console.error('Unknowe method');
		return next(action)
	}

	request && request.then((response) => {
		NProgress.done();
		
		if (true) {
			//分发请求成功的actionType
        	store.dispatch({
        	    type: type + '_SUCCESS',
        	    data: response.data
        	});

        	//请求成功回调
			onSuccess && onSuccess(response);
		} else {
			if (true) {
				store.dispatch({
					type: type + '_EMPTY'
				})
			}
			//请求失败回调
			onError && onError('error');
		}
	}).catch((error) => {
        NProgress.done();

        //分发请求失败的actionType
        store.dispatch({
            type: type + '_ERROR',
            status: error.response.status
        });
	})
};

export default net;