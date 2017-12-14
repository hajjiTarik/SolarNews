import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../../../design/index';

const { width } = Dimensions.get('window');

export default class extends Component {
  constructor (props) {
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
          containerStyle = {{backgroundColor:'#8049df', borderTopWidth: 0}}
          inputStyle= {{ backgroundColor: '#9B4CFD', fontSize: 13, color:'#fff'}}
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

  removeSelectedArticles () {
    console.log(this.props);
  }

  render () {
    return (
      <View>
        {this.gradient}
        <View style={styles.optionMenu}>
          <TouchableOpacity onPress={this.props.handleCheckboxVisibility}>
            <Text style={styles.selectArticle}>Select</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.removeSelectedArticles}>
            <Text>Remove</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.props.removeAllArticlesHandler} >
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
    width: width-60
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
});
