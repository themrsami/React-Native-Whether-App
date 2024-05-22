import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [weatherData, setData] = useState(null);
  const API_KEY = '<your new API key>';


  useEffect(() => {
    console.log('App mounted');
  });


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location.coords.latitude},${location.coords.longitude}`)
        .then((response) => response.json())
        .then((json) => setData(json));
    })();
  }, []);

  const renderWeatherProperty = (title, value) => {
    return (
      <TouchableOpacity>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.itemText}>{value}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Local Weather</Text>
      <ScrollView>
        {weatherData && (
          <>
            {renderWeatherProperty('Location', `${weatherData.location.name}, ${weatherData.location.country}`)}
            {renderWeatherProperty('Condition', weatherData.current.condition.text)}
            {renderWeatherProperty('Temperature', `${weatherData.current.temp_c}°C`)}
            {renderWeatherProperty('Wind Speed', `${weatherData.current.wind_kph} kph`)}
            {renderWeatherProperty('Pressure', `${weatherData.current.pressure_mb} mb`)}
            {renderWeatherProperty('Precipitation', `${weatherData.current.precip_mm} mm`)}
            {renderWeatherProperty('Humidity', `${weatherData.current.humidity}%`)}
            {renderWeatherProperty('Cloud Cover', `${weatherData.current.cloud}%`)}
            {renderWeatherProperty('Feels Like', `${weatherData.current.feelslike_c}°C`)}
            {renderWeatherProperty('Visibility', `${weatherData.current.vis_km} km`)}
            {renderWeatherProperty('UV Index', `${weatherData.current.uv}`)}
          </>
        )}
      </ScrollView>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    padding: 10,
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#444',
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffa500', // orange
    marginBottom: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
});
