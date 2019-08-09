import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import Collapsible from "react-native-collapsible";
import Lightbox from "react-native-lightbox";
import { strip_html_tags } from "../Utils/Helpers";
import { M_BOLD } from "../theme/fonts";
import Banner from "../components/Banner";
import Swiper from 'react-native-swiper'
import { APP_ORANGE } from "../theme/colors";

export default class Single extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: true,
      post: props.navigation.state.params.post
    };
  }

  render() {
    const { isCollapsed, post } = this.state;
    console.log(post);
    console.log("post");
    if (!post) return null;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <ImageBackground
            style={styles.featured}
            source={{
              uri: post.fimg_url
            }}
          >
            <View style={styles.overlay}>
              {/* <Icon name="chevron-left" size={32} color="#fff" /> */}
              <Text style={styles.title}>{post.title.rendered}</Text>
            </View>
          </ImageBackground>
          <View style={styles.content}>
            <View style={styles.detailBox}>
              <View style={styles.flex}>
                <Icon
                  name="information-outline"
                  size={22}
                  color="#000"
                  style={styles.Icon}
                />
                <Text style={styles.iconText}>More Information</Text>
              </View>
              <Text style={styles.results}>
                {strip_html_tags(post.content.rendered)}
              </Text>
            </View>
            <View style={styles.detailBox}>
              <View style={styles.flex}>
                <Icon name="map" size={20} color="#000" style={styles.Icon} />
                <Text style={styles.iconText}>Address</Text>
              </View>
              <Text style={styles.results}>{post.acf.address}</Text>
            </View>
            <View style={styles.detailBox}>
              <View style={styles.flex}>
                <Icon name="phone" size={20} color="#000" style={styles.Icon} />
                <Text style={styles.iconText}>Contact </Text>
              </View>
              <Text style={styles.results}>{post.acf.contact_no}</Text>
            </View>
            <View style={styles.detailBox}>
              <View style={styles.flex}>
                <Icon name="timer" size={23} color="#000" style={styles.Icon} />
                <Text style={styles.iconText}>Timings </Text>
                <TouchableOpacity
                  style={{ marginLeft: 20 }}
                  onPress={() => {
                    this.setState({ isCollapsed: !isCollapsed });
                  }}
                >
                  <Icon
                    name={isCollapsed ? "chevron-down" : "chevron-up"}
                    size={25}
                    color="#000"
                    style={styles.Icon}
                  />
                </TouchableOpacity>
              </View>
              <Collapsible collapsed={isCollapsed}>
                <View>
                  <Text style={styles.results}>Monday: {post.acf.monday}</Text>
                  <Text style={styles.results}>
                    Tuesday: {post.acf.tuesday}
                  </Text>
                  <Text style={styles.results}>
                    Wednesday: {post.acf.wednesday}
                  </Text>
                  <Text style={styles.results}>
                    Thursday: {post.acf.thursday}
                  </Text>
                  <Text style={styles.results}>Friday: {post.acf.friday}</Text>
                  <Text style={styles.results}>
                    Saturday: {post.acf.saturday}
                  </Text>
                  <Text style={styles.results}>Sunday: {post.acf.sunday}</Text>
                </View>
              </Collapsible>
            </View>
            <View style={styles.detailBox}>
              <View style={styles.flex}>
                <Icon name="map" size={20} color="#000" style={styles.Icon} />
                <Text style={styles.iconText}>Images</Text>
              </View>
              <View style={styles.gallery}>
                {post.acf.images && (
                  <Swiper
                    // style={styles.wrapper}
                    height={180}
                    dot={<View style={[styles.dot, styles.dotStyle]} />}
                    activeDot={<View style={[styles.dot, styles.activeDot]} />}
                    // paginationStyle={{
                    //   bottom: -7
                    // }}
                    loop
                  >
                    {post.acf.images.map(img => (
                      <View style={{flex:1}} key={`img-${img.image.ID}`}>
                        <Image
                          resizeMode="cover"
                          style={styles.image}
                          source={{ uri: img.image }}
                        />
                      </View>
                    ))}
                  </Swiper>
                )}
                {/* <Lightbox underlayColor="white" styles={styles.Lightbox}>
                  <Image
                    style={styles.contain}
                    resizeMode="contain"
                    source={{
                      uri:
                        "https://www.yayomg.com/wp-content/uploads/2014/04/yayomg-pig-wearing-party-hat.jpg"
                    }}
                  />
                </Lightbox>
                <Lightbox underlayColor="white" styles={styles.Lightbox}>
                  <Image
                    style={styles.contain}
                    resizeMode="contain"
                    source={{
                      uri:
                        "https://www.yayomg.com/wp-content/uploads/2014/04/yayomg-pig-wearing-party-hat.jpg"
                    }}
                  />
                </Lightbox>
                <Lightbox underlayColor="white" styles={styles.Lightbox}>
                  <Image
                    style={styles.contain}
                    resizeMode="contain"
                    source={{
                      uri:
                        "https://www.yayomg.com/wp-content/uploads/2014/04/yayomg-pig-wearing-party-hat.jpg"
                    }}
                  />
                </Lightbox> */}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
Single.navigationOptions = {
  title: "Place",
  headerTitleStyle: {
    textAlign: "center",
    alignSelf: "center",
    flex: 1,
    fontFamily: M_BOLD
  },
  headerRight: <View />
};
const styles = StyleSheet.create({
  gallery: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  contain: {
    flex: 1,
    height: 150
  },
  Lightbox: {},
  featured: {
    height: 220,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    // justifyContent: "space-between",
    padding: 20
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  detailBox: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  Icon: {
    marginRight: 10
  },
  iconText: {
    fontWeight: "bold",
    fontSize: 16
  },
  image: {
    width:'100%',
    height:200,
    flex: 1
  },
  dot: {
    borderRadius: 12,
    margin: 3
  },
  dotStyle: {
    backgroundColor: '#fff',
    width: 8,
    height: 8,

  },
  activeDot: {
    backgroundColor: APP_ORANGE,
    width: 12,
    height: 12,
  }
});
