import React from 'react';
import { Header } from 'react-navigation';
import { View } from 'react-native';
import colors from '../../../design';

export default props => (
  <View style={{ backgroundColor: colors.mainColor }}>
    <Header {...props} style={{ backgroundColor: 'transparent' }}/>
  </View>
);