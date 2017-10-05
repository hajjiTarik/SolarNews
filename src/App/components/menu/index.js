import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import { connect } from 'react-redux';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#f5f5f5',
    padding: 20,
    zIndex: 0
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
});

class Menu extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    if(!this.props.isOpen) return null;

    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <Text
          onPress={() => onItemSelected('About')}
          style={styles.item}
        >
          Last News
        </Text>

        <Text
          onPress={() => onItemSelected('Contacts')}
          style={styles.item}
        >
          Best News
        </Text>

        <Text
          onPress={() => onItemSelected('Contacts')}
          style={styles.item}
        >
          Best News
        </Text>

        <Text
          onPress={() => onItemSelected('Contacts')}
          style={styles.item}
        >
          Best News
        </Text>

        <Text
          onPress={() => onItemSelected('Contacts')}
          style={styles.item}
        >
          Best News
        </Text>
      </ScrollView>);
  }
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isOpen: state.menuReducer.isOpen,
});

export default connect(mapStateToProps, null)(Menu)
