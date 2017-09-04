import React, {Component} from 'react';
import {AppContainer} from 'react-hot-loader'; // AppContainer 是一个 HMR 必须的包裹(wrapper)组件
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from '../store/createStore';
import routes from './routes';

//style
import '../styles/reset.scss';
import '../styles/icon.scss';
import '../styles/color.scss';
import '../styles/spacing.scss';
import '../styles/font.scss';

const history = syncHistoryWithStore(browserHistory, store);

class App extends Component {
    render() {
        return (
            <AppContainer>
                <Provider store={store}>
                     <Router history={history} routes={routes} />
                </Provider>
            </AppContainer>
        );
    }
}

export default App;