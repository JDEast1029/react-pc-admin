/**
 * Created by Administrator on 2017/10/19.
 */
import React, { Component } from 'react';
import LatestThree from './LatestThree';

class DiscussArea extends Component {
	render() {
		return (
			<div className="discuss-container">
				<LatestThree/>
				<p className="btn-discuss">讨论区</p>
			</div>
		);
	}
}

export default DiscussArea;