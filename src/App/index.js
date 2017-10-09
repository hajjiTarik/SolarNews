import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs } from './config/router';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tabs />
    );
  }
}
export default connect()(App);