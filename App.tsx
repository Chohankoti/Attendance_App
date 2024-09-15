import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import Login from './Screens/Login';
import Home from './Screens/Home';
import Report from './Screens/Report';
import Profile from './Screens/Profile';

// Define the root stack navigation types
export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
};

// Export the universal navigation type
export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

// Define the types for the Tab Navigator
type TabParamList = {
  Home: undefined;
  Report: undefined;
  Profile: undefined;
};

// Create Tab Navigator for Home and Report Screens
const Tab = createBottomTabNavigator<TabParamList>();

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false, // Hide the header for all screens
    }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Report" component={Report} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

// Create Stack Navigator for Login and Main Tabs
const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
