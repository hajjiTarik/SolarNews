import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeArticleDisposition } from '../../store/actions';

class OrderType extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ padding: 10 }}>
        <TouchableOpacity onPress={this.props.changeArticleDisposition}>
          <Icon name={this.props.typeOfArticle ? 'align-justify' : 'th-list'} type='font-awesome' color='#fff'
                size={20}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = ({ appReducer }) => {
  return {
    typeOfArticle: appReducer.typeOfArticle
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changeArticleDisposition: bindActionCreators(changeArticleDisposition, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderType)