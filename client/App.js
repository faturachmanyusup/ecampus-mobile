import React, { useEffect, useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Home, Login,
  Notes, Register,
  Schedules, More
} from './pages';
import AsyncStorage from '@react-native-community/async-storage';

const Tab = createBottomTabNavigator();
export const userContext = createContext();

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getAsynData();
  }, []);

  async function getAsynData() {
    let data = await AsyncStorage.getItem("@UserData");
    if (data) {
      data = JSON.parse(data);
      setUserData(data);
    } else {
      setUserData(null);
    }
  }

  async function setAsynData(data) {
    await AsyncStorage.setItem("@UserData", JSON.stringify(data));
    setUserData(data);
  }

  return (
    <userContext.Provider value={{
      setData: (data) => setAsynData(data),
      getData: () => getAsynData(),
    }}>
      <NavigationContainer>
        {!userData ? (
          <Tab.Navigator>
            <Tab.Screen
              name="Login"
              component={Login}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="ios-key" color={color} size={size} />
                )
              }}
            />
            <Tab.Screen
              name="Register"
              component={Register}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="ios-create" color={color} size={size} />
                )
              }}
            />
          </Tab.Navigator>
        ) : (
            <Tab.Navigator>
              <Tab.Screen
                name="Home"
                component={Home}
                initialParams={userData}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="ios-school" color={color} size={size} />
                  )
                }}
              />
              <Tab.Screen
                name="Notes"
                component={Notes}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="ios-book" color={color} size={size} />
                  )
                }}
              />
              <Tab.Screen
                name="Schedules"
                component={Schedules}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="ios-calendar" color={color} size={size} />
                  )
                }}
              />
              <Tab.Screen
                name="Logout"
                component={More}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="ios-power" color={color} size={size} />
                  )
                }}
              />
            </Tab.Navigator>
          )}
      </NavigationContainer>
    </userContext.Provider>
  );
}

export default App;