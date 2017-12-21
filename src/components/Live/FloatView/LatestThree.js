/**
 * 最近三条讨论
 */
import React, { Component } from 'react';
import classnames from 'classnames';

const list = [
	{
		content: '11111'
	},
	{
		content: '22222'
	},
	{
		content: '2222222222222'
	}
];

class LatestThree extends Component {
	// let list = props.list || [];
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			animateClass: ''
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ list: list, animateClass: 'slide-up' });
		}, 2000);
	}

	render() {
		let classes = classnames('latest', this.state.animateClass);

		return (
			<ul className={classes}>
				{
					this.state.list.map((item, index) => {
						return (
							<li key={index} className="discuss-item">
								<span className="g-white">{item.content}</span>
							</li>
						);
					})
				}
			</ul>
		);
	}
}

export default LatestThree;