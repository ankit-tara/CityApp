import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import styles from "../assets/style.js";
import { getTags } from "../Utils/Api.js";
import SingleCard from "./SingleCard";
import Placeholder from "../placeholder/CategoryPlaceholder";
const Tags = props => {
  const [tags, settags] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    getTags()
      .then(data => {
        settags(data);
        setloading(false);
      })
      .catch(e => console.log(e));
  }, [false]);

  handleOnpress = cat => {
    props.navigation.navigate("ListByTag", {
      item: cat,
      type: "city"
    });
  };
  if (loading) {
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <Placeholder />
      </View>
    );
  }

  return (
    <View style={[{ paddingHorizontal: 10 }, styles.boxes]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tags.length > 0 &&
          tags.map(cat => (
            <TouchableOpacity
              key={`cat-${cat.id}`}
              onPress={() => handleOnpress(cat)}
            >
              <SingleCard image={cat.acf.taxonomy_image ? cat.acf.taxonomy_image.sizes.thumbnail:''} title={cat.name} />
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default Tags;
