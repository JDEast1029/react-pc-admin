import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../../actions/login';
import * as types from '../../../contants/actionTypes/login';

import ParticleAnimate from '../../../components/_common/ParticleAnimate/ParticleAnimate';

class Login extends Component {
    constructor(props) {
		super(props);
		this.handleLogin = this.handleLogin.bind(this);
	}

	componentDidMount() {
		// ParticleAnimate.init({
		// 	vx: 4,//点x轴速度,正为右，负为左
		// 	vy:  4,//点y轴速度
		// 	height: 2,//点高宽，其实为正方形，所以不宜太大
		// 	width: 2,
		// 	count: 100,//点个数
		// 	color: "121, 162, 185",//点颜色
		// 	stroke: "130,255,255",//线条颜色
		// 	dist: 6000,//点吸附距离
		// 	e_dist: 20000,//鼠标吸附加速距离
		// 	max_conn: 10//点到点最大连接数
		// })
	}

    handleLogin() {

    }

    render() {
        const { loginReducer } = this.props;

        return (
            <div>
				<Link to={'/home'}>
					登录
				</Link>
			</div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    loginReducer: state.loginReducer,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators(actions, dispatch)
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);