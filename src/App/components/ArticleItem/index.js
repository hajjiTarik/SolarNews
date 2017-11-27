import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { articleSelector } from '../../selectors';

export default class ArticleItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      image
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
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  articleContainer: {
    backgroundColor: '#fff',
    borderRadius: 8
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
