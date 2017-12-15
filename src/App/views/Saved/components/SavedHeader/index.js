import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import { isEmpty, omit } from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import { getFromStorage } from '../../../../utils/cacheManager';
import colors from '../../../../../design/index';
import CONSTANTS from '../../../../config/appConstants';

const { width } = Dimensions.get('window');

export default class extends Component {
  constructor(props) {
    super(props);
  }

  handleSearchVisibility = () => {
    this.setState({
      searchVisibility: !this.state.searchVisibility
    });
  };

  renderSearchBlock = () => {
    return (
      <View>
        <SearchBar
          lightTheme
          round
          noIcon={true}
          containerStyle={{ backgroundColor: '#8049df', borderTopWidth: 0 }}
          inputStyle={{ backgroundColor: '#9B4CFD', fontSize: 13, color: '#fff' }}
          placeholderTextColor='#fff'
          onChangeText={this.props.setSearchText}
          placeholder='Search...'/>
      </View>
    );
  };

  get gradient() {
    return (
      <LinearGradient
        colors={[colors.mainColor, colors.light1MainColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
    );
  }

  renderRemoveButton = () => {
    console.log(this.props.tmpArticle);
    if (isEmpty(this.props.tmpArticle)) return null;

    return (
      <TouchableOpacity onPress={this.removeSelectedArticles}>
        <Text>Remove</Text>
      </TouchableOpacity>
    )
  };

  removeSelectedArticles = async () => {
    const cachedArticle = await getFromStorage(CONSTANTS.ARTICLE_STORAGE);
    const newCachedArticle = omit(cachedArticle[CONSTANTS.ARTICLE_STORAGE], this.props.tmpArticle);

    this.props.persist(CONSTANTS.ARTICLE_STORAGE, newCachedArticle);
  };

  render() {
    return (
      <View>
        {this.gradient}
        <View style={styles.optionMenu}>
          <TouchableOpacity onPress={this.props.handleCheckboxVisibility}>
            <Text style={styles.selectArticle}>Select</Text>
          </TouchableOpacity>

          {this.renderRemoveButton()}

          <TouchableOpacity onPress={this.props.removeAllArticlesHandler}>
            <Icon style={styles.removeAll} name="trash" type='evilicon'
                  size={35} color='#fff'/>
          </TouchableOpacity>
        </View>
        {this.renderSearchBlock()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  optionMenu: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  removeAll: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: 40,
    paddingLeft: 10
  },
  selectArticle: {
    flexDirection: 'row',
    color: '#fff',
    paddingTop: 6,
    fontWeight: 'bold',
    alignItems: 'flex-start',
    width: width - 60
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
});
