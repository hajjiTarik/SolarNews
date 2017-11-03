import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import colors from '../../../design';
import SubListArticle from './components/subListArticle';

import { articleSelector } from '../../selectors';

export default class ArticleItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      source,
      image
    }  =  articleSelector(this.props.article);

    return (
      <View style={styles.articleContainer}>
        <TouchableOpacity onPress={this.props.onReadMore}>
          <View style={styles.header}>
            <Text style={styles.source}>{this.props.article.source.name}</Text>
          </View>
          <Image
            resizeMode='cover'
            style={{ height: 120 }}
            source={{ uri: image.normal }}
          />
          <View style={styles.description}>
            <Text style={styles.descriptionTitle}>{title}</Text>
            <SubListArticle source={source}/>
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
    borderBottomWidth: 2,
    borderBottomColor: colors.clearColor,
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
    fontWeight: 'bold',
    color: '#393e42'
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
