import React, {useState, useCallback, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import fetchUsers from '../api/fetchUsers';
import {
  getUsersError,
  getUsers,
  getUsersPending,
} from '../reducers/usersReducer';
import {ActivityIndicator, View, Text} from 'react-native';

const UsersScreen = ({navigation, fetchUsers, users}) => {
  const [userHint, setUserHint] = setState('');
  const [page, setPage] = setState(1);

  useEffect(() => {
    fetchUsers(userHint, page, 20);
  }, [userHint]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <View>
      <Text>User Search</Text>
    </View>
  );
};

const mapStateToProps = (state) => ({
  error: getUsersError(state),
  users: getUsers(state),
  pending: getUsersPending(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    fetchUsers,
  });

export default connect(mapStateToProps, mapDispatchToProps)(UsersScreen);
