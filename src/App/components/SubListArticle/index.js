import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

export default class extends Component {

  constructor(props) {
    super(props);
  }

  renderViewsCount = () => {
    if (!this.props.source.viewsCount) return null;

    return (
      <View style={styles.iconContainer}>
        <Icon
          style={styles.icon}
          name='eye'
          type='evilicon'
          color={'#2c3137'}
        />
        <Text style={styles.textListArticle}>{this.props.source.viewsCount}</Text>
      </View>
    );
  };

  renderLikesCount = () => {
    if (!this.props.source.likesCount) return null;

    return (
      <View style={styles.iconContainer}>
        <Icon
          style={styles.icon}
          name='heart'
          type='evilicon'
          color={"#2c3137"}
        />
        <Text style={styles.textListArticle}>{this.props.source.likesCount}</Text>
      </View>
    );
  };

  renderCommentsCount = () => {
    if (!this.props.source.commentsCount) return null;

    return (
      <View style={styles.iconContainer}>
        <Icon
          style={styles.icon}
          name='comment'
          type='evilicon'
          color={'#2c3137'}
        />
        <Text style={styles.textListArticle}>{this.props.source.commentsCount}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.listArticle}>
        {this.renderLikesCount()}
        {this.renderCommentsCount()}
        {this.renderViewsCount()}
      </View>)
  }
}

const styles = StyleSheet.create({
  listArticle: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 0,
    paddingTop: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    marginRight: 5
  },
  textListArticle: {
    paddingLeft: 1,
    fontSize: 11,
    alignItems: 'baseline',
    paddingTop: 4,
    fontWeight: 'bold'
  },
  icon: {
    alignItems: 'center',
  }
});
