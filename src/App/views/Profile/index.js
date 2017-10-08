import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

class Profile extends Component {

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

export default connect()(Profile);