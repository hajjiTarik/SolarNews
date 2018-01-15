import React, { Component } from 'react';
import { DatePickerIOS, StyleSheet, Switch, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import constants from '../../../../config/appConstants';
import colors from '../../../../../design/index';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  onDateChange = date => {
    this.props.setNotificationDate(date);
    this.props.persist(constants.NOTIFICATION_DATE, date);
  };

  renderAlarm = () => {
    if (!this.props.toggleAlarm) return null;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' };

    return (
      <View style={styles.alarmContainer}>
        <Text style={styles.label}>
          Notification on :
          <Text style={{ color: colors.mainColor }}>{(new Date(this.props.notificationDate)).toLocaleDateString("en-US", options)}</Text>
        </Text>
        <DatePickerIOS
          date={new Date(this.props.notificationDate)}
          minimumDate={new Date()}
          mode="date"
          onDateChange={this.onDateChange}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.block}>
        <View>
          <Text style={styles.title}>Remember me to read :</Text>
          <Switch style={styles.switch} onValueChange={this.props.toggleAlarmAction}
                  value={this.props.toggleAlarm}/>
        </View>
        <Divider style={{ backgroundColor: '#dedede' }}/>
        {this.renderAlarm()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  block: {
    paddingTop: 20
  },
  alarmContainer: { paddingLeft: 10, paddingRight: 10 },
  label: { fontWeight: 'bold', fontSize: 12, paddingTop: 10, paddingBottom: 10 },
  title: {
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: 'bold',
    paddingLeft: 10,
    fontSize: 17,
    color: '#2c3137',
    fontFamily: 'AlegreyaSans-Medium',
    alignSelf: 'flex-start',
  },
  switch: {
    alignSelf: 'flex-start',
  }
});