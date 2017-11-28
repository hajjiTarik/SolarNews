import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { isEmpty, values } from 'lodash';

import ArchivedArticleItem from '../../components/ArchivedArticleItem';
import appConstants from '../../../config/appConstants';
import { setInCache, showCheckbox } from '../../../store/actions';
import { getFromStorage, removeDataFromStorage } from '../../utils/cacheManager';
import SavedHeader from './components/SavedHeader';

class Saved extends Component {

  constructor(props) {
    super(props);
    this.onReadMore = this.onReadMore.bind(this);
    this.removeAllArticlesHandler = this.removeAllArticlesHandler.bind(this);
    this.state = {
      articles: this.props.articlesFromLocalStore,
      refreshing: false,
      blockRefresh: false,
      checkboxVisibility: false
    };

    this.getArticleFromCache();
  }

  onReadMore(item) {
    this.props.navigation.navigate('ArticleDetails', item);
  }

  getArticleFromCache = async () => {
    try {
      const res = await getFromStorage(appConstants.ARTICLE_STORAGE);
      const savedArticles = !isEmpty(res) && res.hasOwnProperty(appConstants.ARTICLE_STORAGE)
        ? res[appConstants.ARTICLE_STORAGE]
        : {};
      this.props.setInCache(savedArticles);
      this.setState({
        articles: savedArticles
      });
    } catch (error) {
      alert(error);
    }
  };

  setSearchText = text => {
    let result = !isEmpty(this.state.articles) ? values(this.state.articles): [];

    if (text) {
      this.setState({
        blockRefresh: true
      });

      let filtredResult = result.filter((article) => {
        return article.title.toLowerCase().includes(text.toLowerCase());
      });

      if (filtredResult.length) {
        this.setState({
          articles: filtredResult
        });
      }
    } else {
      this.setState(() => ({
        articles: this.props.articlesFromLocalStore,
        blockRefresh: false
      }));
    }
  };

  async removeAllArticlesHandler() {
    await removeDataFromStorage(false, appConstants.ARTICLE_STORAGE);
    await this.getArticleFromCache();
  }

  handleCheckboxVisibility = () => {
    this.setState({
      checkboxVisibility: !this.state.checkboxVisibility,
    })
  };

  render() {
    const convertedData = values(this.state.articles).reverse();
    return (
      <View style={styles.contentContainer}>
        <SavedHeader
          removeAllArticlesHandler={this.removeAllArticlesHandler}
          handleCheckboxVisibility={this.handleCheckboxVisibility}
          handleSearchVisibility={this.handleSearchVisibility}
          setSearchText={this.setSearchText}
        />
        <FlatList
          data={convertedData}
          renderItem={({ item }) => {
            return <ArchivedArticleItem
              checkboxVisibility={this.state.checkboxVisibility}
              onReadMore={() => this.onReadMore(item)}
              article={item}
            />
          }}
          refreshing={this.state.refreshing}
          onRefresh={this.getArticleFromCache}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#fff',
    flex: 1
  },
});

const mapStateToProps = ({ appContentReducer, appReducer }) => ({
  articlesFromLocalStore: appContentReducer.articles,
  checkboxVisibility: appReducer.visible
});

const mapDispatchToProps = disptach => ({
  setInCache: bindActionCreators(setInCache, disptach),
  showCheckbox: bindActionCreators(showCheckbox, disptach)
});

export default connect(mapStateToProps, mapDispatchToProps)(Saved);