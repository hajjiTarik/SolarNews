import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Home from '../views/Home';
import Saved from '../views/Saved';
import Settings from '../views/Settings';
import ArticleDetails from '../views/ArticleDetails';
import TypeOfArticle from '../components/TypeOfArticle';

export const HomeStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
      headerRight: <TypeOfArticle />
    },
  },
  ArticleDetails: {
    screen: ArticleDetails,
    navigationOptions: {
      title: 'Details',
      headerRight: <Text onPress={()=>alert(1)}>Heolo</Text>
    },
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
                                            type='font-awesome' size={23} color={tintColor} />
    },
  },
  Profile: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => <Icon name="cog" type="font-awesome" size={26} color={tintColor} />
    },
  },
},{
  tabBarOptions: {
    style: {
      backgroundColor: '#FFF',
    },
  },
},);