import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import styles from '../../assets/style.js'
import Menu, { MenuItem } from 'react-native-material-menu';
import CartIcon from "../../screens/Shop/CartIcon";
const AppHeader = (props) => {
  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  return (
    <View style={[styles.row, styles.header]}>
      <View style={[styles.flex]}>
        {/* <Menu
          style={{ marginTop: 40,width:'50%' }}
          ref={this.setMenuRef}
          button={<TouchableOpacity onPress={this.showMenu}><Icon name="text" size={27} color='black' /></TouchableOpacity>}
        >
          <MenuItem onPress={this.hideMenu}><Icon name="account-multiple-plus-outline" size={27} color='black' /> Invite Friends</MenuItem>
          <MenuItem onPress={this.hideMenu}><Icon name="star-outline" size={27} color='black' /> Rate Us</MenuItem>
        </Menu> */}
      </View>
      <Text style={[styles.flex, styles.logo]}> CityApp </Text>
      <View style={[styles.flex, { alignItems: "flex-end" }]}>
        {props.showCart && <CartIcon />}
      </View>
      {/* <Text style={[styles.flex]} /> */}
    </View>
  );
}

export default AppHeader