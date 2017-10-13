import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActivityIndicator, Alert, FlatList, StyleSheet, View } from 'react-native';
import ArticleItem from './components/articleItem';

import { fetchApi } from '../../../store/actions';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      siteSource: 'behance',
      page: 1,
    }
    this.props.fetchApi(this.state.siteSource, this.props.type, this.state.page);
    this.onReadMore = this.onReadMore.bind(this);
  }


  _onRefresh() {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.props.fetchApi(this.state.siteSource, this.props.type, this.state.page).then(() => {
          this.setState({ refreshing: false });
        }).catch((e) => {
          Alert.alert("Error when fetshing");
          this.setState({ refreshing: false });
        });
      });
  }

  onReadMore(item) {
    this.props.navigation.navigate('ArticleDetails', item);
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        <FlatList
          data={this.props.result}
          renderItem={({ item }) => (
            <ArticleItem onReadMore={() => this.onReadMore(item)} article={item}/>
          )}

          refreshing={this.state.refreshing}
          onRefresh={() => this._onRefresh()}
        />
        <View style={styles.loader}>
          <ActivityIndicator animating={this.props.isFetching}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#fff',
    flex: 1
  },
  loader: {
    backgroundColor: '#fff',
    flex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const mapStateToProps = (state) => {
  return {
    result: state.apiReducer.result,
    isFetching: state.apiReducer.isFetching,
    type: state.apiReducer.type
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchApi: bindActionCreators(fetchApi, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);