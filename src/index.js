import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppState, StatusBar, View } from 'react-native';
import { PushNotif } from './App/components/pushNotifications';
import PushNotification from 'react-native-push-notification';

import App from './App';
import CreateStore from './store';

const store = new CreateStore();

export default class extends Component {

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (appState) => {
    if (appState === 'background') {

      let date = new Date(Date.now() + (6 * 1000 * 60 * 24));

      PushNotification.localNotificationSchedule({
        message: "New Article ",
        date // in 60 secs
      })
    }
  }

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}