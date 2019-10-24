import React, { Component, useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/dist/Entypo";

const SearchBar = ({ onChangeText, placeholder }) => {
  const [text, settext] = useState("");
  const [typing, settyping] = useState(false);
  const [typingTimeout, settypingTimeout] = useState();
  handleChange = text => {
    settext(text);
    if (typingTimeout) {
      clearInterval(typingTimeout);
    }
    let timeout = setInterval(function() {
      onChangeText && onChangeText(text);
    }, 2000);

    settypingTimeout(timeout);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder || "Search..."}
        onChangeText={handleChange}
        style={styles.input}
        value={text}
        multiline={true}
        numberOfLines={4}
        // blurOnSubmit={false}
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
    justifyContent: "space-between",
    marginHorizontal: 20
  },
  input: {
    // flex: 1,
    fontSize: 16,
    padding: 0,
    margin: 0
  }
});
