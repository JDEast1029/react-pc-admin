const pxtorem = require('postcss-pxtorem');
const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
        // antd-mobile 2倍像素转换为rem单位
        pxtorem({
            rootValue: 100,
            propWhiteList: [],
        }),
        // 自动处理私有前缀
        autoprefixer
    ]
};