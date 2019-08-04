import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from "react-native";
import styles from "../assets/style.js";
import { getCategories } from "../Utils/Api.js";
import SingleCard from "../components/SingleCard";
const Categories = props => {
  const per_page = 10;
  const [categories, setcategories] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [loadMore, setloadMore] = useState(false);

  useEffect(() => {
    getCategories()
      .then(data => {
        setcategories(data);
      })
      .catch(e => console.log(e));
  }, [false]);

  handleOnpress = cat => {
    props.navigation.navigate("List", {
      item: cat,
      type: "city",
    });
  };

  loadMoreData = () => {
    setloadMore(true);
    getCategories(per_page, currentpage + 1)
      .then(data => {
        let new_data = categories.concat(data);
        setcurrentpage(currentpage + 1);
        setcategories(new_data);
        setloadMore(false);
      })
      .catch(e => console.log(e));
  };

  renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => loadMoreData()}
          //On Click of button calling loadMoreData function to load more data
          style={styles.loadMoreBtn}
        >
          <Text style={styles.btnText}>Load More</Text>
          {loadMore && <ActivityIndicator style={{ marginLeft: 8 }} />}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <Text style={styles.heading}>CITIES</Text>

      <View style={[{ paddingHorizontal: 10 }, styles.boxes]}>
        <ScrollView style={{ marginBottom: 50 }}>
          <FlatList
            keyExtractor={item => `cat-${item.id}`}
            data={categories}
            renderItem={cat => (
              <TouchableOpacity
                key={`cat-${cat.item.id}`}
                onPress={() => handleOnpress(cat.item)}
              >
                <SingleCard
                  image={cat.item.acf.taxonomy_image}
                  title={cat.item.name}
                  showText={false}
                />
                <Text style={styles.heading}>{cat.item.name}</Text>
              </TouchableOpacity>
            )}
            // ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListFooterComponent={renderFooter}
            //Adding Load More button as footer component
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Categories;
