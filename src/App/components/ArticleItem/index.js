import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { articleSelector } from '../../selectors';
import SubListArticle from '../SubListArticle';
import styles from './index.style';

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
            style={{ height: 100 }}
            source={{ uri: image.normal }}
          />
          <View style={styles.description}>
            <Text style={[styles.descriptionTitle, {fontSize: this.props.fontSize}]}>{title}</Text>
            {!this.props.noInfo ? <SubListArticle source={source}/> : null}
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
