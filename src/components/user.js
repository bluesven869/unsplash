import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const User = ({user}) => {
  return (
    <View style={styles.userContainer}>
      <Image
        source={{
          uri: user.profile_image.medium,
        }}
        style={styles.avatar}
      />
      <View>
        <Text style={styles.userName}>
          {user.first_name} {user.last_name}
        </Text>
        <View style={styles.description}>
          <Icon name="photo" size={12} color={'#900'} />
          <Text style={styles.photoCount}>{user.total_photos}</Text>
          <Icon name="thumbs-o-up" size={12} color={'#090'} />
          <Text style={styles.likeCount}>{user.total_likes}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    paddingLeft: 20,
    paddingRight: 20,
		paddingTop: 5,
		paddingBottom: 5,
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    paddingTop: 5,
    fontWeight: 'bold',
  },
  description: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
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
});

export default User;
