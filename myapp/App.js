import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Login from './component/Login';


const Stack = createNativeStackNavigator();


export default function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/data')
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  };  
  return (
    // <View style={styles.container}>
    //   {/* <Text>Open up App.js to start working on your app! this is me  </Text>
    //   <Text>{data.message}</Text>
    //   <Text>{data.name}</Text>
    //   <StatusBar style="auto" /> */}
    //   {/* <Text>hello world</Text> */}
    //   <Login />
    // </View>
    <NavigationContainer>
      <Stack.Navigator screenOptions = {{headerShown: false}}>
        <Stack.Group>
          <Stack.Screen name = "Login" component = {Login} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

