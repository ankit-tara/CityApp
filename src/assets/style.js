import { StyleSheet ,Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

export default StyleSheet.create({
  flex:{
    flex:1,
  },
  column:{
    flexDirection:'column'
  },
  row:{
    flexDirection:'row'
  },
  header:{
    paddingHorizontal:20,
    paddingVertical:10,
    backgroundColor:'#fff',
    shadowOffset:{  width: 10,  height: 10,  },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    shadowRadius: 15,
    elevation: 7,
  },
  logo:{
    textAlign:'center',
    fontSize:24,
    fontWeight:'bold',
    fontFamily:'montserrat'
  },
  block:{
    justifyContent:'space-between',
    paddingHorizontal:20,
    alignItems:"center"
  },
  heading:{
    fontSize:17,
    fontWeight:'bold',
    fontFamily:'montserrat',
    textTransform:'uppercase'
  },
  link:{
    fontSize:12,
    textDecorationLine:'underline'

  },
  box:{
    marginHorizontal:10,
    width:(width/3)-30,
    height:(width/3)-30,
    justifyContent:'space-between'
  },
  boxImage:{
    width:'100%',
    height:'80%',
    borderRadius:5
  },
  boxText:{
    textAlign:'center',
    fontSize:12
  },
  boxes:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical:15
  }
})
