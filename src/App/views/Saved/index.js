import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { isEmpty, values } from 'lodash';

import ArchivedArticleItem from '../../components/ArchivedArticleItem';
import InfoMessage from '../../components/InfoMessage';
import appConstants from '../../config/appConstants';
import { addToTMPList, persist, setInCache, setTmpArticleList, showCheckbox } from '../../store/actions';
import { getFromStorage, removeDataFromStorage } from '../../utils/cacheManager';
import SavedHeader from './components/SavedHeader';

class Saved extends Component {

  constructor(props) {
    super(props);

    this.state = {
      articles: this.props.articlesFromLocalStore,
      refreshing: false,
      blockRefresh: false,
      checkboxVisibility: false
    };

    this.onReadMore = this.onReadMore.bind(this);
    this.removeAllArticlesHandler = this.removeAllArticlesHandler.bind(this);
    this.removeHandler = this.removeHandler.bind(this);
    this.getArticleFromCache = this.getArticleFromCache.bind(this);
  }

  onReadMore(item) {
    this.props.navigation.navigate('ArticleDetails', item);
  }

  async componentWillReceiveProps(nextProps) {
    if (values(nextProps.articlesFromLocalStore).length !== values(this.props.articlesFromLocalStore).length) {
      await this.getArticleFromCache();
    }
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
    if (!text) {
      this.setState(() => ({
        articles: this.props.articlesFromLocalStore,
        blockRefresh: false
      }));

      return;
    }

    const articles = !isEmpty(this.state.articles) ? values(this.state.articles) : [];
    const filterResult = articles.filter((article) => article.title.toLowerCase().includes(text.toLowerCase()));

    this.setState({
      blockRefresh: true
    });

    if (isEmpty(filterResult)) {
      this.setState(() => ({
        articles: filterResult
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

  async removeHandler (){
    await this.getArticleFromCache();
    await this.getArticleFromCache(); // @todo to be performed
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
        <InfoMessage show={true} message="Please Pull to Refresh the list"/>
        <FlatList
          data={convertedData}
          renderItem={({ item }) => {
            return <ArchivedArticleItem
              checkboxVisibility={this.state.checkboxVisibility}
              onReadMore={() => this.onReadMore(item)}
              article={item}
              addToTMPList={this.props.addToTMPList}
              tmpArticle={this.props.tmpArticle}
              fontSize={this.props.fontSize}
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
  tmpArticle: appReducer.tmpArticle,
  fontSize: appReducer.fontSize
});

const mapDispatchToProps = dispatch => ({
  setInCache: bindActionCreators(setInCache, dispatch),
  showCheckbox: bindActionCreators(showCheckbox, dispatch),
  addToTMPList: bindActionCreators(addToTMPList, dispatch),
  persist: bindActionCreators(persist, dispatch),
  setTmpArticleList: bindActionCreators(setTmpArticleList, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Saved);