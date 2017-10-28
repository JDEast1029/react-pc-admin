/**
 * Created by AT on 2017/10/27.
 */
import React, { Component } from 'react';

class Header extends Component {

	render() {
		const { height=0 } = this.props;

		return (
			<div style={{
				height: height,
				position: 'relative',
				overflow: 'hidden'
			}}>
				<div ref='header' className="g-flex" style={{position: 'absolute', bottom: 0}}>正在加载。。。</div>
			</div>
		)
	}
}

export default Header;