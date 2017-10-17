import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import colors from '../../../design';
export default class extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={styles.articleContainer} onPress={this.props.onReadMore}>
        <View style={styles.description}>
          <Text style={styles.source}>{this.props.article.source.name} {this.props.index}</Text>
          <Text style={styles.descriptionTitle}>{this.props.article.title}</Text>
        </View>
        <View style={{padding: 10}}>
          <Image
            resizeMode='cover'
            style={{
              width: 100, height: 100
            }}
            source={{ uri: this.props.article.image.normal }}
          />
        </View>

      </TouchableOpacity>
    )

  }
}

const styles = StyleSheet.create({
  articleContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
    flexDirection: 'row'
  },
  descriptionTitle: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    width: 230, height: 50
  },
  description: {
    padding: 10
  },
  source: {
    color: colors.iconColor,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});
