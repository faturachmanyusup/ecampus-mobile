import React, { useState, useEffect } from 'react';
import {
  View, Text,
  StyleSheet
} from 'react-native';
import { getHomeData } from '../fetch/homeFetch';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function Home({navigation, route}) {
  const [activities, setActivities] = useState([]);
  const [notes, setNotes] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data = await getHomeData(route.params.token);
    await setActivities(data.activities);
    await setNotes(data.notes);
  }

  console.log("Activities >>>>", activities)

  return (
    <View style={styles.container}>
      <Text style={styles.schedulesLabel}>Coming Up</Text>
      <View style={styles.schedulesWrapper}>
        {activities.map((act, idx) => {
          return (
            <Text key={idx}>Card1</Text>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: hp(10),
    marginHorizontal: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  schedulesWrapper: {
    paddingHorizontal: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  schedulesLabel: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: hp(3)
  }  
});