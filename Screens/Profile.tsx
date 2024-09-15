import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export default function Profile() {
  const [deviceInfo, setDeviceInfo] = useState({
    brand: '',
    model: '',
    systemName: '',
    systemVersion: '',
    deviceId: '',
    uniqueId: '',
  });

  useEffect(() => {
    async function fetchDeviceInfo() {
      const brand = DeviceInfo.getBrand();
      const model = await DeviceInfo.getModel();
      const systemName = DeviceInfo.getSystemName();
      const systemVersion = await DeviceInfo.getSystemVersion();
      const deviceId = await DeviceInfo.getDeviceId();
      const uniqueId = await DeviceInfo.getUniqueId();

      setDeviceInfo({
        brand,
        model,
        systemName,
        systemVersion,
        deviceId,
        uniqueId,
      });
    }

    fetchDeviceInfo();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Device Information</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Brand:</Text>
        <Text style={styles.value}>{deviceInfo.brand}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Model:</Text>
        <Text style={styles.value}>{deviceInfo.model}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>System Name:</Text>
        <Text style={styles.value}>{deviceInfo.systemName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>System Version:</Text>
        <Text style={styles.value}>{deviceInfo.systemVersion}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Device ID:</Text>
        <Text style={styles.value}>{deviceInfo.deviceId}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Unique ID:</Text>
        <Text style={styles.value}>{deviceInfo.uniqueId}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
});
