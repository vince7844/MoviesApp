import React, { Fragment, useState, useEffect } from 'react'
import { View, Pressable, ActivityIndicator, Image, Text, Modal, ScrollView, StyleSheet, Dimensions } from "react-native";
import { getMovie } from '../services/services';
import StarRating from 'react-native-star-rating';
import dateformat from 'dateformat';
import PlayButton from '../components/PlayButton'
import Video from '../components/Video';

const placeholderImage = require('../assets/images/placeholder.png')
const screenHeight = Dimensions.get('screen').height;

const Detail = ({ route, navigation }) => {
  const movieId = route.params.movieId;
  const [movieDetail, setMovieDetail] = useState()
  const [loaded, setLoaded] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getMovie(movieId).then(movieData => {
      setMovieDetail(movieData)
      setLoaded(true)
    });
  }, [movieId])

  const videoShown = () => {
    setModalVisible(!modalVisible)
  }

  return (
    <Fragment>
      {loaded && (
        <View>
          <ScrollView>
            <Image 
              resizeMode="cover"
              style={styles.image}
              source={
              movieDetail.poster_path 
                ? {uri: 'https://image.tmdb.org/t/p/w500/' + movieDetail.poster_path}
                : placeholderImage
              }
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handlePress={() => videoShown()} />
              </View>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map(genre => {
                    return <Text key={genre.id} style={styles.genre}>{genre.name}</Text>
                  })}
                </View>
              )}
              <StarRating 
                disabled={true}
                fullStarColor={'gold'}
                starSize={30}
                emptyStarColor={'gold'}
                maxStars={5}
                rating={movieDetail.vote_average / 2}
              />
              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.release}>{'Release date : ' + dateformat(movieDetail.release_date, 'mmmm dS, yyyy')}</Text>
            </View>
          </ScrollView>
          <Modal animationType="slide" visible={modalVisible}>
            <View style={styles.videoModal}>
              <Video onClose={videoShown} />
            </View>
          </Modal>
        </View>
      )}
      {!loaded && <ActivityIndicator style={{flex: 1}} size="large" color="#0000ff"/>}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: screenHeight / 1.75,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10
  },
  genresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  genre: {
    marginRight: 7,
    marginLeft: 7,
    fontWeight: 'bold'
  },
  overview: {
    padding: 15
  },
  release: {
    fontWeight: 'bold'
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Detail;