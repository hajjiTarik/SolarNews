import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Home from '../views/Home';
import Saved from '../views/Saved';
import Profile from '../views/Profile';
import ArticleDetails from '../views/ArticleDetails';

export const HomeStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
    },
  },
  ArticleDetails: {
    screen: ArticleDetails,
  }
});

export const Tabs = TabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Icon name="home"
                                           type='font-awesome' size={28} color={tintColor} />
    },
  },
  Saved: {
    screen: Saved,
    navigationOptions: {
      tabBarLabel: 'Saved',
      tabBarIcon: ({ tintColor }) => <Icon  name='heart'
                                            type='font-awesome' size={25} color={tintColor} />
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => <Icon name="user" type="font-awesome" size={26} color={tintColor} />
    },
  },
});