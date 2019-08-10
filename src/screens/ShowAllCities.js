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
import { getCategories, searchCategories } from "../Utils/Api.js";
import SingleCard from "../components/SingleCard";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import { APP_ORANGE } from "../theme/colors.js";
import Icon from "react-native-vector-icons/dist/FontAwesome5";
import Placeholder from "../placeholder/CityPlaceholder"


const ShowAllCities = props => {
  const per_page = 21;
  const [categories, setcategories] = useState([]);
  const [searchData, setsearcgData] = useState([]);
  const [defaultData, setdefaultData] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [currentSearchpage, setcurrentSearchpage] = useState(0);
  const [loadMore, setloadMore] = useState(false);
  const [isSearching, setisSearching] = useState(false);
  const [loading, setloading] = useState(true);
  const scrollY  = new Animated.Value(0)

  useEffect(() => {
    getCategories(per_page)
      .then(data => {
        setcategories(data);
        setdefaultData(data);
        setloading(false)
      })
      .catch(e => console.log(e));
  }, [false]);

  handleOnpress = cat => {
    props.navigation.navigate("ListByCity", {
      item: cat,
      type: "city"
    });
  };

  loadMoreData = () => {
    setloadMore(true);
    getCategories(per_page, currentpage + 1)
      .then(data => {
        let new_data = categories.concat(data);
        setcurrentpage(currentpage + 1);
        setcategories(new_data);
        setdefaultData(data);
        setloadMore(false);
      })
      .catch(e => console.log(e));
  };

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
          {loadMore && <ActivityIndicator style={{ marginLeft: 8 }} color={APP_ORANGE} />}
        </TouchableOpacity> */}
        {loadMore && <ActivityIndicator style={{ marginLeft: 8 }} color={APP_ORANGE} />}

      </View>
    );
  };

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
  }

  handleSearch=(text)=>{
    setisSearching(true)
    if(!text){
      setcategories(defaultData)
      setisSearching(false);
      return
    }
   
    searchCategories(text,per_page, currentSearchpage + 1)
    .then(data => {
      // let new_data = searchData.concat(data);
      // setcurrentSearchpage(currentSearchpage + 1);
      setsearcgData(data);
      setcategories(data);
      setisSearching(false);
    })
    .catch(e => console.log(e));
  }
  
  return (
    <ScrollView  
    scrollEventThrottle={16}
    onScroll={Animated.event(
      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      {
        listener: event => {
          if (this.isCloseToBottom(event.nativeEvent)) {
            this.loadMoreData()
          }
        }
      }
    )}     >
      <SearchBar placeholder="Search City" onChangeText={handleSearch}/>
      <View style={[{ paddingHorizontal: 10 }]}>
        {isSearching && <ActivityIndicator style={{ marginLeft: 8,alignSelf:'center' }} color={APP_ORANGE} />}
        {loading && <Placeholder/>}
        <View>
          {categories.map(cat => (
            <TouchableOpacity
              key={`cat-${cat.id}`}
              onPress={() => handleOnpress(cat)}
              style={styles.singleCity}
            >
              {/* <SingleCard
                image={cat.acf.taxonomy_image}
                title={cat.name}
                showText={true}
              /> */}
              <Text style={styles.cityheading}><Icon style={{marginRight :30}} name="city" size={14} color='#ec9902'/>   {cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {categories && categories.length >=21&& renderFooter()}
      </View>
    </ScrollView>
  );
};
ShowAllCities.navigationOptions = {
  header: <Header/>
};
export default ShowAllCities;
