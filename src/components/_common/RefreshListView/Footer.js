/**
 * Created by AT on 2017/10/27.
 */
import React, { Component } from 'react';
import { RefreshState, FooterStateText} from './Constants';

class Footer extends Component {

	render() {
		const { state, onFooterRefresh } = this.props;

		switch (state) {
			case RefreshState.FOOTER_REFRESHING:
				return <div className="g-text-c g-pd-s">{FooterStateText.REFRESHING}</div>;
			case RefreshState.FAILURE:
				return (
					<div
						className="g-text-c g-pd-s"
						onClick={() => {onFooterRefresh(RefreshState.FOOTER_REFRESHING)}}
					>
						{FooterStateText.FAILURE}
					</div>
				);
			case RefreshState.NO_MORE_DATA:
				return <div className="g-text-c g-pd-s">{FooterStateText.NO_MORE_DATA}</div>;
			case RefreshState.IDLE:
			default:
				return <div/>;
		}
	}
}

export default Footer;