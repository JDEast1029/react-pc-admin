import React, { Component } from 'react';
// components
import DateSelected from './DateSelected';
import CalendarTable from './CalendarTable';

class Calendar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: []
		};
		this.direcrion = '';
		this.lastSelectedDate = '';
	}

	
	componentWillMount() {
		this.getCalendars();
	}

	getCalendars = (selectedDate) => {
		let date, 
			year, lastYear, nextYear,
			month, lastMonth, nextMonth;
		if (!selectedDate) {
			date = new Date();
			year = date.getFullYear();
			month = parseInt(date.getMonth() + 1);// 0-11, 0为1月份
		} else {
			date = selectedDate.split('-');
			year = parseInt(date[0]);
			month = parseInt(date[1]);
		}

		if (!selectedDate) {
			date = new Date();
			year = date.getFullYear();
			month = parseInt(date.getMonth() + 1);// 0-11, 0为1月份
		} else {
			date = selectedDate.split('-');
			year = parseInt(date[0]);
			month = parseInt(date[1]);
		}
		if (selectedDate) {
			if (Date.parse(selectedDate) > Date.parse(this.lastSelectedDate)) {
				this.direcrion = 'right';
			} else if (Date.parse(selectedDate) < Date.parse(this.lastSelectedDate)) {
				this.direcrion = 'left';
			}
		}
		this.lastSelectedDate = `${year}-${month}`;

		lastYear = year;
		nextYear = year;
		lastMonth = month - 1;
		nextMonth = month + 1;

		if (month === 1) {
			lastYear = year - 1;
			lastMonth = 12;
		} else if (month === 12) {
			nextYear = year + 1;
			nextMonth = 1;
		}

		this.setState({
			date: [
				this.getCalendarArray(`${lastYear}-${lastMonth}`),
				this.getCalendarArray(`${year}-${month}`),
				this.getCalendarArray(`${nextYear}-${nextMonth}`),
			]
		});
	}
	

	getCalendarArray = (selectedDate) => {
		let date, 
			year, lastYear, nextYear,
			month, lastMonth, nextMonth,
			lastMonthArray, currentMonthArray, nextMonthArray;

		if (!selectedDate) {
			date = new Date();
			year = date.getFullYear();
			month = parseInt(date.getMonth() + 1);// 0-11, 0为1月份
		} else {
			date = selectedDate.split('-');
			year = parseInt(date[0]);
			month = parseInt(date[1]);
		}

		lastYear = year;
		nextYear = year;
		lastMonth = month - 1;
		nextMonth = month + 1;

		if (month === 1) {
			lastYear = year - 1;
			lastMonth = 12;
		} else if (month === 12) {
			nextYear = year + 1;
			nextMonth = 1;
		}

		lastMonthArray = this.createDaysArray(lastYear, lastMonth, this.getMonthDays(lastYear, lastMonth), this.getMonthType(lastYear, lastMonth));
		currentMonthArray = this.createDaysArray(year, month, this.getMonthDays(year, month), this.getMonthType(year, month));
		nextMonthArray = this.createDaysArray(nextYear, nextMonth, this.getMonthDays(nextYear, nextMonth), this.getMonthType(nextYear, nextMonth));

		// 生成日历数组
		let firstWeek = this.getWeek(`${year}-${this.formatNum(month)}-1`); // 本月第一天是星期几
		let dateArray = [
			...lastMonthArray.slice(lastMonthArray.length - (firstWeek === 0 ? 7 : firstWeek), lastMonthArray.length),
			...currentMonthArray,
			...nextMonthArray.slice(0, 42 - firstWeek - currentMonthArray.length)
		];
		return dateArray;
	}

	// 创建每个月天数的数组
	createDaysArray = (year, month, days, type) => {
		let array = [];
		for (let i = 0; i < days; i++) {
			let item = {};
			item.dateName = `${year}-${this.formatNum(month)}-${this.formatNum(i + 1)}`;
			item.day = i + 1;
			item.type = type;
			array.push(item);
		}
		return array;
	}

	// 获取某月的天数
	getMonthDays = (year, month) => {
		let day = new Date(year, month, 0);
		return day.getDate();
	};

	// 是当前月份还是上一月
	getMonthType = (year, month) => {
		let date = new Date();
		let currentYear = date.getFullYear();
		let currentMonth = parseInt(date.getMonth() + 1);// 0-11, 0为1月份
		if (month < currentMonth && year <= currentYear) {
			return 'last';
		} else if (year == currentYear && month == currentMonth) {
			return 'current';
		} else if ((year == currentYear && month > currentMonth) || year > currentYear) {
			return 'next';
		}
		return '';
	};

	// 小于10的数字前面加0
	formatNum = (num) => {
		if (num < 10) {
			return '0' + num;
		}
		return num;
	};

	// 根据日期判断是星期几
	getWeek = (dateString) => {
		let date;
		if (!dateString) {
			date = new Date();
		} else {
			let dateArray = dateString.split('-');
			date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
		}

		// return "星期" + "日一二三四五六".charAt(date.getDay());
		return date.getDay();
	};

	getMoveDistance = () => {
		if (this.direcrion === 'right') {
			return -window.innerWidth;
		} else if (this.direcrion === 'left') {
			return window.innerWidth;
		}
		return 0;
	};

	render() {
		const { onChangeDate } = this.props;
		const { date } = this.state;

		return (
			<div>
				<DateSelected
					onChangeDate={this.getCalendars}
				/>
				<CalendarTable
					calendarData={date}
					moveDirection={this.direcrion}
					moveDistance={this.getMoveDistance()}
				/>
			</div>
		);
	}
}

export default Calendar;