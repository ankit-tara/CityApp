import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, Image, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')

const MainBanner = ({ data }) => {
  const [images, setimages] = useState([])

  useEffect(() => {
    setimages(data)
  }, [data])

  return (
    <View style={styles.wrapper} >
      {images.length > 0 &&
        <Swiper style={styles.wrapper} height={180}
          dot={<View style={[styles.dot, styles.dotStyle]} />}
          activeDot={<View style={[styles.dot, styles.activeDot]} />}
          paginationStyle={{
            bottom: -7,
          }} loop>
          {images.map((img) => (
            <View style={styles.slide} key={`img-${img.image.ID}`} >
              <Image resizeMode='stretch' style={styles.image} source={{ uri: img.image.url }} />
            </View>
          ))}
        </Swiper>
      }
    </View>
  )
}

export default MainBanner

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  wrapper: {
    marginBottom: 15
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },

  image: {
    width,
    flex: 1
  },
  dot: {
    borderRadius: 4,
    margin: 3
  },
  dotStyle: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 5,
    height: 5,

  },
  activeDot: {
    backgroundColor: '#000',
    width: 8,
    height: 8,
  }
})
