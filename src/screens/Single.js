import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Linking,
  Alert,
  Modal
} from "react-native";
import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import Collapsible from "react-native-collapsible";
import { strip_html_tags } from "../Utils/Helpers";
import { M_BOLD, M_SemiBold } from "../theme/fonts";
import Swiper from "react-native-swiper";
import { APP_ORANGE } from "../theme/colors";
import ImageModal from "../components/ImageModal";
import MultipleNumber from "../components/MultipleNumber";
import moment from "moment";

const Single = props => {
  const [isCollapsed, setisCollapsed] = useState(true);
  const [post, setpost] = useState();
  const [images, setimages] = useState([]);
  const [mainImg, setmainImg] = useState([]);
  const [showImages, setshowImages] = useState(false);
  const [showMainImage, setshowMainImage] = useState(false);
  const [showWhatsapp, setshowWhatsapp] = useState(false);
  const [showCall, setshowCall] = useState(false);
  const [contactNo, setcontactNo] = useState([]);

  useEffect(() => {
    let params = props.navigation.state.params;
    if (params && params.post) {
      let post = params.post;
      setpost(post);
      post.acf && post.acf.images && getImgUrls(post.acf.images);
      post.acf && post.acf.contact_no && getIContactNo(post.acf.contact_no);
      post.fimg_url && getMainImgUrl(post.fimg_url);
    }
  }, []);

  const getIContactNo = contact_no => {
    console.log(contact_no);
    let numbers = contact_no.split(",");
    console.log(numbers);
    setcontactNo(numbers);
  };

  const getImgUrls = images => {
    let arr = [];
    images.forEach(img => {
      arr.push({ url: img.image });
    });
    setimages(arr);
  };

  const getMainImgUrl = image => {
    let arr = [];
    if (image) {
      arr.push({ url: image });
    }
    setmainImg(arr);
  };

  const hideImages = () => setshowImages(false);

  const hideMainImage = () => setshowMainImage(false);

  const hideWhatsapp = () => setshowWhatsapp(false);

  const hideCall = () => setshowCall(false);

  const gotoWhatsApp = () => {
    if (contactNo <= 0) {
      alert("Oops!! No number found");
      return;
    }
    if (contactNo.length == 1) {
      Linking.openURL(`whatsapp://send?phone=${contactNo[0]}`);
      return;
    }
    if (contactNo.length > 1) {
      setshowWhatsapp(true);
    }
  };
  const gotoCall = () => {
    if (contactNo <= 0) {
      alert("Oops!! No number found");
      return;
    }
    if (contactNo.length == 1) {
      Linking.openURL(`tel:${post.acf.contact_no}`)
      return;
    }
    if (contactNo.length > 1) {
      setshowCall(true);
    }
  };

  const getTime = day => {
    let time = " ---";
    if (post.acf && post.acf[day] && post.acf[day].opens_at) {
      time =
        post.acf[day].opens_at &&
        moment(post.acf[day].opens_at, "hh:mm A").format("hh:mm A") +
          " " +
          post.acf[day].closes_at &&
        moment(post.acf[day].closes_at, "hh:mm A").format("hh:mm A");
    }
    return (
      <Text style={styles.timing}>
        <Text style={styles.dayname}>{day}:</Text>
        {time}
      </Text>
    );
  };

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
          <TouchableNativeFeedback onPress={() => setshowMainImage(true)}>
            <View style={styles.overlay}>
              <Text style={styles.title}>{post.title.rendered}</Text>
            </View>
          </TouchableNativeFeedback>
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
            <View style={[{ flexDirection: "row" }, styles.buttons]}>
              <TouchableOpacity
                style={styles.call}
                onPress={() => gotoCall()}
                // onPress={() => Linking.openURL(`tel:${post.acf.contact_no}`)}
              >
                <Icon
                  name="phone"
                  size={17}
                  color="#fff"
                  style={styles.btnIcon}
                />
                <Text style={styles.btnText}>Call </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.whatsapp}
                onPress={() => gotoWhatsApp()}
              >
                <Icon
                  name="whatsapp"
                  size={18}
                  color="#fff"
                  style={styles.btnIcon}
                />
                <Text style={styles.btnText}>Whatsapp </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.detailBox}>
            <View style={styles.flex}>
              <Icon name="timer" size={23} color="#000" style={styles.Icon} />
              <Text style={styles.iconText}>Timings </Text>
              <TouchableOpacity
                style={{ marginLeft: 20 }}
                onPress={() => {
                  setisCollapsed(!isCollapsed);
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
              <View style={styles.results}>
                {getTime("monday")}
                {getTime("tuesday")}
                {getTime("wednesday")}
                {getTime("thursday")}
                {getTime("friday")}
                {getTime("saturday")}
                {getTime("sunday")}
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
                <TouchableNativeFeedback
                  onPress={() => {
                    setshowImages(true);
                  }}
                >
                  <Swiper
                    height={180}
                    dot={<View style={[styles.dot, styles.dotStyle]} />}
                    activeDot={<View style={[styles.dot, styles.activeDot]} />}
                    loop
                  >
                    {post.acf.images.map(img => (
                      <View style={{ flex: 1 }} key={`img-${img.image.ID}`}>
                        <Image
                          resizeMode="cover"
                          style={styles.image}
                          source={{ uri: img.image }}
                        />
                      </View>
                    ))}
                  </Swiper>
                </TouchableNativeFeedback>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <ImageModal urls={images} isOpen={showImages} closeModal={hideImages} />
      <ImageModal
        urls={mainImg}
        isOpen={showMainImage}
        closeModal={hideMainImage}
      />
      <MultipleNumber
        isOpen={showWhatsapp}
        closeModal={hideWhatsapp}
        numbers={contactNo}
        isWhatsapp={true}
      />
      <MultipleNumber
        isOpen={showCall}
        closeModal={hideCall}
        numbers={contactNo}
        isWhatsapp={false}

      />
    </View>
  );
};

export default Single;
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
    width: "100%",
    height: 200,
    flex: 1
  },
  dot: {
    borderRadius: 12,
    margin: 3
  },
  dotStyle: {
    backgroundColor: "#fff",
    width: 8,
    height: 8
  },
  activeDot: {
    backgroundColor: APP_ORANGE,
    width: 12,
    height: 12
  },
  results: {
    paddingLeft: 20
  },
  buttons: {
    paddingVertical: 6,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 20
  },
  call: {
    backgroundColor: "#0274f1",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 3,
    flexDirection: "row"
  },
  whatsapp: {
    backgroundColor: "#25D366",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 3,
    marginLeft: 10,
    flexDirection: "row"
  },
  btnIcon: {
    marginRight: 4
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold"
  },
  timing: {
    marginBottom: 4
  },
  dayname: {
    fontFamily: M_SemiBold,
    textTransform: "capitalize"
  }
});
