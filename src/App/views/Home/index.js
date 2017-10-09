import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import colors from '../../../design';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import ArticleItem from './components/articleItem';

import { fetchApi } from '../../../store/actions';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      siteSource: 'behance',
      type: 'popular',
      page: 1,
    }
    this.props.fetchApi(this.state.siteSource, this.state.type, this.state.page);
    this.onReadMore = this.onReadMore.bind(this);
  }


  _onRefresh() {
    this.setState({ refreshing: true });
    this.props.fetchApi(this.state.siteSource, this.state.type, this.state.page).then(() => {
      this.setState({ refreshing: false });
    });
  }

  onReadMore(item){
    this.props.navigation.navigate('ArticleDetails', item);
  }

  render() {
    if (!this.props.result) return null;

    return (
      <ScrollView style={styles.contentContainer}>
        <FlatList
          data={this.props.result}
          renderItem={({ item }) => (
            <ArticleItem onReadMore={()=>this.onReadMore(item)} article={item}/>
          )}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#fff',
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);