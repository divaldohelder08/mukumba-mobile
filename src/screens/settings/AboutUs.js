import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AuthContext } from "../../context/AuthContext";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Facebook, Instagram, Github, Youtube, ChevronLeft } from 'lucide-react-native';

export default function AboutUs() {
    const navigation = useNavigation();

    const { background, backgroundHeader, colorBtnCall, color } = useContext(AuthContext);

    return (
        <>
            <View style={{ flex: 1, backgroundColor: background, alignItems: "center" }}>

                <View style={{ width: "100%", height: hp(7), backgroundColor: backgroundHeader, alignItems: "center", justifyContent: "center" }}>
                    <TouchableOpacity style={{ position: "absolute", left: 10 }} onPress={() => { navigation.navigate('Configuracoes') }}>
                        <ChevronLeft size={24} color={color} onPress={() => { navigation.navigate('Configuracoes') }} />
                    </TouchableOpacity>
                    <Text style={{ color: color, fontSize: 16, fontWeight: "bold" }}>Sobre Nós</Text>
                </View>

                <View style={{ width: "95%", padding: "10px", height: hp(20), borderRadius: "10px", marginTop: "20px", backgroundColor: backgroundHeader, display: "flex", flexDirection: "row" }}>

                    <View style={{ width: "40%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <Image source={require("../../screens/img/edivaldo.jpg")} style={{ width: "95%", height: "130px", borderRadius: "50%", borderWidth: 1, borderColor: colorBtnCall }} />
                    </View>

                    <View style={{ width: "60%", justifyContent: "center" }}>
                        <Text style={{ color: color, fontSize: 15, fontWeight: "700", textAlign: "left", paddingLeft: "15px" }}>Edivaldo Pinheiro</Text>
                        <Text style={{ color: color, fontSize: 15, fontWeight: "600", textAlign: "left", paddingLeft: "15px" }}>@edivaldopinheiro</Text>
                        <Text style={{ color: colorBtnCall, fontSize: 15, fontWeight: "600", textAlign: "left", paddingLeft: "15px" }}>Desenvolvedor</Text>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "15px" }}>
                           
                            <Ionicons name="logo-facebook" size={24} color={color} style={{margin:10}}/>
                            <Ionicons name="logo-youtube" size={24} color={color} style={{margin:10}}/>
                            <Ionicons name="logo-instagram" size={24} color={color} style={{margin:10}}/>
                            <Ionicons name="logo-github" size={24} color={color} style={{margin:10}}/>
                        </View>
                    </View>
                </View>


                <View style={{ width: "95%", padding: "10px", height: hp(20), borderRadius: "10px", marginTop: "20px", backgroundColor: backgroundHeader, display: "flex", flexDirection: "row" }}>

                    <View style={{ width: "40%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <Image source={require("../../screens/img/divaldohelder.jpg")} style={{ width: "95%", height: "130px", borderRadius: "50%", borderWidth: 1, borderColor: colorBtnCall }} />
                    </View>
                    <View style={{ width: "60%", justifyContent: "center" }}>
                        <Text style={{ color: color, fontSize: 15, fontWeight: "700", textAlign: "left", paddingLeft: "15px" }}>Divaldo Helder</Text>
                        <Text style={{ color: color, fontSize: 15, fontWeight: "600", textAlign: "left", paddingLeft: "15px" }}>@divaldohelder</Text>
                        <Text style={{ color: colorBtnCall, fontSize: 15, fontWeight: "600", textAlign: "left", paddingLeft: "15px" }}>Front-End</Text>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "15px" }}>
                            
                           <Ionicons name="logo-facebook" size={24} color={color} style={{margin:10}}/>
                            <Ionicons name="logo-youtube" size={24} color={color} style={{margin:10}}/>
                            <Ionicons name="logo-instagram" size={24} color={color} style={{margin:10}}/>
                            <Ionicons name="logo-github" size={24} color={color} style={{margin:10}}/>
                        </View>
                    </View>
                </View>


                <View style={{ width: "95%", padding: "10px", height: hp(20), borderRadius: "10px", marginTop: "20px", backgroundColor: backgroundHeader, display: "flex", flexDirection: "row" }}>

                    <View style={{ width: "40%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <Image source={require("../../screens/img/fernando.jpg")} style={{ width: "95%", height: "130px", borderRadius: "50%", borderWidth: 1, borderColor: colorBtnCall }} />
                    </View>

                    <View style={{ width: "60%", justifyContent: "center" }}>
                        <Text style={{ color: color, fontSize: 15, fontWeight: "700", textAlign: "left", paddingLeft: "15px" }}>Fernando Afonso</Text>
                        <Text style={{ color: color, fontSize: 15, fontWeight: "600", textAlign: "left", paddingLeft: "15px" }}>@fernandoafonso</Text>
                        <Text style={{ color: colorBtnCall, fontSize: "14px", fontWeight: "600", textAlign: "left", paddingLeft: "15px" }}>Back-End</Text>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "15px" }}>
                        
                            <Ionicons name="logo-facebook" size={24} color={color} style={{margin:10}}/>
                            <Ionicons name="logo-youtube" size={24} color={color} style={{margin:10}}/>
                            <Ionicons name="logo-instagram" size={24} color={color} style={{margin:10}}/>
                            <Ionicons name="logo-github" size={24} color={color} style={{margin:10}}/>
                        </View>
                    </View>

                </View>
            </View>
        </>
    )
}