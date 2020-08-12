import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const fullWidth = Dimensions.get('window').width;
const imageWidth = (fullWidth - 12) / 4;
const Photo = ({photo}) => {
  return (
    <View style={styles.photoContainer}>
      <Image
        source={{
          uri: photo.urls.thumb,
        }}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    width: imageWidth,
    height: imageWidth,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    marginBottom: 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Photo;
