import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/dist/Entypo";
import { withNavigation } from "react-navigation";
import { APP_ORANGE } from "../../theme/colors";
import { addItems, fetchItems } from "../../redux/actions/cartItems";
import { useSelector, connect } from "react-redux";

const CartIcon = props => {
  // const cartItems = useSelector(state => state.cartItems);
  const [cartItems, setcartItems] = useState(0);
  useEffect(() => {
    setcartItems(props.cartItems);
  
  }, [props]);
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate("CartPage")}>
      <View style={styles.wrapper}>
        <Icon name="shopping-cart" size={22} />
        {cartItems.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.counter}>{cartItems.length}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
const mapStateToProps = state => ({
  cartItems: state.cartItems
});

// const mapDispatchToProps = dispatch => ({
//   addItems: (item, quantity) => dispatch(addItems(item, quantity))
// });
export default withNavigation(
  connect(
    mapStateToProps,
    ""
  )(CartIcon)
);
// export default withNavigation(CartIcon);

const styles = StyleSheet.create({
  wrapper: {
    position: "relative"
  },
  badge: {
    height: 18,
    width: 18,
    position: "absolute",
    top: -5,
    right: -10,
    // padding:10,
    backgroundColor: APP_ORANGE,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  counter: {
    textAlign: "center"
  }
});
