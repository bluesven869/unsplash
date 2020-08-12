import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getPhotosError, getPhotos, getPhotosPending} from '../reducers/photosReducer';
import {ActivityIndicator, View, Text} from 'react-native';

const UserProfileScreen = ({navigation}) => {
  return (
    <View>
      <Text>User Profile</Text>
    </View>
  );
};

export default UserProfileScreen;
