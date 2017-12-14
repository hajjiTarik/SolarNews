import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';

import styles from './index.style';

export default class extends Component {
  render() {
    return (
      <View style={styles.error404}>
        <Text style={styles.errorMessage}>Oops !</Text>
        <Text style={styles.errorMessage}>Somthing went wrong</Text>
        <Button
          buttonStyle={styles.refreshButton}
          textStyle={styles.refreshButtonText}
          onPress={() => this.props.onRefresh()}
          icon={{ name: 'refresh', type: 'font-awesome' }}
          title="Refresh"/>
      </View>
    )
  }
}