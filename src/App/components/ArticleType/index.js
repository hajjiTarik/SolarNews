import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchApi, setType } from '../../../store/actions';
import config from '../../../config/apiConfig';

export class Type extends Component {

  constructor(props) {
    super(props);
    this.handleChangeType = this.handleChangeType.bind(this);
  }

  handleChangeType() {
    if (this.props.type === config.typeOfResult.latest) {
      this.props.setType(config.typeOfResult.popular);
      this.props.fetchApi(this.props.siteSource, config.typeOfResult.popular, this.props.page, true);
    } else {
      this.props.setType(config.typeOfResult.latest);
      this.props.fetchApi(this.props.siteSource, config.typeOfResult.latest, this.props.page, true);
    }
  }

  render() {
    return (
      <View>
        <Text style={styles.activeType} onPress={this.handleChangeType}>{this.props.type}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activeType: {
    color: '#fff',
    fontWeight: 'bold',
    padding: 10,
  }
});

const mapStateToProps = (state) => {
  return {
    type: state.apiReducer.type,
    siteSource: state.apiReducer.siteSource,
    page: state.apiReducer.page
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setType: bindActionCreators(setType, dispatch),
    fetchApi: bindActionCreators(fetchApi, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Type);