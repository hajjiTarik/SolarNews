import React from 'react';
import { Header } from 'react-navigation';
import { View } from 'react-native';

export default props => (
  <View style={{ backgroundColor: '#6d3cc6' }}>
    <Header {...props} style={{ backgroundColor: 'transparent' }}/>
  </View>
);