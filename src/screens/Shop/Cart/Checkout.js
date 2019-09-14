import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import { M_BOLD, M_SemiBold } from "../../../theme/fonts";
import { APP_SIDE_DISTANCE } from "../../../theme/Dimentions";

const Checkout = () => {
  const [firstname, setfirstname] = useState();
  const [lastname, setlastname] = useState();
  const [companyName, setcompanyName] = useState();
  const [address, setaddress] = useState();
  const [city, setcity] = useState();
  const [state, setstate] = useState();
  const [zip, setzip] = useState();
  const [phone, setphone] = useState();
  const [email, setemail] = useState();

  const [dfirstname, setdfirstname] = useState();
  const [dlastname, setdlastname] = useState();
  const [dcompanyName, setdcompanyName] = useState();
  const [daddress, setdaddress] = useState();
  const [dcity, setdcity] = useState();
  const [dstate, setdstate] = useState();
  const [dzip, setdzip] = useState();

  const [orderNotes, setorderNotes] = useState();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.heading}>Billing Address</Text>
        <TextInput
          placeholder="First name"
          onChangeText={text => setfirstname(text)}
          style={styles.input}
          value={firstname}
        />
        <TextInput
          placeholder="Last name"
          onChangeText={text => setlastname(text)}
          style={styles.input}
          value={lastname}
        />
        <TextInput
          placeholder="Company name"
          onChangeText={text => setcompanyName(text)}
          style={styles.input}
          value={companyName}
        />
        <TextInput
          placeholder="Address"
          onChangeText={text => setaddress(text)}
          style={styles.input}
          value={address}
        />
        <TextInput
          placeholder="City/Town"
          onChangeText={text => setdcity(text)}
          style={styles.input}
          value={dcity}
        />
        <TextInput
          placeholder="State"
          onChangeText={text => setstate(text)}
          style={styles.input}
          value={state}
        />
        <TextInput
          placeholder="Postal Code/Zip"
          onChangeText={text => setzip(text)}
          style={styles.input}
          value={zip}
        />
        <TextInput
          placeholder="Phone"
          onChangeText={text => setphone(text)}
          style={styles.input}
          value={phone}
        />
        <TextInput
          placeholder="Email"
          onChangeText={text => setemail(text)}
          style={styles.input}
          value={email}
        />
      </View>
      <View>
        <Text>Shipping Address</Text>
        <TextInput
          placeholder="First name"
          onChangeText={text => setdfirstname(text)}
          style={styles.input}
          value={dfirstname}
        />
        <TextInput
          placeholder="Last name"
          onChangeText={text => setdlastname(text)}
          style={styles.input}
          value={dlastname}
        />
        <TextInput
          placeholder="Company name"
          onChangeText={text => setdcompanyName(text)}
          style={styles.input}
          value={dcompanyName}
        />
        <TextInput
          placeholder="Address"
          onChangeText={text => setdaddress(text)}
          style={styles.input}
          value={daddress}
        />
        <TextInput
          placeholder="City/Town"
          onChangeText={text => setcity(text)}
          style={styles.input}
          value={city}
        />
        <TextInput
          placeholder="State"
          onChangeText={text => setdstate(text)}
          style={styles.input}
          value={dstate}
        />
        <TextInput
          placeholder="Postal Code/Zip"
          onChangeText={text => setdzip(text)}
          style={styles.input}
          value={dzip}
        />
      </View>
      <TextInput
        placeholder="Order Notes"
        onChangeText={text => setorderNotes(text)}
        style={styles.input}
        value={orderNotes}
        // multiline={8}
      />
    </ScrollView>
  );
};
Checkout.navigationOptions = {
  title: "Checkout",
  headerTitleStyle: {
    textAlign: "center",
    alignSelf: "center",
    flex: 1,
    fontFamily: M_BOLD,
    textTransform: "capitalize"
  },
  headerRight: <View />
};
export default Checkout;
const styles = StyleSheet.create({
  container: {
    margin: APP_SIDE_DISTANCE
  },
  heading: {
    fontFamily: M_SemiBold
  },
  input: {
    borderWidth: 1,
    borderColor: "gray"
  }
});
