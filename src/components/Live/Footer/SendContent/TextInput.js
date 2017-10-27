/**
 * Created by Administrator on 2017/10/20.
 */
import React, { PureComponent } from 'react';
//components
import Input from '../../Common/Input/Input';

class TextInput extends PureComponent {
	render() {
		return (
			<div className="g-flex g-white g-pd">
				<Input
					className="g-col-1 g-m-r"
					placeholder={this.props.placeholder || "请输入内容"}
				/>
				<p className="btn-adapt">发送</p>
			</div>
		)
	}
}

export default TextInput;