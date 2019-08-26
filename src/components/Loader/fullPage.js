import React from "react";
import { View, StyleSheet } from "react-native";
import Spinner from "react-native-spinkit";
import { APP_ORANGE } from "../../theme/colors";

const FullPageSpinner = ({ type, color, size }) => {
  return (
    <View style={styles.container}>
      <Spinner
        type={type || "Pulse"}
        color={color || APP_ORANGE}
        size={size || 80}
      />
    </View>
  );
};

export default FullPageSpinner;

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center", flex: 1 }
});
