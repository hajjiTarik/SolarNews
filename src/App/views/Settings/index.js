import React, { Component } from 'react';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, View, StyleSheet, ScrollView, DatePickerIOS } from 'react-native';
import { CheckBox, Divider } from 'react-native-elements';

import config from '../../../config/apiConfig';
import { setActiveSite, setNotificationDate } from '../../../store/actions';

class Settings extends Component {

  constructor(props) {
    super(props);
    this.renderSitesList = this.renderSitesList.bind(this);
    this.state = {
      activeSite: this.props.activeSite,
    }
  }

  getSite = source => {
    this.props.setActiveSite(source.id);
  };

  renderSitesList = () => {
    const listSource = config.sites;
    return listSource.map((source) => {
      return <View>
          <CheckBox
            style={styles.sitesListCheckbox}
            center
            title={source.name}
            checked={source.id === this.props.activeSite}
            onPress={() => this.getSite(source)}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
          />
      </View>
    })
  };

  onDateChange = date => {
    this.setState({date: date});
    this.props.setNotificationDate(date);
  };

  render() {
    return (
      <ScrollView style={styles.sitesContainer}>
        <View style={{ paddingLeft:10, paddingRight: 0 }}>
          <Text style={styles.title}>Choose source site :</Text>
          <Divider style={{ backgroundColor: '#dedede' }} />
          {this.renderSitesList()}
        </View>

        <View style={{ paddingLeft:10, paddingRight: 0 }}>
          <Text style={styles.title}>Remember me to read :</Text>
          <Divider style={{ backgroundColor: '#dedede' }} />
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
  sitesListCheckbox: {
    alignSelf: 'flex-start',
    paddingTop: 10,
    paddingBottom: 10,
    padding:0,
  },

  title: {
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({ appReducer })=> {
  return {
    activeSite: appReducer.activeSite,
    notificationDate: appReducer.notificationDate
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveSite: bindActionCreators(setActiveSite, dispatch),
    setNotificationDate: bindActionCreators(setNotificationDate, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);