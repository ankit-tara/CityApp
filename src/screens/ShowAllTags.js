import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  ActivityIndicator
} from "react-native";
import styles from "../assets/style.js";
import { getTags, searchTags } from "../Utils/Api.js";
import { M_BOLD } from "../theme/fonts";
import SingleCard from "../components/SingleCard";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import { APP_ORANGE } from "../theme/colors.js";
const ShowAllTags = props => {
  const per_page = 21;
  const [tags, settags] = useState([]);
  const [searchData, setsearcgData] = useState([]);
  const [defaultData, setdefaultData] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [currentSearchpage, setcurrentSearchpage] = useState(0);
  const [loadMore, setloadMore] = useState(false);
  const [isSearching, setisSearching] = useState(false);
  const [postEnd, setpostEnd] = useState(false);
  const scrollY  = new Animated.Value(0)

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
      type: "tag"
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
        console.log(data.length)
        if(data.length<=0){
          setpostEnd(true)
        }
      })
      .catch(e => console.log(e));
  };

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
  }



  renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={[styles.row,styles.footer]}>
        {/* <TouchableOpacity
          activeOpacity={0.9}
          onPress={loadMoreData}
          //On Click of button calling loadMoreData function to load more data
          style={[styles.row,styles.loadMoreBtn]}
        >
          <Text style={styles.btnText}>Show More</Text>
          {loadMore && <ActivityIndicator style={{ marginLeft: 8 }} color={APP_ORANGE}/>}
        </TouchableOpacity> */}
         {loadMore && <ActivityIndicator style={{ marginLeft: 8 }} color={APP_ORANGE}/>}
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
    <ScrollView
    scrollEventThrottle={16}
    onMomentumScrollEnd={Animated.event(
      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      {
        listener: event => {
          if (this.isCloseToBottom(event.nativeEvent)&&!postEnd) {
            this.loadMoreData()
          }
        }
      }
    )}     >
      <SearchBar placeholder="Search City" onChangeText={handleSearch}/>
      <View style={[{ paddingHorizontal: 10 }]}>
        {isSearching && <ActivityIndicator style={{ marginLeft: 8,alignSelf:'center' }} color={APP_ORANGE} />}
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
