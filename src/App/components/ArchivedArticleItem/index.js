import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements';

import colors from '../../../design';

import { articleSelector } from '../../selectors';

class ArchivedArticleItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };

    this.removeFromCacheHandler = this.removeFromCacheHandler.bind(this);
  }

  removeFromCacheHandler () {
    this.setState(()=>({
      checked: !this.state.checked
    }));
  }

  renderCheckboxBlock = () => {
    if(!this.props.checkboxVisibility) return;

    return(<View style={styles.removeContainer}>
            <CheckBox
              style={styles.savedCheckBox}
              onPress={()=>this.removeFromCacheHandler()}
              checked={this.state.checked}
            />
          </View>);
  }

  render() {
    const {
      title,
      image,
      source
    } = articleSelector(this.props.article);
    return (
      <View style={styles.articleContainer} >
        {this.renderCheckboxBlock()}
        <TouchableOpacity onPress={this.props.onReadMore}>
          <View style={styles.description}>
            <View style={{width: this.props.checkboxVisibility ? width - 160 : width - 110}}>
              <Text style={styles.descriptionTitle}>{title}</Text>
              <Text style={styles.authorName}>{source.authorName}</Text>
              <Text style={styles.source}>{source.name}</Text>
            </View>
            <View style={styles.articleImage}>
              <Image
                resizeMode='cover'
                style={{
                  width: 80, height: 80
                }}
                source={{ uri: image.normal }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )

  }
}

const mapStateToProps = ({ appContentReducer, appReducer }) => ({
  checkboxVisibility: appReducer.visible
})

export default connect(mapStateToProps)(ArchivedArticleItem);

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  articleContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
    flexDirection: 'row',
    flex: 1,
  },
  removeContainer: {
    opacity: 1,
    alignSelf: 'flex-start',
    width:50,
  },
  savedCheckBox: {
    backgroundColor:'#FFF',
    padding: 10
  },
  removeContainer: {
    opacity: 1
  },
  descriptionTitle: {
    color: '#000',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    padding: 10,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    width: width - 50,
  },
  source: {
    color: colors.clearColor,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
  articleImage: {
    padding: 10,
    alignSelf: 'flex-start'
  },
  authorName: {
    fontStyle: 'italic',
    fontSize: 11,
    color: '#5e5e5e'
  }
});
