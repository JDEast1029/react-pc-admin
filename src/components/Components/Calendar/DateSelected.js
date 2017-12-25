import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pureRender from '../../../utils/pure-render-decorator';
import moment from 'moment';
import { DatePicker } from 'antd-mobile';
import SelectMonth from './SelectMonth';

@pureRender
class DateSelected extends Component {

	constructor(props) {
		super(props);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handlePickerChange = this.handlePickerChange.bind(this);
	}

	componentWillMount() {
		this.getCurrentDate();

		this.state = {
			dpValue: this.currentDate || null
		};
	}

	/**
	 * 获取当前年月
	 */
	getCurrentDate() {
		let date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth()+1;// 0-11, 0为1月份
		if (month < 10 && month > 0) {
			month = '0' + month;
		} else if (month === 0) {
			year -= 1;
			month = 12;
		}
		this.currentDate = moment(`${year}.${month}`, 'YYYY年MM月').utcOffset(8);
	}

	/**
	 * 日期改变后的回调
	 */
	handleDateChange(date) {
		const { onChangeDate } = this.props;
		let dateArr = date.split('.');

		this.setState({
			dpValue: moment(`${dateArr[0]}.${dateArr[1]}`, 'YYYY年MM月').utcOffset(8)
		});

		onChangeDate && onChangeDate(`${dateArr[0]}-${dateArr[1]}`);
	}

	/**
	 * 日期选择器改变后的回调
	 * @param v
	 */
	handlePickerChange(v) {
		this.setState({ dpValue: v });

		let date = v['_d'];
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		if (month < 10) {
			month = '0' + month;
		}
		this.handleDateChange(`${year}-${month}`);
	}

	render() {
		return (
			<div className="g-reset g-bg-white g-flex-cc"
				style={{ borderBottom: '1px solid  #e7e7e7', lineHeight: '0.88rem' }}>
				<DatePicker
					mode="month"
					title="选择日期"
					extra="请选择"
					format={val => val.format('YYYY年MM月')}
					value={this.state.dpValue}
					onChange={this.handlePickerChange}
				>
					<SelectMonth onChange={this.handleDateChange} />
				</DatePicker>
			</div>
		);
	}
}

DateSelected.propTypes = {
	onReload: PropTypes.func             // 日期切换后的回调
};

export default DateSelected;
