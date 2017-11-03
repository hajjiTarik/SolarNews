import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActivityIndicator, Alert, FlatList,NetInfo, RefreshControl, StyleSheet, View } from 'react-native';
import ArticleItem from './../../components/ArticleItem';

import { setPage, fetchApi } from '../../../store/actions';
import initConnection from '../../utils/connectivityManager';
import { SceneMap, TabBar, TabViewAnimated } from 'react-native-tab-view';

const FirstRoute = () => <View style={[ styles.container, { backgroundColor: '#ff4081' } ]} />;
const SecondRoute = () => <View style={[ styles.container, { backgroundColor: '#673ab7' } ]} />;

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      navigation: {
        index: 0,
        routes: [
          { key: '1', title: 'First' },
          { key: '2', title: 'Second' },
        ],
      }
    };
    this.onReadMore = this.onReadMore.bind(this);
 
  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;

  _renderScene = SceneMap({
    '1': FirstRoute,
    '2': SecondRoute,
  });

  componentDidMount() {
    this.props.fetchApi(this.props.activeSite, this.props.type, this.props.page);
    NetInfo.isConnected.addEventListener('change', (hasInternetConnection) => console.debug(`hasInternetConnection:`, hasInternetConnection));
  }

  handleLoadMore = () => {
    this.props.fetchApi(this.props.activeSite, this.props.type, this.props.page+1, true);
  };

  _onRefresh = () => {
    this.setState({
        refreshing: true
      }, () => {
        this.props.fetchApi(this.props.activeSite, this.props.type, this.props.page).then(() => {
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
    console.log(1);
    return (
      <View style={styles.contentContainer}>

        <FlatList
          data={this.props.result}
          renderItem={({ item }) => {
            return <ArticleItem key={item._id} onReadMore={() => this.onReadMore(item)} article={item}/>
          }}
          onEndReached={this.handleLoadMore}
          onEndThreshold={0}
          keyExtractor={(item, index) => index}
          refreshControl={<RefreshControl
            colors={["#000", "#F0F"]}
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
          }
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
  },
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    result: state.apiReducer.result,
    isFetching: state.apiReducer.isFetching,
    type: state.apiReducer.type,
    activeSite: state.appReducer.activeSite,
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
