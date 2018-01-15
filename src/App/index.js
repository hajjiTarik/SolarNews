import React, { Component } from 'react';
import { AppRegistry, AppState, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Tabs } from './router';
import PushNotification from 'react-native-push-notification';
import { PushNotif } from './components/PushNotifications';

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
    if(!this.props.toggleAlarm) return;

    if (appState === 'background' && this.props.notificationDate && this.props.toggleAlarm) {
      let date = this.props.notificationDate;
      PushNotification.localNotificationSchedule({
        message: "Its time to read some Articles",
        date
      });
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
  notificationDate: appReducer.notificationDate,
  toggleAlarm: appReducer.toggleAlarm
});


AppRegistry.registerComponent('App', () => App);

export default connect(mapStateToProps)(App);