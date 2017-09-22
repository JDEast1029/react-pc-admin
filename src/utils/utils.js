/**
 * 获取URL包含的查询字符串属性
 */
export const getQueryStringArgs = () => {
    //去掉前面的问号
    let qs = location.search.length > 0 ? location.search.substring(1) : '';
    //将字符串分离成数组
    let args = {};
    let items = qs.length ? qs.split('&') : [];

    for(let i = 0; i < items.length; i++) {
        let item = items[i].split('=');
        let name = decodeURIComponent(item[0]);
        let value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }

    return args;
};


/**
 * 检测浏览器中的插件(IE中无效)
 */
export const hasPlugin = (name) => {
    name = name.toLowerCase();
    for (let i = 0; i < navigator.plugins.length; i++) {
        if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
            return true;
        } 
    }

    return false;
};

/**
 * 检测IE中的插件
 */
export const hasIEPlugin = (name) => {
    try {
        new ActiveXObject(name);
        return true;

    } catch (error) {
        return false;
    }
};