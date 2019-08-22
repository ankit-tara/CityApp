import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image
} from "react-native";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { getPostByCategoryName } from "../Utils/Api";
import Icon from "react-native-vector-icons/dist/Entypo";
import { text_truncate, strip_html_tags, getTimeInfo } from "../Utils/Helpers";
import Spinner from "react-native-spinkit";
import { APP_ORANGE } from "../theme/colors";
import { M_Light ,M_BOLD} from "../theme/fonts";

const Places = props => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const locationLoading = useSelector(state => state.locationLoading);
  const authLocation = useSelector(state => state.authLocation);

  useEffect(() => {
    let city = authLocation.city;
    getPostByCategoryName(city)
      .then(data => {
        setdata(data);
        setloading(false);
      })
      .catch(e => console.log(e));
  }, []);

  if (loading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Spinner type="Pulse" color={APP_ORANGE} size={80} />
      </View>
    );
  }
  if(!data.length && !loading){
    return(
      <View style={{flex:1,justifyContent:"center",alignItems:'center',marginHorizontal:20 }}>
        <Text style={{fontSize:20,color:'gray',fontFamily:M_BOLD,textAlign:"center"}}>Oops!! there are no nearby places registered right now.</Text>
      </View>
    )
  }

  return (
    <ScrollView>
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
                  <Text style={styles.title}>{post.item.title.rendered}</Text>
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
    fontFamily: M_Light,
    color: "#000",
    fontSize: 12,
    marginVertical: 5
  }
});
