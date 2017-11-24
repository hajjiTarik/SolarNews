import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { removeDataFromStorage } from '../../../../utils/cacheManager';

export default class extends Component {
  async deleteAllSettingsHandler () {
    try {
      await removeDataFromStorage(true);
      alert('All settings removed successfully');
    } catch (e) {
      console.log(e);
    }

  }

  render () {

    return (
      <View style={{ paddingTop: 20, paddingBottom: 20}}>
        <Button
          raised
          icon={{name:'trash', type:'font-awesome', size: 22}}
          buttonStyle={{backgroundColor: '#e74c3c', borderRadius: 0}}
          textStyle={{textAlign: 'center'}}
          title={`Delete all settings`}
          onPress={this.deleteAllSettingsHandler}
        />
      </View>
    );
  }
}