import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Icon } from 'react-native-elements';

export default class extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{padding:10}}>
        <Icon name='clone' type='font-awesome' color='#fff' size={25}/>
      </View>
    );
  }
}
