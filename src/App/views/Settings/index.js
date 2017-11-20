import React, { Component } from 'react';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, ScrollView } from 'react-native';

import Sites from './components/Sites';
import FontSize from './components/FontSize';
import NotificationAlarm from './components/NotificationAlarm';
import DeleteAllSettings from './components/DeleteAllSettings';

import { persist } from '../../../store/actions';

import { setActiveSite, setNotificationDate, setFontSize } from '../../../store/actions';
import { getFromStorage } from '../../utils/cacheManager';
import constants  from '../../../config/appConstants';

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sites: this.props.activeSite,
      fontSize: this.props.fontSize,
      notificationDateValue: this.props.notificationDate
    }
  }

  async componentDidMount () {
    const fontSizeCached = await getFromStorage(constants.FONT_SIZE);
    const notificationDate = await getFromStorage(constants.NOTIFICATION_DATE);
    const sites = await getFromStorage(constants.SITES);

    this.setState(()=> ({
      fontSize: fontSizeCached.fontSize,

    }));
  }

  render() {
    console.log(this.state.fontSize);
    return (
      <ScrollView style={styles.sitesContainer}>
        <Sites
          activeSite={this.props.activeSite}
          setActiveSite={this.props.setActiveSite}
          persist={this.props.persist}
          defaultValue = {this.state.sites}
        />
        <FontSize
          fontSize={this.state.fontSize}
          setFontSize={this.props.setFontSize}
          persist={this.props.persist}
        />
        <NotificationAlarm
          notificationDate={this.props.notificationDate}
          setNotificationDate={this.props.setNotificationDate}
          persist={this.props.persist}
          defaultValue = {this.state.notificationDateValue}
        />
        <DeleteAllSettings />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  sitesContainer: {
    backgroundColor: '#FFF',
    paddingBottom: 60
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