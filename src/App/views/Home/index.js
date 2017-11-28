import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActivityIndicator, Alert, Button, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { Badge } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import ArchivedArticleItem from './../../components/ArchivedArticleItem';
import { fetchApi, setPage, setToggleCarousel } from '../../../store/actions';
import ArticleCarousel from '../../components/ArticleCarousel';
import InfoMessage from '../../components/InfoMessage';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      messageType: 'INFO',
      messageShow: false,
      messageContent: 'toto',
      border: false
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

  componentWillReceiveProps(nextProps){
    if (nextProps.activeSite !== this.props.activeSite) {
      this.setState({
        messageType: 'WARN',
        messageShow: true,
        messageContent: 'Your Settings has changed please refresh'
      });
      console.log(1);
    }
  }

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
        <Button onPress={() => this._onRefresh()} title={"Refresh"}/>
      </View>);
    }

    return (
      <FlatList
        data={this.props.result}
        renderItem={({ item }) => {
          return <ArchivedArticleItem onReadMore={() => this.onReadMore(item)} article={item}/>
        }}
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
        colors={['#6d3cc6', '#63a4cc']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
    );
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        { this.gradient }
        <InfoMessage show={this.state.messageShow} message={this.state.messageContent} type={this.state.messageType} />
        <Badge
          value={this.props.showCarousel ? 'Hide' : 'Show'}
          containerStyle={{ backgroundColor: '#484848', opacity: 0.3, width: 70, margin: 10 }}
          textStyle={{ color: '#ffffff' }}
          onPress={() => {
            this.props.setToggleCarousel(this.props.showCarousel)
          }}
        />
        <ArticleCarousel toggle={this.props.showCarousel}/>
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
    showCarousel: appReducer.showCarousel
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchApi: bindActionCreators(fetchApi, dispatch),
    setPage: bindActionCreators(setPage, dispatch),
    setToggleCarousel: bindActionCreators(setToggleCarousel, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
