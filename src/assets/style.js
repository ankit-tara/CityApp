import { StyleSheet } from 'react-native'


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
    paddingVertical:10
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
    fontSize:20,
    fontWeight:'bold',
    fontFamily:'montserrat',
    textTransform:'uppercase'
  },
  link:{
    fontSize:12,
    textDecorationLine:'underline'

  },
  box:{
    height:100,
    width:100,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  }
})
