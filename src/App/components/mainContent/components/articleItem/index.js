import React, { Component } from 'react';
import { View, Image, Text, ListView, StyleSheet } from 'react-native';
import colors from '../../../../../design';
export default class ArticleList extends Component {

  constructor(props) {
    super(props);
    this.renderArticle = this.renderArticle.bind(this);
  }

  renderArticle() {
    if(!this.props.articles) return;
    const result = this.props.articles;
    return result.map((article, index) =>
      <View style={styles.article}>
        <Text style={styles.title}>{article.title}</Text>
      </View>
    );
  }


  render() {
    return <View style={styles.articleContainer}>
      {this.renderArticle()}
    </View>

  }
}

const styles = StyleSheet.create({
  articleContainer: {
    margin: 10,
    backgroundColor: colors.backgroundLightColor
  },
  article: {
    flex: 1,
    justifyContent: 'center',
    margin: 10
  },
  title: {
    color: colors.backgroundDarkColor,
    fontSize: 15
  }
});
