import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import styles from "../assets/style.js";
import { getCategories } from "../Utils/Api.js";
import SingleCard from "./SingleCard";
const Categories = () => {
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then(data => setcategories(data))
      .catch(e => console.log(e));
  }, [false]);

  return (
    <View style={[{ paddingHorizontal: 10 }, styles.boxes]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.length > 0 &&
          categories.map(cat => (
            <View key={`cat-${cat.id}`}>
              <SingleCard image={cat.acf.taxonomy_image} title={cat.name} />
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default Categories;
