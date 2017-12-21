/**
 * Created by Administrator on 2017/10/20.
 */
import React, { Component } from 'react';
// components
import SourceRecord from './SendContent/SourceRecord';
import TextInput from './SendContent/TextInput';
import Media from './SendContent/Media';
import Material from './SendContent/Material';

class SendContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectItem: ''
		};
		this.handleSelectSource = this.handleSelect.bind(this, 'source');
		this.handleSelectText = this.handleSelect.bind(this, 'text');
		this.handleSelectMedia = this.handleSelect.bind(this, 'media');
		this.handleSelectMaterial = this.handleSelect.bind(this, 'material');
	}

	handleSelect(type) {

		this.setState({ selectItem: type === this.state.selectItem ? '' : type });
	}

	renderOptionView() {
		switch (this.state.selectItem) {
			case 'source':
				return <SourceRecord/>;
			case 'text':
				return <TextInput/>;
			case 'media':
				return <Media/>;
			case 'material':
				return <Material/>;
			default:
				return null;
		}
	}

	render() {
		return (
			<div className="send-container">
				<ul className="g-flex g-light-white">
					<li className="g-flex-column g-col-1 g-pd-tb-10"
						onClick={this.handleSelectSource}
					>
						<i className="iconfont icon-record-voice" />
						<span>录音</span>
					</li>
					<li className="g-flex-column g-col-1"
						onClick={this.handleSelectText}
					>
						<i className="iconfont icon-text"/>
						<span>文字</span>
					</li>
					<li className="g-flex-column g-col-1"
						onClick={this.handleSelectMedia}
					>
						<i className="iconfont icon-media"/>
						<span>媒体库</span>
					</li>
					<li className="g-flex-column g-col-1"
						onClick={this.handleSelectMaterial}
					>
						<i className="iconfont icon-material"/>
						<span>素材</span>
					</li>
				</ul>

				{/* 操作具体页面*/}
				{this.renderOptionView()}
			</div>
		);
	}
}

export default SendContent;