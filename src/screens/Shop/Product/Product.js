import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native";
import { strip_html_tags, text_truncate } from "../../../Utils/Helpers";
import { M_BOLD, M_Light, M_SemiBold, M_Regular } from "../../../theme/fonts";
import Icon from "react-native-vector-icons/dist/Entypo";
import { APP_ORANGE } from "../../../theme/colors";
import { withNavigation } from "react-navigation";
import { addItems } from "../../../redux/actions/cartItems";
import { connect, useSelector } from "react-redux";

const Product = (props) => {
  const showProduct=()=>{
    props.navigation.navigate("ProductSingal",{
      item:item
    });
  }

  addToCart = (item) =>{
    props.addItems(item, 1);
  }
  const item = props.item


  return (
    <View>
      <TouchableNativeFeedback onPress={() => showProduct()}>
        <Image
          source={{ uri: item.images.length > 0 ? item.images[0].src : "" }}
          style={styles.thumbnail}
        />
      </TouchableNativeFeedback>
      <View style={styles.actionContainer}>
        <View style={styles.actionIcon}>
          <TouchableOpacity onPress={()=>addToCart(item)}>
            <Icon name="shopping-cart" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.actionIcon}>
          <TouchableOpacity>
            <Icon name="share" size={22} color="#fff" />
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
  cartItems: state.cartItems,
});

const mapDispatchToProps = dispatch => ({
  addItems: (item,quantity) => dispatch(addItems(item,quantity))
});

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(Product));
// export default withNavigation(Product);

const styles = StyleSheet.create({
  thumbnail: {
    width: "100%",
    height: 200
  },
  productMeta: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: APP_ORANGE,
    borderWidth: 1
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
    // backgroundColor: "rgba(236, 153, 2, 0.6)",
    backgroundColor: "black"
    // padding: 5
  },
  actionIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    padding: 5
  }
});
