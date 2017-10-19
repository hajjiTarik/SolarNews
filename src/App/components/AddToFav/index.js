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
      logoType: 'evilicon',
      isSaved: false
    }
    this.checkIfAleardySaved();
  }

  async checkIfAleardySaved() {
    const currentArticle = this.props.params.state.params;
    const res = await AsyncStorage.getItem(appConstants.ARTICLE_STORAGE);
    let result = res ? JSON.parse(res) : [];

    const savedArticle = result.find(article => {
      return article._id === currentArticle._id;
    });

    console.log(savedArticle);

    this.setState(()=>({
      savedArticle: savedArticle,
      logoType: !!savedArticle ? 'font-awesome' : 'evilicon',
      result
    }));
  }

  async addToFavHandler() {
    const res = await AsyncStorage.getItem(appConstants.ARTICLE_STORAGE);
    let result = res ? JSON.parse(res) : [];
    const currentArticle = this.props.params.state.params;


    try {
      if(!this.state.savedArticle) {
        let newResult = result;
        newResult.unshift(currentArticle);
        await AsyncStorage.setItem(appConstants.ARTICLE_STORAGE, JSON.stringify(newResult));
        this.props.setInCache(newResult);

      }else{
        let newResult = result.filter(article =>{
          return article._id !== currentArticle._id;
        });

        await AsyncStorage.setItem(appConstants.ARTICLE_STORAGE, JSON.stringify(newResult));

        this.props.setInCache(newResult);

      }
      this.checkIfAleardySaved();

    } catch (error) {
      alert(error);
    }
  }

  render() {
    return (
      <Icon onPress={this.addToFavHandler}
            name={'heart'}
            type= {this.state.logoType}
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