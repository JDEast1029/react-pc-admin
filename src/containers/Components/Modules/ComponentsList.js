import React, { Component } from 'react';
// components
import Calendar from '../../../components/Components/Calendar/Calendar';
import LuckyWheel from '../../../components/Components/LuckyWheel/LuckyWheel';

class Container extends Component {
	render() {
		return (
			<div>
				{/* <Calendar /> */}
				<LuckyWheel	/>
			</div>
		);
	}
}

export default Container;