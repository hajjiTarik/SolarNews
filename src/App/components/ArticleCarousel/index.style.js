import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../design/index';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  carouselContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselTopTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slide: {
    width: width - 20,
    backgroundColor: '#fff',
    shadowColor: colors.clearColor,
    shadowOffset: { width: 2, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 1,
  },
  title: {
    backgroundColor: 'transparent',
    fontFamily: ''
  },
  paginationContainer: {
    paddingVertical: 8
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 1,
    marginTop: 3
  },
  carouselTitle: {
    backgroundColor:'transparent',
    color: '#fff',
    fontWeight: 'bold',
    paddingLeft: 10,
    alignSelf: 'flex-start',
    fontFamily: 'AlegreyaSans-Medium'
  },
  badgeContainer: {
    backgroundColor: '#421372',
    alignSelf: 'flex-start',
    width: 60,
    margin: 6,
    opacity: 0.8,
  }
});