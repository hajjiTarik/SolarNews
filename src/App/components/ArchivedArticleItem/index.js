import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CheckBox } from 'react-native-elements';

import colors from '../../../design';

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };

    this.removeFromCacheHandler = this.removeFromCacheHandler.bind(this);
  }

  removeFromCacheHandler () {

    this.setState(()=>({
      checked: !this.state.checked
    }));
  }

  render() {
    const { article } = this.props;
    return (
      <View style={styles.articleContainer} >
        <View style={styles.removeContainer}>
          <CheckBox
            onPress={()=>this.removeFromCacheHandler()}
            checked={this.state.checked}
          />
        </View>
        <TouchableOpacity onPress={this.props.onReadMore}>
          <View style={styles.description}>
            <Text style={styles.source}>{article.source.name} {this.props.index}</Text>
            <Text style={styles.descriptionTitle}>{article.title}</Text>
            <Text style={styles.authorName}>{article.source.authorName}</Text>
          </View>
          <View style={{padding: 10}}>
            <Image
              resizeMode='cover'
              style={{
                width: 100, height: 100
              }}
              source={{ uri: article.image.normal }}
            />
          </View>
        </TouchableOpacity>
      </View>
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
  removeContainer: {
    opacity: 1
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
  },
  authorName: {
    fontStyle: 'italic',
    fontSize: 11
  }
});
