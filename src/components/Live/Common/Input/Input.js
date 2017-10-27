/**
 * 仿微信多行输入
 */
import React, {PureComponent} from 'react';
import classnames from 'classnames';

import './Styles.scss';

class Input extends PureComponent {

	render() {
		const classes = classnames("input-container g-flex", {[this.props.className]: true});

		return (
			<div className={classes}>
				<textarea
					rows={1}
					className="text-input g-black g-col-1 g-pd g-fs-34"
					placeholder={this.props.placeholder}
				/>
				<div className="_checkbox">
					<input id="question" type="checkbox" />
					<label htmlFor="question">提问</label>
				</div>
			</div>
		)
	}
}

export default Input;