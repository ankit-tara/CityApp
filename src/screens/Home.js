import React, { Component } from 'react'
import { Text, StyleSheet, View , ScrollView , Image} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import Header from '../components/Header'
import Banner from '../components/Banner'
import BlockHeader from '../components/BlockHeader'
import Categories from '../components/Categories'
import Banks from '../components/Banks'
import ATM from '../components/Atm'
import Ads from '../components/Ads'
import styles from '../assets/style.js'



export default class Home extends Component {
 

  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
  }
  render() {
    return (
      <View style={styles.flex}>
        {/* <Header/> */}
        <ScrollView>
        <Banner/>
        <BlockHeader heading='CATEGORIES'/>
        <Categories/>
        <Ads/>
        <BlockHeader heading='BANKS'/>
        <Banks/>
        <BlockHeader heading='ATMS'/>
        <ATM/>
        </ScrollView>
        </View>
    )
  }
}

