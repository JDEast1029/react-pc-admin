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

/**
 * -----------------------------------------
 * ----------------表单工具-----------------
 * ----------------------------------------
 */


/**
 * 去掉字符串两边空格
 * @param str
 */
export const trim = (str) => {
	if (typeof str === 'string') {
		return str.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,'')
	}
	console.warn('参数类型错误');
	return !1;
};

/**
 * 内容是否为空
 * @param char 过滤后的字符串
 * @returns {boolean}
 */
export const isContent = (char) => {
	if (typeof char === 'string') return !char;
	console.warn('参数类型错误');
	return !1;
};

/**
 * 禁止输入
 * @param ele
 */
export const inputDisable = (ele) => {
	ele.onFocus = function () {
		ele.blur();
	}
};

/**
 * 回车监听
 * @param ele
 * @param callback
 */
export const enterSubmit = (ele, callback) => {
	ele.onkeyup = function (e) {
		e = e || window.event;
		let keycode = e.keyCode || e.which || e.charCode;
		if (keycode === 13) {
			callback && callback();
		}
	}
};

/**
 * 禁止文本框记忆
 * @param ele
 */
export const offAutoComplete = (ele) => {
	ele.setAttribute('autocomplete', 'off');
};

/**
 * 文本款高度自适应
 * @param ele
 * @param maxHeight
 */
export const textareaFitHeight = (ele, maxHeight) => {
	ele.onkeyup = function () {
		if ( ele.scrollHeight <= maxHeight) {
			ele.style.overflowY = ele.scrollHeight >= maxHeight ? 'scroll' : 'hidden';
			ele.style.height = ele.scrollHeight + 'px';
		}
	}
};

/**
 * 判断奇偶数
 * ---------------------------------------------------
 * 奇数的二进制码的最后一位数肯定是1，而1只有最后一位为1
 * ---------------------------------------------------
 * @param num
 * @returns {number} 1: 奇数; 0：偶数
 */
export const parity = (num) => {
	return num & 1;
};