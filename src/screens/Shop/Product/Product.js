import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableNativeFeedback,
  // Share,
  ToastAndroid,
  Alert,
  PermissionsAndroid,
  Platform,
  Clipboard,
  Linking
} from "react-native";
import {
  strip_html_tags,
  text_truncate,
  decode_html
} from "../../../Utils/Helpers";
import { M_BOLD, M_Light, M_SemiBold, M_Regular } from "../../../theme/fonts";
import Icon from "react-native-vector-icons/dist/Entypo";
import IconFont from "react-native-vector-icons/dist/FontAwesome";
import { APP_ORANGE } from "../../../theme/colors";
import { withNavigation } from "react-navigation";
import { addItems } from "../../../redux/actions/cartItems";
import { connect, useSelector } from "react-redux";
import RNFetchBlob from "rn-fetch-blob";
import Share from "react-native-share";

const Product = props => {
  const [imgBase64, setimgBase64] = useState([]);
  const item = props.item;

  useEffect(() => {
    let item = props.item;
    if (item.images && item.images.length > 0) {
      //  getShareImages()
      // RNFetchBlob.fetch(
      //   "GET",
      //   "http://www.siridigitalmarketing.com/wp-content/uploads/2019/08/WhatsApp-Image-2019-08-30-at-21.25.20.jpeg",
      //   {}
      // )
      //   .then(res => {
      //     let status = res.info().status;
      //     if (status == 200) {
      //       let base64Str = res.base64();
      //       console.log(base64Str);
      //     }
      //   })
      //   .catch((errorMessage, statusCode) => {});
    }
  }, []);

  getShareImages = async (item,isWhatsapp=false) => {
    let content = item.name + "/n" + strip_html_tags(item.description);
    Clipboard.setString(content);

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
          const options = {
            title: "Share via",
            urls: completed
          };
         Share.open(options);
        });
      } catch (err) {
        Alert.alert("Error, Permission denied", err);
      }
    }
  };
  const showProduct = () => {
    props.navigation.navigate("ProductSingal", {
      item: item
    });
  };

  addToCart = item => {
    props.addItems(item, 1);
    alert("item added");
  };
  onShare = async (isWhatsapp) => {
    getShareImages();
    return false;
    let post = item;
    try {
      let url = post.permalink + "?visitlink=cityapp://citypost:" + post.id;
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

  return (
    <View>
      <TouchableNativeFeedback onPress={() => showProduct()}>
        <Image
          source={{ uri: item.images.length > 0 ? item.images[0].src : "" }}
          style={styles.thumbnail}
        />
      </TouchableNativeFeedback>
      <View style={styles.actionContainer}>
        <View style={[styles.actionIconCart, styles.actionIcon]}>
          <TouchableOpacity onPress={() => addToCart(item)}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Icon name="shopping-cart" size={16} color="#fff" />
              <Text
                style={{
                  color: "#fff",
                  marginLeft: 5,
                  fontFamily: M_Regular,
                  fontSize: 12
                }}
              >
                Add To Cart
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.actionIcon, styles.actionIconWhatsapp]}>
          <TouchableOpacity onPress={() => getShareImages(item,true)}>
            <IconFont name="whatsapp" size={17} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={[styles.actionIcon, styles.actionIconShare]}>
          <TouchableOpacity onPress={() => getShareImages(item)}>
            <Icon
              name="share"
              size={16}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableNativeFeedback onPress={() => showProduct()}>
        <View style={styles.productMeta}>
          <Text style={styles.productTitle}>
            {strip_html_tags(text_truncate(item.name, 20))}
          </Text>
          <Text style={styles.productShortDescription}>
            {strip_html_tags(text_truncate(item.short_description, 30))}
          </Text>
          <Text style={styles.productPrice}>
            {"\u20B9"}
            {item.price}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
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
  )(Product)
);
// export default withNavigation(Product);

const styles = StyleSheet.create({
  thumbnail: {
    width: "100%",
    height: 200
  },
  productMeta: {
    paddingVertical: 10,
    paddingHorizontal: 10
    // borderColor: APP_ORANGE,
    // borderWidth: 1
  },
  productTitle: {
    fontSize: 15,
    fontFamily: M_Regular,
    color: "gray",

    textTransform: "capitalize"
  },
  productShortDescription: {
    fontSize: 12,
    fontFamily: M_Regular,
    color: "#999"
  },
  productPrice: {
    fontSize: 13,
    fontFamily: M_BOLD
  },
  actionContainer: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    height:35,
    overflow: 'hidden',
    // backgroundColor: "rgba(236, 153, 2, 0.6)",
    // backgroundColor: "black"
    // padding: 5
    // borderWidth: 1,
    // borderColor: "gray",
  },
  actionIcon: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "gray",
    paddingVertical: 8,
    paddingHorizontal: 8
  },
  actionIconCart: {
    // flex: 1,
    width: "60%",
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#000"
  },
  actionIconShare: {
    width: "20%",
    borderWidth: 1,
    backgroundColor: APP_ORANGE,
    borderColor: APP_ORANGE
  },
  actionIconWhatsapp: {
    width: "20%",
    borderWidth: 1,
    backgroundColor: "#128C7E",
    borderColor: "#128C7E"
  }
});
