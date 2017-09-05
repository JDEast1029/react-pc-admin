import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/login';
import * as types from '../../../contants/actionTypes/login';

//Test
import NetStates from 'components/_common/NetStates/NetStates';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        // let netParams = {
        //     type: types.LOGIN_GET,
        //     method: 'get',
        //     params: {
        //         id: '123'
        //     },
        // };
        // this.props.actions.request(netParams);
        this.props.actions.push('#/home')
    }

    render() {
        const { loginReducer } = this.props;

        return (
            <NetStates netState={loginReducer.netState}>
                <p onClick={this.handleLogin}>
                    登录
                </p>
            </NetStates>
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