import React, { Component } from "react";
import { View, Text } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { M_Regular } from "../theme/fonts";

export default class TestGeo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: null,
      error:null
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({ position: position });
      },
      error => {
        this.setState({error:error})
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }

  render() {
    const { position,error } = this.state;
    return (
      <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
        <Text style={{fontSize:20,color:"gray",fontFamily:M_Regular}}> {position && JSON.stringify(position)} </Text>
        <Text style={{fontSize:20,color:"red",fontFamily:M_Regular}}> {error && JSON.stringify(error)} </Text>
      </View>
    );
  }
}
