import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import colors from '../../design';

import Home from '../views/Home';
import Saved from '../views/Saved';
import Settings from '../views/Settings';
import ArticleDetails from '../views/ArticleDetails';
import ArticleType from '../components/ArticleType';
import OrderType from '../components/OrderType';
import AddToFav from '../components/AddToFav';
import Header from '../components/Header';
import ResetAllSettings from '../components/ResetAllSettings';
import constants from '../config/appConstants';

export const HomeStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions:() => ({
      title: 'Home',
      headerTintColor: '#fff',
      headerRight: <ArticleType />,
      headerLeft: <OrderType />,
      headerStyle: {
        borderBottomWidth: 0,
        height: 60,
      },
      headerTitleStyle: {
        fontSize: 20,
        fontFamily: 'Lobster-Regular'
      },
      header: (props) => <Header {...props} />,
    }),
  },
  ArticleDetails: {
    screen: ArticleDetails,
    navigationOptions:({ navigation }) => ({
      title: 'Details',
      headerTintColor: '#fff',
      headerRight: <AddToFav params={navigation} />,

      headerStyle: {
        backgroundColor: colors.mainColor,
        borderBottomWidth: 0,
      },

      headerTitleStyle: {
        fontSize: 20,
        fontFamily: 'Lobster-Regular'
      },
    }),
  },
},{
  stackBarOptions: {
    style: {
      backgroundColor: colors.clearColor,
    },
  }
});


export const SavedStack = StackNavigator({
  Saved: {
    screen: Saved,
    navigationOptions:() => {
      return {
        title: 'Favorite Articles',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: colors.mainColor,
          borderBottomWidth: 0,
        },

        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'Lobster-Regular'
        },
      }
    },
  },
  ArticleDetails: {
    screen: ArticleDetails,
    navigationOptions:({ navigation }) => ({
      title: 'Details',
      headerTintColor: '#fff',
      headerRight: <AddToFav params={navigation} />,

      headerStyle: {
        backgroundColor: colors.mainColor,
        borderBottomWidth: 0,
      },

      headerTitleStyle: {
        fontSize: 20,
        fontFamily: 'Lobster-Regular'
      },
    }),
  },
},{
  stackBarOptions: {
    style: {
      backgroundColor: '#FFF',
    },
  }
});

export const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: () => ({
      title: 'Settings',
      headerTintColor: '#fff',
      headerRight: <ResetAllSettings keys={[
          constants.FONT_SIZE,
          constants.NOTIFICATION_DATE,
          constants.SITES
        ]} />,
      headerStyle: {
        backgroundColor: colors.mainColor,
        borderBottomWidth: 0,
      },

      headerTitleStyle: {
        fontSize: 20,
        fontFamily: 'Lobster-Regular'
      },
    }),
  },
},{
  stackBarOptions: {
    style: {
      backgroundColor: '#FFF',
    },
  }
});

export const Tabs = TabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Icon name='trophy' type='evilicon' size={39} color={tintColor}/>
    },
  },
  Saved: {
    screen: SavedStack,
    navigationOptions: {
      tabBarLabel: 'favorite articles',
      tabBarIcon: ({ tintColor }) => <Icon name='heart'
                                           type='evilicon' size={39} color={tintColor}/>
    },
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => <Icon name="gear" type="evilicon" size={33} color={tintColor}/>
    },
  },
}, {
  tabBarOptions: {
    activeTintColor: colors.clearColor,
    showLabel: false,
    style: {
      backgroundColor: '#fff',
      height: 60,
      padding:0,
      margin:0,
      borderTopColor: "transparent",
      shadowColor: colors.clearColor,
      shadowOffset: { width: 2, height: 10 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
      elevation: 1,
    },
  },
},);