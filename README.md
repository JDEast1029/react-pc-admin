# react-pc-admin
## Tip
* react-router
>由于react-router-redux还不兼容react-router4.0以上版本， 所以目前React-Router使用3.0.5版本

* react-hot-loader使用注意
>必须使用npm i react-hot-loader@next --save-dev 安装
* react-router 按需加载使用
>
```
首先在 webpack.config.js 的 output 内加上 chunkFilename
 output: {
    filename: 'js/[name].[hash:8].bundle.js',
    path: BUILD_PATH,
    chunkFilename: 'js/[id].[name].[chunkhash:6].chunk.js',
    publicPath: './',
    sourceMapFilename: "sourceMap/[file].map"
}

然后在用getComponents加载路由
{
    path: '/login',
    getComponents: (nextState, callback) => {
        require.ensure([], (require) => {
            callback(null, require('./Modules/Login').default);
        }, 'login');
    }
}
```