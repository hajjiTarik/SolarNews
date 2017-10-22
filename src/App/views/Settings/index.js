import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';

import config from '../../../config/apiConfig';

class Settings extends Component {

  constructor(props){
    super(props);
    this.renderList = this.renderList.bind(this);
  }

  renderList = () => {
    const listSource = config.sites;
    console.log(listSource);
    return listSource.map((source) => {
       return <CheckBox
        center
        title={source.name}
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checked={false}
      />
    })
  }

  render(){
    return (
      <View>
        <Text>Hello this is settings page</Text>
        {this.renderList()}

      </View>
    )
  }
}

export default connect()(Settings);