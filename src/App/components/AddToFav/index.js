import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { isInCache, removeOneItemFromStorage, setInStorage } from '../../utils/cacheManager';
import appConstants from '../../../config/appConstants';
import { setInCache } from '../../../store/actions';

class AddToFav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logoType: 'heart-o',
      isSaved: false
    };

    this.addToFavHandler = this.addToFavHandler.bind(this);
    this.checkIfAleardySaved();
  }

  async checkIfAleardySaved() {
    const savedArticle = await isInCache(appConstants.ARTICLE_STORAGE, this.props.params.state.params, '_id');
    this.setState(() => ({
      logoType: savedArticle ? 'heart' : 'heart-o',
    }));

  }

  async addToFavHandler() {
    const currentArticle = this.props.params.state.params;
    const savedArticle = await isInCache(appConstants.ARTICLE_STORAGE, this.props.params.state.params, '_id');
    let newCache = [];
    try {
      if (!savedArticle) {
        newCache = await setInStorage(appConstants.ARTICLE_STORAGE, currentArticle, '_id');
      } else {
        newCache = await removeOneItemFromStorage(appConstants.ARTICLE_STORAGE, currentArticle, '_id');
      }

      this.props.setInCache(newCache);
      await this.checkIfAleardySaved();

    } catch (error) {
      alert(error);
    }
  }

  render() {
    return (
      <View>
        <TouchableWithoutFeedback onPress={this.addToFavHandler}>
          <Icon name={this.state.logoType}
                type='font-awesome'
                color={"#fff"}
                size={25}
                style={styles.favIcon}
          />
        </TouchableWithoutFeedback>
      </View>
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