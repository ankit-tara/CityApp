import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/dist/Entypo";
import { getRandomColor } from "../Utils/Helpers";
import Header from "../components/Header";
import { M_BOLD, M_Regular } from "../theme/fonts";
import { searchGlobal } from "../Utils/Api";
import SearchBar from "../components/SearchBar";
import { APP_ORANGE } from "../theme/colors";
import Placeholder from "../placeholder/ExplorePlaceholder"
import {  useSelector } from "react-redux";

const Explore = props => {
  const [data, setdata] = useState({});
  const [defaultData, setdefaultData] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [currentSearchpage, setcurrentSearchpage] = useState(0);
  const [loadMore, setloadMore] = useState(false);
  const [isSearching, setisSearching] = useState(false);
  const [loading, setloading] = useState(true);
  const authLocation = useSelector(state => state.authLocation);
  
  useEffect(() => {
    let city = authLocation.city
    searchGlobal('',city)
      .then(data => {
        setdata(data);
        setdefaultData(data);
        setloading(false)
      })
      .catch(e => console.log(e));
  }, []);

  const renderTags = text => {
    return <Text style={[styles.category]}>{text}</Text>;
  };
  const handleSearch = text => {
    setisSearching(true);
    if (!text) {
      setdata(defaultData);
      setisSearching(false);
      return;
    }

    searchGlobal(text)
      .then(data => {
        setdata(data);
        setisSearching(false);
      })
      .catch(e => console.log(e));
  };
  

  return (
    <View style={{ flex: 1, marginHorizontal: 20 }}>
      <SearchBar placeholder="Search..." onChangeText={handleSearch} />
      {isSearching && (
        <ActivityIndicator
          style={{ marginLeft: 8, alignSelf: "center" }}
          color={APP_ORANGE}
        />
      )}
      
      <ScrollView>
        <Text style={styles.suggestedHeading}>Suggested :</Text>
        {loading && <Placeholder/>}
        {data && data.posts && data.posts.length > 0 && (
          <View style={styles.typeContainer}>
            <Text style={styles.heading}>Places:</Text>
            <View style={styles.wrapper}>
              {data.posts.map(item => (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("Single", {
                      post: item
                    })
                  }
                  key={`post-${item.id}`}

                >
                  {renderTags(item.title.rendered)}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        {data && data.tags && data.tags.length > 0 && (
          <View style={styles.typeContainer}>
            <Text style={styles.heading}>Categories:</Text>
            <View style={styles.wrapper}>
              {data.tags.map(item => (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("ListByTag", {
                      item: item,
                      type: "tag"
                    })
                  }
                  key={`tag-${item.id}`}

                >
                  {renderTags(item.name)}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        {data && data.categories && data.categories.length > 0 && (
          <View style={styles.typeContainer}>
            <Text style={styles.heading}>Cities:</Text>
            <View style={styles.wrapper}>
              {data.categories.map(item => (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("ListByCity", {
                      item: item,
                      type: "cat"
                    })
                  }
                  key={`cat-${item.id}`}
                >
                  {renderTags(item.name)}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
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
    // justifyContent: "center",
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
    textTransform: "capitalize",
    color: "gray"
  },
  suggestedHeading: {
    fontSize: 20,
    color: "#ccc",
    fontFamily: M_BOLD,
    textTransform: "uppercase",
    marginVertical: 20
  },
  heading: {
    fontFamily: M_BOLD,
    fontSize: 15,
    textTransform: "uppercase",
    color: APP_ORANGE
  },
  typeContainer: {
    marginBottom: 20
  }
});
