import React, { Component } from "react";
import { Text, StyleSheet, View, TextInput, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/dist/Entypo";
import { getRandomColor } from "../Utils/Helpers";

export default class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tagsData: [],
      filtertagsData: []
    };
  }

  filterCategories = text => {
    let filtertags = this.state.tagsData;
    filtertags = filtertags.filter(tag => {
      if (
        tag.name
          .toString()
          .toLowerCase()
          .search(text.toLowerCase()) !== -1
      ) {
        return tag;
      }
      return null;
    });
    this.setState({
      filtertagsData: filtertags
    });
  };

  async componentDidMount() {
    //Have a try and catch block for catching errors.
    try {
      //Assign the promise unresolved first then get the data using the json method.
      const data = await fetch(
        "http://www.radiusleather.com/radius-directory/wp-json/wp/v2/tags?per_page=10&filter[orderby]=rand"
      );
      const response = await data.json();
      this.setState({
        tagsData: response,
        filtertagsData: response,
        loading: false
      });
    } catch (err) {
      console.log("Error fetching data-----------", err);
    }
  }
  renderTags(filtertagsData) {
    return filtertagsData.map(tag => {
      return (
        <Text style={[styles.category, { borderColor: getRandomColor() }]}>
          {tag.name}
        </Text>
      );
    });
  }

  render() {
    const { filtertagsData } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: 20
            }}
          >
            <TextInput
              placeholder="Search..."
              onChangeText={this.filterCategories}
              style={{ flex: 1, fontSize: 25, paddingLeft: 15 }}
            />
            <Icon name="magnifying-glass" size={25} />
          </View>
          <View style={styles.wrapper}>
            {filtertagsData.length > 0 && this.renderTags(filtertagsData)}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 10
  },
  category: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 10
  }
});
