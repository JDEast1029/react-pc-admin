/**
 * 日历Item
 */
import React, { Component } from 'react';
import classnames from 'classnames';

class Item extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { itemData } = this.props;

		return (
			<div className="g-col-1 g-text-c g-gray-1 g-flex-cc g-pd-tb _item">
				<div className="g-flex-cc g-flex-column">
					<p>{itemData.day}</p>
				</div>
			</div>
		);
	}
}

export default Item;
