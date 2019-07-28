import React, { Component } from 'react'
import { Text, StyleSheet, View ,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/dist/Feather';
import styles from '../../assets/style.js'

export default class index extends Component {
  render() {
    return (
      
      <TouchableOpacity onPress={()=>{
        // alert('hiiii');
        // this.props.navigation.toggleDrawer()
      }} style={[ styles.row , styles.header]}>
        <Icon name="menu" size={25} color='balck' style={[ styles.flex]}/>
        <Text style={[ styles.flex , styles.logo]}> CityApp </Text>
        <Text style={[ styles.flex ]}/>
      </TouchableOpacity>
    )
  }
}