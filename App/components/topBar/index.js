import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class extends Component {
  render() {
    return (
      <View style={styles.topBar}>
        <Text onPress={()=>this.props.toggle()}>toto</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topBar: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    flex: 1,
    zIndex: 10,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    height:'10%',
    right: 0,
    left: 0,
    width: '100%',
    paddingTop: 10
  }
});