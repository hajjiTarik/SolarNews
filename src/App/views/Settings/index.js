import React, { Component } from 'react';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, View, StyleSheet, ScrollView, DatePickerIOS } from 'react-native';
import { Divider, Slider } from 'react-native-elements';

import ChooseSites from '../../components/ChooseSites';
import { setActiveSite, setNotificationDate, setFontSize } from '../../../store/actions';
import config from '../../../design';

class Settings extends Component {

  constructor(props) {
    super(props);
  }

  onDateChange = date => {
    this.props.setNotificationDate(date);
  };

  render() {
    return (
      <ScrollView style={styles.sitesContainer}>
        <ChooseSites />
        <View style={styles.block} >
          <Text style={styles.title}>Remember me to read :</Text>
          <Divider style={{ backgroundColor: '#dedede' }} />
          <View style={{alignItems: 'stretch', justifyContent: 'center', flex:1, paddingLeft:10, paddingRight:10}}>
            <Slider
              value={this.props.fontSize}
              onValueChange={(value) => this.props.setFontSize(value)}
              minimumValue={10}
              maximumValue={18}
              thumbTintColor={config.skyBlueColor}
              maximumTrackTintColor="#F4F4F4"
              minimumTrackTintColor={config.clearColor}
            />
            <Text>Selected value: {Math.floor(this.props.fontSize)}px</Text>
            <Text style={{paddingTop: 20,fontSize: Math.floor(this.props.fontSize), color: config.clearColor}}>This example text</Text>
          </View>
        </View>

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
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  sitesContainer: {
    backgroundColor: '#FFF',
    marginBottom: 10,
    padding:0
  },
  block: {
    paddingTop: 20
  },
  sitesListCheckbox: {
    alignSelf: 'flex-start',
    paddingTop: 10,
    paddingBottom: 10,
    padding:0,
  },

  title: {
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: 'bold',
    paddingLeft: 10,
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
    setFontSize: bindActionCreators(setFontSize, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);