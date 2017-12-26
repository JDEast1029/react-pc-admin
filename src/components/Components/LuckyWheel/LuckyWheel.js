import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import PropTypes from 'prop-types';
import './Styles.scss';

const TURNTABLE_BG = "http://www.jq22.com/demo/jquery-cj-150310213714/images/turntable-bg2.png";
const TURNTABLE = "http://www.jq22.com/demo/jquery-cj-150310213714/images/turntable2.png";
const POINTER = "http://www.jq22.com/demo/jquery-cj-150310213714/images/pointer.png";

class LuckyWheel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			angle: 0
		}
	}

	handleStart = () => {
		this.setState({angle: 360 * 10})
	};

	handleStop = () => {

	};

	loadData = () => {

	};

	render() {
		const { chunkNum } = this.props;
		const { angle } = this.state;
		let chunkAngle = 360 / chunkNum;
		console.log(this.state.angle)

		return (
			<div className="c-wheel-content">
				<img className="_bg" 
					src={TURNTABLE_BG}
				/>
				
				<Motion style={{angle: spring(angle)}}>
					{({angle}) => 
					 	<img className="_turntable" 
						 	style={{
								transform: `rotate(${angle}deg)`
					 		}}
							src={TURNTABLE}
						/>
					}
				</Motion>
				<img className="_pointer" 
					onClick={this.handleStart}
				 	src={POINTER}
				/> 
			</div>
		);
	}
}

LuckyWheel.propTypes = {
	chunkNum: PropTypes.number,           // 格子数目
};

LuckyWheel.defaulType = {
	chunkNum: 8,
}

export default LuckyWheel;