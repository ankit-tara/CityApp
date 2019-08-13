import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Linking
} from "react-native";
import Icon from "react-native-vector-icons/dist/Entypo";
import { M_BOLD } from "../theme/fonts";

const WhatsAppModal = ({ isOpen = false, closeModal, numbers = [] }) => {
  return (
    <Modal
      visible={isOpen}
      onRequestClose={closeModal}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.container}>
        <View style={styles.box}>
          <Text>Choose a number</Text>
          {numbers.map(number => (
            <TouchableOpacity
              onPress={() => Linking.openURL(`whatsapp://send?phone=${number}`)}
            >
              <View style={styles.number}>
                <Text style={styles.text}>{number}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Text>hello</Text>
    </Modal>
  );
};
export default WhatsAppModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20
  },
  box: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  number: {
    padding: 10,
    fontSize: 20,
    fontFamily: M_BOLD
  }
});
