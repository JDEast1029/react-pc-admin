import React, {Component} from 'react';
import {AppContainer} from 'react-hot-loader'; // AppContainer 是一个 HMR 必须的包裹(wrapper)组件

class App extends Component {
    render() {
        return (
            <AppContainer>
                <div>1111</div>
            </AppContainer>
        );
    }
}

export default App;