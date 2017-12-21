import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../../actions/login';
import * as types from '../../../contants/actionTypes/login';

class Login extends Component {
    constructor(props) {
		super(props);
		this.state = {
			count: 0
		};
		this.handleLogin = this.handleLogin.bind(this);
	}
	componentWillMount() {
		// this.setState({count: this.state.count + 1});
	}

	componentWillUpdate(nextProps, nextState) {
    	// this.setState({count: 3})
    	console.log(nextState, 1)
	}

	componentDidUpdate(prevProps, prevState) {
		console.log(prevState, 2)
		// console.trace()
	}

	componentDidMount() {
		// this.setState({count: this.state.count + 1});
		// console.trace()
		// 执行结果
		// {count: 1}
		// {count: 0} 2
		// {count: 1} 1
	}

    handleLogin() {
		this.setState({count: 1}); console.trace();
    }
	increment = (state, props) => {
		return {count: state.count + 1};
	};
	incrementMultiple() {
		this.setState(this.increment);
		this.setState(this.increment);
		this.setState({count: this.state.count + 1});
		this.setState(this.increment);
	}

    render() {
        const { loginReducer } = this.props;

        return (
            <div>
				<Link to={'/home'}>
					登录
				</Link>
				<div onClick={() => {
					// this.setState({count: this.state.count + 1});

					setTimeout(() => {
						this.setState({count: this.state.count + 1});
						console.trace()
					}, 100)
				}}>
					test
				</div>
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