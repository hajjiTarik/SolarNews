import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeArticleDisposition } from '../../../store/actions';

class OrderType extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{padding:10}}>
        <TouchableOpacity onPress={this.props.changeArticleDisposition}>
          <Icon name='clone' type='font-awesome' color='#fff' size={20}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeArticleDisposition: bindActionCreators(changeArticleDisposition, dispatch)
  }
};

export default connect(null, mapDispatchToProps)(OrderType)