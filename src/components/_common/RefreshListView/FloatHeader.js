/**
 * 悬浮的下拉刷新样式
 */
import React, {Component} from 'react';
import classnames from 'classnames';
const fontSize=(window.getComputedStyle(document.documentElement)['fontSize']).slice(0, -2);
const btnHeight=1.5 * parseInt(fontSize);
const radius = 0.3 * parseInt(fontSize);

class FloatHeader extends Component {

	render() {
		const {height, refreshState} = this.props;
		let angle = height * 180 / (radius * Math.PI);
		return (
			<div className="refresh-float g-flex g-pd"
				 style={{
					 transform: `translateY(${height - btnHeight}px)`,
				 }}
			>
				<div ref='header' className="g-flex refresh-btn">
					<i className={classnames("iconfont icon-refresh g-blue g-fs-60", {
						'g-rotate': refreshState === 1
					})}
					   style={{
						   transform: `rotate(${angle}deg)`
					   }}
					/>
				</div>
			</div>
		)
	}
}

export default FloatHeader;
