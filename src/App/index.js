import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs } from './router';
import { PushNotif } from './components/PushNotifications/index';
import { AppState, StatusBar } from 'react-native';
import PushNotification from 'react-native-push-notification';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (appState) => {
    if (appState === 'background') {

      let date = new Date(Date.now() + (6 * 1000));

      PushNotification.localNotificationSchedule({
        message: "New Article ",
        date // in 60 secs
      })
    }
  }

  render() {
    return [
      <StatusBar
        barStyle="light-content"
      />,
      <Tabs />,
      <PushNotif/>
    ];
  }
}
export default connect()(App);