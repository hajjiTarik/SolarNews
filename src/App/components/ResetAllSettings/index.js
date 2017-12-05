import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { removeDataFromStorage } from '../../utils/cacheManager';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setDefaultSettings } from '../../../store/actions';

class ResetAllSettings extends Component {

  constructor (props){
    super(props);
  }

  deleteAllSettingsHandler = () => {
    if(!this.props.keys.length) return;

    this.props.keys.map(async (key) => {
      await removeDataFromStorage(false, key);
    });

    this.props.setDefaultSettings();
  };

  render () {

    return (
      <View>
        <Text
          style={styles.activeType}
          onPress={this.deleteAllSettingsHandler}
        >Reset Settings
        </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  activeType: {
    color: '#fff',
    fontWeight: 'bold',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#421372',
    opacity: 0.8,
    fontSize: 12
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
    setDefaultSettings: bindActionCreators(setDefaultSettings, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetAllSettings);