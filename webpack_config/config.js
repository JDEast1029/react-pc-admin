// 引入 node.js path 模块
const path = require('path');

// 公共文件
exports.vendor = [
    'react',
    'prop-types',
    'react-dom',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux',
    'redux-thunk',
    'classnames'
];

// js 压缩 配置
exports.uglifyJsConfig = {
    beautify: false, // 不美化输出
    compress: {
        warnings: false, // 不保留警告
        drop_debugger: true, // 不保留调试语句
        drop_console: true // 不保留控制台输出信息
    },
    mangle: { // 跳过这些，不改变命名
        except: ['$super', '$', 'exports', 'require']
    },
    space_colon: false,
    comments: false // 不保留注释
};

// 定义 文件路径 注：文件在 根目录下的 webpack 文件夹下
const ROOT_PATH = path.resolve(__dirname, '../');

exports.defPath = {
    ROOT_PATH                  :ROOT_PATH,
    APP_PATH                   :path.resolve(ROOT_PATH, './src'),
    ENTRY_PATH                 :path.resolve(ROOT_PATH, './src/main.js'),
    BUILD_PATH                 :path.resolve(ROOT_PATH, './dist'),
    TPL_PATH                   :path.resolve(ROOT_PATH, './src/index.tpl.html'),
    NODE_MODULES               :path.resolve(ROOT_PATH, './node_modules'),
    CACHE_PATH                 :path.resolve(ROOT_PATH, './cache'),
    COMPONENTS_PATH            :path.resolve(ROOT_PATH, './src/components'),
    CONTAINERS_PATH            :path.resolve(ROOT_PATH, './src/containers')
}