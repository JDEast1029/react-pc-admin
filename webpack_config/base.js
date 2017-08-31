const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('./config'); // 引入配置
const { APP_PATH, COMPONENTS_PATH, TPL_PATH, ROOT_PATH, NODE_MODULES } = config.defPath;

module.exports = function () {
    return {
        resolve: {
            /**
             * 自动解析确定的扩展,能够使用户在引入模块时不带扩展
             */
            extensions: [
                '.web.js', '.js', '.json', '.jsx', '.css'
            ],

            /**
             * 解析目录时要使用的文件名??,
             * "index.web"解决antd-mobile报Can't found react-native的错误
             */
            mainFiles: [
                "index.web", "index"
            ],

            /**
             * 告诉 webpack 解析模块时应该搜索的目录。
             * node_modules 为默认，如果不设置，会报代码中找不到引用的第三方库
             * eg:Error: Can't resolve 'lodash' in 'F:\workspace\test\webpackTest\webpackDemo1\src'
             */
            modules: [
                APP_PATH, "node_modules"
            ],

            /**
             * 在解析模块（例如，loader）时尝试使用的扩展
             * 如果想要不带 -loader 后缀使用 loader，可使用如下配置
             */
            moduleExtensions: ['-loader'],

            /**
             * 创建 import 或 require 的别名，来确保模块引入变得更简单
             */
            alias: {
                components: COMPONENTS_PATH
            }
        },
        cache: true, // 启用缓存
        module: { // 公用的加载器
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    include: APP_PATH,
                    loader: 'babel-loader',
                    exclude: [NODE_MODULES],
                    options: {
                        cacheDirectory: true
                    }
                }, 
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader", 
                        use: ["css-loader", "postcss-loader"]
                    })
                }, 
                {
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
                }, 
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192, //大于8192字节的图片正常打包，小于8192字节的图片以 base64 的方式引用，
                                // name: 'imgs/[name]',
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [// 依照模板生成 html
            new HtmlWebpackPlugin({
                template: TPL_PATH,
                minify: {
                    removeComments: true
                },
                cache: false
            }),
            /**
             * 将所有的入口 chunk(entry chunks)中引用的 *.css，移动到独立分离的 CSS 文件
             * 多个入口情况：
             *   1.多个入口有公用的部分，且有CommonsChunkPlugin插件，会分离到common的css文件中
             *   2.不是公共的部分（import 后必须要在应用才有效）会根据 入口文件 来分离到相应的[name].css 文件中
             *   3.多个入口 文件名字需要用 [name] 来设置
             * 
             * filename: 文件名称 -- 相对路径
             * 可以用 [contenthash] 来获取提取文件的 hash
             * （既不是 [hash] 也不是 [chunkhash]）
             */
            new ExtractTextPlugin({
                filename: "css/initial.[name].[contenthash:6].css"
            }),
        ]
    }
}