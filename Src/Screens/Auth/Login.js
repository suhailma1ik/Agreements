import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  ButtonText,
  Input,
  InputField,
  useToast,
} from '@gluestack-ui/themed';
import {base_url} from '../../Components/Api/api';
import axios from 'axios';
import useStateStore from '../../Store/Store';
import {LoginValidator} from '../../Utils/AuthUtils';
import CustomToast from '../../Components/Molecules/CustomToast';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const url = `${base_url}auth/login`;
  const toast = useToast();
  const {setToken} = useStateStore(state => state);
  const UserLogin = () => {
    if (LoginValidator(email, password, toast)) {
      return;
    }
    axios
      .post(url, {
        identity: email,
        password: password,
      })
      .then(res => {
        setToken(res.data.data);
        toast.show({
          placement: 'bottom',
          render: ({id}) => {
            return <CustomToast text="Login successful" id={id} />;
          },
        });
        navigation.replace('Home');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.MainContainer}>
      <Input style={styles.inputContainer} variant="outline" size="md">
        <InputField value={email} onChangeText={setEmail} placeholder="Email" />
      </Input>
      <Input style={styles.inputContainer} variant="outline" size="md">
        <InputField
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
        />
      </Input>
      <Button size="lg" variant="solid" action="primary" onPress={UserLogin}>
        <ButtonText>Login</ButtonText>
      </Button>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Don't have an account ?</Text>

        <Button
          onPress={() => navigateToSignUp()}
          size="md"
          style={{
            marginLeft: '2%',
          }}
          variant="link"
          action="primary">
          <ButtonText>Sign Up</ButtonText>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    // width:
    width: '90%',
    marginVertical: '2%',
  },
});
