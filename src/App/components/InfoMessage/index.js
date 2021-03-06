import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

const renderMessage = (type, message) => {
  switch (type) {
    case 'ERROR':
      return (<View style={[styles.mainContainer, styles.errorContainer]}>
        <Icon name='close-o' type='evilicon' size={25} color={'#fff'}/>
        <Text style={styles.message}>{message}</Text>
      </View>);
    case 'WARN':
      return (<View style={[styles.mainContainer, styles.warnContainer]}>
        <Icon name='exclamation' type='evilicon' size={25} color={'#fff'}/>
        <Text style={styles.message}>{message}</Text>
      </View>);
    default:
      return (<View style={[styles.mainContainer, styles.infoContainer]}>
        <Icon name='comment' type='evilicon' size={25} color={'#fff'}/>
        <Text style={styles.message}>{message}</Text>
      </View>);
  }
};

export default ({ show, message, type }) => {
  if (!show) return null;

  return renderMessage(type, message);
}

const styles = StyleSheet.create({
  mainContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 5,
  },
  message: {
    color: '#fff',
    marginTop: 5,
    fontSize: 11,
  },
  errorContainer: {
    backgroundColor: '#ff431e',
    opacity: 0.9,
  },
  warnContainer: {
    backgroundColor: '#ffc60c',
    opacity: 0.9,
  },
  infoContainer: {
    backgroundColor: '#6d3cc6',
    opacity: 0.5,
  },
});