import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../../actions/login';
import * as types from '../../../contants/actionTypes/login';

class Login extends Component {
    constructor(props) {
		super(props);
		this.handleLogin = this.handleLogin.bind(this);
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