import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider, Slider } from 'react-native-elements';
import constants from '../../../../config/appConstants';
import ArchivedArticleItem from '../../../../components/ArchivedArticleItem';
import colors from '../../../../../design';

export default class extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.block}>
        <Text style={styles.title}>Set Font Size :</Text>
        <Divider style={{ backgroundColor: '#dedede' }}/>
        <View style={{ alignItems: 'stretch', justifyContent: 'center', flex: 1, paddingLeft: 10, paddingRight: 10 }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', paddingTop: 10, color: colors.mainColor}}>Selected value: {Math.floor(this.props.fontSize)}px</Text>
          <Slider
            value={this.props.fontSize}
            onSlidingComplete={value => {
              let convertedValue = Math.floor(value);
              this.props.setFontSize(convertedValue);
              this.props.persist(constants.FONT_SIZE, convertedValue);
            }}
            minimumValue={15}
            maximumValue={23}
            thumbTintColor={'#904eff'}
            maximumTrackTintColor="#b7babd"
            minimumTrackTintColor={'#904eff'}
          />
          <ArchivedArticleItem
            checkboxVisibility={false}
            fontSize={Math.floor(this.props.fontSize)}
            customStyle={{ paddingRight: 10, paddingLeft: 0, borderBottomWidth: 0 }}
            article={{
              title: 'This just a Fake Title',
              image: {
                normal: null
              },
              source: {
                authorName: 'behance'
              },
              id: 1
            }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  block: {
    paddingTop: 20
  },

  title: {
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: 'bold',
    paddingLeft: 10,
    fontSize: 17,
    fontFamily: 'AlegreyaSans-Medium',
    color: '#303c4a',
    backgroundColor: '#e6deff',
  }
});