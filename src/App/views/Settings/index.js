import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ScrollView, StyleSheet } from 'react-native';
import Sites from './components/Sites';
import FontSize from './components/FontSize';
import NotificationAlarm from './components/NotificationAlarm';
import {
  persist,
  setActiveSite,
  setDefaultSettings,
  setFontSize,
  setNotificationDate,
  toggleAlarmAction
} from '../../store/actions';
import { getFromStorage } from '../../utils/cacheManager';
import constants from '../../config/appConstants';

class Settings extends Component {

  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    const fontSizeCached = await getFromStorage(constants.FONT_SIZE);
    const notificationDateCached = await getFromStorage(constants.NOTIFICATION_DATE);
    const sitesCached = await getFromStorage(constants.SITES);

    this.props.setActiveSite(sitesCached[constants.SITES] || this.props.activeSite);
    this.props.setFontSize(fontSizeCached[constants.FONT_SIZE] || this.props.fontSize);
    this.props.setNotificationDate(notificationDateCached[constants.NOTIFICATION_DATE] || this.props.notificationDate);
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
          toggleAlarm={this.props.toggleAlarm}
          toggleAlarmAction={this.props.toggleAlarmAction}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  sitesContainer: {
    backgroundColor: '#f8f9fa',
    paddingBottom: 60
  }
});

const mapStateToProps = ({ appReducer }) => {
  return {
    activeSite: appReducer.activeSite,
    notificationDate: appReducer.notificationDate,
    fontSize: appReducer.fontSize,
    toggleAlarm: appReducer.toggleAlarm
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveSite: bindActionCreators(setActiveSite, dispatch),
    setNotificationDate: bindActionCreators(setNotificationDate, dispatch),
    setFontSize: bindActionCreators(setFontSize, dispatch),
    persist: bindActionCreators(persist, dispatch),
    setDefaultSettings: bindActionCreators(setDefaultSettings, dispatch),
    toggleAlarmAction: bindActionCreators(toggleAlarmAction, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);