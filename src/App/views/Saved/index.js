import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { Icon } from 'react-native-elements';

import ArchivedArticleItem from '../../components/ArchivedArticleItem';
import appConstants from '../../../config/appConstants';
import { setInCache, showCheckbox } from '../../../store/actions';
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
      searchVisibility: true,
      blockRefresh: false
    }
  }

  componentDidMount() {
    this.getArticleFromCache();
  }

  onReadMore(item) {
    this.props.navigation.navigate('ArticleDetails', item);
  }

  async getArticleFromCache() {
    if(this.state.blockRefresh) return;
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

  }

  async removeAllArticlesHandler() {
    await removeDataFromStorage(appConstants.ARTICLE_STORAGE);
    await this.getArticleFromCache();
  }

  handleSearchVisibility = () => {
    this.setState({
      searchVisibility: !this.state.searchVisibility
    });
  }

  handleCheckboxVisibility = () => {
    this.props.showCheckbox(!this.props.checkboxVisibility);
  };

  renderSearchBlock  = () => {
    if(this.state.searchVisibility) return;
    return(
      <View>
        <SearchBar
          DarkTheme
          onChangeText={this.setSearchText.bind(this)}
          placeholder='Search...'/>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.optionMenu}>
          <Icon style={styles.searchContainer} onPress={this.handleSearchVisibility} name="search" type='font-awesome' size={28} color='#fff'/>
          <Text style={styles.selectArticle} onPress={this.handleCheckboxVisibility}>Select All</Text>
          <Icon style={styles.removeAll} onPress={this.removeAllArticlesHandler} name="trash" type='font-awesome' size={28} color='#fff'/>
        </View>
        {this.renderSearchBlock()}
        <FlatList
          data={this.state.articles}
          renderItem={({ item }) => {
            return <ArchivedArticleItem onReadMore={() => this.onReadMore(item)} article={item}/>
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

  nbArticles: {
    color: '#fff'
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 5,
    paddingLeft: 10,
    borderRadius: 50,
    width:240
  },
  optionMenu: {
    padding: 10,
    backgroundColor: '#99d3f7',
    flexDirection: 'row',
  },
  removeAll: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width:50
  },
  selectArticle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width:80
  },
  searchContainer: {
    flexDirection: 'row', alignItems: 'flex-start',
    width:250
  }
});

const mapStateToProps = ({ appContentReducer, appReducer }) => ({
  articlesFromLocalStore: appContentReducer.articles,
  checkboxVisibility: appReducer.visible
})

const mapDispatchToProps = disptach => ({
  setInCache: bindActionCreators(setInCache, disptach),
  showCheckbox: bindActionCreators(showCheckbox, disptach)
})

export default connect(mapStateToProps, mapDispatchToProps)(Saved);