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

const WhatsAppModal = ({ isOpen = false, closeModal, numbers = [],isWhatsapp=false}) => {
  return (
    <Modal
      visible={isOpen}
      onRequestClose={closeModal}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={{textAlign:'center'}}>Choose a number</Text>
          {numbers.map(number => (
            <TouchableOpacity
              onPress={() =>isWhatsapp ? Linking.openURL(`whatsapp://send?phone=${number}`) :  Linking.openURL(`tel:${number}`) }
              key={`whatsapp-${number}`}
            >
              <View style={styles.number}>
                <Text style={styles.text}>{number}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={closeModal} style={styles.close}>
        <Icon name="cross" size={35} color="#fff" style={styles.Icon} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
export default WhatsAppModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor:'rgba(0,0,0,0.7)'

  },
  box: {
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 30,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1.0,
    shadowRadius: 15,
    elevation: 7,
    position:'relative',
  },
  number:{
    marginTop:10,
  },
  text: {
    paddingHorizontal: 10,
    paddingVertical:3,
    fontSize: 20,
    fontFamily: M_BOLD,
  },
  close:{
    position:'absolute',
    top:'30%',
    right:50,
  }
});
