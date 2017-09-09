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
        let netParams = {
            type: types.LOGIN_GET,
            method: 'GET',
            params: {
                id: '123'
            },
            onSuccess: () => {
                this.props.actions.push('/home')
            },
            onError: () => {
                
            }
        };
        this.props.actions.request(netParams);
        
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