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
import {SignUpValidator} from '../../Utils/AuthUtils';
import axios from 'axios';
import useStore from '../../Store/Store';
import CustomToast from '../../Components/Molecules/CustomToast';

export default function SignUp({navigation}) {
  // local variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // vars
  const url = `${base_url}user`;
  const toast = useToast();

  // zustand states
  const {setUserDetails, setToken, setSerialNumber} = useStore(state => state);
  const UserSignup = () => {
    if (SignUpValidator(email, password, confirmPassword, name, phoneNumber)) {
      return;
    }
    axios
      .post(url, {
        username: name,
        email: email,
        password: password,
        phone: phoneNumber,
      })
      .then(res => {
        setUserDetails(res.data.data);
        setToken(res.data.token);
        setSerialNumber(res.data.data.current_serial_number);
        toast.show({
          placement: 'bottom',
          render: ({id}) => {
            return <CustomToast text="User created successfully" id={id} />;
          },
        });
        navigation.replace('Home');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.MainContainer}>
      <Input style={styles.inputContainer} variant="outline" size="md">
        <InputField value={name} onChangeText={setName} placeholder="Name" />
      </Input>
      <Input style={styles.inputContainer} variant="outline" size="md">
        <InputField value={email} onChangeText={setEmail} placeholder="Email" />
      </Input>
      <Input style={styles.inputContainer} variant="outline" size="md">
        <InputField
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Phone number"
        />
      </Input>
      <Input style={styles.inputContainer} variant="outline" size="md">
        <InputField
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
        />
      </Input>
      <Input style={styles.inputContainer} variant="outline" size="md">
        <InputField
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm password"
        />
      </Input>
      <Button
        size="lg"
        variant="solid"
        action="primary"
        onPress={() => UserSignup()}>
        <ButtonText>Signup</ButtonText>
      </Button>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Already have an account ?</Text>

        <Button
          onPress={() => navigateToLogin()}
          size="md"
          variant="link"
          action="primary"
          style={{
            marginLeft: '2%',
          }}>
          <ButtonText>Login</ButtonText>
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
