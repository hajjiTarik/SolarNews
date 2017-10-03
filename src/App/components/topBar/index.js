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
        <View>
          <Text style={styles.menuBurger} onPress={()=>this.props.toggle()}>Menu</Text>
        </View>
        <View>
          <Text style={styles.title}>toto</Text>
        </View>
        <View>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topBar: {
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
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  menuBurger: {
    paddingTop:20,
    alignItems: 'flex-end',
  },

  title: {
    alignItems: 'center',
  }
});