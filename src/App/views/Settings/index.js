import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';

class Settings extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <View>
        <Text>Hello this is settings page</Text>
      </View>
    )
  }
}

export default connect()(Settings);