import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import  openMenu  from '../store/actions';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from './components/menu';
import TopBar from './components/topBar';
import MainContent from './components/mainContent';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'About',
    };
  }

  toggle() {
    this.props.openMenu(true);
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = (item = '') =>
    this.setState({
      isOpen: false,
      selectedItem: item,
  });

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <TopBar toggle={this.toggle} />
        <MainContent />
      </SideMenu>
  );
  }
}

const mapStateToProps = (state) => {
  return {
    isOpen: state.menuReducer.isOpen,
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    openMenu: bindActionCreators(openMenu, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);