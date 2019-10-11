import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Picker,
  TouchableOpacity,
  TextInput,
  // Share,
  ToastAndroid,
  Alert,
  PermissionsAndroid,
  Platform
} from "react-native";
import { withNavigation } from "react-navigation";
import { M_BOLD, M_Regular, M_SemiBold } from "../../../theme/fonts";
import {
  text_truncate,
  strip_html_tags,
  decode_html
} from "../../../Utils/Helpers";
import Swiper from "react-native-swiper";
import ImageModal from "../../../components/ImageModal";
import { APP_SIDE_DISTANCE } from "../../../theme/Dimentions";
import Icon from "react-native-vector-icons/dist/Entypo";
import Iconfont from "react-native-vector-icons/dist/FontAwesome";
import { APP_ORANGE } from "../../../theme/colors";

import { addItems } from "../../../redux/actions/cartItems";
import { connect, useSelector } from "react-redux";
import RNFetchBlob from "rn-fetch-blob";
import Share from "react-native-share";
const { height } = Dimensions.get("window");
const Single = props => {
  const [item, setitem] = useState();
  const [images, setimages] = useState([]);

  const [showImages, setshowImages] = useState(false);
  const [Size, setsize] = useState(0);
  const [Color, setColor] = useState(0);
  const [quantity, setquantity] = useState(1);

  useEffect(() => {
    let item = props.navigation.state.params.item;
    console.log(item);
    if (item) {
      getImgUrls(item.images);
      setitem(item);
    }
  }, []);

  getImgUrls = images => {
    let arr = [];
    images.forEach(img => {
      arr.push({ url: img.src });
    });
    setimages(arr);
  };

  const hideImages = () => setshowImages(false);

  onShare = async () => {
    getShareImages();
    return false;
    console.log(item);
    let post = item;
    try {
      let url = post.permalink + "?visitlink=cityapp://cityproduct:" + post.id;
      let title = decode_html(post.name);
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
  getShareImages = async () => {
    // let item = props.item;
    if (item.images && item.images.length > 0) {
      try {
        ToastAndroid.show("Progress will start soon", ToastAndroid.SHORT);
        const checkVersion = Platform.Version > 22;
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Access Require",
            message: "Press Allow Permission to start progress"
          }
        );

        //cannot progress without permission || sdk < 23 bypass
        if (granted !== PermissionsAndroid.RESULTS.GRANTED && checkVersion) {
          Alert.alert("Cancel, permission denied");
          return;
        }
        let Pictures = item.images.map(item =>
          RNFetchBlob.config({
            fileCache: true
          })
            .fetch("GET", item.src)
            .then(resp => {
              let base64s = RNFetchBlob.fs
                .readFile(resp.data, "base64")
                .then(data => "data:image/jpeg;base64," + data);
              return base64s;
            })
        );
        Promise.all(Pictures).then(completed => {
          console.log(completed);
          const options = {
            title: "Share via",
            urls: completed
          };
          console.log(options);
          Share.open(options);
        });
      } catch (err) {
        Alert.alert("Error, Permission denied", err);
      }
    }
  };
  showImagesSwiper = () => {
    return (
      images.length > 0 && (
        <View style={styles.imageWrapper}>
          <TouchableNativeFeedback
            onPress={() => {
              setshowImages(true);
            }}
          >
            <Swiper
              style={styles.swiper}
              paginationStyle={{
                bottom: -7
              }}
              dot={<View style={[styles.dot, styles.dotStyle]} />}
              activeDot={<View style={[styles.dot, styles.activeDot]} />}
              // loop
            >
              {item.images.map((img, index) => (
                <View style={{ flex: 1 }} key={`img-${index}`}>
                  <Image style={styles.image} source={{ uri: img.src }} />
                </View>
              ))}
            </Swiper>
          </TouchableNativeFeedback>
          <ImageModal
            urls={images}
            isOpen={showImages}
            closeModal={hideImages}
          />
        </View>
      )
    );
  };

  addToCart = item => {
    props.addItems(item, 1);
    alert("item added");
  };
  if (!item) return null;
  if (item) {
    return (
      <View style={styles.container}>
        <ScrollView>
          {showImagesSwiper()}
          <View style={styles.productMeta}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 10
              }}
            >
              <Text style={styles.productTitle}>{item.name}</Text>
              <Text style={styles.productPrice}>
                {"\u20B9"}
                {item.price}
              </Text>
            </View>

            <Text style={styles.productShortDesc}>
              {strip_html_tags(item.short_description)}
            </Text>
            {item.description && (
              <View style={styles.addInfo}>
                <Text style={styles.addInfoText}>Additional Information</Text>
                <Text style={styles.description}>
                  {strip_html_tags(item.description)}
                </Text>
              </View>
            )}
            {item.type == "variable" && (
              <View>
                {item.attributes.map(attribute => {
                  if (attribute.name == "Size") {
                    return (
                      <View
                        style={{ flexDirection: "row" }}
                        key={`select-${attribute.name}`}
                      >
                        <Text style={styles.addInfoText}>{attribute.name}</Text>
                        <Picker
                          selectedValue={Size}
                          style={{ height: 50, width: 200 }}
                          onValueChange={(itemValue, itemIndex) =>
                            setsize(itemIndex)
                          }
                        >
                          {console.log(attribute)}
                          {attribute.options.map((option, index) => (
                            <Picker.Item
                              label={option}
                              value={index + 1}
                              key={`option-${attribute.name}`}
                            />
                          ))}
                        </Picker>
                      </View>
                    );
                  }
                  if (attribute.name == "Color") {
                    return (
                      <View
                        style={{ flexDirection: "row" }}
                        key={`select-${attribute.name}`}
                      >
                        <Text style={styles.addInfoText}>{attribute.name}</Text>
                        <Picker
                          selectedValue={Color}
                          style={{ height: 50, width: 200 }}
                          onValueChange={(itemValue, itemIndex) =>
                            setColor(itemIndex)
                          }
                        >
                          {console.log(attribute)}
                          {attribute.options.map((option, index) => (
                            <Picker.Item
                              label={option}
                              value={index + 1}
                              key={`option-${attribute.name}`}
                            />
                          ))}
                        </Picker>
                      </View>
                    );
                  }
                })}
              </View>
            )}

            {/* <View style={styles.qContainer}>
              <Text style={styles.qText}>Select Quantity</Text>
              <TextInput
                value={quantity}
                // underlineColorAndroid="transparent"
                style={styles.TextInputStyle}
                // keyboardType={"numeric"}
                onChange={(value)=>setquantity(value)}
              />
            </View> */}
          </View>
          <TouchableOpacity onPress={() => addToCart(item)}>
            <View style={styles.checkoutBtn}>
              <Text style={styles.checkoutBtntext}>Add To Cart</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
        {/* <View style={styles.actionContainer}> */}
        {/* <View style={styles.actionIcon}>
            <TouchableOpacity style={styles.iconContainer}>
              <Icon name="shopping-cart" size={18} color="#000" />

              <Text style={styles.actionText}> Add To Cart</Text>
            </TouchableOpacity>
          </View> */}
        <View style={styles.actionIcon}>
          <TouchableOpacity style={styles.iconContainer} onPress={onShare}>
            <Icon name="share" size={25} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={onShare}>
            <Iconfont name="whatsapp" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
        {/* </View> */}
      </View>
    );
  }
};

