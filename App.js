import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer,createDrawerNavigator,createStackNavigator } from 'react-navigation';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import Places from './src/screens/Places';
import List from './src/screens/List';
import Nearby from './src/screens/Nearby';
import Icon from 'react-native-vector-icons/dist/Entypo';
import Header from "./src/components/Header"

const TabNavigator = createBottomTabNavigator(
  {
  Home,
  Places,
  Nearby,
  List,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        console.log(navigation)
        const { routeName } = navigation.state;
      
        if (routeName === 'Home') {
        return <Icon name="home" size={25} color={focused?'red':'gray'} />
      }
        if (routeName === 'Places') {
        return <Icon name="magnifying-glass" size={25} color={focused?'red':'gray'} />
      }
        if (routeName === 'Nearby') {
        return <Icon name="location" size={25} color={focused?'red':'gray'} />
      }
        if (routeName === 'List') {
        return <Icon name="list" size={27} color={focused?'red':'gray'} />
      }
      },
    }),
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'gray',
    },
  } 
);

const stackNavigator=createStackNavigator({
  // Home:TabNavigator
  MyTab: {
    screen: TabNavigator,
    navigationOptions: { 
      // title: 'Header title'
      header:<Header/>
     }
 }
})
const DrawerNavigator=createDrawerNavigator({
  Home:stackNavigator
})

export default createAppContainer(DrawerNavigator);