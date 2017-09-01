import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/login'

//Test
import NetStates from 'components/_common/NetStates/NetStates';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        let netParams = {
            url: '/login',
            method: 'get',
            params: {
                id: '123'
            },
        }
        this.props.actions.request(netParams);
    }

    render() {
        return (
            <div onClick={this.handleLogin}>
                登录
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