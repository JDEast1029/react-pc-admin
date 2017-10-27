const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('./config'); // 引入配置
const {
    APP_PATH,
    COMPONENTS_PATH,
    CONTAINERS_PATH,
    TPL_PATH,
    ROOT_PATH,
    NODE_MODULES,
    ENTRY_PATH,
    BUILD_PATH
} = config.defPath;

module.exports = function () {
    return {
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
            chunkFilename: 'js/[id].[name].[chunkhash:6].chunk.js',
            /**
             * 指定output directory在浏览器中的url
             * 即打包后会在资源路径前加该publicPath的值
             */
            publicPath: './',
             /**
             * 指定编译产生的'.map'文件的存放位置
             * [file] 原始文件的文件名 eg: css文件产生的.map 原始文件名为 ExtractTextPlugin 中的filename
             *
             * 建议只使用 [file] 占位符，因为其他占位符在非 chunk 文件生成的 SourceMap 时不起作用
             */
            sourceMapFilename: "sourceMap/[file].map"
        },

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
                components: COMPONENTS_PATH,
                containers: CONTAINERS_PATH
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
                }, {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader', 'postcss-loader']
                }, {
                    test: /\.less$/,
                    use: ['style-loader', 'css-loader', 'less-loader']
                }, {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: ["css-loader", "postcss-loader", "sass-loader"]
                    })
                }, {
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
        plugins: [ // 依照模板生成 html
			new HtmlWebpackPlugin({
				filename: 'index.html',    //生成的文件，从 output.path 开始 output.path + "/react.html"
				template: TPL_PATH,  //读取的模板文件,这个路径是相对于当前这个配置文件的
				inject: true, // 自动注入
				minify: {
					removeComments: true,        //去注释
					collapseWhitespace: true,    //压缩空格
					removeAttributeQuotes: true  //去除属性引用
					// more options:
					// https://github.com/kangax/html-minifier#options-quick-reference
				},
				//必须通过上面的 CommonsChunkPlugin 的依赖关系自动添加 js，css 等
				chunksSortMode: 'dependency'
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
            new ExtractTextPlugin({filename: "css/initial.[name].[contenthash:6].css"})
        ]
    }
}