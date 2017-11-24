import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActivityIndicator, Alert, FlatList, Image, RefreshControl, StyleSheet, View } from 'react-native';
import ArticleItem from './../../components/ArticleItem';
import { fetchApi, setPage } from '../../../store/actions';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
    this.onReadMore = this.onReadMore.bind(this);
  }

  componentDidMount() {
    this.props.fetchApi(this.props.activeSite, this.props.type, this.props.page);
    this.props.setPage(this.props.page);
  }

  handleLoadMore = () => {
    this.props.setPage(this.props.page);
    this.props.fetchApi(this.props.activeSite, this.props.type, this.props.page);
  };

  _onRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this.props.fetchApi(this.props.activeSite, this.props.type, 1, true).then(() => {
        this.setState({ refreshing: false });
      }).catch(e => {
        Alert.alert("Error when fetshing");
        this.setState({ refreshing: false });
      });
    });
  };

  onReadMore(item) {
    this.props.navigation.navigate('ArticleDetails', item);
  }

  renderItems = () => {
    if (!this.props.result || !this.props.result.length) {
      return (<View>
        <Image
          source={require('../../../Assets/nointernet.png')}
        />
      </View>);
    }

    return (
      <FlatList
          data={this.props.result}
          renderItem={({ item }) => {
            return <ArticleItem onReadMore={() => this.onReadMore(item)} article={item}/>
          }}
          onEndReached={this.handleLoadMore}
          onEndThreshold={0}
          keyExtractor={(item, index) => index}
          refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
          }
        >
      </FlatList>
    )
  };

  render() {
    return (
      <View style={styles.contentContainer}>
        {this.renderItems()}
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
    padding: 0
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

const mapStateToProps = ({ apiReducer, appReducer }) => {
  return {
    result: apiReducer.result,
    isFetching: apiReducer.isFetching,
    type: apiReducer.type,
    page: apiReducer.page,
    activeSite: appReducer.activeSite,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchApi: bindActionCreators(fetchApi, dispatch),
    setPage: bindActionCreators(setPage, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
