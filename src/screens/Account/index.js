import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import Login from "./login";
import Account from "./account";
import { useSelector, useDispatch } from "react-redux";

const Index = () => {
  const [isLogin, setisLogin] = useState(false);

  const authUser = useSelector(state => state.authUser);
  useEffect(() => {
    if (authUser.token) {
      setisLogin(true);
    }
  }, []);

  setUser = data => {};
  return (
    <View>
      {authUser.token != "" ? <Account /> : <Login setUser={setUser} />}
    </View>
  );
};

export default Index;
