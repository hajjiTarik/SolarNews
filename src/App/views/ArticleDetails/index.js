import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WebView,StyleSheet, ActivityIndicator, View } from 'react-native';


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
        <View style={{backgroundColor: '#000', flex:1}}>
          <WebView
            source={{uri: source.targetUrl}}
            onLoadStart={() => (this.showSpinner())}
            onLoad={() => (this.hideSpinner())}
          />

          <ActivityIndicator style={styles.loader} animating={this.props.isFetching}/>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  loader: {
    flex: 1
  }
});

export default connect()(ArticleDetails);