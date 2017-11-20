import React, { Component } from 'react';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, ScrollView } from 'react-native';

import Sites from './components/Sites';
import FontSize from './components/FontSize';
import NotificationAlarm from './components/NotificationAlarm';
import { persist } from '../../../store/actions';

import { setActiveSite, setNotificationDate, setFontSize } from '../../../store/actions';

class Settings extends Component {

  constructor(props) {
    super(props);
  }

  getSettingsFromCache () {

  }

  render() {
    return (
      <ScrollView style={styles.sitesContainer}>
        <Sites
          activeSite={this.props.activeSite}
          setActiveSite={this.props.setActiveSite}
          persist={this.props.persist}
        />
        <FontSize
          fontSize={this.props.fontSize}
          setFontSize={this.props.setFontSize}
          persist={this.props.persist}
        />
        <NotificationAlarm
          notificationDate={this.props.notificationDate}
          setNotificationDate={this.props.setNotificationDate}
          persist={this.props.persist}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  sitesContainer: {
    backgroundColor: '#FFF',
    marginBottom: 10,
    padding:0
  }
});

const mapStateToProps = ({ appReducer })=> {
  return {
    activeSite: appReducer.activeSite,
    notificationDate: appReducer.notificationDate,
    fontSize: appReducer.fontSize
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveSite: bindActionCreators(setActiveSite, dispatch),
    setNotificationDate: bindActionCreators(setNotificationDate, dispatch),
    setFontSize: bindActionCreators(setFontSize, dispatch),
    persist: bindActionCreators(persist, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);