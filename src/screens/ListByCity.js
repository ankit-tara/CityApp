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
  Image
} from "react-native";
import Icon from "react-native-vector-icons/dist/Entypo";
import { getPostByCategory } from "../Utils/Api.js";
import {
  text_truncate,
  strip_html_tags,
  getTimeInfo
} from "../Utils/Helpers.js";
import { M_BOLD, M_Light } from "../theme/fonts.js";
import { APP_ORANGE } from "../theme/colors.js";

const ListByCity = props => {
  const per_page = 10;
  const [category, setcategory] = useState();
  const [posts, setposts] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [loadMore, setloadMore] = useState(false);
  const [postEnd, setpostEnd] = useState(false);
  const scrollY = new Animated.Value(0);

  useEffect(() => {
    if (props.navigation.state.params.item) {
      setcategory(props.navigation.state.params.item);
      getPostByCategory(props.navigation.state.params.item.id)
        .then(data => {
          setposts(data);
        })
        .catch(e => console.log(e));
    }
  }, [props]);

  loadMoreData = () => {
    setloadMore(true);
    getPostByCategory(category.id, per_page, currentpage + 1)
      .then(data => {
        if(Array.isArray(data) && data.length){
          let new_data = posts.concat(data);
          setcurrentpage(currentpage + 1);
          setposts(new_data);
        
        }else{
          setpostEnd(true)
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
      <ScrollView
        // style={{ marginBottom: 50 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            listener: event => {
              if (!loadMore && !postEnd && this.isCloseToBottom(event.nativeEvent)) {
                this.loadMoreData();
              }
            }
          }
        )}
      >
        <View style={styles.wrapper}>
          {category && (
            <View>
              <View style={styles.header}>
                <Text style={styles.results}>Category > {category.name}</Text>
                <Text style={styles.results}>Results({posts.length})</Text>
              </View>
              <FlatList
                keyExtractor={item => `post-${item.id}`}
                data={posts}
                renderItem={post => {
                  let timeInfo = getTimeInfo(post.item);
                  if(!post.item) return null
                  return (
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
                          <Text style={styles.title}>
                            {post.item.title.rendered}
                          </Text>
                          {post.item.content.rendered != "" && (
                            <Text style={styles.description}>
                              {text_truncate(
                                strip_html_tags(post.item.content.rendered),
                                75
                              )}
                            </Text>
                          )}
                          {timeInfo && (
                            <Text style={styles.timeInfo}>{timeInfo}</Text>
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                ListFooterComponent={renderFooter}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
ListByCity.navigationOptions = {
  title: "Places",
  headerTitleStyle: {
    textAlign: "center",
    alignSelf: "center",
    flex: 1,
    fontFamily: M_BOLD
  },
  headerRight: <View />
};
export default ListByCity;

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
    fontWeight: "bold",
    color: "rgba(0,0,0,0.5)"
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
  timeInfo: {
    fontFamily: M_Light,
    color: "#000",
    fontSize: 12,
    marginVertical: 5
  }
});
