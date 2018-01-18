import React, { Component } from 'react';
import ArticleItem from '../ArticleItem';
import ArchivedArticleItem from '../ArchivedArticleItem';

export default class FullArticleItem extends Component {
  constructor(props) {
    super(props);
    this.onReadMore = this.onReadMore.bind(this);
  }

  onReadMore(item) {
    this.props.navigation.navigate('ArticleDetails', item);
  }

  render() {
    const { article, fontSize, typeOfArticle } = this.props;
    return typeOfArticle ?
      <ArticleItem onReadMore={() => this.onReadMore(article)} article={article}
                   fontSize={fontSize}/>

      : <ArchivedArticleItem onReadMore={() => this.onReadMore(article)} article={article}
                             fontSize={fontSize}/>
  }
}