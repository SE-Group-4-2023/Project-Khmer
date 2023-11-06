import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

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
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! this is me  </Text>
      <Text>{data.message}</Text>
      <Text>{data.name}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
