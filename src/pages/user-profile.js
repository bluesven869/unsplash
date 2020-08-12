import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import fetchPhotos from '../api/fetchPhotos';
import {getPhotosError, getPhotos, getPhotosPending} from '../reducers/photosReducer';
import {ActivityIndicator, View, Text} from 'react-native';

const UserProfileScreen = ({navigation}) => {
  return (
    <View>
      <Text>User Profile</Text>
    </View>
  );
};

const mapStateToProps = (state) => ({
  error: getPhotosError(state),
  photos: getPhotos(state),
  pending: getPhotosPending(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    fetchPhotos,
  });

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);
