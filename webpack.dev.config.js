const path                  = require('path')
const webpackMerge          = require('webpack-merge');
const webpack               = require('webpack');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const ExtractTextPlugin     = require('extract-text-webpack-plugin');
const CleanWebpackPlugin    = require('clean-webpack-plugin');

const baseConfig               = require('./webpack_config/base');
const config                   = require('./webpack_config/config');
const {
ROOT_PATH,
APP_PATH, 
BUILD_PATH, 
ENTRY_PATH 
} = config.defPath;

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
            'react-hot-loader/patch',
            'webpack/hot/only-dev-server',
            ENTRY_PATH
        ],
        vendor: config.vendor // 公共文件单独打包
    },
    /**
     * [name]     : 使用入口名称
     * [id]       : 使用内部 chunk id
     * [hash]     : 使用每次构建过程中，唯一的 hash 生成
     * [chunkhash]: 使用基于每个 chunk 内容的 hash
     * 
     * [hash] 和 [chunkhash] 的长度可以使用 [hash:16]（默认为20）来指定。
     * 或者，通过指定output.hashDigestLength 在全局配置长度。
     */
    output: {
        /**
         * filename:每个输出 bundle 的名称 -- 相对路径
         */
        filename: 'js/[name].[hash:8].bundle.js',
        /**
         * path: 存放bundle的目录路径
         */
        path: BUILD_PATH,
        /**
         * chunkFilename:按需加载的文件命名 -- 相对路径
         */
        chunkFilename: 'js/[name].[chunkhash:6].chunk.js',
        /**
         * 指定output directory在浏览器中的url
         */
        publicPath: '/',
        /**
         * 指定编译产生的'.map'文件的存放位置
         * [file] 原始文件的文件名 eg: css文件产生的.map 原始文件名为 ExtractTextPlugin 中的filename
         * 
         * 建议只使用 [file] 占位符，因为其他占位符在非 chunk 文件生成的 SourceMap 时不起作用
         */
        sourceMapFilename: "sourceMap/[file].map"
    },

    plugins: [
        // 热模块替换相关插件
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        // 定义环境变量
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new CleanWebpackPlugin(['build'], {
            root: ROOT_PATH,
            verbose: true,
            dry: false
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
        port: 3000,
        inline: true,
        compress: true,
        stats: {
            colors: true,
            errors: true,
            warnings: true,
            modules: false,
            chunks: false
        }
    }
})