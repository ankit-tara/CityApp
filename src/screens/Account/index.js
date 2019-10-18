import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Login from "./login"
import Account from "./account"
export default class index extends Component {
    render() {
        return (
          <View>
            <Account />
          </View>
        );
    }
}
