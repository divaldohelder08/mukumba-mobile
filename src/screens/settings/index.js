import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../../context/AuthContext";
import { RadioButton } from 'react-native-paper';
import AsyncStorageStatic from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import { ChevronLeft, ChevronRight, UsersRound, Lock, CircleAlert } from 'lucide-react-native';


const Settings = () => {
    const navigation = useNavigation();
    const { getTheme, background, backgroundHeader, color, loadRecolha } = useContext(AuthContext);
    const [checked, setChecked] = useState('first');

    useEffect(() => {
        const callTheme = async () => {
            const theme = await AsyncStorageStatic.getItem('Theme')
            if (theme == "Dark") {
                setChecked('first')
            }
            if (theme == "Light") {
                setChecked("second")
            }
        }
        callTheme();
    }, [])

    return (
        <View style={{ backgroundColor: background, flex: 1 }} >

            <View style={{ backgroundColor: backgroundHeader, height: hp(7), alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity style={{ position: "absolute", left: 10 }} onPress={() => { navigation.openDrawer() }}>
                    <ChevronLeft size={24} color={color} onPress={() => { navigation.openDrawer() }} />
                </TouchableOpacity>
                <Text style={{ color: color, fontSize: 16, fontWeight: "bold" }}>Definições</Text>
            </View>

            <View style={{ height: hp(93), alignItems: "center" }}>
                <View style={{ width: "95%", height: "auto", padding: "10px", borderRadius: "10px", marginTop: "10px", backgroundColor: backgroundHeader }}>
                    <Text style={{ fontSize: 15, marginLeft: 5, color: color }}>Tema:</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>

                        <Text style={{ fontSize: 15, marginLeft: 5, color: color }}>Escuro</Text>
                        <RadioButton
                            value="first"
                            status={checked === 'first' ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked('first')
                                AsyncStorageStatic.setItem('Theme', 'Dark')
                                getTheme();
                            }}
                        />
                        <Text style={{ fontSize: 15, marginLeft: 5, color: color }}>Claro</Text>
                        <RadioButton
                            value="second"
                            status={checked === 'second' ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked('second')
                                AsyncStorageStatic.setItem('Theme', 'Light')
                                getTheme();
                            }}
                        />
                    </View>

                </View>

                <TouchableOpacity style={{ width: "95%" }} onPress={() => { navigation.navigate('Sobre') }}>
                    <View style={{ width: "100%", height: "auto", padding: "10px", borderRadius: "10px", marginTop: "10px", backgroundColor: backgroundHeader, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <UsersRound size={24} color={color} />
                            <Text style={{ color: color, fontSize: 15, paddingLeft: "10px" }}>Sobre Nós</Text>
                        </View>
                        <ChevronRight size={24} color={color} onPress={() => { navigation.navigate('Sobre') }} />
                    </View>
                </TouchableOpacity>
            
              <TouchableOpacity style={{ width: "95%" }} onPress={() => { navigation.navigate('seguranca') }}>
                    <View style={{ width: "100%", height: "auto", padding: "10px", borderRadius: "10px", marginTop: "10px", backgroundColor: backgroundHeader, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <Lock size={24} color={color} />,
                            <Text style={{ color: color, fontSize: 15, paddingLeft: "10px" }}>Segurança</Text>
                        </View>
                        <ChevronRight size={24} color={color} onPress={() => { navigation.navigate('seguranca') }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: "95%" }} onPress={() => { navigation.navigate('informacoes') }}>
                    <View style={{ width: "100%", height: "auto", padding: "10px", borderRadius: "10px", marginTop: "10px", backgroundColor: backgroundHeader, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <CircleAlert size={24} color={color} />
                            <Text style={{ color: color, fontSize: 15, paddingLeft: "10px" }}>Informações do App</Text>
                        </View>
                        <ChevronRight size={24} color={color} onPress={() => { navigation.navigate('informacoes') }} />
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Settings;