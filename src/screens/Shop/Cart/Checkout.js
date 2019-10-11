import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  DeviceEventEmitter,
  NativeModules,
  NativeEventEmitter
} from "react-native";
import { M_BOLD, M_SemiBold } from "../../../theme/fonts";
import { APP_SIDE_DISTANCE } from "../../../theme/Dimentions";
import { APP_ORANGE } from "../../../theme/colors";
import { useSelector, connect } from "react-redux";
import { getWcConfig } from "../../../Utils/WcApi";
import WooCommerceAPI from "react-native-woocommerce-api";
import {
  validateEmail,
  validatePhone,
  validateZip
} from "../../../Utils/Helpers";
import { clearItems } from "../../../redux/actions/cartItems";
import { setOrderId } from "../../../redux/actions/cartOrderId";
import AsyncStorage from "@react-native-community/async-storage";

import paytm from "@philly25/react-native-paytm";
import { CART_ITEMS } from "../../../Utils/constants";
import { getPayNowLink } from "../../../Utils/Api";
const paytmConfig = {
  MID: "vBOlWS74518141895718",
  WEBSITE: "IAAK0i7Vu%U3Le1W",
  CHANNEL_ID: "WEBSTAGING",
  INDUSTRY_TYPE_ID: "Retail",
  CALLBACK_URL: "https://securegw.paytm.in/theia/paytmCallback?ORDER_ID="
};
const Checkout = props => {
  useEffect(() => {
    getFormDetails();
  }, []);

  const [firstname, setfirstname] = useState();
  const [lastname, setlastname] = useState();
  const [companyName, setcompanyName] = useState();
  const [address, setaddress] = useState();
  const [city, setcity] = useState();
  const [state, setstate] = useState();
  const [zip, setzip] = useState();
  const [phone, setphone] = useState();
  const [email, setemail] = useState();
  const [paymentOption, setpaymentOption] = useState("cod");
  const [error, seterror] = useState([]);
  const [isInvalid, setisInvalid] = useState([]);
  const [dfirstname, setdfirstname] = useState();
  const [dlastname, setdlastname] = useState();
  const [dcompanyName, setdcompanyName] = useState();
  const [daddress, setdaddress] = useState();
  const [dcity, setdcity] = useState();
  const [dstate, setdstate] = useState();
  const [dzip, setdzip] = useState();
  const [orderNotes, setorderNotes] = useState();
  const [paytmNumber, setpaytmNumber] = useState();
  const [loader, setloader] = useState(false);
  const cartItems = useSelector(state => state.cartItems);
  const cartOrderId = useSelector(state => state.cartOrderId);
  // if (!cartItems.length) {
  //   return (
  //     <View style={styles.emptyContainer}>
  //       <Text style={styles.emptyText}>Oops!! your cart is empty</Text>
  //     </View>
  //   );
  // }

  getFormDetails = async () => {
    let data = await AsyncStorage.getItem(CART_ITEMS);
    data = data ? JSON.parse(data) : "";
    if (data && data.billing) {
      let billing = data.billing;
      // address_1: "Hxhx";
      // address_2: "";
      // city: "Jchc";
      // country: "INDIA";
      // email: "Hdhd@hdid.com";
      // first_name: "Fdhdh";
      // last_name: "Hxhxh";
      // phone: "1234567890";
      // postcode: "656598";
      // state: "Ucjch";
      setaddress(billing.address_1);
      setcity(billing.city);
      setemail(billing.email);
      setfirstname(billing.first_name);
      setlastname(billing.last_name);
      setphone(billing.phone);
      setzip(billing.postcode);
      setstate(billing.state);
    }
  };

  getTotal = () => {
    let amount = 0;
    cartItems.map(item => {
      amount += item.item.price * item.quantity;
    });
    return amount;
  };

  createPayment = data => {
    let wcConfig = getWcConfig();
    let wcApi = new WooCommerceAPI(wcConfig);
    wcApi
      .post("orders", data)
      .then(response => {
        // props.clearItems();
        setloader(false);
        console.log(response)
        if (response.id) {
          props.setOrderId(response.id);
        }
        // if (paymentOption == "cod") {
        //   alert("order created");
        // } else {
        // }
      })
      .catch(error => {
        setloader(false);

        console.log(error.response.data);
      });
  };

  gotoPaymentPage = orderId => {
    getPayNowLink(orderId)
      .then(response => {
        console.log(response.url);
        props.navigation.navigate("PaymentGateway",{url:response});
      })
      .catch(error => console.log(error));
  };

  submitForm = async () => {
    setloader(true);
    seterror([]);
    setisInvalid([]);
    let cerror = [];
    let cisInvalid = [];
    if (!firstname) cerror.push("firstname");
    if (!lastname) cerror.push("lastname");
    if (!address) cerror.push("address");
    if (!city) cerror.push("city");
    if (!state) cerror.push("state");
    if (!zip) cerror.push("zip");
    if (!phone) cerror.push("phone");
    if (!email) cerror.push("email");
    if (!paymentOption) cerror.push("paymentOption");
    seterror(cerror);
    if (cerror.length > 0) {
      setloader(false);
      return false;
    }

    if (!validateEmail(email)) cisInvalid.push("email");
    if (!validatePhone(phone)) cisInvalid.push("phone");
    if (!validateZip(zip)) cisInvalid.push("zip");
    setisInvalid(cisInvalid);
    console.log(cisInvalid);
    if (cisInvalid.length > 0) {
      setloader(false);
      return false;
    }
    let pro_array = [];
    const productData = cartItems.map(item =>
      pro_array.push({ product_id: item.item.id, quantity: item.quantity })
    );
    let payment_method_title =
      paymentOption == "cod" ? "Cash on delivery" : "PayTm";
    const data = {
      payment_method: paymentOption,
      payment_method_title: payment_method_title,
      set_paid: false,
      billing: {
        first_name: firstname,
        last_name: lastname,
        address_1: address,
        address_2: "",
        city: city,
        state: state,
        postcode: zip,
        country: "INDIA",
        email: email,
        phone: phone
      },
      shipping: {
        first_name: firstname,
        last_name: lastname,
        address_1: address,
        address_2: "",
        city: city,
        state: state,
        postcode: zip,
        country: "INDIA"
      },
      line_items: pro_array
    };
    await AsyncStorage.setItem(CART_ITEMS, JSON.stringify(data));
    createPayment(data);
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        {console.log("cartorderid", cartOrderId)}
        {/* <Text>{cartOrderId}</Text> */}
        <View style={styles.form}>
          <Text style={styles.heading}>Billing Address</Text>
          <View style={styles.inputHalf}>
            <Text style={styles.info}>*</Text>
            <TextInput
              placeholder="First name"
              onChangeText={text => setfirstname(text)}
              style={styles.input}
              value={firstname}
            />
            {error.length > 0 && error.includes("firstname") && (
              <Text style={{ color: "red", fontSize: 12 }}>required</Text>
            )}
          </View>
          <View style={styles.inputHalf}>
            <Text style={styles.info}>*</Text>

            <TextInput
              placeholder="Last name"
              onChangeText={text => setlastname(text)}
              style={styles.input}
              value={lastname}
            />
            {error.length > 0 && error.includes("lastname") && (
              <Text style={{ color: "red", fontSize: 12 }}>required</Text>
            )}
          </View>
          <View style={styles.inputFull}>
            <Text style={styles.info}>*</Text>

            <TextInput
              placeholder="Address"
              onChangeText={text => setaddress(text)}
              style={[styles.input, { width: "100%" }]}
              value={address}
              multiline={true}
              numberOfLines={2}
            />
            {error.length > 0 && error.includes("address") && (
              <Text style={{ color: "red", fontSize: 12 }}>required</Text>
            )}
          </View>
          <View style={styles.inputHalf}>
            <Text style={styles.optional}>(optional)</Text>

            <TextInput
              placeholder="Company name"
              onChangeText={text => setcompanyName(text)}
              style={styles.input}
              value={companyName}
            />
          </View>
          <View style={styles.inputHalf}>
            <Text style={styles.info}>*</Text>
            <TextInput
              placeholder="City/Town"
              onChangeText={text => setcity(text)}
              style={styles.input}
              value={city}
            />
            {error.length > 0 && error.includes("city") && (
              <Text style={{ color: "red", fontSize: 12 }}>required</Text>
            )}
          </View>
          <View style={styles.inputHalf}>
            <Text style={styles.info}>*</Text>

            <TextInput
              placeholder="State"
              onChangeText={text => setstate(text)}
              style={styles.input}
              value={state}
            />
            {error.length > 0 && error.includes("state") && (
              <Text style={{ color: "red", fontSize: 12 }}>required</Text>
            )}
          </View>
          <View style={styles.inputHalf}>
            <Text style={styles.info}>*</Text>

            <TextInput
              placeholder="Postal Code/Zip"
              onChangeText={text => setzip(text)}
              style={styles.input}
              value={zip}
              keyboardType="numeric"
            />
            {error.length > 0 && error.includes("zip") && (
              <Text style={{ color: "red", fontSize: 12 }}>required</Text>
            )}
            {isInvalid.length > 0 && isInvalid.includes("zip") && (
              <Text style={{ color: "red", fontSize: 12 }}>
                not valid/correct
              </Text>
            )}
          </View>
          <View style={styles.inputHalf}>
            <Text style={styles.info}>*</Text>

            <TextInput
              placeholder="Phone"
              onChangeText={text => setphone(text)}
              style={styles.input}
              value={phone}
              keyboardType="numeric"
            />
            {error.length > 0 && error.includes("phone") && (
              <Text style={{ color: "red", fontSize: 12 }}>required</Text>
            )}
            {isInvalid.length > 0 && isInvalid.includes("phone") && (
              <Text style={{ color: "red", fontSize: 12 }}>
                not valid/correct
              </Text>
            )}
          </View>
          <View style={styles.inputHalf}>
            <Text style={styles.info}>*</Text>

            <TextInput
              placeholder="Email"
              onChangeText={text => setemail(text)}
              style={styles.input}
              value={email}
              keyboardType="email-address"
            />
            {error.length > 0 && error.includes("email") && (
              <Text style={{ color: "red", fontSize: 12 }}>required</Text>
            )}
            {isInvalid.length > 0 && isInvalid.includes("email") && (
              <Text style={{ color: "red", fontSize: 12 }}>
                not valid/correct
              </Text>
            )}
          </View>
        </View>
        {/* <View style={styles.form}>
        <Text style={styles.heading}>Shipping Address</Text>
        <TextInput
          placeholder="First name"
          onChangeText={text => setdfirstname(text)}
          style={styles.input}
          value={dfirstname}
        />
        <TextInput
          placeholder="Last name"
          onChangeText={text => setdlastname(text)}
          style={styles.input}
          value={dlastname}
        />
        <TextInput
          placeholder="Company name"
          onChangeText={text => setdcompanyName(text)}
          style={styles.input}
          value={dcompanyName}
        />
        <TextInput
          placeholder="Address"
          onChangeText={text => setdaddress(text)}
          style={styles.input}
          value={daddress}
        />
        <TextInput
          placeholder="City/Town"
          onChangeText={text => setcity(text)}
          style={styles.input}
          value={city}
        />
        <TextInput
          placeholder="State"
          onChangeText={text => setdstate(text)}
          style={styles.input}
          value={dstate}
        />
        <TextInput
          placeholder="Postal Code/Zip"
          onChangeText={text => setdzip(text)}
          style={styles.input}
          value={dzip}
        />
      </View> */}
        <View style={styles.inputFull}>
          <Text style={styles.optional}>(optional)</Text>

          <TextInput
            placeholder="Order Notes"
            onChangeText={text => setorderNotes(text)}
            style={[styles.orderNotes]}
            value={orderNotes}
            multiline={true}
            numberOfLines={8}
          />
        </View>

        <View style={styles.orderDiv}>
          <View style={styles.orderWrapper}>
            <Text style={styles.orderHeading}>Your Order</Text>
            <View>
              {cartItems.length > 0 &&
                cartItems.map(item => (
                  <View
                    key={`cart-item${item.item.id}`}
                    style={[styles.row, styles.cartItem]}
                  >
                    <Text>{item.item.name}</Text>
                    <Text>
                      {" "}
                      {"\u20B9"}
                      {item.item.price * item.quantity}
                    </Text>
                  </View>
                ))}
              <View style={[styles.row, styles.sapartor]}>
                <Text>Subtotal</Text>
                <Text>
                  {" "}
                  {"\u20B9"}
                  {getTotal()}
                </Text>
              </View>
              <View style={[styles.sapartor]}>
                <Text style={{ fontFamily: M_BOLD, marginVertical: 5 }}>
                  Choose Payment Method:
                </Text>
                <View style={styles.buttonContainer}>
                  <Text>COD</Text>
                  <TouchableOpacity
                    style={styles.circle}
                    onPress={() => setpaymentOption("cod")} // we set our value state to key
                  >
                    {paymentOption === "cod" && (
                      <View style={styles.checkedCircle} />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <Text>Paytm</Text>
                  <TouchableOpacity
                    style={styles.circle}
                    onPress={() => setpaymentOption("paytm")} // we set our value state to key
                  >
                    {paymentOption === "paytm" && (
                      <View style={styles.checkedCircle} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              {/* {paymentOption === "paytm" && (
                <View style={[styles.sapartor]}>
                  <Text style={{ fontFamily: M_BOLD, marginVertical: 5 }}>
                    Enter Registered Paytm Number
                  </Text>
                  <View style={styles.inputFull}>

                    <TextInput
                      placeholder="Paytm Number"
                      onChangeText={text => setpaytmNumber(text)}
                      style={[styles.input]}
                      value={paytmNumber}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              )} */}
            </View>
          </View>
        </View>

        {(cartOrderId == "not_set" || cartOrderId == "changed") && (
          <TouchableOpacity onPress={() => submitForm()}>
            <View style={styles.checkoutBtn}>
              <Text style={styles.checkoutBtntext}>Next</Text>
            </View>
          </TouchableOpacity>
        )}
        {cartOrderId != "" &&
          cartOrderId != "not_set" &&
          cartOrderId != "changed" && (
        <TouchableOpacity onPress={() => gotoPaymentPage(cartOrderId)}>
          <View style={styles.checkoutBtn}>
            <Text style={styles.checkoutBtntext}>Pay Now</Text>
          </View>
        </TouchableOpacity>
        )}
      </View>
      {loader && (
        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.3)"
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
    </ScrollView>
  );
};
Checkout.navigationOptions = {
  title: "Checkout",
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
  cartItems: state.cartItems,
  cartOrderId: state.cartOrderId
});
const mapDispatchToProps = dispatch => ({
  clearItems: () => dispatch(clearItems()),
  setOrderId: orderId => dispatch(setOrderId(orderId))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
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
  container: {
    margin: APP_SIDE_DISTANCE
  },
  heading: {
    width: "100%",
    fontSize: 20,
    fontFamily: M_SemiBold,
    marginBottom: 10
  },
  inputFull: {
    width: "100%"
  },
  inputHalf: {
    width: "45%"
  },
  input: {
    // width: "45%",
    paddingVertical: 5,
    paddingHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: "gray",
    marginBottom: 5
  },
  orderNotes: {
    // width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: "gray",
    marginBottom: 5,
    height: 40
  },
  form: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    flexWrap: "wrap"
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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ACACAC",
    alignItems: "center",
    justifyContent: "center"
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: APP_ORANGE
  },
  orderDiv: {
    marginHorizontal: 10,
    marginVertical: 10,
    // padding: 5,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2
    }
    // elevation: 2
  },
  orderWrapper: {
    padding: 20
  },
  orderHeading: {
    fontSize: 16,
    fontFamily: M_SemiBold,
    marginVertical: 6
  },
  sapartor: {
    borderTopWidth: 1,
    borderColor: "gray",
    paddingVertical: 10
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  info: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-end"
  },
  optional: {
    fontSize: 12,
    color: "gray",
    alignSelf: "flex-end"
  }
});
