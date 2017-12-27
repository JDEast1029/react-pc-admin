import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import PropTypes from 'prop-types';
import { getQuadratic, getY, getSpeed, getSpeedY, easyIn } from './utils';
import './Styles.scss';

const TURNTABLE_BG = "http://www.jq22.com/demo/jquery-cj-150310213714/images/turntable-bg2.png";
const TURNTABLE = "http://www.jq22.com/demo/jquery-cj-150310213714/images/turntable2.png";
const POINTER = "http://www.jq22.com/demo/jquery-cj-150310213714/images/pointer.png";

class LuckyWheel extends Component {
	static propTypes = {
		position: PropTypes.number,      // 起点位置
		areaNum: PropTypes.number,       // 区域数
		cycle: PropTypes.number,         // 需要转动多少次才开始进入抽奖环节
	};

	static defaultProps = {
		position: 0,
		areaNum: 7,
		cycle: 10
	};

	constructor(props) {
		super(props);
		this.state = {
			angle: 0
		};
		this.topPointer = {x: 0, y: 0};
		this.otherPointer = { x: 1000, y: 360};
		this.time = 0;
		this.speed = 0;
		this.isComplete = false;
	}

	// 开始旋转
	handleStart = () => {
		const { position, areaNum } = this.props;
		let offsetAngle = 360 - (position / areaNum * 360);
		this.otherPointer.y = 360 * 3 + offsetAngle;
		this.handleRoll();
	};

	// 旋转动画
	handleRoll = () => {
		let quadratic = getQuadratic(this.topPointer, this.otherPointer);
		this.speed = getSpeed(quadratic, this.otherPointer);
		let rotateAngle = getY(quadratic, this.time);
		if (this.time <= 1000) {
			requestAnimationFrame(() => {
				this.time += 10;
				this.setState({angle: rotateAngle % 360})
				this.handleRoll()
			});
		} else if (rotateAngle >= this.otherPointer.y) {
			let newAngle = this.state.angle + parseInt(getSpeedY(this.speed, 10).toFixed(0));
			console.log(newAngle)
			requestAnimationFrame(() => {
				this.setState({angle: (newAngle > 360 ? 360 : newAngle) % 360});
				this.handleRoll()
			});
			// console.log(this.state.angle)
		}
	}

	// 停止旋转
	handleStop = (position) => {
		// console
	};

	// 获取获奖结果
	loadData = () => {
		setTimeout(() => {
			this.handleStop(5)
		}, 3000);
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