import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import colors from '../../../../../design';
export default class ArticleItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.articleContainer}>
        <Image
          source={{uri: this.props.article.image.normal}}
        />
        <Text>{this.props.article.title}</Text>
      </View>
    )

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
