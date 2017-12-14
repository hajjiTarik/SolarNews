import { StyleSheet } from 'react-native';
import colors from '../../../design';

export default StyleSheet.create({
  error404: {
    paddingTop: 100,
    backgroundColor: 'transparent'
  },
  errorMessage: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Lobster-Regular',
    color: '#fff'
  },
  refreshButton: {
    marginTop:20,
    backgroundColor: colors.lightMainColor,
  },
  refreshButtonText: {
    fontWeight: 'bold',
  }
})