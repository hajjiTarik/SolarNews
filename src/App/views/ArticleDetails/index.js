import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WebView } from 'react-native';

class ArticleDetails extends Component {

  constructor(props){
    super(props);
  }

  render(){
    const {
      source
    } = this.props.navigation.state.params;
    return (
      <WebView
        source={{uri: source.targetUrl}}
      />
    )
  }
}

export default connect()(ArticleDetails);