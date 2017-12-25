/**
 * 日历
 */
import React, { Component } from 'react';
import Item from './Item';
import './Styles.scss';

const rowNumber = 6;
const colNumber = 7;

class Calendar extends Component {

	renderRow = (rowNum) => {
		const { calendarData, actions, onChangeSignStatus } = this.props;
		let rowData = calendarData.slice((rowNum - 1) * 7, rowNum * 7);

		return (
			<div key={rowNum} className="g-flex-ac g-white _border-line" style={{ width: '100%' }}>
				{
					rowData.map((item, index) => {
						return (
							<Item
								key={rowNum + "" + index}
								actions={actions}
								itemData={item}
								onChangeSignStatus={onChangeSignStatus}
							/>
						);
					})
				}
			</div>
		);
	};

	renderCalendar = () => {
		let table = [];
		for (let i = 0; i < rowNumber; i++) {
			table[i] = this.renderRow(i + 1);
		}

		return (
			<div className="g-flex-ac g-bg-white g-flex-column g-col-1">
				{table}
			</div>
		);
	};

	render () {
		return (
			<div className="c-calendar" style={{overflowX: 'hidden'}}>
				<div className="_header g-flex-ac">
					<span className="g-col-1 g-text-c">日</span>
					<span className="g-col-1 g-text-c">一</span>
					<span className="g-col-1 g-text-c">二</span>
					<span className="g-col-1 g-text-c">三</span>
					<span className="g-col-1 g-text-c">四</span>
					<span className="g-col-1 g-text-c">五</span>
					<span className="g-col-1 g-text-c">六</span>
				</div>
				<div className="g-flex-ac" style={{
					transform: `translateX(-${window.innerWidth}px)`,
					width: '300%'
				}}>
					<div className="g-flex-ac g-bg-white g-flex-column g-col-1"></div>
					{ this.renderCalendar() }
					<div className="g-flex-ac g-bg-white g-flex-column g-col-1"></div>
				</div>
			</div>
		);
	}
}

export default Calendar;
