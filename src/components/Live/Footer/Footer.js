/**
 * Created by Administrator on 2017/10/19.
 */
import React, { Component } from 'react';
import Option from './Option';
import SendContent from './SendContent';

class Footer extends Component {

	render() {
		return (
			<div className="flex-other live-footer">
				<SendContent/>   {/* 内容发送区*/}
				{/* <Option/>        /!*操作界面区*!/*/}
			</div>
		);
	}
}

export default Footer;