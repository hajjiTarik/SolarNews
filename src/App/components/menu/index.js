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
import colors from '../../../design';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: colors.backgroundDarkColor,
    padding: 10,
    paddingLeft: 20,
    zIndex: 0,
  },
  item: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 15,
    color: colors.iconColor,
    borderBottomColor: colors.iconColor,
    borderBottomWidth: 1,
  },
});

class Menu extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={{opacity: this.props.isOpen ? 1 : 0}}>
          <Text
            onPress={() => onItemSelected('About')}
            style={styles.item}
          >
            Home
          </Text>

          <Text
            onPress={() => onItemSelected('Contacts')}
            style={styles.item}
          >
            Favoris
          </Text>

          <Text
            onPress={() => onItemSelected('Contacts')}
            style={styles.item}
          >
            Settings
          </Text>

          <Text
            onPress={() => onItemSelected('Contacts')}
            style={styles.item}
          >
            About Us
          </Text>
        </View>
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
