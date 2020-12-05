import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons';
import HistoryScreen from './History';
import MapScreen from './Map';

const TabNavigator = createBottomTabNavigator({
    Map: MapScreen,
    History: HistoryScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Map') {
          iconName = 'map';
        } else if (routeName === 'History') {
          iconName = 'time-sharp';
        }
        return <Ionicon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#0080FF',
      inactiveTintColor: 'gray',
    },
  });

export default createAppContainer(TabNavigator);
