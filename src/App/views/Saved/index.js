import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { isEmpty, values } from 'lodash';

import ArchivedArticleItem from '../../components/ArchivedArticleItem';
import appConstants from '../../config/appConstants';
import { addToTMPList, persist, setInCache, setTmpArticleList, showCheckbox } from '../../store/actions';
import { getFromStorage, removeDataFromStorage } from '../../utils/cacheManager';
import SavedHeader from './components/SavedHeader';

class Saved extends Component {

  constructor(props) {
    super(props);
    this.onReadMore = this.onReadMore.bind(this);
    this.removeAllArticlesHandler = this.removeAllArticlesHandler.bind(this);
    this.removeHandler = this.removeHandler.bind(this);
    this.getArticleFromCache = this.getArticleFromCache.bind(this);
    this.state = {
      articles: this.props.articlesFromLocalStore,
      refreshing: false,
      blockRefresh: false,
      checkboxVisibility: false
    };
  }

  onReadMore(item) {
    this.props.navigation.navigate('ArticleDetails', item);
  }

  componentDidMount() {
    this.getArticleFromCache();
    this.triggerRefreshHandler();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  getArticleFromCache = async () => {
    try {
      const res = await getFromStorage(appConstants.ARTICLE_STORAGE);
      const savedArticles = !isEmpty(res) && res.hasOwnProperty(appConstants.ARTICLE_STORAGE)
        ? res[appConstants.ARTICLE_STORAGE]
        : {};
      this.props.setInCache(savedArticles);
      this.setState(() => ({
        articles: savedArticles
      }));
    } catch (error) {
      alert(error);
    }
  };

  setSearchText = text => {
    let result = !isEmpty(this.state.articles) ? values(this.state.articles) : [];

    if (text) {
      this.setState({
        blockRefresh: true
      });

      let filterResult = result.filter((article) => {
        return article.title.toLowerCase().includes(text.toLowerCase());
      });

      if (filterResult.length) {
        this.setState({
          articles: filterResult
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

  triggerRefreshHandler = () => {
    this.setState({
      articles: this.props.articlesFromLocalStore
    });
  };

  async removeHandler (){
    this.setState(() => ({
      articles: this.props.articlesFromLocalStore
    }));
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
          tmpArticle={this.props.tmpArticle}
          persist={this.props.persist}
          setTmpArticleList={this.props.setTmpArticleList}
          removeHandler={this.removeHandler}
        />
        <FlatList
          data={convertedData}
          renderItem={({ item }) => {
            return <ArchivedArticleItem
              checkboxVisibility={this.state.checkboxVisibility}
              onReadMore={() => this.onReadMore(item)}
              article={item}
              addToTMPList={this.props.addToTMPList}
              tmpArticle={this.props.tmpArticle}
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
    backgroundColor: '#f8f9fa',
    flex: 1
  },
});

const mapStateToProps = ({ appContentReducer, appReducer }) => ({
  articlesFromLocalStore: appContentReducer.articles,
  checkboxVisibility: appReducer.visible,
  tmpArticle: appReducer.tmpArticle
});

const mapDispatchToProps = dispatch => ({
  setInCache: bindActionCreators(setInCache, dispatch),
  showCheckbox: bindActionCreators(showCheckbox, dispatch),
  addToTMPList: bindActionCreators(addToTMPList, dispatch),
  persist: bindActionCreators(persist, dispatch),
  setTmpArticleList: bindActionCreators(setTmpArticleList, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Saved);