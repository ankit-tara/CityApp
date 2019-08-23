import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, Image, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'
import { M_BOLD } from '../../theme/fonts';
import Placeholder from "../../placeholder/BannerPlaceholder"
const { width } = Dimensions.get('window')

const MainBanner = ({ data }) => {
  const [images, setimages] = useState([])

  useEffect(() => {
    setimages(data)
  }, [data])

  if(!data || data.length <=0){
    return <Placeholder/>
  }

  return (
    <View style={styles.wrapper} >
      {images.length > 0 &&
        <Swiper style={styles.wrapper} height={180} autoplay={true}  autoplayTimeout={5}
          dot={<View style={[styles.dot, styles.dotStyle]} />}
          activeDot={<View style={[styles.dot, styles.activeDot]} />}
          paginationStyle={{
            bottom: -7,
          }} loop>
          {images.map((img) => (
            <View style={styles.slide} key={`img-${img.image.ID}`} >
              <Image resizeMode='cover' style={styles.image} source={{ uri: img.image.url }} />
              {img.image.title!='' && <Text style={styles.bannerText}>{img.image.title}</Text>}
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
    alignItems:'center',
    backgroundColor: 'transparent',
    position:'relative'
  },

  bannerText:{
    paddingVertical:5,
    backgroundColor:'rgba(0, 0, 0, 0.5)',
    textTransform:'capitalize',
    position:'absolute',
    top:70,
    color:'#fff',
    fontSize:20,
    width:'80%',
    textAlign:'center',
    fontFamily:M_BOLD,
    paddingHorizontal: 10,
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
