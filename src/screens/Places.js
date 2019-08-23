import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Animated,
  Image
} from "react-native";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { getPostByCategoryName, searchPost } from "../Utils/Api";
import Icon from "react-native-vector-icons/dist/Entypo";
import { text_truncate, strip_html_tags, getTimeInfo, decode_html } from "../Utils/Helpers";
import Spinner from "react-native-spinkit";
import { APP_ORANGE } from "../theme/colors";
import { M_Light, M_BOLD, M_Regular } from "../theme/fonts";
import SearchBar from "../components/SearchBar";
const scrollY = new Animated.Value(0);

const Places = props => {
  const per_page = 10;

  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [defaultData, setdefaultData] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [currentSearchpage, setcurrentSearchpage] = useState(0);
  const [loadMore, setloadMore] = useState(false);
  const [isSearching, setisSearching] = useState(false);
  const [postEnd, setpostEnd] = useState(false);
  const locationLoading = useSelector(state => state.locationLoading);
  const authLocation = useSelector(state => state.authLocation);

  useEffect(() => {
    console.log("nearby");
    console.log(authLocation);
    let city = authLocation.city;
    getPostByCategoryName(city)
      .then(data => {
        setdata(data);
        setloading(false);
      })
      .catch(e => console.log(e));
  }, [authLocation]);

  loadMoreData = () => {
    let city = authLocation.city;
    setloadMore(true);
    getPostByCategoryName(city,  currentpage + 1,per_page)
      .then(postdata => {
        if (Array.isArray(postdata) && postdata.length) {
          let new_data = data.concat(postdata);
          setcurrentpage(currentpage + 1);
          setdata(new_data);
          setdefaultData(data);

          if (postdata.length <= 0) {
            setpostEnd(true);
          }
        } else {
          setpostEnd(true);
        }
        setloadMore(false);
      })
      .catch(e => console.log(e));
  };

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  handleSearch = text => {
    setisSearching(true);
    if (!text) {
      setdata(defaultData);
      setisSearching(false);
      return;
    }
    let city = authLocation.city;
    searchPost(text, city)
      .then(data => {
        if (Array.isArray(data) && data.length) {
          // let new_data = searchData.contag(data);
          // setcurrentSearchpage(currentSearchpage + 1);
          // setsearcgData(data);
          setdata(data);
          setisSearching(false);
        } else {
          setpostEnd(true);
        }
        // setloadMore(false)
      })
      .catch(e => console.log(e));
  };

  renderFooter = () => {
    return (
      <View style={[styles.row, styles.footer]}>
        {loadMore && (
          <ActivityIndicator style={{ marginLeft: 8 }} color={APP_ORANGE} />
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Spinner type="Pulse" color={APP_ORANGE} size={80} />
      </View>
    );
  }

  if (!data.length && !loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 20
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "gray",
            fontFamily: M_BOLD,
            textAlign: "center"
          }}
        >
          Oops!! there are no nearby places registered right now.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      scrollEventThrottle={16}
      onMomentumScrollEnd={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
          listener: event => {
            if (
              this.isCloseToBottom(event.nativeEvent) &&
              !postEnd &&
              !loadMore
            ) {
              this.loadMoreData();
            }
          }
        }
      )}
    >
      <SearchBar placeholder="Search..." onChangeText={handleSearch} />
      {isSearching && (
        <ActivityIndicator
          style={{ marginLeft: 8, alignSelf: "center" }}
          color={APP_ORANGE}
        />
      )}

      <FlatList
        keyExtractor={item => `post-${item.id}`}
        data={data}
        renderItem={post => {
          let timeInfo = getTimeInfo(post.item);
          return (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("Single", {
                  post: post.item
                })
              }
            >
              <View style={styles.place}>
                <View style={styles.left}>
                  {post.item.fimg_url ? (
                    <Image
                      style={{ width: 50, height: 50, borderRadius: 25 }}
                      source={{
                        uri: post.item.fimg_url
                      }}
                    />
                  ) : (
                    <View style={{ borderRadius: 25, backgroundColor: "red" }}>
                      <Icon
                        name="image"
                        size={30}
                        color="#fff"
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 25,
                          backgroundColor: "gray",
                          textAlign: "center",
                          paddingTop: 10
                        }}
                      />
                    </View>
                  )}
                </View>
                <View style={styles.right}>
                  <Text style={styles.title}>{decode_html(post.item.title.rendered)}</Text>
                  {post.item.content.rendered != "" && (
                    <Text style={styles.description}>
                      {text_truncate(
                        strip_html_tags(post.item.content.rendered),
                        75
                      )}
                    </Text>
                  )}
                  {timeInfo && <Text style={styles.timeInfo}>{timeInfo}</Text>}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {renderFooter()}
      {/* {data && data.length >= per_page && renderFooter()} */}
    </ScrollView>
  );
};

Places.navigationOptions = {
  header: <Header />
};

export default Places;

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
    alignItems: "center",
    marginHorizontal: 10
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
    justifyContent: "center",
    flex: 2
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 5
  },
  description: {
    fontSize: 13
    // color: "rgba(0,0,0,0.5)"
  },
  catTitle: {
    fontSize: 16
  },
  results: {
    fontSize: 15,
    fontWeight: "bold"
    // color: "rgba(0,0,0,0.5)"
  },
  header: {
    marginBottom: 20,
    marginHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  timeInfo: {
    fontFamily: M_Regular,
    color: "#000",
    fontSize: 12,
    marginVertical: 5,
    color:'green'
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20
  },
  row: {
    flexDirection: "row"
  }
});
