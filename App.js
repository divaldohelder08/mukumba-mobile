import 'react-native-gesture-handler';
import React, { useContext } from "react";
import { View, Text, StatusBar, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext, AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';

export default function App(){

   return (
      <AuthProvider>
         <AppNav />
      </AuthProvider>
   )

};