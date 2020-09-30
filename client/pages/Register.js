import React, { useContext, useState } from 'react';
import {
  View, TextInput,
  Button, StyleSheet,
  Text, ImageBackground
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { registerPost } from '../fetch/userFetch';
import { userContext } from '../App';

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { setData } = useContext(userContext);

  async function handleRegister() {
    const res = await registerPost({name, email, password});
    if(res && res.email) {
      setData(res);
    }
  }

  return (
      <ImageBackground
        source={require('../assets/login-background.jpg')}
        style={styles.container}
      >
      <View style={styles.wrapper}>
        <Text style={styles.textLabel}>Name</Text>
        <TextInput
          style={styles.form}
          onChangeText={text => setName(text)}
        />
        <Text style={styles.textLabel}>Email</Text>
        <TextInput
          style={styles.form}
          onChangeText={text => setEmail(text)}
          autoCompleteType='email'
        />
        <Text style={styles.textLabel}>Password</Text>
        <TextInput
          style={[styles.form, styles.marginBottom]}
          onChangeText={text => setPassword(text)}
          autoCompleteType='password'
          secureTextEntry
        />
        <Button
          title="Register"
          onPress={() => handleRegister()}
        />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  wrapper: {
    paddingVertical: hp(3),
    paddingHorizontal: wp(4),
    height: hp(50),
    width: wp(60),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
  },
  form: {
    height: hp(4.7),
    color: '#fff',
    width: '100%',
    backgroundColor: 'gray',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: hp(2),
    paddingHorizontal: wp(2),
  },
  marginBottom: {
    marginBottom: hp(5)
  },
  textLabel: {
    color: '#fff',
    fontWeight: 'bold'
  }
});