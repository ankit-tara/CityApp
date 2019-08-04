import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, Image, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')

const Ads = ({ data }) => {
  const [images, setimages] = useState([])

  useEffect(() => {
    setimages(data)
  }, [data])

  return (
    <View style={styles.container} >
      {images.length > 0 &&
        <Swiper style={styles.wrapper} height={120} showsButton={images.length>1} showsPagination={false}
          nextButton={<Text style={styles.buttonText}>›</Text>}
          prevButton={<Text style={styles.buttonText}>‹</Text>}
          onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
          loop>
          {images.map((img) => (
            <View style={styles.slide} key={`ad-img-${img.ad_image.ID}`}>
              <Image resizeMode='stretch' style={styles.image} source={{ uri: img.ad_image.sizes.medium }} />
            </View>
          ))}
        </Swiper>
      }
    </View>
  )
}
export default Ads

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 25,
    overflow: 'hidden'
  },
  buttonText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    padding: 5,
    backgroundColor: 'rgba(0,0,0,.6)'
  },
  wrapper: {
    marginBottom: 15,
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
