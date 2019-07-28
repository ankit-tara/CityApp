import React, { Component } from 'react'
import { Text, View ,Image ,ScrollView} from 'react-native'
import styles from '../assets/style.js'

export default class Banks extends Component {
  render() {
    return (
        <View style={[{paddingHorizontal:10},styles.boxes]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.box}>
          <Image style={styles.boxImage} source={{uri:'https://images.unsplash.com/photo-1445019980597-93fa8acb246c'}}/>
          <Text style={styles.boxText}>HDFC Bank ATM</Text>
          </View>
          <View style={styles.box}>
          <Image style={styles.boxImage} source={{uri:'https://images.unsplash.com/photo-1445019980597-93fa8acb246c'}}/>
          <Text style={styles.boxText}>AXIS Bank ATM</Text>
          </View>
          <View style={styles.box}>
          <Image style={styles.boxImage} source={{uri:'https://images.unsplash.com/photo-1445019980597-93fa8acb246c'}}/>
          <Text style={styles.boxText}>SBI Bank ATM</Text>
          </View>
          <View style={styles.box}>
          <Image style={styles.boxImage} source={{uri:'https://images.unsplash.com/photo-1445019980597-93fa8acb246c'}}/>
          <Text style={styles.boxText}>PNB Bank ATM</Text>
          </View>
          <View style={styles.box}>
          <Image style={styles.boxImage} source={{uri:'https://images.unsplash.com/photo-1445019980597-93fa8acb246c'}}/>
          <Text style={styles.boxText}>INDIAN Bank ATM</Text>
          </View>
          <View style={styles.box}>
          <Image style={styles.boxImage} source={{uri:'https://images.unsplash.com/photo-1445019980597-93fa8acb246c'}}/>
          <Text style={styles.boxText}>HDFC Bank ATM</Text>
          </View>
          </ScrollView>
        </View>
  
    )
  }
}

