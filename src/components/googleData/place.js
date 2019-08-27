import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,

  StyleSheet,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/dist/Entypo";
import { M_Regular } from "../../theme/fonts";
import { Rating, AirbnbRating } from "react-native-ratings";
import { getListPlaceImage } from "../../Utils/Api";
import { GOOGLE_MAP_API } from "../../Utils/constants";
import { withNavigation } from "react-navigation";

const Place = ({ place, handleClick }) => {
  const [image, setimage] = useState();
  useEffect(() => {
    if (
      place.photos &&
      place.photos.length > 0 &&
      place.photos[0].photo_reference != ""
    ) {
       
      getListPlaceImage(place.photos[0].photo_reference)
        .then(data => setimage(data))
        .catch(error => console.log(error));
    }
  }, [place]);



  if (!place) return null;
  return (
    <TouchableOpacity
     onPress={() => handleClick ? handleClick(place):''}
    >
      <View style={styles.place}>
        <View style={styles.left}>
          {image ? (
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 25
              }}
              source={{
                uri: image
              }}
            />
          ) : (
            <View
              style={{
                borderRadius: 25,
                backgroundColor: "red"
              }}
            >
              <Icon
                name="image"
                size={30}
                color="#fff"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "gray",
                  textAlign: "center",
                  paddingTop: 10
                }}
              />
            </View>
          )}
        </View>
        <View style={styles.right}>
          <Text style={styles.title}>{place.name}</Text>
          {place.vicinity != "" && (
            <Text style={styles.description}>{place.vicinity}</Text>
          )}
          {place.rating && (
            <Rating
              showRating={false}
              readonly={true}
              style={{ alignItems: "flex-start", paddingVertical: 5 }}
              ratingCount={5}
              startingValue={place.rating}
              imageSize={15}
            />
          )}

          {/* {timeInfo && <Text style={styles.timeInfo}>{timeInfo}</Text>} */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default withNavigation(Place);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    flex: 1,
    fontSize: 25
  },
  place: {
    backgroundColor: "#fff",
    marginBottom: 15,
    flexDirection: "row",
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1.0,
    shadowRadius: 15,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center"
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
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20
  },
  loadMoreBtn: {
    borderWidth: 1,
    borderColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5
  },
  timeInfo: {
    fontFamily: M_Regular,
    color: "#000",
    fontSize: 12,
    marginVertical: 5,
    color: "green"
  }
});
