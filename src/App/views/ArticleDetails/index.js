import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, StyleSheet, View, WebView } from 'react-native';
import AdvertisementBanner from '../../components/AdvertisementBanner';
import AdConfig from '../../config/adsConfig';


class ArticleDetails extends Component {

  constructor(props) {
    super(props);
    this.state = { visible: true };
  }

  showSpinner() {
    this.setState({ visible: true });
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

  render() {
    const {
      source
    } = this.props.navigation.state.params;

    return (
      <View style={{ backgroundColor: '#000', flex: 1 }}>
        <WebView
          source={{ uri: source.targetUrl }}
          onLoadStart={() => (this.showSpinner())}
          onLoad={() => (this.hideSpinner())}
        />
        <ActivityIndicator style={styles.loader} animating={this.state.visible}/>
        <AdvertisementBanner adUnitID={AdConfig.banner.detailsAdID} hide={true} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loader: {
    width: 60,
    height: 60,
    position: 'absolute',
    top: 50,
    left: 150,
    zIndex: 999,
  }
});

export default connect()(ArticleDetails);