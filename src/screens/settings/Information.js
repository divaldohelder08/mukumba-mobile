import React, { useContext, useState, useEffect } from 'react';

import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AuthContext } from "../../context/AuthContext";
import { RadioButton } from 'react-native-paper';
import AsyncStorageStatic from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons'
import { useRoute, useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay';
import { ChevronLeft } from 'lucide-react-native';

export default function Information() {
    const navigation = useNavigation();
    const { background, backgroundHeader, colorBtnCall, isLoading, color } = useContext(AuthContext);

    return (
        <>
            <View style={{ flex: 1, backgroundColor: background, alignItems: "center" }}>

                <View style={{width:"100%", height: hp(7), backgroundColor: backgroundHeader, alignItems: "center", justifyContent: "center" }}>
                    <TouchableOpacity style={{ position: "absolute", left: 10 }} onPress={() => { navigation.navigate('Configuracoes')}}>
                        <ChevronLeft size={24} color={color} onPress={() => { navigation.navigate('Configuracoes') }} />
                    </TouchableOpacity>
                    <Text style={{ color: color, fontSize: 16, fontWeight: "bold" }}>Informações</Text>
                </View>

                <View style={{ width: "95%", height: "auto", padding: "10px", borderRadius: "10px", marginTop: "10px", backgroundColor: backgroundHeader, display: "flex", justifyContent: "center" }} >
                    <Text style={{ color: color, fontSize: 15, textAlign: "justify" }}>Mukumba é uma palavra em Kimbundo(Língua Nacional Angolana) que significa recolhar lixo, este aplicativo é focado na recolha de lixo
                        para diferentes lugares como: residencias, instituições, empreendimentos e outros. O Mukumba foi desenvolvido por um grupo de desenvolvedores,
                        alunos do IPIL.
                    </Text>
                </View>
                <View style={{ width: "95%", height: "auto", padding: "10px", borderRadius: "10px", marginTop: "10px", backgroundColor: backgroundHeader, display: "flex", justifyContent: "center" }} >
                    <Text style={{ color: color, fontSize: 15, textAlign: "left" }}>
                        Versão: 0.1
                    </Text>
                </View>
                <View style={{ width: "95%", height: "auto", padding: "10px", borderRadius: "10px", marginTop: "10px", backgroundColor: backgroundHeader, display: "flex", justifyContent: "center" }} >
                    <Text style={{ color: color, fontSize: 15, textAlign: "left" }}>
                        Termos e Condições
                    </Text>
                </View>
            </View>
        </>
    )
}