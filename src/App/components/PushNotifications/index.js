import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';

export class PushNotif extends Component {

  componentDidMount() {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
    });
  }

  render() {
    return null;
  }
}