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
  Share,
} from "react-native";
import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import Collapsible from "react-native-collapsible";
import { strip_html_tags, decode_html } from "../Utils/Helpers";
import { M_BOLD, M_SemiBold } from "../theme/fonts";
import Swiper from "react-native-swiper";
import { APP_ORANGE, GOLD_MEMBER, SILVER_MEMBER } from "../theme/colors";
import ImageModal from "../components/ImageModal";
import MultipleNumber from "../components/MultipleNumber";
import moment from "moment";
import Map from "../components/Map";
import { getPostByID, getPlaceDetails, getListPlaceImage } from "../Utils/Api";
import Spinner from "react-native-spinkit";
var dayNameArr = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday"
];

const Single = props => {
  const [loading, setloading] = useState(true);
  const [isCollapsed, setisCollapsed] = useState(true);
  const [post, setpost] = useState({});
  const [images, setimages] = useState([]);
  const [mainImg, setmainImg] = useState([]);
  const [showImages, setshowImages] = useState(false);
  const [showMainImage, setshowMainImage] = useState(false);
  const [showWhatsapp, setshowWhatsapp] = useState(false);
  const [showCall, setshowCall] = useState(false);
  const [contactNo, setcontactNo] = useState([]);

  useEffect(() => {
    let params = props.navigation.state.params;
    if (params && params.googlePlaceId && params.googlePlaceId != post.id) {
      let googlePlaceId = params.googlePlaceId;
      isFromGoogle(googlePlaceId);
      return;
    }
    if (params && params.post && params.post.id && params.post.id != post.id) {
      let post = params.post;
      setPostData(post);
      return;
    }
    if (
      params &&
      !params.post &&
      !params.googlePlaceId &&
      params.postId &&
      params.postId != post.id
    ) {
      if (params.postId.toString().match(/[a-z]/i) != null) {
        isFromGoogle(params.postId);
        return;
      }
      getPostByID(params.postId.toString().replace(":", ""))
        .then(data => {
          if (data && data.id) {
            setPostData(data);
          }
        })
        .catch(e => setloading(false));
    }
  }, [props]);

  const isFromGoogle = googlePlaceId => {
    getPlaceDetails(googlePlaceId)
      .then(data => {
        if ((data.status = "OK")) {
          setGooglePostData(data.result);
        }
      })
      .catch(error => console.log(error));
  };

  const setGooglePostData = data => {
    let g_data = {};
    g_data.acf = {};
    g_data.title = {};
    g_data.map = {};
    // g_data.acf.images = false;
    g_data.id = data.place_id;
    g_data.link = `http://www.siridigitalmarketing.com/cityapp/`;
    g_data.acf.address = data.formatted_address;
    g_data.acf.contact_no = data.formatted_phone_number;
    g_data.title.rendered = data.name;
    g_data.acf.dvc_name = data.name;
    g_data.map.address = data.formatted_address;
    g_data.map.lat = data.geometry ? data.geometry.location.lat : null;
    g_data.map.lng = data.geometry ? data.geometry.location.lng : null;
    if (data.opening_hours && data.opening_hours.periods) {
      data.opening_hours.periods.map(period => {
        if (period.close) {
          let openTime = moment(period.open.time, "hhmm").format("hh:mm:ss");
          let closeTime = moment(period.close.time, "hhmm").format("hh:mm:ss");
          let day = dayNameArr[period.close.day];
          g_data.acf[day] = {};
          g_data.acf[day].closes_at = closeTime;
          g_data.acf[day].opens_at = openTime;
          g_data.acf[day].open_24_hrs = closeTime == openTime ? true : false;
          return g_data;
        }
      });
    }
    if (data.photos && data.photos.length > 0) {
      setGooglePhotos(data.photos);
    }

    setPostData(g_data);
  };

  const getPhtoUrl = async photo => {
    return getListPlaceImage(photo.photo_reference, 300)
      .then(url => {
        if (url) {
          let obj = { url: url };
          return obj;
        }
      })
      .catch(error => console.log(error));
  };
  const setGooglePhotos = async photos => {
    let arr = await Promise.all(photos.map(item => getPhtoUrl(item)));
    if (arr.length > 0) {
      getMainImgUrl(arr[0].url);
      setimages(arr);
    }
  };

  const setPostData = postData => {
    setpost(postData);
    postData.acf && postData.acf.images && getImgUrls(postData.acf.images);
    postData.acf &&
      postData.acf.contact_no &&
      getIContactNo(postData.acf.contact_no);
    postData.fimg_url && getMainImgUrl(postData.fimg_url);
    setloading(false);
  };

  const selecTfirstImage = image => {
    console.log("main", image);
    let arr = [];
    if (image) {
      arr.push({ url: image.image });
    }
    setmainImg(arr);
  };
  const getIContactNo = contact_no => {
    let numbers = contact_no.split(",");
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
      Linking.openURL(`tel:${post.acf.contact_no}`);
      return;
    }
    if (contactNo.length > 1) {
      setshowCall(true);
    }
  };

  onShare = async () => {
    try {
      let url = post.link + "?visitlink=cityapp://citypost:" + post.id;
      let title = decode_html(post.title.rendered);
      const result = await Share.share({
        message: title + "\n" + url,
        url: url,
        title: title + "\n" + url,
        dialogTitle: title
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const getTime = day => {
    let time = " ---";
    if (post.acf && post.acf[day] && post.acf[day].opens_at) {
      let opens_at = post.acf[day].opens_at
        ? moment(post.acf[day].opens_at, "hh:mm A").format("hh:mm A")
        : "";
      let closes_at = post.acf[day].closes_at
        ? moment(post.acf[day].closes_at, "hh:mm A").format("hh:mm A")
        : "";
      time = `${opens_at} - ${closes_at}`;
    }
    if (post.acf && post.acf[day] && post.acf[day].open_24_hrs) {
      time = "Open 24 Hrs";
    }
    return (
      <Text style={styles.timing}>
        <Text style={styles.dayname}>{day}: </Text>
        {time}
      </Text>
    );
  };
  if (loading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Spinner type="9CubeGrid" color={APP_ORANGE} size={40} />
      </View>
    );
  }

  if (!post) return null;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <ImageBackground
          style={styles.featured}
          source={{
            uri:mainImg.length>0? mainImg[0].url:''
          }}
        >
          <TouchableNativeFeedback
            onPress={() => {
              if (mainImg) {
                setshowMainImage(true);
              }
            }}
          >
            <View style={styles.overlay}>
              <Text style={styles.title}>
                {decode_html(post.title.rendered)}
              </Text>
            </View>
          </TouchableNativeFeedback>
        </ImageBackground>
        <View style={styles.iconContainer}>
          <>
            <View>
              {post.acf.member_status && post.acf.member_status != "normal" && (
                <TouchableOpacity>
                  <Icon
                    name="crown"
                    size={30}
                    color={
                      post.acf.member_status == "gold"
                        ? GOLD_MEMBER
                        : SILVER_MEMBER
                    }
                    style={[styles.Icon, { margin: 4 }]}
                  />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              onPress={this.onShare}
              style={{ alignItems: "flex-end" }}
            >
              <Icon
                name="share-variant"
                size={24}
                color="#000"
                style={[styles.Icon, { margin: 4 }]}
              />
            </TouchableOpacity>
          </>
        </View>

        <View style={styles.content}>
          {post.content && (
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
          )}
          <View style={styles.detailBox}>
            <View style={styles.flex}>
              <Icon name="map" size={20} color="#000" style={styles.Icon} />
              <Text style={styles.iconText}>Address</Text>
            </View>
            <Text style={styles.results}>{post.acf.address}</Text>
          </View>
          {post.acf.map && (
            <View style={styles.detailBox}>
              <View style={styles.flex}>
                <Map
                  lat={post.acf.map.lat}
                  lng={post.acf.map.lng}
                  address={post.acf.address}
                />
              </View>
            </View>
          )}
          <View style={styles.detailBox}>
            <View style={styles.flex}>
              <Icon
                name="account-circle-outline"
                size={20}
                color="#000"
                style={styles.Icon}
              />
              <Text style={styles.iconText}>Name</Text>
            </View>
            <Text style={styles.results}>{post.acf.dvc_name}</Text>
          </View>
          <View style={styles.detailBox}>
            <View style={styles.flex}>
              <Icon name="phone" size={20} color="#000" style={styles.Icon} />
              <Text style={styles.iconText}>Contact </Text>
            </View>
            {/* <Text style={styles.results}>{post.acf.dvc_name}</Text> */}
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
              {images.length > 0 && (
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
                    {images.map((img, index) => (
                      <View style={{ flex: 1 }} key={`img-${index}`}>
                        <Image
                          resizeMode="cover"
                          style={styles.image}
                          source={{ uri: img.url }}
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
Single.navigationOptions = ({ navigation }) => {
  if (navigation.state.routeName == "SinglePost") {
    return {
      title: "Place",
      headerTitleStyle: {
        textAlign: "center",
        alignSelf: "center",
        flex: 1,
        fontFamily: M_BOLD
      },
      headerRight: <View />,
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate("Tab")}>
          <Icon name="home" size={28} color="#000" style={{ marginLeft: 20 }} />
        </TouchableOpacity>
      )
    };
  }
  return {
    title: "Place",
    headerTitleStyle: {
      textAlign: "center",
      alignSelf: "center",
      flex: 1,
      fontFamily: M_BOLD
    },
    headerRight: <View />
  };
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
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20
  }
});
