import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../design/index';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  carouselContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  carouselTopTitleContainer: {

  },
  slide: {
    width: width - 20,
    backgroundColor: '#fff',
    shadowColor: colors.clearColor,
    shadowOffset: { width: 2, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 1
  },
  title: {
    backgroundColor: 'transparent'
  },
  paginationContainer: {
    paddingVertical: 8
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 1,
    marginTop: 15
  },
  carouselTitle: {
    backgroundColor:'transparent',
    color: '#fff',
    fontWeight: 'bold',
    paddingLeft: 10,
    alignSelf: 'flex-start'
  },
  badgeContainer: {
    backgroundColor: '#000',
    alignSelf: 'flex-end',
    opacity: 0.4,
    width: 70,
    margin: 10
  }
});