import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppState, StatusBar, StyleSheet, TabBarIOS } from 'react-native';
import PushNotification from 'react-native-push-notification';
import Home from './views/Home';
import { PushNotif } from './components/pushNotifications';
import { openMenu } from '../store/actions';
import icons from '../assets/imageBase64';
import Profile from './views/Profile';
import Saved from './views/Saved';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this._handleAppStateChange = this._handleAppStateChange.bind(this);

    this.state = {
      isOpen: false,
      appState: AppState.currentState,
      selectedTab: 'Home'
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
      <TabBarIOS selectedTab={this.state.selectedTab}>
        <StatusBar hidden={true}/>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'Home'}
          title="Home"
          icon={{uri: icons.homeIcon, scale:9}}
          onPress={() => {
            this.setState({
              selectedTab: 'Home'
            })
          }}
        >
          <Home />
        </TabBarIOS.Item>


        <TabBarIOS.Item
          selected={this.state.selectedTab === 'Saved'}
          title="Saved"
          icon={{uri: icons.heartIcon, scale:7}}
          onPress={() => {
            this.setState({
              selectedTab: 'Saved'
            })
          }}
        >
          <Profile />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          selected={this.state.selectedTab === 'Profile'}
          title="Profile"
          icon={{uri: icons.profileIcon, scale:5}}
          onPress={() => {
            this.setState({
              selectedTab: 'Profile'
            })
          }}
        >
          <Profile />
        </TabBarIOS.Item>
        <PushNotif />
      </TabBarIOS>
    );
  }
}

const mapStateToProps = (state) => ({
  isOpen: state.menuReducer.isOpen,
});

const mapDispatchToProps = (dispatch) => {
  return {
    openMenu: bindActionCreators(openMenu, dispatch),
  }
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: '#FFF'
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);