import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import PropTypes from 'prop-types';
import { getQuadratic, getY, getSpeed, getSpeedY } from './utils';
import './Styles.scss';

const TURNTABLE_BG = "http://www.jq22.com/demo/jquery-cj-150310213714/images/turntable-bg2.png";
const TURNTABLE = "http://www.jq22.com/demo/jquery-cj-150310213714/images/turntable2.png";
const POINTER = "http://www.jq22.com/demo/jquery-cj-150310213714/images/pointer.png";

const LUCKY_WHEEL_IDEL = 0;
const LUCKY_WHEEL_LOADING = 1;

class LuckyWheel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			angle: 0
		}
		this.index = -1;       // 起点位置
		this.count = 7;        // 总共有多少个位置
		this.minSpeed = 20;    // 转盘最慢速度  deg/ms
		this.speed = 20;       // 初始转动速度  deg/ms
		this.maxSpeed = 5;     // 转盘最快速度  deg/ms
		this.acceleration = 0.2; // 加速度
		this.times = 0;        // 转动次数
		this.cycle = 10;       // 需要转动多少次才开始进入抽奖环节
		this.prize = -1;       // 中奖位置
		this.status = LUCKY_WHEEL_IDEL;
	}

	// 转盘复位
	handleStart = () => {
		let { angle } = this.state;
		let currentAngle = angle;
		if (angle > 360) {
			currentAngle = angle % 360;
		}
		if (currentAngle > 0 && currentAngle < 360 && this.index !== -1) { // 将转盘恢复到起点位置
			setTimeout(() => {
				let newAngle = angle + 10;
				this.setState({angle: newAngle >= 360 ? 0 : newAngle});
				if (angle >= 360 || angle == 0) {
					this.index = -1;
				}
				this.handleStart();
			}, this.speed)
		} else if (angle == 0) {
			this.handleRoll();
		}
	};

	// 开始旋转
	handleRoll = () => {
		let { angle } = this.state;

		if (this.times === this.cycle * 36 && this.status != LUCKY_WHEEL_LOADING) {
			this.loadData();
		} else if (this.times > this.cycle * 36 && this.status === LUCKY_WHEEL_IDEL && angle == 0) {
			this.handleStop(this.index);
			return;
		}
		
		setTimeout(() => {
			this.speed -= this.acceleration;
			this.times += 1;
			if (this.speed < this.maxSpeed) {this.speed = this.maxSpeed}
			let newAngle = angle + 10;
			this.setState({angle: newAngle >= 360 ? 0 : newAngle});
			this.handleRoll();
		}, this.speed);
	}

	// 停止旋转
	handleStop = (position) => {
		const { onSuccess } = this.props;
		const { angle } = this.state;
		let finalAngleRange = [
			(position - 1) / this.count * 360 + 720, 
			position / this.count * 360 + 720
		];

		if (angle > finalAngleRange[0] && angle < finalAngleRange[1]) {
			this.times = 0;
			this.speed = 20;
			this.status = LUCKY_WHEEL_IDEL;
			console.log(this.state.angle);
			onSuccess && onSuccess();
			return;
		}
		console.log(this.speed)
		setTimeout(() => {
			this.speed += this.acceleration;
			this.times += 1;
			if (this.speed > this.minSpeed) {this.speed = this.minSpeed}
			let newAngle = angle + 10;
			this.setState({angle: newAngle});
			this.handleStop(position);
		}, this.speed);
	};

	// 获取获奖结果
	loadData = () => {
		const { onLoadData } = this.props;
		this.status = LUCKY_WHEEL_LOADING;
		if (onLoadData) {
			onLoadData();
		} else {
			setTimeout(() => {
				this.index = 5;
				this.status = LUCKY_WHEEL_IDEL;
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