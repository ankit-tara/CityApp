import React, { Component } from "react";
import { Text, StyleSheet, View, TextInput, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/dist/Entypo";
import { getRandomColor } from "../Utils/Helpers";
import Header from "../components/Header";
import { M_BOLD, M_Regular } from "../theme/fonts";

const Explore = props => {
  const renderTags = () => {
    return (
      <Text style={[styles.category, { borderColor: getRandomColor() }]}>
        test
      </Text>
    );
    // return filtertagsData.map(tag => {
    //   return (
    //     <Text style={[styles.category, { borderColor: getRandomColor() }]}>
    //       {tag.name}
    //     </Text>
    //   );
    // });
  };
  return (
    <View style={{ flex: 1, marginHorizontal: 20 }}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <TextInput
            placeholder="Search..."
            onChangeText={this.filterCategories}
            style={{ flex: 1, fontSize: 25, paddingLeft: 15 }}
          />
          <Icon name="magnifying-glass" size={25} />
        </View>

        <Text style={styles.suggestedHeading}>Suggested :</Text>
        <View  style={styles.typeContainer}>
          <Text style={styles.heading}>Places:</Text>
          <View style={styles.wrapper}>
            {renderTags()}
            {renderTags()}
            {renderTags()}
            {renderTags()}
            {renderTags()}
          </View>
        </View>
        <View  style={styles.typeContainer}>
          <Text style={styles.heading}>Categories:</Text>
          <View style={styles.wrapper}>
            {renderTags()}
            {renderTags()}
            {renderTags()}
            {renderTags()}
            {renderTags()}
          </View>
        </View>
        <View style={styles.typeContainer}>
          <Text style={styles.heading}>Cities:</Text>
          <View style={styles.wrapper}>
            {renderTags()}
            {renderTags()}
            {renderTags()}
            {renderTags()}
            {renderTags()}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
Explore.navigationOptions = {
  header: <Header />
};
export default Explore;


const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 10
  },
  category: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    textTransform:'capitalize'
  },
  suggestedHeading: {
    fontSize: 20,
    color: "#ccc",
    fontFamily: M_BOLD,
    textTransform: "uppercase",
    marginVertical: 20
  },
  heading:{
    fontFamily:M_Regular,
    fontSize:15,
    textTransform:'uppercase'
  },
  typeContainer:{
    marginBottom:20
  }
});
