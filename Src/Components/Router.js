import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Login from '../Screens/Auth/Login';
import SignUp from '../Screens/Auth/SignUp';
import Home from '../Screens/Home';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import useStateStore from '../Store/Store';
import {Button, ButtonText} from '@gluestack-ui/themed';
const Stack = createStackNavigator();

export default function Router() {
  const {token, setToken} = useStateStore(state => state);
  const Logout = () => {
    setToken('');
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={token.length === 0 ? 'Login' : 'Home'}>
        <Stack.Screen
          options={{
            headerRight: () => (
              <Button
                onPress={() => Logout()}
                size="sm"
                variant="solid"
                style={{marginRight: 10}}
                action="primary">
                <ButtonText>Logout</ButtonText>
              </Button>
            ),
          }}
          name="Home"
          component={Home}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
