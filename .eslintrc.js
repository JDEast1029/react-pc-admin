module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": ["warn", "tab", { "SwitchCase": 1 }],
        "no-unused-vars": "off",
        "no-undef": "off",
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": "off",
        "semi": [
            "error",
            "always"
        ],
        "no-console": "off",
        "no-mixed-spaces-and-tabs": "off",
        // 关键字周围强制使用空格
		"keyword-spacing": [
			"warn",
			{"before": true, "after": true}
		],
		// 大括号中强制使用空格
		"object-curly-spacing": [
			"warn",
			"always"
		],
		// 单行代码块前后要加空格
		"block-spacing": [
			"warn",
			"always"
		],
		// 逗号后面加空格
		"comma-spacing": [
			"warn",
			{ "before": false, "after": true }
		],
		// 分号后面加空格
		"semi-spacing": [
			"warn",
			{"before": false, "after": true}
		],
		// 在注释前有空白
		"spaced-comment": [
			"warn",
			"always"
		],
		// 箭头函数前后要有空格
		"arrow-spacing": [
			"warn",
			{ "before": true, "after": true }
		],
		// 对象字面量的属性中键和值之间使用一致的间距
		"key-spacing": [
			"warn",
			{ "beforeColon": false, "afterColon": true }
		],
		// 要求操作符周围有空格
		"space-infix-ops": [
			"warn",
			{"int32Hint": false}
		]
    }
};