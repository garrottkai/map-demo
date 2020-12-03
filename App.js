/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HistoryScreen from './src/screens/History';
import MapScreen from './src/screens/Map';

const TabNavigator = createBottomTabNavigator({
  Map: MapScreen,
  History: HistoryScreen,
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Map') {
          iconName = 'map';
        } else if (routeName === 'History') {
          iconName = 'time-sharp';
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  });

export default createAppContainer(TabNavigator);
