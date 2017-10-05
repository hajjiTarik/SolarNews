import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import colors from '../../../../../design';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class extends Component {
  render() {
    console.log(Icon);
    return (
      <View style={styles.topBar}>
        <View style={styles.leftContainer}>
          <Text onPress={this.props.toggle()} style={[styles.text, {textAlign: 'left'}]}>
            {'<'}
          </Text>
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