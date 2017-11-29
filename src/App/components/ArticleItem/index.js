import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { articleSelector } from '../../selectors';
import SubListArticle from '../SubListArticle';

export default class ArticleItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      image,
      source
    } = articleSelector(this.props.article);

    return (
      <View style={styles.articleContainer}>
        <TouchableOpacity onPress={this.props.onReadMore}>
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
    backgroundColor: '#fff',
  },
  descriptionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#393e42'
  },
  description: {
    padding: 10,
    paddingBottom: 10,
  }
});
