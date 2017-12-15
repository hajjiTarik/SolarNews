import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { omit } from 'lodash';

import { getFromStorage, setInStorage } from '../../utils/cacheManager';
import appConstants from '../../config/appConstants';
import { setInCache } from '../../store/actions';

class AddToFav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logoType: 'heart-o',
      isSaved: false,
      refreshing: false,
    };

    this.addToFavHandler = this.addToFavHandler.bind(this);
    this.checkIfAleardySaved();
  }

  async checkIfAleardySaved() {
    const savedArticles = await getFromStorage(appConstants.ARTICLE_STORAGE);
    if (!Object.keys(savedArticles).length) return false;

    const savedArticle = savedArticles[appConstants.ARTICLE_STORAGE][this.props.params.state.params['_id']];

    this.setState(() => ({
      logoType: savedArticle ? 'heart' : 'heart-o',
    }));

    return savedArticle;
  }

  async addToFavHandler() {
    const savedArticles = await getFromStorage(appConstants.ARTICLE_STORAGE);
    const currentArticle = {
      [this.props.params.state.params['_id']]: this.props.params.state.params
    };
    const savedArticle = await this.checkIfAleardySaved();
    let newCache = null;

    try {
      if (!savedArticle) {
        newCache = await setInStorage(appConstants.ARTICLE_STORAGE,
          {
            ...savedArticles[appConstants.ARTICLE_STORAGE],
            ...currentArticle
          }
        )
      } else {
        newCache = omit(savedArticles[appConstants.ARTICLE_STORAGE], this.props.params.state.params['_id']);
        await setInStorage(appConstants.ARTICLE_STORAGE, newCache);
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
        <TouchableOpacity onPress={this.addToFavHandler}>
          <Icon name={this.state.logoType}
                type='font-awesome'
                color={"#fff"}
                size={25}
                style={styles.favIcon}
          />
        </TouchableOpacity>
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