import React from "react";
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/loginScreen";

const Stack = createNativeStackNavigator()

const AuthStack = () => {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
             
             <Stack.Screen name="Login" component={LoginScreen} />

        </Stack.Navigator>
    )
}

export default AuthStack;