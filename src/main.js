import React from 'react';
import ReactDOM from 'react-dom';
import Root from './App';

const renderApp = () => {
    ReactDOM.render(
        <Root />,
        document.getElementById('page'));
};

renderApp();

/**
 * 模块热替换的 API
 * 
 * 使用npm i react-hot-loader@next --save-dev 安装
 */
if (module.hot && process.env.NODE_ENV !== 'production') {
    module
        .hot
        .accept('./App.js', () => {
            renderApp()
        });
}