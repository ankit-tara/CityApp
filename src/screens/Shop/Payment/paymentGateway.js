import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";

const paymentGateway = props => {
  const [orderId, setorderId] = useState();
  const [url, seturl] = useState();
  useEffect(() => {
      let url = props.navigation.state.params.url
      if(url) seturl(url.url)
  }, []);

  if (!url) return null;

  return (
    <WebView
      source={{
        uri: url
      }}
    />
  );
};

export default paymentGateway;
