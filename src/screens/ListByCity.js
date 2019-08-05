import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image
} from "react-native";
// import styles from "../assets/style.js";
import { getPostByCategory } from "../Utils/Api.js";
import { text_truncate, strip_html_tags } from "../Utils/Helpers.js";
const ListByCity = props => {
  const per_page = 10;
  const [category, setcategory] = useState();
  const [posts, setposts] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [loadMore, setloadMore] = useState(false);

  useEffect(() => {
    if (props.navigation.state.params.item) {
      console.log(props.navigation.state.params.item);
      setcategory(props.navigation.state.params.item);
      getPostByCategory(props.navigation.state.params.item.id)
      .then(data => {
        setposts(data);
      })
      .catch(e => console.log(e));
    }
  
  });


  loadMoreData = () => {

    setloadMore(true);
    getPostByCategory(category.id, per_page, currentpage + 1)
      .then(data => {
        let new_data = posts.concat(data);
        setcurrentpage(currentpage + 1);
        setposts(new_data);
        setloadMore(false);
      })
      .catch(e => console.log(e));
  };

  renderFooter = () => {
    if(!posts.length) return null
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
    <View style={{ flex: 1 }}>
      <ScrollView style={{ marginBottom: 50 }}>
        <View style={styles.wrapper}>
          {category && (
            <View>
              <View style={styles.header}>
                <Text style={styles.results}>Category > {category.name}</Text>
                <Text style={styles.results}>Results({posts.length})</Text>
              </View>
              <FlatList
                keyExtractor={item => `post-${item.id}`}
                data={posts}
                renderItem={post => (
                  <View style={styles.place}>
                    {console.log(post)}
                    <View style={styles.left}>
                      {post.item.fimg_url && 
                      <Image
                        style={{ width: 50, height: 50, borderRadius: 25 }}
                        source={{
                          uri:post.item.fimg_url
                            
                        }}
                      />
                      }
                    </View>
                    <View style={styles.right}>
                      <Text style={styles.title}>
                        {post.item.title.rendered}
                      </Text>
                      <Text style={styles.description}>
                        {text_truncate(
                          strip_html_tags(post.item.content.rendered),
                          75
                        )}
                      </Text>
                    </View>
                  </View>
                )}
                // ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListFooterComponent={renderFooter}
                //Adding Load More button as footer component
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ListByCity;

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
    paddingHorizontal: 15
  },
  place: {
    backgroundColor: "#fff",
    marginBottom: 15,
    flexDirection: "row",
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1.0,
    shadowRadius: 15,
    elevation: 2
  },
  left: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  right: {
    overflow: "hidden",
    paddingVertical: 15,
    paddingHorizontal: 5,
    flex: 2
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 5
  },
  description: {
    fontSize: 13,
    color: "rgba(0,0,0,0.5)"
  },
  catTitle: {
    fontSize: 16
  },
  results: {
    fontSize: 15,
    fontWeight: "bold",
    color: "rgba(0,0,0,0.5)"
  },
  header: {
    marginBottom: 20,
    marginHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});