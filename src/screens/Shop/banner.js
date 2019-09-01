import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, Image, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'
import { M_BOLD } from '../../theme/fonts';
import Placeholder from "../../placeholder/BannerPlaceholder"
const { width } = Dimensions.get('window')
const images = [
  "https://images.unsplash.com/photo-1557185698-2af3e8c7aaa9?w=500&q=80",
  "https://images.unsplash.com/photo-1557157176-66b33e81d6d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
  "https://images.unsplash.com/photo-1545069153-6c75c6c51442?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80",
  "https://images.unsplash.com/photo-1557156977-d71b37bdfe3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
];
const MainBanner = ({ data }) => {
//   const [images, setimages] = useState([])

//   useEffect(() => {
//     setimages(data)
//   }, [data])

//   if(!data || data.length <=0){
//     return <Placeholder/>
//   }

  return (
    <View style={styles.wrapper}>
      {images.length > 0 && (
        <Swiper
          style={styles.wrapper}
          height={180}
          autoplay={true}
          autoplayTimeout={5}
          dot={<View style={[styles.dot, styles.dotStyle]} />}
          activeDot={<View style={[styles.dot, styles.activeDot]} />}
          paginationStyle={{
            bottom: -7
          }}
          loop
        >
          {images.map((img, index) => (
            <View style={styles.slide} key={`img-${index}`}>
                {console.log(img)}
              <Image
                resizeMode="cover"
                style={styles.image}
                source={{ uri: img }}
              />
              {/* {img.image.title != "" && (
                <Text style={styles.bannerText}>{img.image.title}</Text>
              )} */}
            </View>
          ))}
        </Swiper>
      )}
      {/* {images.length > 0 &&
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
      } */}
    </View>
  );
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
    width:"100%",
    flex: 1,
    height:100
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
