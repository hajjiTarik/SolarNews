import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppState, Text } from 'react-native';
import {
  StatusBar,
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import PushNotification from 'react-native-push-notification';

import Menu from './components/menu';
import TopBar from './components/topBar';
import MainContent from './components/mainContent';
import { PushNotif } from './components/pushNotifications';
import  openMenu  from '../store/actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this._handleAppStateChange = this._handleAppStateChange.bind(this);

    this.state = {
      isOpen: false,
      appState: AppState.currentState
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  toggle() {
    this.props.openMenu(this.props.isOpen);
  }

  onMenuItemSelected = (item = '') =>
    this.setState({
      isOpen: false,
      selectedItem: item,
  });

  _handleAppStateChange = (appState) => {
    if (appState === 'background') {

      let date = new Date(Date.now() + (6 * 1000));

      PushNotification.localNotificationSchedule({
        message: "My Notification Message", // (required)
        date: date // in 60 secs
      })
    }
  }

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    return (
      <SideMenu
        menu={menu}
        isOpen={this.props.isOpen}
        disableGestures = {true}
      >
        <StatusBar hidden={true} />
        <TopBar toggle={this.toggle} />
        <MainContent />
        <PushNotif />
      </SideMenu>
  );
  }
}

const mapStateToProps = (state) => {
  console.log(state.menuReducer.isOpen);
  return {
    isOpen: state.menuReducer.isOpen,
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    openMenu: bindActionCreators(openMenu, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);