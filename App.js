import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from './src/store/configureStore.js';

import UsersScreen from './src/pages/users';
import UserProfileScreen from './src/pages/user-profile';
import UserPhotoScreen from './src/pages/user-photos';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Users"
            component={UsersScreen}
            options={{title: 'Search Users'}}
          />
          <Stack.Screen
            name="UserProfile"
            component={UserProfileScreen}
            options={({route}) => ({
              title: `${route.params.user.first_name} ${route.params.user.last_name}`,
            })}
          />
          <Stack.Screen
            name="UserPhoto"
            component={UserPhotoScreen}
            options={({route}) => ({
              title: `${route.params.user.first_name} ${route.params.user.last_name}'s photos`,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