// Single.navigationOptions = ({ navigation }) => {
// let name = "Shop";
// let params = navigation.state.params;
// if (params && params.item && params.item.name) {
//   name = text_truncate(params.item.name, 15);
// }
// return {
//   title: name,
//   headerTitleStyle: {
//     textAlign: "center",
//     alignSelf: "center",
//     flex: 1,
//     fontFamily: M_BOLD,
//     textTransform: "capitalize"
//   },
//   headerRight: <View />
// };
// };

Single.navigationOptions = ({ navigation }) => {
  if (navigation.state.routeName == "SinglePost") {
    return {
      title: "Product",
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
  let name = "Shop";
  let params = navigation.state.params;
  if (params && params.item && params.item.name) {
    name = text_truncate(params.item.name, 15);
  }
  return {
    title: name,
    headerTitleStyle: {
      textAlign: "center",
      alignSelf: "center",
      flex: 1,
      fontFamily: M_BOLD,
      textTransform: "capitalize"
    },
    headerRight: <View />
  };
};

const mapStateToProps = state => ({
  cartItems: state.cartItems
});

const mapDispatchToProps = dispatch => ({
  addItems: (item, quantity) => dispatch(addItems(item, quantity))
});

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Single)
);

// export default withNavigation(Single);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  imageWrapper: {
    height: 400
  },
  swiper: {
    marginBottom: 15
  },
  dot: {
    borderRadius: 4,
    margin: 3
  },
  dotStyle: {
    backgroundColor: "rgba(236, 153, 2, 0.4)",
    width: 5,
    height: 5
  },
  activeDot: {
    backgroundColor: "gray",
    width: 8,
    height: 8
  },
  productMeta: {
    paddingVertical: 10,
    paddingHorizontal: APP_SIDE_DISTANCE
  },
  productTitle: {
    fontSize: 20,
    fontFamily: M_SemiBold,
    // color: "gray",
    textTransform: "capitalize"
  },
  productShortDesc: {
    fontSize: 12,
    fontFamily: M_Regular,
    color: "#999"
  },
  productPrice: {
    fontSize: 25,
    fontFamily: M_SemiBold
  },
  description: {
    fontFamily: M_Regular,
    color: "#999"
  },
  addInfo: {
    marginVertical: 10
  },
  addInfoText: {
    fontSize: 20,
    fontFamily: M_BOLD,
    marginVertical: 10
  },
  actionContainer: {
    // position:'fixed',
    // left:0,
    // bottom:0,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between"
    // backgroundColor: "rgba(236, 153, 2, 0.6)",
    // backgroundColor: "black"
    // padding: 5
  },
  actionIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "gray",
    padding: 10,
    paddingBottom: 10,
    position: "absolute",
    top: "50%",
    right: 0,
    backgroundColor: APP_ORANGE,
   
  },
  actionText: {
    color: "#000",
    fontSize: 14,
    fontFamily: M_Regular,
    marginRight: 5,
    marginLeft: 5
  },
  iconContainer: {
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center"
    padding:5
  },
  checkoutBtn: {
    marginVertical: 20,
    marginHorizontal: APP_SIDE_DISTANCE,
    backgroundColor: APP_ORANGE,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  checkoutBtntext: {
    fontFamily: M_BOLD,
    textTransform: "uppercase",
    fontSize: 18,
    color: "#fff"
  }
});
