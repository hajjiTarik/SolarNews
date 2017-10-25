import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import ArticleItem from './../../components/ArticleItem';

import { setPage, fetchApi } from '../../../store/actions';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
    this.onReadMore = this.onReadMore.bind(this);
  }

  componentDidMount() {
    this.props.fetchApi(this.props.siteSource, this.props.type, this.props.page);
  }

  handleLoadMore = () => {
    this.props.setPage(this.props.page+1);
    this._onRefresh();
  };

  _onRefresh = () => {
    this.setState({
        refreshing: true
      }, () => {
        this.props.fetchApi(this.props.siteSource, this.props.type, this.props.page).then(() => {
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
        <View>
          <Text>Filter :</Text>
        </View>
        <FlatList
          data={this.props.result}
          renderItem={({ item }) => {
            return <ArticleItem key={item._id} onReadMore={() => this.onReadMore(item)} article={item}/>
          }}

          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
          onEndReached={this.handleLoadMore}
          onEndThreshold={0}
          keyExtractor={(item, index) => index}
        >
        </FlatList>
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
    flex: 1,
  },
  loader: {
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
    type: state.apiReducer.type,
    siteSource: state.apiReducer.siteSource,
    page: state.apiReducer.page,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchApi: bindActionCreators(fetchApi, dispatch),
    setPage: bindActionCreators(setPage, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
