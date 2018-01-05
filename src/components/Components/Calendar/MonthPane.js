import React, { PureComponent } from 'react';
import Item from './Item';

const rowNumber = 6;
const colNumber = 7;

class MonthPane extends PureComponent {
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

	render() {
		let table = [];
		for (let i = 0; i < rowNumber; i++) {
			table[i] = this.renderRow(i + 1);
		}

		return (
			<div className="g-flex-ac g-bg-white g-flex-column g-col-1">
				{table}
			</div>
		);
	}
}

export default MonthPane;