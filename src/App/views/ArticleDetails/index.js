import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WebView,Text, ActivityIndicator, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';


class ArticleDetails extends Component {

  constructor(props){
    super(props);
    this.state = { visible: true };
  }

  showSpinner() {
    console.log('Show Spinner');
    this.setState({ visible: true });
  }

  hideSpinner() {
    console.log('Hide Spinner');
    this.setState({ visible: false });
  }

  render(){
    const {
      source
    } = this.props.navigation.state.params;
    return (
      <view>
        <View><Text>Holo</Text></View>
        <View style={{backgroundColor: '#000', flex:1}}>
          <WebView
            source={{uri: source.targetUrl}}
            onLoadStart={() => (this.showSpinner())}
            onLoad={() => (this.hideSpinner())}
          />
          <Spinner
            visible={this.state.visible}
            textContent={'Loading...'}
            textStyle={{ color: '#000' }}
          />
        </View>
      </view>


    )
  }
}

export default connect()(ArticleDetails);