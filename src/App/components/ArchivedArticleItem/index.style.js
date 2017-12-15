import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../design';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  articleContainer: {
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#ecedee',
    flexDirection: 'row',
    flex: 1,
  },
  removeContainer: {
    opacity: 1,
    alignSelf: 'flex-start',
    width: 40,
  },
  savedCheckBox: {
    backgroundColor: 'transparent',
    padding: 10
  },
  descriptionTitle: {
    color: '#2c3137',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'AlegreyaSans-Medium'
  },
  description: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    width: width - 40
  },
  source: {
    color: colors.iconColor,
    fontSize: 10,
    marginTop: 9,
    fontStyle: 'italic',
  },
  articleImage: {
    paddingTop: 5,
    paddingLeft: 10,
    alignSelf: 'flex-start'
  },
  authorName: {
    fontStyle: 'italic',
    fontSize: 11,
    color: '#5e5e5e'
  },
  sourceContainer :{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 17
  }
});
