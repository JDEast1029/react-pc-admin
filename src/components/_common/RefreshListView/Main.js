/**
 * Created by Administrator on 2017/10/27.
 */
import React, { Component } from 'react';

class Main extends Component {
	render() {
		const { renderItem, data } = this.props;

		return (
			<div className="g-flex-column">
				{data.map((item, index) => {
					return renderItem(item, index)
				})}
			</div>
		)
	}
}

export default Main;