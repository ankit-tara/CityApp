import React, { Component } from 'react'
import { Text, StyleSheet, View,Image,Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')

export default class index extends Component {
  render() {
    return (
      <View style={styles.wrapper} >
      {/* <Swiper showsButtons>
      <View style={styles.slide1}>
        <Image source={{uri:'https://images.unsplash.com/photo-1445019980597-93fa8acb246c'}} />
      </View>
      <View style={styles.slide2}>
      <Image source={{uri:'https://images.unsplash.com/photo-1445019980597-93fa8acb246c'}} />
      </View>
      <View style={styles.slide3}>
      <Image source={{uri:'https://images.unsplash.com/photo-1445019980597-93fa8acb246c'}} />
      </View>
    </Swiper> */}
    <Swiper style={styles.wrapper} height={240}
          onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
          dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
          activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
          paginationStyle={{
            bottom: -7,
            //  left: null, 
            // right: 10
          }} loop>
          <View style={styles.slide} >
            <Image resizeMode='stretch' style={styles.image} source={{uri:'https://images.unsplash.com/photo-1445019980597-93fa8acb246c'}} />
          </View>
          <View style={styles.slide} >
          <Image resizeMode='stretch' style={styles.image} source={{uri:'https://images.unsplash.com/photo-1445019980597-93fa8acb246c'}} />
          </View>
          <View style={styles.slide} >
          <Image resizeMode='stretch' style={styles.image} source={{uri:'https://images.unsplash.com/photo-1445019980597-93fa8acb246c'}} />
          </View>
         
        </Swiper>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  // wrapper: {
  //   height:220,
  //   marginBottom:30,
  //   // borderBottomLeftRadius:50,
  //   // borderBottomRightRadius:100,
  //   overflow:'hidden'
  // },
  // slide1: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#9DD6EB'
  // },
  // slide2: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#97CAE5'
  // },
  // slide3: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#92BBD9'
  // },
  // text: {
  //   color: '#fff',
  //   fontSize: 30,
  //   fontWeight: 'bold'
  // }
  container: {
    flex: 1
  },

  wrapper: {
    marginBottom:15
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },

  image: {
    width,
    flex: 1
  }
})
