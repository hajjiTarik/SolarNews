import React, { Component } from 'react';
import { AsyncStorage, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import appConstants from '../../../config/appConstants';
import { setInCache } from '../../../store/actions';

class AddToFav extends Component {
  constructor(props) {
    super(props);
    this.addToFavHandler = this.addToFavHandler.bind(this);
    this.state = {
      logoType: 'heart-o'
    }
  }

  async addToFavHandler() {
    try {
      const res = await AsyncStorage.getItem(appConstants.ARTICLE_STORAGE);
      let result = res ? JSON.parse(res) : [];
      result.unshift(this.props.params.state.params);
      await AsyncStorage.setItem(appConstants.ARTICLE_STORAGE, JSON.stringify(result));
      this.props.setInCache(result);
      this.setState({
        logoType: 'font-awesome'
      })
    } catch (error) {
      alert(error);
    }
  }

  render() {
    return (
      <Icon onPress={this.addToFavHandler}
            name={this.state.logoType}
            type= 'font-awesome'
            color={"#fff"}
            size={33}
            style={styles.favIcon}
      />
    )
  }
}

const styles = StyleSheet.create({
  favIcon: {
    paddingRight: 10
  }
});

const mapDispatchToProps = disptach => ({
  setInCache: bindActionCreators(setInCache, disptach)
});

export default connect(null, mapDispatchToProps)(AddToFav);