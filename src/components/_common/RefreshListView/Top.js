/**
 * 返回顶部按钮
 */
import React from 'react';

const Top = (props) => {
	return (
		<div className="g-flex go-top"
			 onClick={props.onClick}
		>
			<i className="iconfont icon-go-top g-white g-fs-50" />
		</div>
	)
};

export default Top;