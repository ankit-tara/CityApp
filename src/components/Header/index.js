import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/dist/Feather';
import styles from '../../assets/style.js'

export default class index extends Component {
  render() {
    return (
      <View style={[ styles.row , styles.header]}>
        <Icon name="menu" size={25} color='balck' style={[ styles.flex]}/>
        <Text style={[ styles.flex , styles.logo]}> CityApp </Text>
        <Text style={[ styles.flex ]}/>
      </View>
    )
  }
}