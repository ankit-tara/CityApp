import React, { Component } from 'react'
import { Text, StyleSheet, View , TextInput} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/Entypo';

export default class List extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       tagsData:[],
       filtertagsData:[]
    }
  }

  filterCategories = text => {
    let filtertags = this.state.tagsData;
    filtertags = filtertags.filter(tag => {
      if (
        tag.name
          .toString()
          .toLowerCase()
          .search(text.toLowerCase()) !== -1
      ) {
        return tag;
      }
      return null;
    });
    this.setState({
      filtertagsData: filtertags
    });
  };


  async componentDidMount() {
    //Have a try and catch block for catching errors.
    try {
        //Assign the promise unresolved first then get the data using the json method. 
        const data = await fetch('http://www.radiusleather.com/radius-directory/wp-json/wp/v2/tags?per_page=50');
        const response = await data.json();
        this.setState({tagsData: response, filtertagsData:response ,loading: false});
    } catch(err) {
        console.log("Error fetching data-----------", err);
    }
}
renderTags(filtertagsData){
  return filtertagsData.map((tag)=>{
    return(
      <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>{tag.name}</Text>
    )
  })
} 

getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
// renderTags(tagsData){
//     return(
    
//       <View style={styles.wrapper}>
//       <Text style={[[styles.category,{borderColor:this.getRandomColor()}],{borderColor:this.getRandomColor()}]} >Hotels</Text>
//       <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>Schools</Text>
//       <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>Temples</Text>
//       <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>Hotels</Text>
//       <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>Sols</Text>
//       <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>Templtfytfyes</Text>
//       <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>Hotels</Text>
//       <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>Schools</Text>
//       <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>Temples</Text>
//       <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>Hots</Text>
//       <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>Schools</Text>
//       <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>Templeftyftys</Text>
//       <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>Hotels</Text>
//       <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>Sools</Text>
//       <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>Temples</Text>
//       <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>Schools</Text>
//       <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>Temples</Text>
//       <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>Hot</Text>
//       <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>Hotels</Text>
//       <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>Schoftyftyols</Text>
//       <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>Temples</Text>
//       <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>Hotels</Text>
//       <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>Schftyftyools</Text>
//       <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>Temples</Text>
//       <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>tels</Text>
//       <Text style={[styles.category,{borderColor:this.getRandomColor()}]}>Temples</Text>
//     </View>
//     )
// } 
  render() {

    const {filtertagsData}= this.state
    return (
      <View style={{ flex: 1 }}>
       <ScrollView>
      <View style={{flexDirection:'row' , alignItems:'center', justifyContent:'center', marginHorizontal:20}}>
      <TextInput placeholder='Search...' onChangeText={this.filterCategories} style={{ flex:1,fontSize:25 , paddingLeft:15}}/>
      <Icon name="magnifying-glass" size={25} />
    </View>
    <View style={styles.wrapper}>
     {filtertagsData.length >0 && this.renderTags(filtertagsData)}
     </View>
     </ScrollView>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'center',
    paddingVertical:10
  },
  category:{
    paddingVertical:10,
    paddingHorizontal:10,
    borderColor:'#000',
    borderWidth:2,
    borderRadius:20,
    marginVertical:5,
    marginHorizontal:10,
  }
})
