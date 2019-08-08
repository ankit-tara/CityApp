import React, { Component, useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/dist/Entypo";

const SearchBar = ({ onChangeText, placeholder }) => {
  const [text, settext] = useState("");
  const [typing, settyping] = useState(false);
  const [typingTimeout, settypingTimeout] = useState(0);
  handleChange = text => {
    settext(text);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    settypingTimeout(
      setTimeout(function() {
        onChangeText && onChangeText(text);
      }, 5000)
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder || "Search..."}
        onChangeText={handleChange}
        style={styles.input}
        value={text}
        // onEndEditing={handleChange}
      />
      <Icon name="magnifying-glass" size={25} />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20
  },
  input: {
    flex: 1,
    fontSize: 25,
    paddingLeft: 15
  }
});
