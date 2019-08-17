import React, { useState, useEffect } from "react";
import { View, ScrollView ,TouchableOpacity} from "react-native";
import styles from "../assets/style.js";
import { getCategories } from "../Utils/Api.js";
import SingleCard from "./SingleCard";
const Categories = (props) => {
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then(data => setcategories(data))
      .catch(e => console.log(e));
  }, [false]);

  handleOnpress = cat => {
    props.navigation.navigate("ListByCity", {
      item: cat,
      type: "city",
    });
  };

  return (
    <View style={[{ paddingHorizontal: 10 }, styles.boxes]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.length > 0 &&
          categories.map(cat => (
            <TouchableOpacity key={`cat-${cat.id}`} onPress={()=>handleOnpress(cat)}>
              <SingleCard image={cat.acf.taxonomy_image ? cat.acf.taxonomy_image.sizes.thumbnail:''} title={cat.name} />
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default Categories;
