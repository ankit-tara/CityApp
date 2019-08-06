import React from 'react';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import Places from './src/screens/Places';
import Find from './src/screens/List';
import ListByCity from './src/screens/ListByCity';
import ShowAllCitiesPage from './src/screens/ShowAllCities';
import Single from './src/screens/Single';
import Header from "./src/components/Header"
import Icon from 'react-native-vector-icons/dist/Entypo';
import { TAB_ICON_ACTIVE, TAB_ICON_INACTIVE } from './src/theme/colors';

const HomeStack=createStackNavigator({
  Home:Home,
  ListByCity:ListByCity,
  ShowAllCities:ShowAllCitiesPage,
  Single:Single
},{
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
})

const CitiesStack=createStackNavigator({
  CitiesMain:ShowAllCitiesPage,
  ListByCity:ListByCity,
  Single:Single
},{
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
})

const TabNavigator = createBottomTabNavigator(
  {
    Home:HomeStack,
    Search:Find,
    Places,
    Cities:CitiesStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        let color = focused ? TAB_ICON_ACTIVE : TAB_ICON_INACTIVE
        const { routeName } = navigation.state;

        if (routeName === 'Home') {
          return <Icon name="home" size={25} color={color} />
        }
        if (routeName === 'Search') {
          return <Icon name="magnifying-glass" size={25} color={color} />
        }
        if (routeName === 'Places') {
          return <Icon name="location" size={25} color={color} />
        }
        if (routeName === 'Cities') {
          return <Icon name="list" size={27} color={color} />
        }
      },
    }),
    // resetOnBlur:true,
    tabBarOptions: {
      activeTintColor: TAB_ICON_ACTIVE,
      inactiveTintColor: TAB_ICON_INACTIVE,
      labelStyle: {
        fontSize: 13,
      },
    },
  }
);

const StackNavigator = createStackNavigator({
  Tab: {
    screen: TabNavigator,
    navigationOptions: { header: <Header/> }
 }
})



export default createAppContainer(StackNavigator);