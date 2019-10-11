import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/dist/MaterialIcons";
import { withNavigation } from "react-navigation";
import { APP_ORANGE } from "../../theme/colors";

const AccountIcon = props => {
//   const cartItems = useSelector(state => state.cartItems);
//   useEffect(() => {}, [props]);
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate("CartPage")}>
      <View style={styles.wrapper}>
        <Icon
          name="account-circle"
          size={30}
        />
      </View>
    </TouchableOpacity>
  );
};
// const mapStateToProps = state => ({
//   cartItems: state.cartItems
// });

// const mapDispatchToProps = dispatch => ({
//   addItems: (item, quantity) => dispatch(addItems(item, quantity))
// });
// export default withNavigation(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(CartIcon)
// );
export default withNavigation(AccountIcon);

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",marginLeft:15
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
