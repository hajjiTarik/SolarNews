import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';

import colors from '../../../design';


export default class extends Component {
  render() {
    return (
      <View style={styles.topBar}>
        <View style={styles.leftContainer}>
          <TouchableHighlight onPress={this.props.toggle}>
            <Image
              style={{marginTop:3, marginLeft:15, width: 40, height: 40}}
              source={require('../../../assets/menu-icon.png')}
            />
          </TouchableHighlight>
        </View>
        <Text style={styles.text}>
          News
        </Text>
        <View style={styles.rightContainer}>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topBar: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.backgroundDarkColor,
    shadowOpacity: 0.75,
    shadowRadius: 3,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
    zIndex: 99,
  },
  text: {
    color: colors.backgroundLightColor,
    fontSize: 16,
    fontWeight: 'bold'
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  rightIcon: {
    height: 10,
    width: 10,
    backgroundColor: 'white',
  }
});