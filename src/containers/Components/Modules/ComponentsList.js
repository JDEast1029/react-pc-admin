import React, { Component } from 'react';
// components
import Calendar from '../../../components/Components/Calendar/Calendar';
import LuckyWheel from '../../../components/Components/LuckyWheel/LuckyWheel';

class Container extends Component {
	constructor(props) {
		super(props);
		this.state = {
			position: 0,
			isComplete: false
		}
	}

	handleLoadData = () => {
		setTimeout(() => {
			this.setState({
				position: Math.floor(Math.random()*10),
				isComplete: true
			})
		}, 1000);
	}

	handleComplete = () => {
		this.setState({isComplete: false})
	}

	render() {
		const { position, isComplete } = this.state;
		console.log(position);
		
		return (
			<div>
				{/* <Calendar /> */}
				<LuckyWheel 
					onLoadData={this.handleLoadData}
					position={position}
					areaNum={7}
					cycle={10}
					isComplete={isComplete}
					onComplete={this.handleComplete}
				/>
			</div>
		);
	}
}

export default Container;