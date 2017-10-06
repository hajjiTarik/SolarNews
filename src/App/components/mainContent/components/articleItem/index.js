import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

import colors from '../../../../../design';
import SubListArticle from '../subListArticle';
export default class ArticleItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.articleContainer}>
        <View style={styles.header}>
          <Text style={styles.headerContent}>{this.props.article.source.name}</Text>
        </View>
        <Image
          resizeMode='cover'
          style={{ height: 120 }}
          source={{ uri: this.props.article.image.normal }}
        />
        <View style={styles.description}>
          <Text style={styles.descriptionTitle}>{this.props.article.title}</Text>
          <SubListArticle data={this.props.article.source} />
        </View>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  articleContainer: {
    margin: 5,
    backgroundColor: colors.backgroundLightColor,
    padding: 5,
    borderRadius: 4
  },
  article: {
    flex: 1,
    justifyContent: 'center',
    margin: 10
  },
  descriptionTitle: {
    color: colors.backgroundDarkColor,
    fontSize: 15,
    fontWeight: 'bold'
  },
  description: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  listArticle: {
    flex: 1,
    flexDirection: 'row'
  },
  iconContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'baseline',
    marginRight: 10
  },
  textListArticle: {
    color: colors.iconColor,
    paddingLeft: 5
  }
});
