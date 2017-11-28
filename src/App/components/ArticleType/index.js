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
      this.props.fetchApi(this.props.activeSite, config.typeOfResult.popular, 1, true);
    } else {
      this.props.fetchApi(this.props.activeSite, config.typeOfResult.latest, 1, true);
    }

  }

  renderTitle() {
    if (this.props.type === 'popular') return 'Popular';
    return 'Latest';
  }

  render() {
    return (
      <View>
        <Text style={styles.activeType} onPress={this.handleChangeType}>{this.renderTitle()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activeType: {
    color: '#fff',
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#421372',
    opacity: 0.8
  }
});

const mapStateToProps = (state) => {
  return {
    type: state.apiReducer.type,
    activeSite: state.appReducer.activeSite,
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