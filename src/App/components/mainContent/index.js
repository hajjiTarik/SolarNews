import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import colors from '../../../../../design';
import { RefreshControl, ScrollView, StyleSheet, Text } from 'react-native';

import { fetchApi } from '../../../../../store/actions';

class MainContent extends Component {

  constructor(props) {
    super(props);
    this.props.fetchApi('echojs', 'popular', '2');
    // local state
    this.state = {
      refreshing: false,
    }
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.props.fetchApi('echojs', 'latest', '2').then(()=>{
      this.setState({refreshing: false});
    });
  }

  render() {
    if (!this.props.result) return null;

    return (
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >
        <Text>{this.props.result[0].title}</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundDarkColor,
  },
});

const mapStateToProps = (state) => {
  return {
    result: state.apiReducer.result,
    isFetching: state.apiReducer.isFetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchApi: bindActionCreators(fetchApi, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);