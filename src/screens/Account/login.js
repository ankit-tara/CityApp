import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import WooCommerceAPI from "../Shop/WoocommerceApi";
import Spinner from "react-native-spinkit";

import { M_BOLD } from "../../theme/fonts";
import { APP_ORANGE } from "../../theme/colors";
import Icon from "react-native-vector-icons/dist/Entypo";
import { getWcConfig } from "../../Utils/WcApi";
import bgImage from "../../assets/img/login-bg.jpg";
import { validateEmail, strip_html_tags } from "../../Utils/Helpers";
import { getJwtLogin, getUserRegister } from "../../Utils/Api";
let wcConfig = getWcConfig();
let wcApi = new WooCommerceAPI(wcConfig);

import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../../redux/actions/authUser";
import AsyncStorage from "@react-native-community/async-storage";
import { AUTH_USER } from "../../Utils/constants";

const index = () => {
  const [form, setform] = useState("signIn");
  const [loading, setloading] = useState(false);
  const [email, setemail] = useState("testsdsf@test.com");
  const [password, setpassword] = useState("12345678kdjjahjdafh");
  const [confirmPassword, setconfirmPassword] = useState("12345678kdjjahjdafh");
  const [error, seterror] = useState([]);
  const [formError, setformError] = useState();
  const [username, setusername] = useState("test");

  const dispatch = useDispatch();

  const formSubmit = () => {
    seterror([]);

    let arr = [];
    if (!email) arr.push("email");
    if (!password) arr.push("password");
    if (form == "signUp" && !confirmPassword) arr.push("cpassword");
    if (form == "signUp" && !username) arr.push("username");

    if (arr.length) {
      seterror(arr);
      return false;
    }

    if (!validateEmail(email)) arr.push("emailInvalid");
    if (password.length < 6) arr.push("passwordInvalid");
    if (form == "signUp" && password != confirmPassword) {
      arr.push("cpasswordInvalid");
    }
    if (arr.length) {
      seterror(arr);
      return false;
    }

    setloading(true);
    form == "signIn" ? signInUser() : signUpUser();
  };
  const signInUser = () => {
    getJwtLogin(email, password)
      .then(res => {
        setloading(false);

        if (res.data && res.data.status !== 200 && res.message) {
          setformError(strip_html_tags(res.message));
        }

        if (res.token) {
          setUserData(res);
        }
      })
      .catch(error => {
        setloading(false);
        console.log(error);
      });
  };

  setUserData = async data => {
    await AsyncStorage.setItem(AUTH_USER, JSON.stringify(data));
    dispatch(userLogin(data));
  };

  const signUpUser = () => {
    getUserRegister(email, password, username)
      .then(res => {
        setloading(false);
        console.log(res);

        if (res.data && res.data.status !== 200 && res.message) {
          setformError(strip_html_tags(res.message));
        }

        if (res.token) {
          dispatch(userLogin(res));
        }
      })
      .catch(error => {
        setloading(false);
        console.log(error);
      });
  };

  return (
    <ImageBackground source={bgImage} style={{ width: "100%", height: "100%" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>CityApp</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.formHeader}>
            <TouchableOpacity onPress={() => !loading && setform("signIn")}>
              <Text
                style={[
                  form == "signIn"
                    ? styles.activeFormText
                    : styles.inactiveFormText,
                  styles.formTitle
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => !loading && setform("signUp")}>
              {/* <Text style={[styles.inactiveFormText, styles.formTitle]}> */}
              <Text
                style={[
                  form != "signIn"
                    ? styles.activeFormText
                    : styles.inactiveFormText,
                  styles.formTitle
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formGroup}>
            <View style={styles.inputContainer}>
              <Icon name="user" size={20} />
              <TextInput
                placeholder="EMAIL"
                style={styles.input}
                value={email}
                onChangeText={text => setemail(text)}
                keyboardType="email-address"
              />
            </View>
            {error.includes("email") && (
              <Text style={styles.error}>*Required</Text>
            )}
            {error.includes("emailInvalid") && (
              <Text style={styles.error}>*Invalid</Text>
            )}
          </View>
          {form != "signIn" && (
            <View style={styles.formGroup}>
              <View style={styles.inputContainer}>
                <Icon name="user" size={20} />
                <TextInput
                  placeholder="USERNAME"
                  style={styles.input}
                  value={username}
                  onChangeText={text => setusername(text)}
                />
              </View>
              {error.includes("username") && (
                <Text style={styles.error}>*Required</Text>
              )}
              {error.includes("usernameInvalid") && (
                <Text style={styles.error}>*Do not match with password</Text>
              )}
            </View>
          )}
          <View style={styles.formGroup}>
            <View style={styles.inputContainer}>
              <Icon name="key" size={20} />
              <TextInput
                secureTextEntry={true}
                placeholder="PASSWORD"
                style={styles.input}
                value={password}
                onChangeText={text => setpassword(text)}
              />
            </View>
            {error.includes("password") && (
              <Text style={styles.error}>*Required</Text>
            )}
            {error.includes("passwordInvalid") && (
              <Text style={styles.error}>*must contain 6 letters</Text>
            )}
          </View>

          {form != "signIn" && (
            <>
              {/* <View style={styles.formGroup}>
                <View style={styles.inputContainer}>
                  <Icon name="user" size={20} />
                  <TextInput
                    placeholder="USERNAME"
                    style={styles.input}
                    value={username}
                    onChangeText={text => setusername(text)}
                  />
                </View>
                {error.includes("username") && (
                  <Text style={styles.error}>*Required</Text>
                )}
                {error.includes("usernameInvalid") && (
                  <Text style={styles.error}>*Do not match with password</Text>
                )}
              </View> */}
              <View style={styles.formGroup}>
                <View style={styles.inputContainer}>
                  <Icon name="key" size={20} />
                  <TextInput
                    secureTextEntry={true}
                    placeholder="CONFIRM PASSWORD"
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={text => setconfirmPassword(text)}
                  />
                </View>
                {error.includes("cpassword") && (
                  <Text style={styles.error}>*Required</Text>
                )}
                {error.includes("cpasswordInvalid") && (
                  <Text style={styles.error}>*Do not match with password</Text>
                )}
              </View>
            </>
          )}
          {formError && <Text style={styles.formError}>{formError}</Text>}
          <TouchableOpacity style={styles.button} onPress={formSubmit}>
            <Text style={styles.buttonText}>
              {loading ? (
                <Spinner
                  style={styles.spinner}
                  type="ThreeBounce"
                  color="#999"
                />
              ) : form == "signIn" ? (
                "Sign in"
              ) : (
                "Sign up"
              )}
            </Text>
          </TouchableOpacity>

          {loading && <View style={styles.formLoading}></View>}
        </View>
      </View>
    </ImageBackground>
  );
};

export default index;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    height: "100%",
    justifyContent: "space-between"
  },
  headerText: {
    textAlign: "center",
    fontSize: 50,
    fontFamily: M_BOLD
  },
  header: {
    margin: 20
  },
  content: {
    margin: 20,
    position: "relative"
  },
  formGroup: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: "#999",
    fontFamily: M_BOLD,
    marginLeft: 10
  },
  button: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: "#000"
  },
  buttonText: {
    textAlign: "center",
    fontFamily: M_BOLD,
    fontSize: 16,
    color: "#fff",
    textTransform: "uppercase"
  },
  formHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20
  },
  formTitle: {
    fontSize: 28,
    fontFamily: M_BOLD,
    textTransform: "uppercase"
  },
  activeFormText: {
    textDecorationLine: "underline"
  },
  inactiveFormText: {
    color: "#999"
  },
  triangleup: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderBottomColor: "rgba(255, 255, 255, 0.7)"
  },
  error: {
    color: "red",
    fontSize: 14,
    marginLeft: 20
  },
  formLoading: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center"
  },
  formError: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)"
  }
});
