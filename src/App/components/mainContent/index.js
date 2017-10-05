import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import colors from '../../../design';
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import ArticleItem from './components/articleItem';

import { fetchApi } from '../../../store/actions';

class MainContent extends Component {

  constructor(props) {
    super(props);
    this.props.fetchApi('behance', 'popular', '1');
    // local state
    this.state = {
      refreshing: false,
    }
  }


  _onRefresh() {
    this.setState({ refreshing: true });
    this.props.fetchApi('behance', 'latest', '1').then(() => {
      this.setState({ refreshing: false });
    });
  }

  render() {
    if (!this.props.result) return null;

    console.log(this.props.result);
    return (
      <ScrollView style={styles.contentContainer}>
        <FlatList
          data={this.props.result}
          renderItem={({ item }) => (
            <ArticleItem article={item} />
          )}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: colors.backgroundDarkColor,
  }
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