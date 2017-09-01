import axios from 'axios';
import { message } from 'antd';

const net = (store) => (next) => (action) => {
    const { 
        url, 
        params, 
        onSuccess, 
        onError 
    } = action
    
    if (!url) {
        return next(action);
    }

    console.log(url, 1)
    let method = action.method.toUpperCase();
    let request = null;

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
        message.error('aaa')
        onError && onError(error)
    })
}

export default net;