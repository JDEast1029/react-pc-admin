/**
 * 直播界面
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/test';
import * as types from '../../../contants/actionTypes/test';

//component
import Header from '../../../components/Live/Header/Header';
import Main from '../../../components/Live/Main/Main';
import Footer from '../../../components/Live/Footer/Footer';
import QuestionArea from '../../../components/Live/FloatView/QuestionArea';
import DiscussArea from '../../../components/Live/FloatView/DiscussArea';
import OptionBtn from '../../../components/Live/FloatView/OptionBtn';
import DiscussPop from '../../../components/Live/DiscussPop/DiscussPop';
import QuestionPop from '../../../components/Live/QuestionPop/QuestionPop';
//style
import '../../../components/Live/Live.scss';

class LiveMain extends Component {

	render() {
		const {
			testReducer,
			actions
		} = this.props;

		return (
			<div className="wya-live flex-body">
				<Header />               {/*头部信息*/}

				<div className="flex-main">
					                     {/*聊天内容*/}
					<Main
						testReducer={testReducer}
						actions={actions}
					/>

					<OptionBtn />        {/*操作按钮*/}
					<DiscussArea />      {/*讨论区按钮*/}
					<QuestionArea />     {/*问题区按钮*/}

					{/*<DiscussPop />       /!*讨论区弹出框*!/*/}

					{/*<QuestionPop />      /!*问题区弹出框*!/*/}
				</div>

				<Footer />               {/*包括输入和option界面*/}
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	testReducer: state.testReducer,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
	actions: bindActionCreators(actions, dispatch)
});


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LiveMain);