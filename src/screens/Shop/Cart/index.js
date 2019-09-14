import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { M_BOLD } from "../../../theme/fonts";
import { fetchItems } from "../../../redux/actions/cartItems";
import { useSelector, connect } from "react-redux";
import { withNavigation } from "react-navigation";
import NumericInput from "react-native-numeric-input";
import { strip_html_tags } from "../../../Utils/Helpers";
import { APP_ORANGE } from "../../../theme/colors";
import { APP_SIDE_DISTANCE } from "../../../theme/Dimentions";

const CartPage = props => {
  const cartItems = useSelector(state => state.cartItems);
  if (!cartItems.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Oops!! your cart is empty</Text>
      </View>
    );
  }

  getTotal=()=>{
    let amount = 0
    cartItems.map((item)=>{
      amount += item.item.price*item.quantity
    })
    return amount
  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {cartItems.length > 0 &&
          cartItems.map(item => (
            <View
              key={`cart-item${item.item.id}`}
              style={styles.cartItemContainer}
            >
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
                    value={item.quantity}
                    // iconSize={10}
                    totalWidth={150}
                    totalHeight={20}
                    rightButtonBackgroundColor={APP_ORANGE}
                    leftButtonBackgroundColor={APP_ORANGE}
                    // onChange={value => this.setState({ value })}
                  />

                  <Text style={styles.quantity}>{item.quantity}</Text>
                </View>
              </View>
            </View>
          ))}
      </ScrollView>
      <View
        style={{
          marginHorizontal: APP_SIDE_DISTANCE,
          marginVertical: 10,
          borderTopWidth: 1,
          borderColor: "gray"
        }}
      >
        <Text style={{ color: "gray" }}>Total</Text>
        <Text style={{fontSize:18,fontFamily:M_BOLD}}>
          {" "}
          {"\u20B9"}
          {getTotal()}
        </Text>
      </View>
      <TouchableOpacity onPress={() => props.navigation.navigate("Checkout")}>
        <View style={styles.checkoutBtn}>
          <Text style={styles.checkoutBtntext}>Checkout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

CartPage.navigationOptions = {
  title: "Cart",
  headerTitleStyle: {
    textAlign: "center",
    alignSelf: "center",
    flex: 1,
    fontFamily: M_BOLD,
    textTransform: "capitalize"
  },
  headerRight: <View />
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
  )(CartPage)
);
// export default CartPage;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyText: {
    fontFamily: M_BOLD,
    color: "gray",
    fontSize: 20
  },
  cartItemContainer: {
    padding: 5,
    margin: 10,
    // borderWidth: 1,
    // borderColor: "gray"
  },
  cartMeta: {
    marginHorizontal: 10
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center"
  },
  name: {
    fontSize: 16,
    fontFamily: M_BOLD
  },
  price: {
    fontSize: 16
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
