import login from './api/login';
import test from './api/test';

const ApiRoot = {
    ...login,
    ...test,
};

export default ApiRoot;