import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setUsers, appendUsers} from '../actions/users';
import {setNotifications} from '../actions/notification';
import debounce from 'lodash.debounce';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
	TouchableOpacity,
	Dimensions
} from 'react-native';

import {SearchBar} from 'react-native-elements';
import {unsplash} from '../constants/unsplash';
import User from '../components/user';

const fullHeight = Dimensions.get('window').height;

const UsersScreen = ({navigation}) => {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(false);

  const users = useSelector((state) => state.users);
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const searchUsers = useMemo(() => {
    return debounce((searchWord, page, per_page) => {
      setLoading(true);
      unsplash.search
        .users(searchWord, page, per_page)
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            throw res.error;
          }
          setTotalPage(res.total_pages);
					setTotalUsers(res.total);
          if (page === 1) {
            dispatch(setUsers(res.results));
          } else {
            dispatch(appendUsers(res.results));
          }
        })
        .catch((error) => {
          dispatch(setNotifications(error.message));
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500);
  }, []);

  useEffect(() => {
    setPage(1);
    searchUsers(keyword, page, 20);
  }, [keyword]);

  useEffect(() => {
    searchUsers(keyword, page, 20);
  }, [page]);

	// useEffect(()=> {
	// 	console.log(users.users);
	// }, [users]);
	const handleUserClick = useCallback((user)=>{
		navigation.navigate('UserProfile', {
			user
		});
	}, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.searchBox}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={(text) => setKeyword(text)}
          value={keyword}
          showLoading={loading}
        />
        <Text style={styles.searchResult}> Total: {totalUsers} Users</Text>
      </View>
      <View style={styles.list}>
        <FlatList
          data={users.users}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => handleUserClick(item)}>
              <User user={item} />
            </TouchableOpacity>
          )}
          onEndReached={() => {
						if (page < totalPage) {
							setPage(page + 1)
						}
					}}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={() => <View style={styles.line} />}
        />
        {users.users.length === 0 && (
          <Text style={styles.noUsers}>No users found.</Text>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    height: 100,
    backgroundColor: '#2b2f33',
  },
  searchResult: {
    paddingTop: 8,
    paddingRight: 8,
    color: 'white',
    textAlign: 'right',
  },
  line: {
    borderWidth: 0.5,
    borderColor: '#d1d1d1',
    height: 1,
	},
	list: {
		height: fullHeight - 190,
  },
  noUsers: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 20,
  }
});

export default UsersScreen;
