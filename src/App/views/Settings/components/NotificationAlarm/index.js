import React, { Component } from 'react';
import { DatePickerIOS, StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import constants from '../../../../../config/appConstants';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  onDateChange = date => {
    this.props.setNotificationDate(date);
    this.props.persist(constants.NOTIFICATION_DATE, date);
  };

  render() {
    return (
      <View style={styles.block}>
        <Text style={styles.title}>Remember me to read :</Text>
        <Divider style={{ backgroundColor: '#dedede' }}/>
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 12, paddingTop: 10, paddingBottom: 10 }}>
            Notification on : {this.props.notificationDate.toString()}
          </Text>
          <DatePickerIOS
            date={new Date(this.props.notificationDate)}
            minimumDate={new Date()}
            mode="date"
            onDateChange={this.onDateChange}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  block: {
    paddingTop: 20
  },
  title: {
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: 'bold',
    paddingLeft: 10,
    fontSize: 17,
    color: '#2c3137',
    fontFamily: 'AlegreyaSans-Medium'
  }
});