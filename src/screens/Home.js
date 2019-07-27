import React, { Component } from 'react'
import { Text, StyleSheet, View , ScrollView ,ImageBackground} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import Header from '../components/Header'
import Banner from '../components/Banner'
import BlockHeader from '../components/BlockHeader'
import styles from '../assets/style.js'
import { TouchableOpacity } from 'react-native-gesture-handler';



export default class Home extends Component {
  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
  }
  render() {
    return (
      <View style={styles.flex}>
        <Header/>
        <ScrollView>
        <Banner/>
        <BlockHeader/>
        <View style={styles.boxes}>
          <TouchableOpacity style={styles.box}>
            <ImageBackground source={{uri:'https://images.unsplash.com/photo-1445019980597-93fa8acb246c'}} style={{width: '100%', height: '100%'}}>
              <Text>Inside</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>


        </ScrollView>
        </View>
    )
  }
}

