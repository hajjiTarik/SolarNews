import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  optionMenu: {
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  removeAll: {
    flex: 1,
    flexDirection: 'row'
  },
  removeAllIcon: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: 40,
    paddingLeft: 0
  },
  removeAllText: {
    color: '#fff',
    fontWeight: 'bold',
    paddingTop: 6,
    fontFamily: 'AlegreyaSans-Medium',
    fontSize: 15
  },
  selectArticle: {
    flexDirection: 'row',
    color: '#fff',
    paddingTop: 6,
    fontWeight: 'bold',
    alignItems: 'flex-start',
    fontFamily: 'AlegreyaSans-Medium',
    paddingRight: 15,
    fontSize: 15
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
});