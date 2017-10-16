import React, { Component } from 'react';
import { Link } from 'react-router';

class Home extends Component {
  render() {
    return <Link to="/main">main</Link>;
  }
}

export default Home;
