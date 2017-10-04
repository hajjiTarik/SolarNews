import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import { fetchApi } from '../../../store/actions';

class MainContent extends Component {

  constructor(props) {
    super(props);
    this.props.fetchApi('echojs','popular', '2');
  }

  render() {
    if(!this.props.result) return null;

    return (
      <View style={styles.container}>
        <Text>{this.props.result[0].title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fffa',
  },
});

const mapStateToProps = (state) => {
  return {
    result: state.apiReducer.result,
    isFetching: state.apiReducer.isFetching,
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    fetchApi: bindActionCreators(fetchApi, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);