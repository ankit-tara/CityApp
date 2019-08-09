import React from "react";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import Home from "./src/screens/Home";
import Search from "./src/screens/Search";
import Places from "./src/screens/Places";
import Explore from "./src/screens/Explore";
import ListByCity from "./src/screens/ListByCity";
import ListByTag from "./src/screens/ListByTag";
import ShowAllCitiesPage from "./src/screens/ShowAllCities";
import ShowAllTags from "./src/screens/ShowAllTags";
import Single from "./src/screens/Single";
import Header from "./src/components/Header";
import Icon from "react-native-vector-icons/dist/Entypo";
import { TAB_ICON_ACTIVE, TAB_ICON_INACTIVE } from "./src/theme/colors";
import { M_Regular } from "./src/theme/fonts";

const HomeStack = createStackNavigator({
  Home: Home,
  ListByCity: ListByCity,
  ListByTag: ListByTag,
  ShowAllTags: ShowAllTags,
  Single: Single
});

const CitiesStack = createStackNavigator({
  CitiesMain: ShowAllCitiesPage,
  ListByCity: ListByCity,
  Single: Single
});
const SearchStack = createStackNavigator({
  Search: Explore,
  ListByCity: ListByCity,
  ListByTag: ListByTag,
  ShowAllTags: ShowAllTags,
  Single: Single
});
const PlacesStack = createStackNavigator({
  Places: Places,
  Single: Single
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Search: SearchStack,
    Places:PlacesStack,
    Cities: CitiesStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        let color = focused ? TAB_ICON_ACTIVE : TAB_ICON_INACTIVE;
        const { routeName } = navigation.state;

        if (routeName === "Home") {
          return <Icon name="home" size={25} color={color} />;
        }
        if (routeName === "Search") {
          return <Icon name="magnifying-glass" size={25} color={color} />;
        }
        if (routeName === "Places") {
          return <Icon name="location" size={25} color={color} />;
        }
        if (routeName === "Cities") {
          return <Icon name="list" size={27} color={color} />;
        }
      }
    }),
    // resetOnBlur:true,
    tabBarOptions: {
      activeTintColor: TAB_ICON_ACTIVE,
      inactiveTintColor: TAB_ICON_INACTIVE,
      labelStyle: {
        fontSize: 10,
        fontFamily:M_Regular,
        textTransform:'uppercase'
      }
    }
  }
);

// const StackNavigator = createStackNavigator({
//   Tab: {
//     screen: TabNavigator,
//     navigationOptions: { header: <Header/> }
//  }
// })

export default createAppContainer(TabNavigator);
