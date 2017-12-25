/**
 * 月份选择器
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import pureRender from '../../../utils/pure-render-decorator';

@pureRender
class SelectMonth extends Component {

	constructor(props) {
		super(props);
		this.handleSwitchPrev = this.handleSwitch.bind(this, 'prev');
		this.handleSwitchNext = this.handleSwitch.bind(this, 'next');
	}

	/**
	 * 切换时间的回调
	 * @param type
	 */
	handleSwitch(type) {
		const { onChange, extra } = this.props;
		let year = parseInt(extra.substring(0, 4));
		let month = parseInt(extra.substring(5, 7));
		if (type === 'prev') {
			if (month - 1 <= 0) {
				year -= 1;
				month = 12;
			} else {
				month -= 1;
			}
			if (month < 10) {
				month = '0' + month;
			}
			onChange(`${year}.${month}`);
		} else {
			if (month === 12) {
				year += 1;
				month = 1;
			} else {
				month += 1;
			}
			if (month < 10) {
				month = '0' + month;
			}
			onChange(`${year}.${month}`);
		}
	}

	render() {
		const { extra, onClick } = this.props;
		return (
			<div className="g-flex">
				<i className="iconfont icon-right g-gray-1"
				   onClick={this.handleSwitchPrev}
				/>
				<span onClick={onClick} className="g-fs-30 g-text-c"
					  style={{ width: '3.2rem' }}
				>{extra}</span>
				<i className="iconfont icon-left g-gray-1"
				   onClick={this.handleSwitchNext}
				/>
			</div>
		);
	}
}

export default SelectMonth;
