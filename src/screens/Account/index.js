import React, { useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";
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
  const style={flex:1}
  return (
    <ScrollView style={{ flex: 1}}>
        {authUser.token != "" ? <Account /> : <Login setUser={setUser} />}
      {/* </View> */}
    </ScrollView>
  );
};

export default Index;
