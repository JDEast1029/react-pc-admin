/**
 * 日历
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import { Motion, spring } from 'react-motion';
import MonthPane from './MonthPane';
import './Styles.scss';

class Calendar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			move: props.moveDistance
		};
		this.paneSort = [0, 1, 2];
	}

	componentWillReceiveProps(nextProps) {
		// if (nextProps.moveDistance != this.props.moveDistance) {
		// 	this.setState({move: nextProps.moveDistance});
		// }
	}

	renderPane = () => {
		const { calendarData, actions, onChangeSignStatus } = this.props;
		// const { move } = this.state;
		let panes = [];
		// if (move > 0) { // 往左
		// 	this.paneSort.unshift(this.paneSort.pop());
		// } else if (move < 0) { // 往右
		// 	this.paneSort.push(this.paneSort.shift());
		// }
		for (let i = 0; i < this.paneSort.length; i++) {
			panes[i] = (
				<MonthPane
					key={i}
					calendarData={calendarData[i]}
					actions={actions}
					onChangeSignStatus={onChangeSignStatus}
				/>
			);
		}
		return panes;
	}

	render () {
		const { moveDirection } = this.props;
		return (
			<div className="c-calendar" style={{ overflowX: 'hidden' }}>
				<div className="_header g-flex-ac">
					<span className="g-col-1 g-text-c">日</span>
					<span className="g-col-1 g-text-c">一</span>
					<span className="g-col-1 g-text-c">二</span>
					<span className="g-col-1 g-text-c">三</span>
					<span className="g-col-1 g-text-c">四</span>
					<span className="g-col-1 g-text-c">五</span>
					<span className="g-col-1 g-text-c">六</span>
				</div>
				<div className={classnames(
					"g-flex-ac _calendar_main"
				)}>
					{this.renderPane()}
				</div>
			</div>
		);
	}
}

export default Calendar;
