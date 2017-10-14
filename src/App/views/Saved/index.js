import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, FlatList, StyleSheet, View, Text } from 'react-native';
import ArchivedArticleItem from '../../components/ArchivedArticleItem';
import { bindActionCreators } from 'redux';

import appConstants from '../../../config/appConstants';
import { setInCache } from '../../../store/actions';

class Saved extends Component {

  constructor(props) {
    super(props);
    this.onReadMore = this.onReadMore.bind(this);
    this.getArticleFromCache = this.getArticleFromCache.bind(this);
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
    } catch (error) {
      alert(error);
    }
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        <View>
          <Text>{this.props.articlesFromLocalStore.length}</Text>
        </View>
        <FlatList
          data={this.props.articlesFromLocalStore}
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
});

const mapStateToProps = ({ appContentReducer }) => ({
  articlesFromLocalStore: appContentReducer.articles
})

const mapDispatchToProps = disptach => ({
  setInCache: bindActionCreators(setInCache, disptach)
})

export default connect(mapStateToProps, mapDispatchToProps)(Saved);