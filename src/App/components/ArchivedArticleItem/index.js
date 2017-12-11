import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { CheckBox } from 'react-native-elements';

import SubListArticle from '../SubListArticle';
import { articleSelector } from '../../selectors';
import styles from './index.style';

const { width } = Dimensions.get('window');

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };

    this.removeFromCacheHandler = this.removeFromCacheHandler.bind(this);
  }

  removeFromCacheHandler() {
    this.setState(() => ({
      checked: !this.state.checked
    }));
  }

  renderCheckboxBlock = () => {
    if (!this.props.checkboxVisibility) return;

    return (<View style={styles.removeContainer}>
      <CheckBox
        style={styles.savedCheckBox}
        onPress={() => this.removeFromCacheHandler()}
        checked={this.state.checked}
      />
    </View>);
  };

  render() {
    const {
      title,
      image,
      source
    } = articleSelector(this.props.article);
    const margeWidth = this.props.checkboxVisibility ? 150 : 160;
    return (
      <View style={styles.articleContainer}>
        {this.renderCheckboxBlock()}
        <TouchableOpacity onPress={this.props.onReadMore}>
          <View style={styles.description}>
            <View style={{ width: this.props.checkboxVisibility ? width - margeWidth : width - 110 }}>
              <Text style={styles.descriptionTitle}>{title}</Text>
              <Text style={styles.authorName}>{source.authorName}</Text>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 17
              }}>

                <SubListArticle source={source}/>
                <Text style={styles.source}>{source.name}</Text>
              </View>
            </View>
            <View style={styles.articleImage}>
              <Image
                resizeMode='cover'
                style={{
                  width: 80, height: 80
                }}
                source={{ uri: image.normal }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )

  }
}