import React from "react";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import Home from "./src/screens/Home";
import Places from "./src/screens/Places";
import Explore from "./src/screens/Explore";
import ListByCity from "./src/screens/ListByCity";
import ListByTag from "./src/screens/ListByTag";
import ShowAllCitiesPage from "./src/screens/ShowAllCities";
import ShowAllTags from "./src/screens/ShowAllTags";
import Single from "./src/screens/Single";
import Icon from "react-native-vector-icons/dist/Entypo";
import { TAB_ICON_ACTIVE, TAB_ICON_INACTIVE } from "./src/theme/colors";
import { M_Regular, M_SemiBold } from "./src/theme/fonts";
import GooglePlaceSingle from "./src/components/googleData/Single";
import Buy from "./src/screens/Buy";
import { View,Text } from "react-native";
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
  Single: Single,
  GooglePlaceSingle: GooglePlaceSingle
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Search: SearchStack,
    Shop: Buy,
    Nearby: PlacesStack,
    Cities: CitiesStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        let color = focused ? TAB_ICON_ACTIVE : TAB_ICON_INACTIVE;
        let shopIconColor = focused ? "#fff" : TAB_ICON_INACTIVE;
        let shopIconbgColor = focused ? "#000" : "#fff";
        const { routeName } = navigation.state;

        if (routeName === "Home") {
          return <Icon name="home" size={25} color={color} />;
        }
        if (routeName === "Search") {
          return <Icon name="magnifying-glass" size={25} color={color} />;
        }
        if (routeName === "Nearby") {
          return <Icon name="location" size={25} color={color} />;
        }
        if (routeName === "Cities") {
          return <Icon name="list" size={27} color={color} />;
        }
        if (routeName === "Shop") {
          return (
            <View
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                position: "absolute",
                padding: 13,
                backgroundColor: shopIconbgColor,
                shadowOffset: {
                  width: 0,
                  height: 6
                }
              }}
              elevation={5}
            >
              <Icon name="shop" size={30} color={shopIconColor} />
            </View>
          );
        }
      },
      tabBarLabel: ({ focused, horizontal, tintColor }) => {
        let color = focused ? TAB_ICON_ACTIVE : TAB_ICON_INACTIVE;
        let shopIconColor = focused ? "#fff" : TAB_ICON_INACTIVE;
        const { routeName } = navigation.state;
        if (routeName === "Shop") {
          return (
            <Text
              style={{
                fontSize: 10,
                fontFamily: M_SemiBold,
                textTransform: "uppercase",
                textAlign: "center",
                color: shopIconColor
              }}
            >
              {routeName}
            </Text>
          );
        }
        return (
          <Text
            style={{
              fontSize: 10,
              fontFamily: M_SemiBold,
              textTransform: "uppercase",
              textAlign:'center',
              color:color
            }}
          >
            {routeName}
          </Text>
        );
        // console.log(navigation)
        //         return
        
      }
    }),
    resetOnBlur: true,
    tabBarOptions: {
      activeTintColor: TAB_ICON_ACTIVE,
      inactiveTintColor: TAB_ICON_INACTIVE,
      labelStyle: {
        fontSize: 10,
        fontFamily: M_SemiBold,
        textTransform: "uppercase"
      }
    }
  }
);

const SinglePostStack = createStackNavigator({
  SinglePost: {
    screen: Single
    // path:'singlepost:postId'
  }
});

const StackNavigator = createStackNavigator(
  {
    Tab: {
      screen: TabNavigator
    },
    SinglePostStack: {
      screen: SinglePostStack,
      path: "citypost:postId"
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

export default createAppContainer(StackNavigator);
