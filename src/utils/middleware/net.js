import axios from 'axios';
import { message } from 'antd';
import NProgress from './nprogress/nprogressConfig';

const net = (store) => (next) => (action) => {
    const { 
        url, 
        params, 
        onSuccess, 
        onError 
    } = action;
    
    if (!url) {
        return next(action);
    }

    let method = action.method.toUpperCase();
    let request = null;

    NProgress.set(0.4)
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
    }

    request
    .then((response) => {
        onSuccess && onSuccess(response)
    })
    .catch((error) => {
         NProgress.done();
        onError && onError(error)
    })
};

export default net;