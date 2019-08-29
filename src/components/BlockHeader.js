import React from "react";
import { Text, View,TouchableOpacity } from "react-native";
import styles from "../assets/style.js";

const BlockHeader = ({ heading, onLinkPress }) => {
  const handleClick=()=>{
    onLinkPress && onLinkPress()
  }
  return (
    <View style={[styles.row, styles.block]}>
      <Text style={styles.heading}>{heading}</Text>
      {onLinkPress && 
      <TouchableOpacity onPress={() => handleClick()}>
        <Text style={styles.link}>View All</Text>
      </TouchableOpacity>
      }
    </View>
  );
};
export default BlockHeader;
