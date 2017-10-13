import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchApi, setType } from '../../../store/actions';
import config from '../../../api/config/apiConfig';
import colors from '../../../design';

export class Type extends Component {

  constructor(props) {
    super(props);
    this.handleChangeType = this.handleChangeType.bind(this);
  }

  handleChangeType() {
    if (this.props.type === config.typeOfResult.latest) {
      this.props.setType(config.typeOfResult.popular);
      this.props.fetchApi(this.props.currentSite, config.typeOfResult.popular, this.props.nbArticles);
    } else {
      this.props.setType(config.typeOfResult.latest);
      this.props.fetchApi(this.props.currentSite, config.typeOfResult.latest, this.props.nbArticles);
    }
  }

  render() {
    return (
      <Text style={styles.activeType} onPress={this.handleChangeType}>{this.props.type}</Text>
    );
  }
}

const styles = StyleSheet.create({
  activeType: {
    color: colors.iconColor,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#fff'
  }
});

const mapStateToProps = (state) => {
  return {
    type: state.apiReducer.type,
    currentSite: state.apiReducer.currentSite,
    nbArticles: state.apiReducer.nbArticles
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setType: bindActionCreators(setType, dispatch),
    fetchApi: bindActionCreators(fetchApi, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Type);