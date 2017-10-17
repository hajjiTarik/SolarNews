import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, FlatList, StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { bindActionCreators } from 'redux';

import ArchivedArticleItem from '../../components/ArchivedArticleItem';
import appConstants from '../../../config/appConstants';
import { setInCache } from '../../../store/actions';

class Saved extends Component {

  constructor(props) {
    super(props);
    this.onReadMore = this.onReadMore.bind(this);
    this.getArticleFromCache = this.getArticleFromCache.bind(this);
    this.state = {
      articles : this.props.articlesFromLocalStore
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
      const res = await AsyncStorage.getItem(appConstants.ARTICLE_STORAGE);
      let result = res ? JSON.parse(res) : [];
      this.props.setInCache(result);

      this.setState({
        articles: result
      });
    } catch (error) {
      alert(error);
    }
  }

  setSearchText(text){
    let result = this.state.articles;
    if(text){
      let filtredResult = result.filter((article) => {
        return article.title.toLowerCase().includes(text.toLowerCase());
      });

      if( filtredResult.length ) {
        this.setState({
          articles: filtredResult
        });
      }
    } else {

      this.setState(()=> ({
        articles: this.props.articlesFromLocalStore
      }));
    }
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.savedSubMenu}>
          <SearchBar
            lightTheme
            round
            onChangeText={this.setSearchText.bind(this)}
            placeholder='Search...' />
        </View>

        <FlatList
          data={this.state.articles}
          renderItem={({ item }) => {
            return <ArchivedArticleItem onReadMore={() => this.onReadMore(item)} article={item}/>
          }}
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
});

const mapStateToProps = ({ appContentReducer }) => ({
  articlesFromLocalStore: appContentReducer.articles
})

const mapDispatchToProps = disptach => ({
  setInCache: bindActionCreators(setInCache, disptach)
})

export default connect(mapStateToProps, mapDispatchToProps)(Saved);