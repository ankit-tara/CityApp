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
  TextInput
} from "react-native";
import { withNavigation } from "react-navigation";
import { M_BOLD, M_Regular, M_SemiBold } from "../../../theme/fonts";
import { text_truncate, strip_html_tags } from "../../../Utils/Helpers";
import Swiper from "react-native-swiper";
import ImageModal from "../../../components/ImageModal";
import { APP_SIDE_DISTANCE } from "../../../theme/Dimentions";
import Icon from "react-native-vector-icons/dist/Entypo";

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
  if (!item) return null;
  if (item) {
    return (
      <View style={styles.container}>
        <ScrollView>
          {showImagesSwiper()}
          <View style={styles.productMeta}>
            <Text style={styles.productTitle}>{item.name}</Text>
            <Text style={styles.productPrice}>
              {"\u20B9"}
              {item.price}
            </Text>
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
        </ScrollView>
        <View style={styles.actionContainer}>
          <View style={styles.actionIcon}>
            <TouchableOpacity style={styles.iconContainer}>
              <Icon name="shopping-cart" size={18} color="#000" />

              <Text style={styles.actionText}> Add To Cart</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.actionIcon}>
            <TouchableOpacity style={styles.iconContainer}>
              <Icon name="share" size={18} color="#000" />

              <Text style={styles.actionText}> Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
};

Single.navigationOptions = ({ navigation }) => {
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

export default withNavigation(Single);

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    fontSize: 17,
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
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    paddingBottom: 10
  },
  actionText: {
    color: "#000",
    fontSize: 14,
    fontFamily: M_Regular,
    marginRight: 5,
    marginLeft: 5
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
