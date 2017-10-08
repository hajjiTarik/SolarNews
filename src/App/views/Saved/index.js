import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

class Saved extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <View>
        <Text>Hello this is Saved page</Text>
      </View>
    )
  }
}

export default connect()(Saved);