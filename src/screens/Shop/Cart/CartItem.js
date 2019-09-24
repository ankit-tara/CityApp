import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { M_BOLD } from "../../../theme/fonts";
import { APP_SIDE_DISTANCE } from "../../../theme/Dimentions";
import { APP_ORANGE } from "../../../theme/colors";
import NumericInput from "react-native-numeric-input";
import { addItems,removeItems } from "../../../redux/actions/cartItems";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/dist/Entypo";

const CartItem = (props) => {
  const [quantity, setquantity] = useState(1);
  useEffect(() => {
    if (props.item.quantity) {
      setquantity(props.item.quantity);
    }
  }, [props]);
  const item = props.item
  if (!item) return null;
  return (
    <View style={styles.cartItem}>
      {item.item.images.length > 0 && (
        <Image
          source={{ uri: item.item.images[0].src }}
          style={{ height: 100, width: 100 }}
        />
      )}
      <View style={styles.cartMeta}>
        <Text style={styles.name}>{item.item.name}</Text>
        {/* <Text style={styles.descrip}>
                  {strip_html_tags(item.item.short_description)}
                </Text> */}
        <Text style={styles.price}>
          {"\u20B9"}
          {item.item.price}
        </Text>
        <NumericInput
          value={quantity}
          // iconSize={10}
          totalWidth={120}
          totalHeight={35}
          rightButtonBackgroundColor={APP_ORANGE}
          leftButtonBackgroundColor={APP_ORANGE}
          onChange={value => {
            props.addItems(item.item, value);
            setquantity(value);
          }}
        />

        <Text style={styles.quantity}>{item.quantity}</Text>
      </View>
      <View style={styles.close}>
        <TouchableOpacity onPress={() => props.removeItems(item.item)}>
          <Icon name="cross" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  cartItems: state.cartItems
});

const mapDispatchToProps = dispatch => ({
  addItems: (item, quantity) => dispatch(addItems(item, quantity)),
  removeItems: (item, quantity) => dispatch(removeItems(item, quantity))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartItem);
// export default CartItem;

const styles = StyleSheet.create({
 close:{
   flex:1,
   alignItems:'flex-end'
 },
  cartMeta: {
    marginHorizontal: 10
  },
  cartItem: {
    // justifyContent:'space-bet ween',
    flexDirection: "row",
    alignItems: "center"
  },
  name: {
    fontSize: 16,
    fontFamily: M_BOLD
  },
  price: {
    fontSize: 16,
    marginBottom:5
  },
  checkoutBtn: {
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
