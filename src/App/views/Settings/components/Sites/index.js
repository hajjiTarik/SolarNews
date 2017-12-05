import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CheckBox, Divider } from 'react-native-elements';

import config from '../../../../config/apiConfig';
import constants  from '../../../../config/appConstants';

export default class extends Component {

  constructor (props){
    super(props);
  }

  renderSitesList = () => {
    const listSource = config.sites;
    return listSource.map((source, index) => {
      return (<CheckBox
        style={styles.sitesListCheckbox}
        center
        title={source.name}
        checked={source.id === this.props.activeSite}
        onPress={() => {
          this.props.persist(constants.SITES, source.id);
          this.props.setActiveSite(source.id);
        }}
        key={index}
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
      />);
    });
  };

  render() {
    return (
      <View>
        <Text style={styles.title}>Choose source site :</Text>
        <Divider style={{ backgroundColor: '#dedede' }} />
        <View style={{paddingLeft:10}}>
          {this.renderSitesList()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sitesListCheckbox: {
    alignSelf: 'flex-start',
    paddingTop: 10,
    paddingBottom: 10,
    padding:0,
  },

  title: {
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: 'bold',
    paddingLeft: 10,
    fontSize: 17,
    color: '#fff',
    fontFamily: 'AlegreyaSans-Medium',
    backgroundColor: '#9649ff'
  }
});