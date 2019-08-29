import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  ActivityIndicator,
  StyleSheet,
  Image,
  PermissionsAndroid
} from "react-native";
import Icon from "react-native-vector-icons/dist/Entypo";
import { useSelector } from "react-redux";

import Geolocation from "react-native-geolocation-service";
import GoogleList from "../components/googleData/List";

import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
// import styles from "../assets/style.js";
import { getPostBytag, getNearbyPlaces } from "../Utils/Api.js";
import {
  text_truncate,
  strip_html_tags,
  getTimeInfo,
  decode_html
} from "../Utils/Helpers.js";
import { M_BOLD, M_Light, M_Regular } from "../theme/fonts.js";
import { APP_ORANGE, GOLD_MEMBER, SILVER_MEMBER } from "../theme/colors.js";
import IconMat from "react-native-vector-icons/dist/MaterialCommunityIcons";

const ListByTag = props => {
  const per_page = 10;
  const [tag, settag] = useState();
  const [posts, setposts] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [loadMore, setloadMore] = useState(false);
  const [postEnd, setpostEnd] = useState(false);
  const authLocation = useSelector(state => state.authLocation);
  const [googleData, setgoogleData] = useState(false);

  const scrollY = new Animated.Value(0);

  useEffect(() => {
    let city = authLocation.city;

    if (props.navigation.state.params.item) {
      let tagData = props.navigation.state.params.item;
      settag(tagData);
      getPostBytag(tagData.id, city)
        .then(data => {
          if (data.length > 0) {
            setposts(data);
          } else {
            if (tagData.name == "atm" || tagData.name == "bank") {
              checkLocationAcess();
            }
          }
        })
        .catch(e => console.log(e));
    }
  }, [props]);

  loadMoreData = () => {
    setloadMore(true);
    let city = authLocation.city;

    getPostBytag(tag.id, city, per_page, currentpage + 1)
      .then(data => {
        if (Array.isArray(data) && data.length) {
          let new_data = posts.concat(data);
          setcurrentpage(currentpage + 1);
          setposts(new_data);
        } else {
          setpostEnd(true);
        }
        setloadMore(false);
      })
      .catch(e => console.log(e));
  };

  checkLocationAcess = () => {
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message:
        "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
      ok: "YES",
      cancel: "NO",
      enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
      showDialog: true, // false => Opens the Location access page directly
      openLocationServices: true, // false => Directly catch method is called if location services are turned off
      preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
      preventBackClick: false, // true => To prevent the location services popup from closing when it is clicked back button
      providerListener: false // true ==> Trigger locationProviderStatusChange listener when the location state changes
    })
      .then(function(success) {
        checkGranted();
      })
      .catch(error => {
        setloading(false);
      });
  };

  const checkGranted = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            let value = `${position.coords.latitude},${position.coords.longitude}`;
            getNearbyPlaces(value, tag.name).then(data => {
              if (data.status == "OK") {

                setgoogleData(true);
                setposts(data.results);

                // setloading(false);
              } else {
                // setloading(false);
              }
            }).cat;
          },
          error => {
            setloading(false);

            console.log(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
          }
        );
      } else {
        setloading(false);
      }
    } catch (err) {
      console.warn(err);
      setloading(false);
    }
  };

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  renderFooter = () => {
    if (!posts.length || posts.length < 10) return null;
    return (
      <View style={styles.footer}>
        {loadMore && (
          <ActivityIndicator style={{ marginLeft: 8 }} color={APP_ORANGE} />
        )}
      </View>
    );
  };

  gotoPost = post => {
    props.navigation.navigate("Single", {
      post: post
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {googleData &&posts.length>0&& <GoogleList data={posts} />}
      {!googleData && (
        <ScrollView
          // style={{ marginBottom: 50 }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            {
              listener: event => {
                if (this.isCloseToBottom(event.nativeEvent) && !postEnd) {
                  this.loadMoreData();
                }
              }
            }
          )}
        >
          <View style={styles.wrapper}>
            {tag && (
              <View>
                <View style={styles.header}>
                  <Text style={styles.results}>Tag > {tag.name}</Text>
                  <Text style={styles.results}>Results({posts.length})</Text>
                </View>
                <FlatList
                  keyExtractor={item => `post-${item.id}`}
                  data={posts}
                  renderItem={post => {
                    let timeInfo = getTimeInfo(post.item);
                    return (
                      post.item && (
                        <TouchableOpacity onPress={() => gotoPost(post.item)}>
                          <View style={styles.place}>
                            <View style={styles.left}>
                              {post.item.fimg_url ? (
                                <Image
                                  style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25
                                  }}
                                  source={{
                                    uri: post.item.fimg_url
                                  }}
                                />
                              ) : (
                                <View
                                  style={{
                                    borderRadius: 25,
                                    backgroundColor: "red"
                                  }}
                                >
                                  <Icon
                                    name="image"
                                    size={30}
                                    color="#fff"
                                    style={styles.image}
                                  />
                                </View>
                              )}
                            </View>
                            <View style={styles.right}>
                              <Text style={styles.title}>
                                {post.item.title &&
                                  decode_html(post.item.title.rendered)}
                              </Text>
                              {post.item.content &&
                                post.item.content.rendered != "" && (
                                  <Text style={styles.description}>
                                    {text_truncate(
                                      strip_html_tags(
                                        post.item.content.rendered
                                      ),
                                      75
                                    )}
                                  </Text>
                                )}
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center"
                                }}
                              >
                                {timeInfo && (
                                  <Text style={styles.timeInfo}>
                                    {timeInfo}
                                  </Text>
                                )}
                                {post.item.acf.member_status &&
                                  post.item.acf.member_status != "normal" && (
                                    <IconMat
                                      name="crown"
                                      size={25}
                                      color={
                                        post.item.acf.member_status == "gold"
                                          ? GOLD_MEMBER
                                          : SILVER_MEMBER
                                      }
                                      style={[styles.Icon, { margin: 4 }]}
                                    />
                                  )}
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )
                    );
                  }}
                  // ItemSeparatorComponent={() => <View style={styles.separator} />}
                  ListFooterComponent={renderFooter}
                  //Adding Load More button as footer component
                />
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};
ListByTag.navigationOptions = {
  title: "Places",
  headerTitleStyle: {
    textAlign: "center",
    alignSelf: "center",
    flex: 1,
    fontFamily: M_BOLD
  },
  headerRight: <View />
};
export default ListByTag;

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
    paddingHorizontal: 15
  },
  place: {
    backgroundColor: "#fff",
    marginBottom: 15,
    flexDirection: "row",
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1.0,
    shadowRadius: 15,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  left: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  right: {
    overflow: "hidden",
    paddingVertical: 15,
    paddingHorizontal: 5,
    flex: 2
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 5
  },
  description: {
    fontSize: 13,
    color: "rgba(0,0,0,0.5)"
  },
  catTitle: {
    fontSize: 16
  },
  results: {
    fontSize: 15,
    // fontWeight: "bold",
    color: "rgba(0,0,0,0.5)",
    textTransform: "capitalize",
    fontFamily: M_BOLD
  },
  header: {
    marginBottom: 20,
    marginHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20
  },
  loadMoreBtn: {
    borderWidth: 1,
    borderColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "gray",
    textAlign: "center",
    paddingTop: 10
  },
  timeInfo: {
    fontFamily: M_Regular,
    color: "#000",
    fontSize: 12,
    marginVertical: 5,
    color: "green"
  }
});
