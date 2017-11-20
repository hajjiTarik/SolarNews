import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Divider, Slider } from 'react-native-elements';
import config from '../../../../../design/index';

export default class extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return(
      <View style={styles.block} >
        <Text style={styles.title}>Remember me to read :</Text>
        <Divider style={{ backgroundColor: '#dedede' }} />
        <View style={{alignItems: 'stretch', justifyContent: 'center', flex:1, paddingLeft:10, paddingRight:10}}>
          <Slider
            value={this.props.fontSize}
            onSlidingComplete={(value) => {
              let convertedValue = Math.floor(value);

              this.props.setFontSize(value);
              this.props.persist('fontSize', convertedValue);
            }}
            minimumValue={10}
            maximumValue={18}
            thumbTintColor={config.skyBlueColor}
            maximumTrackTintColor="#F4F4F4"
            minimumTrackTintColor={config.clearColor}
          />
          <Text>Selected value: {Math.floor(this.props.fontSize)}px</Text>
          <Text style={{paddingTop: 20,fontSize: Math.floor(this.props.fontSize), color: config.clearColor}}>This example text</Text>
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
  }
});