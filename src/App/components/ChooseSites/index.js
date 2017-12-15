import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CheckBox, Divider } from 'react-native-elements';
import config from '../../config/apiConfig';
import { setActiveSite } from '../../store/actions';

class ChooseSites extends Component {

  constructor() {
    super();
  }

  renderSitesList = () => {
    const listSource = config.sites;
    return listSource.map((source, index) => {
      return (<CheckBox
        style={styles.sitesListCheckbox}
        center
        title={source.name}
        checked={source.id === this.props.activeSite}
        onPress={() => {
          this.props.setActiveSite(source.id)
        }}
        key={index}
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
      />)
    })
  };

  render() {
    return (
      <View>
        <Text style={styles.title}>Choose source site :</Text>
        <Divider style={{ backgroundColor: '#dedede' }}/>
        <View style={{ paddingLeft: 10 }}>
          {this.renderSitesList()}
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({ appReducer }) => ({
  activeSite: appReducer.activeSite
});

const mapDispatchToProps = dispatch => ({
  setActiveSite: bindActionCreators(setActiveSite, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseSites);

const styles = StyleSheet.create({
  sitesListCheckbox: {
    alignSelf: 'flex-start',
    paddingTop: 10,
    paddingBottom: 10,
    padding: 0,
  },

  title: {
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: 'bold',
    paddingLeft: 10,
  }
});