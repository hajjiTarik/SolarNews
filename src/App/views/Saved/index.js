import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { bindActionCreators } from 'redux';

import ArchivedArticleItem from '../../components/ArchivedArticleItem';
import appConstants from '../../../config/appConstants';
import { setInCache } from '../../../store/actions';
import { getFromStorage, removeDataFromStorage } from '../../utils/cacheManager';

class Saved extends Component {

  constructor(props) {
    super(props);
    this.onReadMore = this.onReadMore.bind(this);
    this.getArticleFromCache = this.getArticleFromCache.bind(this);
    this.removeAllArticlesHandler = this.removeAllArticlesHandler.bind(this);
    this.state = {
      articles: this.props.articlesFromLocalStore,
      refreshing: false,
    }
  }

  componentDidMount() {
    this.getArticleFromCache();
  }

  onReadMore(item) {
    this.props.navigation.navigate('ArticleDetails', item);
  }

  async getArticleFromCache() {
    try {
      const res = await getFromStorage(appConstants.ARTICLE_STORAGE);
      this.props.setInCache(res);

      this.setState({
        articles: res
      });
    } catch (error) {
      alert(error);
    }
  }

  setSearchText(text) {
    let result = this.state.articles;
    if (text) {
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
        articles: this.props.articlesFromLocalStore
      }));
    }
  }

  async removeAllArticlesHandler() {
    await removeDataFromStorage(appConstants.ARTICLE_STORAGE);
    await this.getArticleFromCache();
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        <View>
          <SearchBar
            lightTheme
            onChangeText={this.setSearchText.bind(this)}
            placeholder='Search...'/>
        </View>
        <View style={styles.optionMenu}>
          <Text onPress={() => this.removeAllArticlesHandler()}>Remove All</Text>
          <Text>Select</Text>
        </View>
        <FlatList
          data={this.state.articles}
          renderItem={({ item }) => {
            return <ArchivedArticleItem onReadMore={() => this.onReadMore(item)} article={item}/>
          }}
          refreshing={this.state.refreshing}
          onRefresh={() => this.getArticleFromCache()}
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

  nbArticles: {
    color: '#fff'
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 5,
    paddingLeft: 10,
    borderRadius: 50
  },
  optionMenu: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#e0f3f9'
  }
});

const mapStateToProps = ({ appContentReducer }) => ({
  articlesFromLocalStore: appContentReducer.articles
})

const mapDispatchToProps = disptach => ({
  setInCache: bindActionCreators(setInCache, disptach)
})

export default connect(mapStateToProps, mapDispatchToProps)(Saved);