import React, { Component } from 'react';
import { View } from 'react-native';
import { AdMobBanner } from 'react-native-admob';

export default class AdvertisementBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: false
    }
  }

  bannerErrorHandler = (e) => {
    console.log(e);
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState(() => ({
        hide: true
      }));
    }, 20000);
  }

  render() {
    if (this.props.hide && this.state.hide) return null;
    return (
      <View>
        <AdMobBanner
          adSize="fullBanner"
          adUnitID={this.props.adUnitID}
          onAdFailedToLoad={this.bannerErrorHandler}
        />
      </View>
    );
  }
}
