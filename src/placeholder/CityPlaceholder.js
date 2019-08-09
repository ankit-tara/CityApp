import React from "react";
import { View } from "react-native";
import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";

const BannerPlaceholder = () => (
  <View style={{ height: 400 }}>
    <Placeholder Animation={Fade}>
      <View style={{ flexDirection: "row", flex: 1,flexWrap:'wrap' }}>
        <PlaceholderLine
          width={30}
          height={15}
          style={{ borderRadius: 0, marginRight: 10,borderColor:"#000" }}
        />
       
        <PlaceholderLine
          width={20}
          height={15}
          style={{ borderRadius: 0, marginRight: 10,borderColor:"#000" }}
        />
       
        <PlaceholderLine
          width={40}
          height={15}
          style={{ borderRadius: 0, marginRight: 10,borderColor:"#000" }}
        />
        <PlaceholderLine
          width={10}
          height={15}
          style={{ borderRadius: 0, marginRight: 10,borderColor:"#000" }}
        />
       
        <PlaceholderLine
          width={40}
          height={15}
          style={{ borderRadius: 0, marginRight: 10,borderColor:"#000" }}
        />
       
        <PlaceholderLine
          width={25}
          height={15}
          style={{ borderRadius: 0, marginRight: 10,borderColor:"#000" }}
        />
       
        <PlaceholderLine
          width={30}
          height={15}
          style={{ borderRadius: 0, marginRight: 10,borderColor:"#000" }}
        />
       
        <PlaceholderLine
          width={20}
          height={15}
          style={{ borderRadius: 0, marginRight: 10,borderColor:"#000" }}
        />
       
        <PlaceholderLine
          width={40}
          height={15}
          style={{ borderRadius: 0, marginRight: 10,borderColor:"#000" }}
        />
        <PlaceholderLine
          width={10}
          height={15}
          style={{ borderRadius: 0, marginRight: 10,borderColor:"#000" }}
        />
       
        <PlaceholderLine
          width={40}
          height={15}
          style={{ borderRadius: 0, marginRight: 10,borderColor:"#000" }}
        />
       
        <PlaceholderLine
          width={25}
          height={15}
          style={{ borderRadius: 0, marginRight: 10,borderColor:"#000" }}
        />
       
      </View>
    </Placeholder>
  </View>
);

export default BannerPlaceholder;
