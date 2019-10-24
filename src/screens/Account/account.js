import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import BoyImg from "../../assets/img/man.png";
import GirlImg from "../../assets/img/girl.png";
import BgImg from "../../assets/img/avatar-bg.jpg";
import { APP_ORANGE } from "../../theme/colors";
import LinearGradient from "react-native-linear-gradient";
import { M_BOLD, M_SemiBold, M_Regular } from "../../theme/fonts";
import WooCommerceAPI from "../Shop/WoocommerceApi";
import { getWcConfig } from "../../Utils/WcApi";
let wcConfig = getWcConfig();
let wcApi = new WooCommerceAPI(wcConfig);
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../redux/actions/authUser";
import AsyncStorage from "@react-native-community/async-storage";
import { AUTH_USER } from "../../Utils/constants";

const Account = () => {
  const Img = BoyImg;

  const [tab, settab] = useState("profile");
  const [user, setuser] = useState({});
  const [orders, setorders] = useState({});
  const authUser = useSelector(state => state.authUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!authUser.token || !authUser.user_id) {
     removeUser()
      return;
    }
    wcApi
      .get("customers/" + authUser.user_id, {})
      .then(data => {
        setuser(data);
      })
      .catch(error => {
        console.log(error);
      });
    wcApi
      .get("orders?customer=" + authUser.user_id, {})
      .then(data => {
        setorders(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
 removeUser=async()=>{
    dispatch(userLogout());
      await AsyncStorage.setItem(AUTH_USER, '');
 }
  refreshOrders = () => {
    wcApi
      .get("orders?customer=" + authUser.user_id, {})
      .then(data => {
        setorders(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const avatar = () => {
    return (
      <ImageBackground
        blurRadius={5}
        source={BgImg}
        style={{ width: "100%", height: 200 }}
      >
        <View style={styles.avatarBlock}>
          <Image source={Img} style={styles.avatarImg} />
          <Text style={styles.avatarName}>{user.username}</Text>
        </View>
      </ImageBackground>
    );
  };

  const tabs = () => {
    return (
      <View style={styles.wrapper}>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, tab == "profile" ? styles.activeTab : ""]}
            onPress={() => settab("profile")}
          >
            <Text
              style={[
                styles.tabTitle,
                tab == "profile" ? styles.activeTabText : ""
              ]}
            >
              Profile
            </Text>
            {tab == "profile" && <View style={styles.line}></View>}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, tab != "profile" ? styles.activeTab : ""]}
            onPress={() => settab("order")}
          >
            <Text
              style={[
                styles.tabTitle,
                tab != "profile" ? styles.activeTabText : ""
              ]}
            >
              Orders
            </Text>
            {tab != "profile" && <View style={styles.line}></View>}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.logout]} onPress={() => removeUser()}>
          <Text style={[styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderUserInfo = () => {
    return (
      <View style={styles.userInfo}>
        <View style={styles.tr}>
          <Text style={styles.trTitle}>Username:</Text>
          <Text style={styles.trValue}>{user.username}</Text>
        </View>
        <View style={styles.tr}>
          <Text style={styles.trTitle}>Email: </Text>
          <Text style={styles.trValue}>{user.email}</Text>
        </View>
        {/* <View style={styles.tr}>
          <Text style={styles.trTitle}>Address: </Text>
          <Text style={styles.trValue}>
            {user.billing ? user.billing.address_1 : ""}
          </Text>
        </View>
        <View style={styles.tr}>
          <Text style={styles.trTitle}>City: </Text>
          <Text style={styles.trValue}>
            {user.billing ? user.billing.city : ""}
          </Text>
        </View>
        <View style={styles.tr}>
          <Text style={styles.trTitle}>State: </Text>
          <Text style={styles.trValue}>
            {user.billing ? user.billing.state : ""}
          </Text>
        </View>
        <View style={styles.tr}>
          <Text style={styles.trTitle}>Phone: </Text>
          <Text style={styles.trValue}>
            {user.billing ? user.billing.phone : ""}
          </Text>
        </View>
        <View style={styles.tr}>
          <Text style={styles.trTitle}>Postal code: </Text>
          <Text style={styles.trValue}>
            {user.billing ? user.billing.postcode : ""}
          </Text>
        </View> */}
      </View>
    );
  };

  const renderOrdersInfo = () => {
    return (
      <View>
        <TouchableOpacity onPress={() => refreshOrders()}>
          <Text style={styles.refresh}>Refresh Orders</Text>
        </TouchableOpacity>
        <View style={styles.orderInfo}>
          <View style={styles.orderInfoHeader}>
            <Text style={styles.th}>Order Id</Text>
            <Text style={styles.th}>Date</Text>
            <Text style={styles.th}>Status</Text>
            <Text style={styles.th}>Amount</Text>
          </View>
          {orders.length > 0 &&
            orders.map(order => (
              <View style={styles.orderDetail} key={order.id}>
                <Text style={styles.td}>{order.id}</Text>
                <Text style={styles.td}>{order.date_created}</Text>
                <Text style={styles.td}>{order.status}</Text>
                <Text style={styles.td}>
                  {" "}
                  {"\u20B9"}
                  {order.total}
                </Text>
              </View>
            ))}
          {orders.length <= 0 && (
            <View style={styles.orderDetail}>
              <Text style={styles.td}>No order made yet.</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={{ flex:1 }}>
        {avatar()}
        {tabs()}
        {tab == "profile" && renderUserInfo()}
        {tab != "profile" && renderOrdersInfo()}
      </View>
    </ScrollView>
  );
};

export default Account;

const styles = StyleSheet.create({
  avatarBlock: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  avatarImg: {
    width: 100,
    height: 100,
    borderRadius: 200,
    borderWidth: 5,
    borderColor: "#FFF"
  },
  avatarName: {
    padding: 10,
    fontSize: 20,
    fontFamily: M_BOLD,
    color: "#fff",
    textTransform: "capitalize"
  },
  tabs: {
    flexDirection: "row"
  },
  tabTitle: {
    fontFamily: M_Regular,
    fontSize: 18,
    color: "#919191"
  },
  tab: {
    marginRight: 20,
    color: "#555"
  },
  activeTab: {},
  inactiveTab: {},
  activeTabText: {
    fontFamily: M_BOLD,
    color: "#000"
  },
  inactiveTabText: {},
  line: {
    width: "70%",
    height: 2,
    backgroundColor: APP_ORANGE,
    alignSelf: "flex-end"
  },
  userInfo: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 20
  },
  tr: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  trTitle: {
    textTransform: "capitalize",
    fontFamily: M_SemiBold,
    marginRight: 20,
    marginBottom: 15
  },
  trValue: {
    fontFamily: M_Regular,
    textTransform: "capitalize",
    color: "gray"
  },
  orderInfo: {
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1
  },
  orderInfoHeader: {
    backgroundColor: "#eee",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  th: {
    fontFamily: M_BOLD,
    textTransform: "uppercase"
  },
  orderDetail: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  td: {
    fontFamily: M_Regular,
    fontSize: 12,
    color: "gray"
  },
  refresh: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#002E6E",
    marginHorizontal: 20,
    marginBottom: 10
  },
  wrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  logoutText: {
    fontSize: 20,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "#002E6E"
  }
});
