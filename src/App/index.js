import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs } from './router';
import { PushNotif } from './components/PushNotifications/index';
import { AppRegistry, AppState, StatusBar } from 'react-native';
import PushNotification from 'react-native-push-notification';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    console.log('App', this.props.notificationDate);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (appState) => {
    if (appState === 'background' && this.props.notificationDate) {

      let date = this.props.notificationDate;

      PushNotification.localNotificationSchedule({
        message: "New Article ",
        date
      })
    }
  };

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

const mapStateToProps = ({ appReducer }) => ({
  notificationDate: appReducer.notificationDate
});


AppRegistry.registerComponent('App', () => App );

export default connect(mapStateToProps)(App);