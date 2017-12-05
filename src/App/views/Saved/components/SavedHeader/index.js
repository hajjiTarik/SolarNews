import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

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
        colors={['#6d3cc6', '#9649ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
    );
  }

  render () {
    return (
      <View>
        {this.gradient}
        <View style={styles.optionMenu}>
          <TouchableOpacity onPress={this.handleSearchVisibility}>
            <Icon style={styles.searchContainer} name="search" type='evilicon'
                  size={35} color='#fff'/>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.props.handleCheckboxVisibility}>
            <Text style={styles.selectArticle}>Select All</Text>
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
    padding: 10,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  removeAll: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: 70,
    borderLeftWidth: 1,
    borderLeftColor: '#fff',
    paddingLeft: 10
  },
  selectArticle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: 80,
    color: '#fff',
    paddingTop: 6,
    fontWeight: 'bold'
  },
  searchContainer: {
    flexDirection: 'row', alignItems: 'flex-start',
    width: 230
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
});
