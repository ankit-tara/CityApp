import React, { useState, useEffect } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/dist/Entypo";
import Spinner from "../Loader/fullPage";
import { APP_SIDE_DISTANCE } from "../../theme/Dimentions";
import Place from "./place";
import { withNavigation } from "react-navigation";

const GoogleList = props => {
  const [places, setplaces] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    // if (props.data && props.data.status == "OK" ) {
      let data = props.data;
      setplaces(data);
      setloading(false);
     
    // } else {
    //   setloading(false);
    // }
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const handleClick =(place)=>{
    props.navigation.navigate('Single',{
        googlePlaceId:place.place_id
    })
  }

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(place,index) => `place-${index}`}
        data={places}
        style={styles.list}
        renderItem={(place, index) => (
          <View key={`place-${index}`}>
            <Place place={place.item} handleClick={handleClick} />
          </View>
        )}
      />
    </View>
  );
};

export default withNavigation(GoogleList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list:{
    paddingHorizontal: APP_SIDE_DISTANCE

  }
});
