import React, {useEffect, useState, Fragment} from 'react';
import {ActivityIndicator, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {getPopularMovies, getPopularTV, getUpcomingMovies, getFamilyMovies, getDocumentaries} from '../services/services';
import { SliderBox } from "react-native-image-slider-box";
import List from "../components/List";
import Error from '../components/Error';

const dimensions = Dimensions.get('screen')

const Home = ({ navigation }) => {
  console.log(dimensions)
  const [movieImages, setMovieImages] = useState()
  const [popularMovies, setPopularMovie] = useState();
  const [popularTV, setPopularTV] = useState()
  const [familyMovies, setFamilyMovies] = useState()
  const [documentaries, setDocumentaries] = useState()

  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTV(),
      getFamilyMovies(),
      getDocumentaries()
    ])
  }

  useEffect(() => {
    getData().then(
      ([
        upcomingMoviesData, 
        popularMoviesData, 
        popularTVData, 
        familyMoviesData, 
        documentariesData
      ]) => {
        const moviesImagesArray = [];
        upcomingMoviesData.forEach(movie => {
          moviesImagesArray.push('https://image.tmdb.org/t/p/w500' + movie.poster_path)
        })
        setMovieImages(moviesImagesArray)
        setPopularMovie(popularMoviesData)
        setPopularTV(popularTVData)
        setFamilyMovies(familyMoviesData)
        setDocumentaries(documentariesData)
      })
    .catch(() => {
      setError(true)
    })
    .finally(() => {
      setLoaded(true)
    })
  }, []);

  return (
    <View style={{backgroundColor: '#FFFFFF'}}>
      {loaded && !error && (
        <ScrollView>
          {movieImages && (
            <View style={styles.sliderContainer}>
            <SliderBox autoplay={true} 
                      sliderBoxHeight={dimensions.height / 1.5} 
                      circleLoop={true} 
                      images={movieImages} 
                      dotStyle={styles.sliderStyle}/>
            </View>
          )}

          {/* Popular Movies */}
          {popularMovies && (
            <View style={styles.carousel}>
              <List 
                navigation={navigation}
                title="Popular Movies"
                content={popularMovies} />
            </View>
          )}

          {/* Popular TV Shows */}
          {popularTV && (
            <View style={styles.carousel}>
              <List 
                navigation={navigation}
                title="Popular TV Shows"
                content={popularTV} />
            </View>
          )}

          {/* Family Movies */}
          {familyMovies && (
            <View style={styles.carousel}>
              <List 
                navigation={navigation}
                title="Family movies"
                content={familyMovies} />
            </View>
          )}

          {/* Documentaries */}
          {documentaries && (
            <View style={styles.carousel}>
              <List 
                navigation={navigation}
                title="Documentaries"
                content={documentaries} />
            </View>
          )}
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator size="large" color="#0000ff"/>}
      {error && <Error />}
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0
  },
  carousel: {
    flex: 1
    // marginBottom: 100,
  }
})

export default Home;