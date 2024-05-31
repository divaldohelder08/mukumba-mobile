import React, { useContext } from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
//import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from '../navigation/AuthStack';
import AppStack from '../navigation/AppStack';
import { AuthContext } from '../context/AuthContext';


const AppNav = () => {
     const { isLoading, userToken } = useContext(AuthContext);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
            </View>
        )
    }

    return (
        <NavigationContainer >
            <StatusBar backgroundColor="#ccc" barStyle="light-content" />
            {
                userToken !== null ? <AppStack /> : <AuthStack />
            }
        </NavigationContainer>
    )
}

export default AppNav;