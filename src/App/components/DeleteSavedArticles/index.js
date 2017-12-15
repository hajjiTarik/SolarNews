import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import appConstants from '../../config/appConstants';

export class DeleteSavedArticles extends Component {

  async removeAllArticles() {
    await removeDataFromStorage(false, appConstants.ARTICLE_STORAGE);
    await this.getArticleFromCache();
  }

  render() {
    return (
      <TouchableOpacity onPress={this.removeAllArticles}>
        <Icon style={styles.removeAll} name="trash" type='evilicon'
              size={35} color='#fff'/>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = ({ appReducer }) => {
  return {
    removeAllArticles: appReducer.removeAllArticles
  }
};

const mapDispatchTopProps = dispatch => {
  return {
    removeAllArticles: bindActionCreators(dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchTopProps)(DeleteSavedArticles);