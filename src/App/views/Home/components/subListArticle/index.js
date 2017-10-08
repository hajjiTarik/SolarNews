import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../../../../design';

export default class ArticleItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.listArticle}>
        <View style={styles.iconContainer}>
          <Icon
            style={styles.icon}
            name='heart'
            type='evilicon'
            color={"#ff232f"}
          />
          <Text style={styles.textListArticle}>{this.props.data.likesCount}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon
            style={styles.icon}
            name='comment'
            type='evilicon'
            color={colors.iconColor}
          />
          <Text style={styles.textListArticle}>{this.props.data.commentsCount}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon
            style={styles.icon}
            name='eye'
            type='evilicon'
            color={colors.iconColor}
          />
          <Text style={styles.textListArticle}>{this.props.data.viewsCount}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon
            style={styles.icon}
            name='link'
            type='evilicon'
            color={colors.iconColor}
          />
          <Text style={styles.textListArticle}>Read Me</Text>
        </View>
      </View>)
  }
}

const styles = StyleSheet.create({
  listArticle: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#d1d1d1',
    marginTop: 10,
    paddingTop: 10
  },
  iconContainer: {
    flexDirection: 'row',
    marginRight: 10
  },
  textListArticle: {
    color: colors.backgroundDarkColor,
    paddingLeft: 5,
    fontSize: 11,
    alignItems: 'baseline',
    paddingTop: 4,
    fontWeight: 'bold'
  },
  icon: {
    alignItems: 'center',
  }
});
