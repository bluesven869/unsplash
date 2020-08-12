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
import Icon from 'react-native-vector-icons/FontAwesome';
import debounce from 'lodash.debounce';
import {unsplash} from '../constants/unsplash';
import Photo from '../components/photo';

const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

const UserProfileScreen = ({route, navigation}) => {
  const {user} = route.params;

  const photos = useSelector((state) => state.photos);
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
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
    // dispatch(setPhotos([]));
    setPage(1);
    searchPhotos(user.username, page, 20);
  }, [user]);

  useEffect(() => {
    searchPhotos(user.username, page, 20);
  }, [page]);

  const handlePhotoClick = useCallback(
    (photo) => {
			const photoIndex = photos.photos.findIndex((x) => x.id === photo.id);
      navigation.navigate('UserPhoto', {
        user,
        photoIndex,
      });
    },
    [user, photos],
  );

  return (
    <View>
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: user.profile_image.large,
          }}
          style={styles.profileImage}
        />
        <View>
          <View style={styles.rowContainer}>
            <Icon name="user" size={15} color={'#000'} />
            <Text style={styles.rowText}>@{user.username}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Icon name="map-marker" size={18} color={'#000'} />
            <Text style={styles.rowText}>{user.location}</Text>
          </View>
          <Text style={styles.bioText}>{user.bio}</Text>
          <View style={styles.rowContainer}>
            <Icon name="photo" size={12} color={'#900'} />
            <Text style={styles.photoCount}>{user.total_photos}</Text>
            <Icon name="thumbs-o-up" size={12} color={'#090'} />
            <Text style={styles.likeCount}>{user.total_likes}</Text>
          </View>
        </View>
      </View>
      <View style={styles.list}>
        <FlatList
          data={photos.photos}
          keyExtractor={(item) => item.id}
          numColumns={4}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => handlePhotoClick(item)}>
              <Photo photo={item} />
            </TouchableOpacity>
          )}
          onEndReached={() => {
            const totalPages = Math.ceil(user.total_photos / 20);
            if (page < totalPages) {
              setPage(page + 1);
            }
          }}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={() => <View style={styles.line} />}
        />
      </View>
      {loading && (
        <ActivityIndicator
          color="#0000FF"
          style={styles.loading}
          size="large"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    padding: 20,
    height: 170,
    flexDirection: 'row',
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    marginRight: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: 5,
    flex: 1,
  },
  rowText: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  photoCount: {
    paddingLeft: 5,
    marginTop: -1,
    color: '#900',
    fontSize: 12,
    marginRight: 50,
  },
  likeCount: {
    paddingLeft: 5,
    marginTop: -1,
    color: '#090',
    fontSize: 12,
    marginRight: 50,
  },
  bio: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },

  bioText: {
    maxHeight: 50,
    width: fullWidth - 190,
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  line: {
    borderWidth: 0.5,
    borderColor: '#d1d1d1',
    height: 1,
  },
  list: {
    height: fullHeight - 260,
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
});
export default UserProfileScreen;
