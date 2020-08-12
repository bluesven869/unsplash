import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setPhotos, appendPhotos} from '../actions/photos';
import {setNotifications} from '../actions/notification';
import {
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import Icon from 'react-native-vector-icons/FontAwesome';
import debounce from 'lodash.debounce';
import {unsplash} from '../constants/unsplash';

const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;
let needToMove = false;

const UserPhotoScreen = ({route, navigation}) => {
  const {user, photoIndex} = route.params;

  const photos = useSelector((state) => state.photos);
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const [currentPosition, setCurrentPosition] = useState(0);
  const [loading, setLoading] = useState(false);

  const searchPhotos = useMemo(() => {
    return debounce((user, page, per_page) => {
      setLoading(true);
      unsplash.users
        .photos(user, page, per_page, 'latest')
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            throw res.error;
          }
          if (page === 1) {
            dispatch(setPhotos(res));
          } else {
            dispatch(appendPhotos(res));
          }
        })
        .catch((error) => {
          console.log(error.message);
          dispatch(setNotifications(error.message));
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500);
  }, []);

  useEffect(() => {
    setCurrentPosition(photoIndex);
  }, []);

  useEffect(() => {
    if (needToMove) {
      if (photos.photos.length > currentPosition) {
        setCurrentPosition(currentPosition + 1);
      }
      needToMove = false;
    }
  }, [photos.photos, currentPosition]);

  const onSwipe = useCallback(
    (direction) => {
      const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
      console.log(direction);
      if (direction === SWIPE_RIGHT) {
        if (currentPosition > 0) {
          setCurrentPosition(currentPosition - 1);
        }
      } else if (direction === SWIPE_LEFT) {
        if (currentPosition < photos.photos.length - 1) {
          setCurrentPosition(currentPosition + 1);
        } else {
          if (photos.photos.length < user.total_photos) {
            const page = Math.ceil(photos.photos.length / 20) + 1;
            needToMove = true;
            searchPhotos(user.username, page, 20, 'latest');
          }
        }
      }
    },
    [currentPosition, searchPhotos, photos],
  );

  return (
    <GestureRecognizer
      onSwipe={(direction) => onSwipe(direction)}
      style={{
        flex: 1,
      }}
      config={{
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
      }}>
      <View>
        {!needToMove && (
          <Image
            source={{
              uri: photos.photos[currentPosition].urls.small,
            }}
            style={styles.photo}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
        )}
        <Text style={styles.pagination}>
          <Text style={styles.currentPage}>{currentPosition + 1}</Text> /{' '}
          {user.total_photos}
        </Text>

        {loading && (
          <ActivityIndicator
            color="#0000FF"
            style={styles.loading}
            size="large"
          />
        )}
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    bottom: 40,
    fontSize: 20,
    fontWeight: 'bold',
  },
  currentPage: {
    color: 'red',
  },
});
export default UserPhotoScreen;
