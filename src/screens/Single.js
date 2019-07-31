import React, { Component } from 'react'
import { Text, StyleSheet, View  , ScrollView , ImageBackground ,Image, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Collapsible from 'react-native-collapsible';
import Lightbox from 'react-native-lightbox';

export default class Single extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       isCollapsed:true
    }
  }
  

  render() {

    const {isCollapsed} = this.state

    return (
      <View style={{ flex: 1 }}>
       <ScrollView>
        <ImageBackground style={styles.featured} source={{uri:'http://www.radiusleather.com/radius-directory/wp-content/uploads/2019/07/WhatsApp-Image-2019-07-29-at-12.57.10.jpeg'}}>
          <View style={styles.overlay}>
          <Icon name="chevron-left" size={32} color='#fff'/>
          <Text style={styles.title}>Shashiv collection</Text>
          </View>
        </ImageBackground>
        <View style={styles.content}>
          <View style={styles.detailBox}>
            <View style={styles.flex}>
            <Icon name="information-outline" size={22} color='#000' style={styles.Icon}/>
            <Text style={styles.iconText}>More Information</Text>
            </View>
            <Text style={styles.results}>Distibourter of  radius,fabco,stryker,midler wholesale deal in luggage, hanbags, school bags, leather belts and wallets we take all type of coustomized compaliments orders of school bags ,collage bags ,ielts bags and gifting bags</Text>
          </View>
          <View style={styles.detailBox}>
            <View style={styles.flex}>
            <Icon name="map" size={20} color='#000' style={styles.Icon}/>
            <Text style={styles.iconText}>Address</Text>
            </View>
            <Text style={styles.results}>13 ,baldev complex moga punjab 142001</Text>
          </View>
          <View style={styles.detailBox}>
            <View style={styles.flex}>
            <Icon name="phone" size={20} color='#000' style={styles.Icon}/>
            <Text style={styles.iconText}>Contact </Text>
            </View>
            <Text style={styles.results}>9814801230 ,9814401230</Text>
          </View>
          <View style={styles.detailBox}>
            <View style={styles.flex}>
            <Icon name="timer" size={23} color='#000' style={styles.Icon}/>
            <Text style={styles.iconText}>Timings </Text>
            <TouchableOpacity style={{marginLeft:20}} onPress={()=>{this.setState({ isCollapsed: !isCollapsed });}}>
            <Icon name={isCollapsed ? 'chevron-down' : 'chevron-up'} size={25} color='#000' style={styles.Icon}/>
            </TouchableOpacity>
            </View>
            <Collapsible  collapsed={isCollapsed}>
              <View>
                <Text style={styles.results}>Monday: "10:00 am to 8:30 pm"</Text>
                <Text style={styles.results}>Tuesday: "10:00 am to 8:30 pm"</Text>
                <Text style={styles.results}>Wednesday: "10:00 am to 8:30 pm"</Text>
                <Text style={styles.results}>Thursday: "10:00 am to 8:30 pm"</Text>
                <Text style={styles.results}>Friday: "10:00 am to 8:30 pm"</Text>
                <Text style={styles.results}>Saturday: "10:00 am to 8:30 pm"</Text>
                <Text style={styles.results}>Sunday: "10:00 am to 8:30 pm"</Text>
              </View>
            </Collapsible>
          </View>
          <View style={styles.detailBox}>
            <View style={styles.flex}>
            <Icon name="map" size={20} color='#000' style={styles.Icon}/>
            <Text style={styles.iconText}>Images</Text>
            </View>
            <View style={styles.gallery}>
            <Lightbox underlayColor="white" styles={styles.Lightbox}>
            <Image
              style={styles.contain}
              resizeMode="contain"
              source={{ uri: 'https://www.yayomg.com/wp-content/uploads/2014/04/yayomg-pig-wearing-party-hat.jpg' }}
            />
            </Lightbox>
            <Lightbox underlayColor="white" styles={styles.Lightbox}>
            <Image
              style={styles.contain}
              resizeMode="contain"
              source={{ uri: 'https://www.yayomg.com/wp-content/uploads/2014/04/yayomg-pig-wearing-party-hat.jpg' }}
            />
            </Lightbox>
            <Lightbox underlayColor="white" styles={styles.Lightbox}>
            <Image
              style={styles.contain}
              resizeMode="contain"
              source={{ uri: 'https://www.yayomg.com/wp-content/uploads/2014/04/yayomg-pig-wearing-party-hat.jpg' }}
            />
            </Lightbox>
            </View>
          </View>
        </View>
        </ScrollView>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  gallery:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  contain: {
    flex: 1,
    height: 150,
  },
  Lightbox:{
    
  },
  featured:{
    height:220,
    justifyContent:'flex-end',
    alignItems:'center'
  },
  overlay:{
    width:'100%',
    height:'100%',
    backgroundColor:'rgba(0,0,0,0.5)',
    justifyContent:'space-between',
    padding:20,
  },
  title:{
    color:'#fff',
    fontSize:24,
    fontWeight:'bold',
  },
  detailBox:{
    paddingVertical:15,
    paddingHorizontal:10,
    borderBottomColor:'#ccc',
    borderBottomWidth:1
  },
  flex:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:10
  },
  Icon:{
    marginRight:10
  },
  iconText:{
    fontWeight:'bold',
    fontSize:16  }
})
