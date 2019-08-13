import React from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Modal
} from "react-native";
import Icon from "react-native-vector-icons/dist/Entypo";
import ImageViewer from "react-native-image-zoom-viewer";

const ImageModal = ({ urls = [], isOpen = false, closeModal, index = 0 }) => {
  const _renderModalCloseBtn = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={closeModal}
        style={{ margin: 10 }}
        saveToLocalByLongPress={false}
      >
        <Icon name="cross" style={{ color: "#fff" }} size={26} />
      </TouchableOpacity>
    );
  };
  return (
    <Modal
      visible={isOpen}
      onRequestClose={closeModal}
      animationType="slide"
      transparent={true}
    >
      <ImageViewer
        imageUrls={urls}
        index={index}
        renderHeader={() => _renderModalCloseBtn()}
      />
    </Modal>
  );
};
export default ImageModal;
