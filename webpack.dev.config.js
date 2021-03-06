const path = require('path')
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseConfig = require('./webpack_config/base');
const config = require('./webpack_config/config');
const {ROOT_PATH, APP_PATH, BUILD_PATH, ENTRY_PATH} = config.defPath;

// 使用 `webpack-merge` 将基础配置和新配置合并
module.exports = webpackMerge(baseConfig(), {
    /**
    * 官方建议
    * development: cheap-module-eval-source-map
    * product: cheap-module-source-map
    */
    devtool: "cheap-module-eval-source-map",

    /**
         * 如果是字符串，output输出的名字是 ‘main’
         * 如果是object，output输出的名字是 key的名称
         */
    entry: {
        app: [
            'babel-polyfill',
            'react-hot-loader/patch',
            ENTRY_PATH
        ],
        vendor: config.vendor // 公共文件单独打包
    },

    plugins: [
        // 热模块替换相关插件
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        // 定义环境变量
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],

    devServer: {
        // 开启服务器
        contentBase: BUILD_PATH,
        publicPath: '/',
        historyApiFallback: true,
        clientLogLevel: 'none',
        open: true,
        hot: true,
        port: 9001,
        inline: true,
        compress: true,
        stats: {
            colors: true,
            errors: true,
            warnings: true,
            modules: false,
            chunks: false
        },
		proxy: {
			"/api": {
				target: "http://localhost:3000",
				// pathRewrite: {"^/api" : ""},
				secure: false
			}
		},
    }
});
