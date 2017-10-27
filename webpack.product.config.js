const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const os = require('os');

const baseConfig = require('./webpack_config/base');
const config = require('./webpack_config/config');
const { APP_PATH, BUILD_PATH, ENTRY_PATH, ROOT_PATH, CACHE_PATH } = config.defPath;

module.exports = webpackMerge(baseConfig(), {
    /**
     * 官方建议
     * development: cheap-module-eval-source-map
     * product: cheap-module-source-map
     */
    devtool: "cheap-module-source-map",

    entry: {
        app: ENTRY_PATH,
        vendor: config.vendor
    },
    
    plugins: [
        // new WebpackMd5Hash(), // 取代标准webpack chunkhash
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new CleanWebpackPlugin(['dist'], {
            root: ROOT_PATH,
            verbose: true,
            dry: false
        }),
        new ParallelUglifyPlugin({
            cacheDir: CACHE_PATH,
            workerCount: os
                .cpus()
                .length,
            uglifyJS: {
                output: {
                    comments: false
                },
                compress: {
                    warnings: false
                }
            }
        }),
        // js 压缩
        new webpack
            .optimize
            .UglifyJsPlugin(config.uglifyJsConfig),
        new webpack
            .optimize
            .CommonsChunkPlugin({names: ['vendor'], filename: 'js/common-[hash:6].js', minChunks: Infinity}),
		//GZip
		new CompressionPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: new RegExp(
				'\\.(' +
				['js', 'scss', 'css'].join('|') +
				')$'
			),
			threshold: 10240,
			minRatio: 0.8
		})
    ]
});