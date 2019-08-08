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
import { getTags, searchTags } from "../Utils/Api.js";
import { M_BOLD } from "../theme/fonts";
import SingleCard from "../components/SingleCard";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
const ShowAllTags = props => {
  const per_page = 21;
  const [tags, settags] = useState([]);
  const [searchData, setsearcgData] = useState([]);
  const [defaultData, setdefaultData] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [currentSearchpage, setcurrentSearchpage] = useState(0);
  const [loadMore, setloadMore] = useState(false);
  const [isSearching, setisSearching] = useState(false);

  useEffect(() => {
    getTags(per_page)
      .then(data => {
        settags(data);
        setdefaultData(data);
      })
      .catch(e => console.log(e));
  }, [false]);

  handleOnpress = tag => {
    props.navigation.navigate("ListByTag", {
      item: tag,
      type: "city"
    });
  };

  loadMoreData = () => {
    setloadMore(true);
    getTags(per_page, currentpage + 1)
      .then(data => {
        let new_data = tags.concat(data);
        setcurrentpage(currentpage + 1);
        settags(new_data);
        setdefaultData(data);
        setloadMore(false);
      })
      .catch(e => console.log(e));
  };

  renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={[styles.row,styles.footer]}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={loadMoreData}
          //On Click of button calling loadMoreData function to load more data
          style={[styles.row,styles.loadMoreBtn]}
        >
          <Text style={styles.btnText}>Show More</Text>
          {loadMore && <ActivityIndicator style={{ marginLeft: 8 }} />}
        </TouchableOpacity>
      </View>
    );
  };

  handleSearch=(text)=>{
    setisSearching(true)
    if(!text){
      settags(defaultData)
      setisSearching(false);
      return
    }
   
    searchTags(text,per_page, currentSearchpage + 1)
    .then(data => {
      // let new_data = searchData.contag(data);
      // setcurrentSearchpage(currentSearchpage + 1);
      setsearcgData(data);
      settags(data);
      setisSearching(false);
    })
    .catch(e => console.log(e));
  }
  return (
    <ScrollView>
      <SearchBar placeholder="Search City" onChangeText={handleSearch}/>
      <View style={[{ paddingHorizontal: 10 }]}>
        {isSearching && <ActivityIndicator style={{ marginLeft: 8,alignSelf:'center' }} />}
        <View style={[styles.row, styles.wrap]}>
          {tags.map(tag => (
            <TouchableOpacity
              key={`tag-${tag.id}`}
              onPress={() => handleOnpress(tag)}
              style={styles.singleCity}
            >
              <SingleCard
                image={tag.acf.taxonomy_image}
                title={tag.name}
                showText={true}
              />
            </TouchableOpacity>
          ))}
        </View>
        
        {tags && tags.length >=21&& renderFooter()}
      </View>
    </ScrollView>
  );
};
ShowAllTags.navigationOptions = {
  title: 'Tags',
  headerTitleStyle: {
    textAlign: "center",
    alignSelf: "center",
    flex: 1,
    fontFamily:M_BOLD,
  },
  headerRight:<View/>
};
export default ShowAllTags;
