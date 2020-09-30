import React, { useContext } from 'react';
import {
  Alert, Button,
  Image, StyleSheet,
  Text, View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import { userContext } from '../App';

export default function More({navigation}) {
  const { getData } = useContext(userContext);
  
  function userLogout() {
    AsyncStorage.clear();
    getData();
  }
  
  async function confirmLogout() {
    Alert.alert("Logout ?", "are you sure ?", [
      {
        text: 'cancel',
      },
      {
        text: 'ok',
        onPress: () => userLogout()
      }
    ])
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image
          source={require('../assets/logo-about.png')}
          style={styles.logoImage}
        />
        <Text style={styles.logoText}>M O B I L E</Text>
      </View>
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutText}>
          Thank you for using Pelita Bangsa Mobile App.
          This application is made for personal use only and unassociated with Pelita Bangsa University.
        </Text>
        <Text style={styles.iconLabel}>Feedback and Collaboration</Text>
        <View style={styles.iconWrapper}>
          <Ionicons name="ios-mail-open" size={wp(10)} />
          <Ionicons name="logo-github" size={wp(10)} />
          <Ionicons name="logo-linkedin" size={wp(10)} />
          <Ionicons name="logo-whatsapp" size={wp(10)} />
        </View>
      </View>
      
      <Button
        title="Logout"
        color="red"
        style={styles.buttonLogout}
        onPress={() => confirmLogout()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  logoImage: {
    width: wp(50),
    height: hp(30)
  },
  logoWrapper: {
    alignItems: 'center',
    width: wp(70),
    height: hp(30),
    marginBottom: hp(9),
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: wp(5),
    color: '#1A1B8A'
  },
  aboutContainer: {
    paddingHorizontal: wp(5),
    alignItems: 'center',
    marginBottom: hp(7),
  },
  aboutText: {
    textAlign: 'justify',
    fontSize: wp(4.5),
    marginBottom: hp(7)
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: wp(85)
  },
  iconLabel: {
    fontWeight: 'bold',
    marginBottom: hp(2),
    fontSize: wp(5)
  },
  buttonLogout: {
    position: 'absolute',
    bottom: 0
  }
})