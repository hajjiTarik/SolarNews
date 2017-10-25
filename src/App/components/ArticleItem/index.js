import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import colors from '../../../design';
import SubListArticle from './components/subListArticle';

export default class ArticleItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.articleContainer}>
        <TouchableOpacity onPress={this.props.onReadMore}>
          <View style={styles.header}>
            <Text style={styles.source}>{this.props.article.source.name}</Text>
          </View>
          <Image
            resizeMode='cover'
            style={{ height: 120 }}
            source={{ uri: this.props.article.image.normal }}
          />
          <View style={styles.description}>
            <Text style={styles.descriptionTitle}>{this.props.article.title}</Text>
            <SubListArticle data={this.props.article.source}/>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  articleContainer: {
    margin: 5,
    backgroundColor: '#fff',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.iconColor,
  },
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1d1',
  },
  descriptionTitle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  description: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  source: {
    fontStyle: 'italic',
    color: '#595959',
    fontSize: 12
  }
});
