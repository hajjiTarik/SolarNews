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

export const HomeStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions:() => ({
      title: 'Home',
      headerTintColor: '#fff',
      headerRight: <ArticleType />,
      headerLeft: <OrderType />,
      headerStyle: {
        backgroundColor: colors.iconColor,
        borderBottomWidth: 0,
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
        backgroundColor: colors.clearColor,
        borderBottomWidth: 0,
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
          backgroundColor: '#6d3cc6',
          borderBottomWidth: 0,
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
        backgroundColor: colors.clearColor,
        borderBottomWidth: 0,
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
    navigationOptions:{
      title: 'Settings',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: colors.clearColor,
        borderBottomWidth: 0,
      },
    },
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