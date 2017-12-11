import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActivityIndicator, Button, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import ArchivedArticleItem from './../../components/ArchivedArticleItem';
import { fetchApi, setPage } from '../../store/actions';
import ArticleCarousel from '../../components/ArticleCarousel';
import InfoMessage from '../../components/InfoMessage';
import ArticleItem from '../../components/ArticleItem';
import colors from '../../../design/index';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      messageType: 'INFO',
      messageShow: false,
      messageContent: 'toto',
      border: false,
      typeOfArticle: false
    };
    this.onReadMore = this.onReadMore.bind(this);
  }

  componentDidMount() {
    this.handleLoadMore();
  }

  handleLoadMore = () => {
    this.props.fetchApi(this.props.activeSite, this.props.type, this.props.page);
    this.props.setPage(this.props.page);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeSite !== this.props.activeSite) {
      this._onRefresh();
    }
  }

  _onRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this.props.fetchApi(this.props.activeSite, this.props.type, 1, true).then(() => {
        this.setState({ refreshing: false });
      });
    });
  };

  onReadMore(item) {
    this.props.navigation.navigate('ArticleDetails', item);
  }

  renderArticleList (item) {
      return this.props.typeOfArticle
        ? <ArticleItem onReadMore={() => this.onReadMore(item)} article={item}/>
        : <ArchivedArticleItem onReadMore={() => this.onReadMore(item)} article={item}/>
  }

  renderItems = () => {
    if (!this.props.result || !this.props.result.length) {
      return (<View>
        <Button onPress={() => this._onRefresh()} title={"Refresh"}/>
      </View>);
    }

    return (
      <FlatList
        data={this.props.result}
        renderItem={({ item }) => this.renderArticleList(item)}
        onEndReached={this.handleLoadMore}
        onEndThreshold={0}
        keyExtractor={(item, index) => index}
        refreshControl={<RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)}
          title="Updating Top 20"
          tintColor="#fff"
          titleColor="#fff"
        />
        }
      >
      </FlatList>
    )
  };

  get gradient() {
    return (
      <LinearGradient
        colors={[colors.mainColor, colors.lightMainColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
    );
  }

  render() {
    return (
      <View scrollEnabled={false} style={styles.contentContainer}>
        { this.gradient }
        <InfoMessage show={this.state.messageShow} message={this.state.messageContent} type={this.state.messageType}/>
        <ArticleCarousel />
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
    backgroundColor: '#f8f9fa',
    flex: 1,
    padding: 0
  },
  hideButton: {
    opacity: 0.4,
    width: 80,
    margin: 0,
    padding: 0,
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
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
});

const mapStateToProps = ({ apiReducer, appReducer }) => {
  return {
    result: apiReducer.result,
    isFetching: apiReducer.isFetching,
    type: apiReducer.type,
    page: apiReducer.page,
    activeSite: appReducer.activeSite,
    typeOfArticle: appReducer.typeOfArticle
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchApi: bindActionCreators(fetchApi, dispatch),
    setPage: bindActionCreators(setPage, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
