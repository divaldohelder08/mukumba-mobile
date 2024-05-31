import React, { useContext, useState, useEffect } from 'react';

import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AuthContext } from "../../context/AuthContext";
import { RadioButton } from 'react-native-paper';
import AsyncStorageStatic from "@react-native-async-storage/async-storage";
import { useRoute, useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay';
import { ChevronLeft } from 'lucide-react-native';
import { Ionicons, Entypo } from "@expo/vector-icons";
import axios from 'axios';
import BASE_URL from '../../services/api';
import NetInfo from "@react-native-community/netinfo"

export default function Seguranca() {
    const navigation = useNavigation();
    const { background, backgroundHeader, colorBtnCall, isLoading, color, colorText } = useContext(AuthContext);

    const [oldPassWord, setOldPassWord] = useState(null)
    const [passWord1, setPassword1] = useState(null)
    const [passWord2, setPassword2] = useState(null)
    const [errorSecurity, setErrorSecurity] = useState(null)
    const [secret1, setSecret1] = useState(true)
    const [secret2, setSecret2] = useState(true)
    const [secretIcon1, setSecretName1] = useState("eye")
    const [secretIcon2, setSecretName2] = useState("eye")
    const [isConnected, setIsConnected] = useState(false);
    const upDatePassWord = async () => {

        if (passWord1 == passWord2 && oldPassWord != null && passWord1 != null && passWord2 != null) {

            const token = await AsyncStorageStatic.getItem('userToken');

            await axios.post(`${BASE_URL}/client`, {
                oldPassWord,
                passWord2
            },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
        }
        //    if(passWord1 != passWord2 || passWord2.length < 4 ||  oldPassWord == null){
        if (passWord2.length < 4) {
            setErrorSecurity(
                <>
                    <View style={{
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        flex: 1,
                        position: "absolute",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",

                    }}  >

                        <View style={{
                            width: "280px",
                            height: "140px",
                            position: "absolute",
                            top: "40%",
                            left: "30%",
                            transform: [
                                { translateX: -50 },
                                { translateY: -50 },
                            ],
                            backgroundColor: background,
                            borderRadius: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",


                        }}>
                            <View style={{ padding: 10, width: "255px" }}>
                                <Text style={{ alignContent: "center", fontWeight: "700", fontSize: 16, color: color, textAlign: "center", marginTop: 15, letterSpacing: 0.5 }}>Erro</Text>
                                <Text style={{ alignContent: "center", fontWeight: "200", fontSize: 14, top: "10px", color: color, textAlign: "center" }}>Verifique se as Palavras-Passes são iguais, e a Palavra-Passe Antiga está completo e tente novamente!</Text>

                                <View style={{ alignItems: "center", justifyContent: "center", width: "100%", padding: 10, marginTop: 15 }}>
                                    <TouchableOpacity style={{ width: "100%", height: "40px", fontWeight: "600", fontSize: 16, color: color, alignItems: "center", justifyContent: "center", borderTopWidth: 1, borderTopColor: "#ccc", padding: 10 }} onPress={() => {
                                        setErrorSecurity(null)
                                        setErrorSecurity(null)
                                    }}>OK</TouchableOpacity>
                                </View>

                            </View>

                        </View>

                    </View>
                </>
            )
        }

    }

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log('Connection type', state.type);
            console.log('Is connected?', state.isConnected);
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <>
            <View style={{ flex: 1, backgroundColor: background, alignItems: "center" }}>

                <View style={{ width: "100%", height: hp(7), backgroundColor: backgroundHeader, alignItems: "center", justifyContent: "center" }}>
                    <TouchableOpacity style={{ position: "absolute", left: 10 }} onPress={() => { navigation.navigate('Configuracoes') }}>
                        <ChevronLeft size={24} color={color} onPress={() => { navigation.navigate('Configuracoes') }} />
                    </TouchableOpacity>
                    <Text style={{ color: color, fontSize: 16, fontWeight: "bold" }}>Informações</Text>
                </View>

                <View style={{ flex: 1, alignItems: "center", width: "100%" }}>

                    {
                        isConnected ?
                            (<>
                                {
                                    errorSecurity
                                }
                                <View style={{ width: "100%", padding: "10px", borderRadius: "10px", marginTop: "10px", backgroundColor: backgroundHeader, justifyContent: "center" }}>

                                    <View style={{ borderWidth: 1, borderStyle: "solid", borderColor: colorText, height: 50, backgroundColor: background, borderRadius: 10, marginTop: 10 }} >
                                        <TextInput style={{
                                            flex: 1,
                                            height: 50,
                                            color: colorText,
                                            outline: "none",
                                            borderWidth: 0,
                                            paddingRight: 10,
                                            paddingLeft: 10
                                        }}
                                            autoCapitalize="none"
                                            placeholder="Senha Antiga" value={oldPassWord} onChangeText={(val) => { setOldPassWord(val) }} placeholderTextColor={colorText}

                                        />
                                    </View>

                                    <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderStyle: "solid", borderColor: colorText, height: 50, backgroundColor: background, borderRadius: 10, marginTop: 10 }}>
                                        <TextInput style={{
                                            flex: 1,
                                            height: 50,
                                            color: colorText,
                                            outline: "none",
                                            borderWidth: 0,
                                            paddingRight: 10,
                                            paddingLeft: 10
                                        }} placeholder="Nova Senha" value={passWord1} onChangeText={(val) => { setPassword1(val) }} secureTextEntry={secret1} placeholderTextColor={colorText} />

                                        <Ionicons style={{ marginRight: 10 }} name={secretIcon1} size={24} color={colorText} onPress={() => {
                                            if (secret1 == true) {
                                                setSecret1(false)
                                                setSecretName1('eye-off')
                                            }
                                            if (secret1 == false) {
                                                setSecret1(true)
                                                setSecretName1('eye')
                                            }
                                        }} />
                                    </View>

                                    <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderStyle: "solid", borderColor: colorText, height: 50, backgroundColor: background, borderRadius: 10, marginTop: 10 }}>
                                        <TextInput style={{
                                            flex: 1,
                                            height: 50,
                                            color: colorText,
                                            outline: "none",
                                            borderWidth: 0,
                                            paddingRight: 10,
                                            paddingLeft: 10
                                        }} placeholder="Confirmar Nova Senha" value={passWord2} onChangeText={(val) => { setPassword2(val) }} secureTextEntry={secret2} placeholderTextColor={colorText} />

                                        <Ionicons style={{ marginRight: 10 }} name={secretIcon2} size={24} color={colorText} onPress={() => {
                                            if (secret2 == true) {
                                                setSecret2(false)
                                                setSecretName2('eye-off')
                                            }
                                            if (secret2 == false) {
                                                setSecret2(true)
                                                setSecretName2('eye')
                                            }
                                        }} />
                                    </View>


                                </View>


                                <View style={{ width: wp(100), alignItems: "center", justifyContent: "center", marginTop: 10, }}>
                                    <TouchableOpacity style={{
                                        width: wp(95),
                                        height: 45,
                                        backgroundColor: "#00875F",
                                        borderRadius: 10,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }} onPress={() => { upDatePassWord(oldPassWord, passWord2) }}>
                                        <Text style={{
                                            color: "white",
                                            alignSelf: "center",
                                            fontSize: 15,
                                            fontWeight: "bold"
                                        }} >Termiado</Text>
                                    </TouchableOpacity>
                                </View>

                            </>) 
                            :
                            (<>
                                    <View style={{
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        position: "absolute",
                                        flex: 1,
                                        backgroundColor: "rgba(0, 0, 0, 0.5)",

                                    }}  >

                                        <View style={{
                                            width: "280px",
                                            height: "110px",
                                            position: "absolute",
                                            top: "40%",
                                            left: "30%",
                                            transform: [
                                                { translateX: -50 },
                                                { translateY: -50 },
                                            ],
                                            backgroundColor: background,
                                            borderRadius: 10,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            alignContent: "center",

                                        }}>
                                            <View style={{ padding: 10, width: "255px" }}>
                                                <Text style={{ alignContent: "center", fontWeight: "700", fontSize: 16, color: color, textAlign: "center", letterSpacing: 0.5 }}>Erro de Conexão</Text>
                                                <Text style={{ alignContent: "center", fontWeight: "200", fontSize: 14, top: "10px", color: color, textAlign: "center" }}>Verifique a sua ligação a internet e tente novamente!</Text>
                                            </View>
                                        </View>
                                    </View>
                                </>)
                    }
                </View>
            </View>
        </>
    )
}