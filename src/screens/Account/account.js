import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import BoyImg from "../../assets/img/man.png";
import GirlImg from "../../assets/img/girl.png";
import BgImg from "../../assets/img/avatar-bg.jpg";
import { APP_ORANGE } from "../../theme/colors";
import LinearGradient from "react-native-linear-gradient";
import { M_BOLD, M_SemiBold, M_Regular } from "../../theme/fonts";
const Account = () => {
  const Img = BoyImg;

  const [tab, settab] = useState("profile");

  const avatar = () => {
    return (
      <ImageBackground
        blurRadius={5}
        source={BgImg}
        style={{ width: "100%", height: 200 }}
      >
        <View style={styles.avatarBlock}>
          <Image source={GirlImg} style={styles.avatarImg} />
          <Text style={styles.avatarName}>Rajneet kaur</Text>
        </View>
      </ImageBackground>
    );
  };

  const tabs = () => {
    return (
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
    );
  };
  return (
    <View>
      {avatar()}
      {tabs()}
    </View>
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
    color: "#fff"
  },
  tabs: {
    flexDirection: "row",
    padding: 20
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
  }
});
