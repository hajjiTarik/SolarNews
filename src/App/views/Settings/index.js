import React, { Component } from 'react';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, View, StyleSheet } from 'react-native';
import { CheckBox, Divider } from 'react-native-elements';

import config from '../../../config/apiConfig';
import { setActiveSite } from '../../../store/actions';

class Settings extends Component {

  constructor(props) {
    super(props);
    this.renderSitesList = this.renderSitesList.bind(this);
    this.state = {
      activeSite: this.props.activeSite
    }
  }

  getSite = source => {
    this.props.setActiveSite(source.id);
  }

  renderSitesList = () => {
    const listSource = config.sites;
    return listSource.map((source) => {
      return <View style={styles.sitesListCheckboxContainer}>
        <Divider style={{ backgroundColor: '#dedede' }} />
          <CheckBox
            style={styles.sitesListCheckbox}
            center
            title={source.name}
            checked={source.id === this.props.activeSite}
            onPress={() => this.getSite(source)}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
          />
        </View>
    })
  }

  render() {
    return (
      <View style={styles.sitesContainer}>
        <View style={{ paddingLeft:10, paddingRight: 0 }}>
          <Text style={styles.title}>Choose source site:</Text>
          {this.renderSitesList()}
          <Divider style={{ backgroundColor: '#dedede' }} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sitesContainer: {
    backgroundColor: '#FFF',
    marginBottom: 10,
    flex:1,
  },
  sitesListCheckboxContainer: {
    backgroundColor: '#fcfcfc'
  },
  sitesListCheckbox: {
    alignSelf: 'flex-start',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },

  title: {
    padding: 10
  }
});

const mapStateToProps = ({ appReducer })=> {
  return {
    activeSite: appReducer.activeSite
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveSite: bindActionCreators(setActiveSite, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);