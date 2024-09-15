import { StyleSheet, Text, View, PermissionsAndroid, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CheckInStatus {
  date: string;
  status: 'checkedIn' | 'checkedOut';
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Home() {
  const [currentDate, setCurrentDate] = useState<string>('');
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [loading, setLoading] = useState<boolean>(true); // New state for loading
  const [checkIn, setCheckIn] = useState<boolean>(true);
  const [checkOut, setCheckOut] = useState<boolean>(false);

  useEffect(() => {
    requestGeoLocationPermission();
    getLocation();
    const now = new Date();
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();
    const formattedDate = `${dayName} ${day} ${monthName} ${year}`;
    
    setCurrentDate(formattedDate);
    checkIfCheckedInOrOutToday(formattedDate);
  }, []);

  const requestGeoLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Attendance App Location Permission',
          message: 'Attendance App needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
    setLoading(true); // Set loading state to true before fetching location
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          ...location,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false); // Set loading to false once location is fetched
      },
      (error) => {
        console.log(error.code, error.message);
        setLoading(false); // Set loading to false even if there's an error
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const saveCheckInStatus = async (status: 'checkedIn' | 'checkedOut') => {
    try {
      const checkInStatus: CheckInStatus = {
        date: currentDate,
        status,
      };
      await AsyncStorage.setItem('CHECKIN_STATUS', JSON.stringify(checkInStatus));
    } catch (e) {
      console.log(e);
    }
  };

  const checkIfCheckedInOrOutToday = async (today: string) => {
    try {
      const checkInData = await AsyncStorage.getItem('CHECKIN_STATUS');
      if (checkInData !== null) {
        const { date, status }: CheckInStatus = JSON.parse(checkInData);
        if (date === today) {
          if (status === 'checkedIn') {
            setCheckIn(false);
            setCheckOut(true);
          } else if (status === 'checkedOut') {
            setCheckIn(false);
            setCheckOut(false);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCheckIn = () => {
    setCheckIn(false);
    setCheckOut(true);
    saveCheckInStatus('checkedIn');
  };

  const handleCheckOut = () => {
    setCheckIn(false);
    setCheckOut(false);
    saveCheckInStatus('checkedOut');
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading location...</Text>
        </View>
      ) : (
        <>
          <Text style={styles.infoText}>{`Latitude: ${location.latitude.toFixed(4)}`}</Text>
          <Text style={styles.infoText}>{`Longitude: ${location.longitude.toFixed(4)}`}</Text>
          <Text style={styles.dateText}>{currentDate}</Text>

          <TouchableOpacity
            disabled={!checkIn}
            onPress={handleCheckIn}
            style={[styles.button, { backgroundColor: checkIn ? 'green' : 'grey' }]}>
            <Text style={styles.buttonText}>Check In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={!checkOut}
            onPress={handleCheckOut}
            style={[styles.button, { backgroundColor: checkOut ? 'green' : 'grey' }]}>
            <Text style={styles.buttonText}>Check Out</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  infoText: {
    fontSize: 16,
    marginVertical: 10,
    color: '#333',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#444',
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
