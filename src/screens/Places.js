import React, { Component } from 'react'
import { Text, StyleSheet, View , Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

export default class Places extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       places:[],
    }
  }



  async componentDidMount() {
    //Have a try and catch block for catching errors.
    try {
        //Assign the promise unresolved first then get the data using the json method. 
        const data = await fetch('http://www.radiusleather.com/radius-directory/wp-json/wp/v2/posts');
        const response = await data.json();
        this.setState({places: response});
    } catch(err) {
        console.log("Error fetching data-----------", err);
    }
}

strip_html_tags(str) {
  if (str === null || str === "") return false;
  else str = str.toString();
  return str.replace(/<[^>]*>/g, "");
}

text_truncate(str, length, ending) {
  if (length == null) {
    length = 100;
  }
  if (ending == null) {
    ending = '...';
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
};

renderPosts__blabla(places){
  return places.map((place)=>{
    return(
      <View style={styles.place}>
        <View style={styles.left}>
          <Image style={{width:50,height:50,borderRadius:25}} source={{uri:place.fimg_url}}/>
        </View>
        <View style={styles.right}>
        <Text style={styles.title}>{place.title.rendered}</Text>
        <Text style={styles.description}>{this.text_truncate(this.strip_html_tags(place.excerpt.rendered),55)}</Text>
        </View>
      </View>
    )
  })
} 
renderPosts(places){
    return(
      <>
      <View style={styles.place}>
        <View style={styles.left}>
          <Image style={{width:50,height:50,borderRadius:25}} source={{uri:'http://www.radiusleather.com/radius-directory/wp-content/uploads/2019/07/WhatsApp-Image-2019-07-29-at-12.57.10.jpeg'}}/>
        </View>
        <View style={styles.right}>
        <Text style={styles.title}>shashiv collection</Text>
        <Text style={styles.description}>{this.text_truncate('distibourter radius,fabco,stryker,midle , wholesale deal ,luggage, hanbags, school bags',75)}</Text>
        </View>
      </View>
      <View style={styles.place}>
        <View style={styles.left}>
          <Image style={{width:50,height:50,borderRadius:25}} source={{uri:'http://www.radiusleather.com/radius-directory/wp-content/uploads/2019/07/p9844-1497011204593a94041a720-1.jpg'}}/>
        </View>
        <View style={styles.right}>
        <Text style={styles.title}>Barbeque Nation</Text>
        <Text style={styles.description}>{this.text_truncate('distibourter radius,fabco,stryker,midle , wholesale deal ,luggage, hanbags, school bags',75)}</Text>
        </View>
      </View>
      <View style={styles.place}>
        <View style={styles.left}>
          <Image style={{width:50,height:50,borderRadius:25}} source={{uri:'http://www.radiusleather.com/radius-directory/wp-content/uploads/2019/07/WhatsApp-Image-2019-07-29-at-12.57.10.jpeg'}}/>
        </View>
        <View style={styles.right}>
        <Text style={styles.title}>shashiv collection</Text>
        <Text style={styles.description}>{this.text_truncate('distibourter radius,fabco,stryker,midle , wholesale deal ,luggage, hanbags, school bags',75)}</Text>
        </View>
      </View>
      <View style={styles.place}>
        <View style={styles.left}>
          <Image style={{width:50,height:50,borderRadius:25}} source={{uri:'http://www.radiusleather.com/radius-directory/wp-content/uploads/2019/07/p9844-1497011204593a94041a720-1.jpg'}}/>
        </View>
        <View style={styles.right}>
        <Text style={styles.title}>Barbeque Nation</Text>
        <Text style={styles.description}>{this.text_truncate('distibourter radius,fabco,stryker,midle , wholesale deal ,luggage, hanbags, school bags',75)}</Text>
        </View>
      </View>
      <View style={styles.place}>
        <View style={styles.left}>
          <Image style={{width:50,height:50,borderRadius:25}} source={{uri:'http://www.radiusleather.com/radius-directory/wp-content/uploads/2019/07/WhatsApp-Image-2019-07-29-at-12.57.10.jpeg'}}/>
        </View>
        <View style={styles.right}>
        <Text style={styles.title}>shashiv collection</Text>
        <Text style={styles.description}>{this.text_truncate('distibourter radius,fabco,stryker,midle , wholesale deal ,luggage, hanbags, school bags',75)}</Text>
        </View>
      </View>
      <View style={styles.place}>
        <View style={styles.left}>
          <Image style={{width:50,height:50,borderRadius:25}} source={{uri:'http://www.radiusleather.com/radius-directory/wp-content/uploads/2019/07/p9844-1497011204593a94041a720-1.jpg'}}/>
        </View>
        <View style={styles.right}>
        <Text style={styles.title}>Barbeque Nation</Text>
        <Text style={styles.description}>{this.text_truncate('distibourter radius,fabco,stryker,midle , wholesale deal ,luggage, hanbags, school bags',75)}</Text>
        </View>
      </View>
      <View style={styles.place}>
        <View style={styles.left}>
          <Image style={{width:50,height:50,borderRadius:25}} source={{uri:'http://www.radiusleather.com/radius-directory/wp-content/uploads/2019/07/WhatsApp-Image-2019-07-29-at-12.57.10.jpeg'}}/>
        </View>
        <View style={styles.right}>
        <Text style={styles.title}>shashiv collection</Text>
        <Text style={styles.description}>{this.text_truncate('distibourter radius,fabco,stryker,midle , wholesale deal ,luggage, hanbags, school bags',75)}</Text>
        </View>
      </View>
      <View style={styles.place}>
        <View style={styles.left}>
          <Image style={{width:50,height:50,borderRadius:25}} source={{uri:'http://www.radiusleather.com/radius-directory/wp-content/uploads/2019/07/p9844-1497011204593a94041a720-1.jpg'}}/>
        </View>
        <View style={styles.right}>
        <Text style={styles.title}>Barbeque Nation</Text>
        <Text style={styles.description}>{this.text_truncate('distibourter radius,fabco,stryker,midle , wholesale deal ,luggage, hanbags, school bags',75)}</Text>
        </View>
      </View>
      </>
    )
} 



  render() {

    const {places}= this.state
    return (
      <View style={{ flex: 1 }}>
       <ScrollView>
        <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.results}>Category > Hotels</Text>
          <Text style={styles.results}>Results(27)</Text>
        </View>
        {places.length >0 && this.renderPosts(places)}
        </View>
        </ScrollView>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper:{
    paddingVertical:20,
    paddingHorizontal:15
  },
  place:{
    backgroundColor:'#fff',
    marginBottom:15,
    flexDirection:'row',
    shadowOffset:{  width: 10,  height: 10,  },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    shadowRadius: 15,
    elevation: 2,
    
  },
  left:{
    paddingVertical:15,
    paddingHorizontal:15,
    alignItems:'center',
    justifyContent:'center'
  },
  right:{
    overflow:'hidden',
    paddingVertical:15,
    paddingHorizontal:5,
    flex:2
  },
  title:{
    fontSize:16,
    fontWeight:'bold',
    textTransform:'uppercase',
    marginBottom:5
  },
  description:{
    fontSize:13,
    color:'rgba(0,0,0,0.5)'
  },
  catTitle:{
    fontSize:16,

  },
  results:{
    fontSize:15,
    fontWeight:'bold',
    color:'rgba(0,0,0,0.5)'
  },
  header:{
    marginBottom:20,
    marginHorizontal:5,
    flexDirection:'row',
    justifyContent:'space-between'
  }
})
