import React, { Component } from 'react';
import { View, Text, StyleSheet, DatePickerIOS } from 'react-native';
import { Divider } from 'react-native-elements';

export default class extends Component {
  constructor(props){
    super(props);
  }

  onDateChange = date => {
    this.props.setNotificationDate(date);
  };


  render () {
    return (
      <View style={styles.block} >
        <Text style={styles.title}>Remember me to read :</Text>
        <Divider style={{ backgroundColor: '#dedede' }} />
        <View style={{paddingLeft:10, paddingRight:10}}>
          <Text style={{fontWeight: 'bold', fontSize: 12, paddingTop: 10, paddingBottom: 10}}>
            Notification on : {this.props.notificationDate.toString()}
          </Text>
          <DatePickerIOS
            date={this.props.notificationDate}
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
  }
});