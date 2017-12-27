import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import PropTypes from 'prop-types';
import { getQuadratic, getY, getSpeed, getSpeedY } from './utils';
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
		this.start = false;
		this.count = 0;
		this.topPointer = {x: 0, y: 0};
		this.otherPointer = { x: 1000, y: 360};
		this.index = -1;           // 起点位置
		this.count = 7;            // 总共有多少个位置
		this.times = 0;            // 转动次数
		this.cycle = 50;           // 需要转动多少次才开始进入抽奖环节
		this.prize = -1;           // 中奖位置
	}

	handleStart = () => {
		if (!this.start) {
			this.count = 0;
			this.start = true;
			this.loadData();
			let quadratic = getQuadratic(this.topPointer, this.otherPointer);
			this.timer = setInterval(() => {
				this.count += 1;
				let rotateAngle = getY(quadratic, this.count * 10);
				if (rotateAngle > 360 ) {
					this.speed = getSpeed(quadratic, this.otherPointer);
					this.setState({angle: this.state.angle + getSpeedY(this.speed, 10)});
				} else {
					this.setState({angle: rotateAngle})
				}
			}, 10);
		}
	};

	handleStop = () => {
		this.start = false;
		this.timer && clearInterval(this.timer);
		console.log(this.count, this.state.angle)
	};

	loadData = () => {
		const { onLoadData } = this.props;
		if (onLoadData) {
			onLoadData();
		} else {
			setTimeout(() => {
				this.num = 3;
				this.handleStop();
			}, 3000);
		}
	};

	render() {
		const { chunkNum } = this.props;
		const { angle } = this.state;
		let chunkAngle = 360 / chunkNum;

		return (
			<div className="c-wheel-content">
				<img className="_bg" 
					src={TURNTABLE_BG}
				/>
				
				<img className="_turntable" 
				 	style={{
						transform: `rotate(${angle}deg)`
					}}
					src={TURNTABLE}
				/>
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