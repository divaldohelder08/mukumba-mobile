import React, { useEffect, useContext, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FontAwesome5, Ionicons, Entypo } from "@expo/vector-icons";
import AsyncStorageStatic from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/AuthContext";
import * as Animatable from 'react-native-animatable';
import NetInfo from "@react-native-community/netinfo"

export default function Profile({ navigation }) {


    const { background, backgroundHeader, color, colorBtnCall, userInfoProfile, getTheme, getDataUser, text } = useContext(AuthContext);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        getTheme();
        getDataUser();
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
            <View style={{
                flex: 1,
                backgroundColor: background,
            }}>
                <View style={{
                    flexDirection: "row",
                    width: wp(100),
                    height: 60,
                    backgroundColor: backgroundHeader,
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#ccc"
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: color,
                        fontWeight: "bold",
                        marginHorizontal: "auto",
                    }}>Perfil</Text>
                </View>
                <View style={{ width: wp(100), flex: 1 }}>
                    {isConnected ? (
                        <>
                            <View style={{ width: "100%", height: "150px", justifyContent: "center", alignItems: "center", marginBottom: 10, marginTop: 10 }}>
                                {
                                    userInfoProfile != null ? (<>
                                     <Image source={{ uri: userInfoProfile.avatar }} style={{ borderWidth: 2, borderColor: colorBtnCall, borderRadius: "50%", width: 130, height: 130 }} /></>)
                                    :
                                    (
                                        <>
                                         <Image style={{ borderWidth: 2, borderColor: colorBtnCall, borderRadius: "50%", width: 130, height: 130 }} />
                                        </>
                                    )

                                    }
                               
                            </View>
                            <View>

                                <View style={{ borderRadius: 10, backgroundColor: backgroundHeader, marginTop: 5, marginBottom: 10, padding: "10px", marginLeft: 10, marginRight: 10, height: 48, justifyContent: "center" }}>
                                    <Text style={{
                                        color: text,
                                        fontSize: 15,
                                        marginLeft: "2.8%",
                                        fontWeight: "bold"
                                    }} >{userInfoProfile.name}</Text>

                                </View>

                                <View style={{ borderRadius: 10, backgroundColor: backgroundHeader, marginTop: 5, marginBottom: 10, padding: "10px", marginLeft: 10, marginRight: 10, height: 48, justifyContent: "center" }}>
                                    <Text style={{
                                        color: text,
                                        fontSize: 15,
                                        marginLeft: "2.8%",
                                        fontWeight: "bold"
                                    }} >{userInfoProfile.email}</Text>

                                </View>

                                <View style={{ borderRadius: 10, backgroundColor: backgroundHeader, marginTop: 5, marginBottom: 10, padding: "10px", marginLeft: 10, marginRight: 10, height: 48, justifyContent: "center" }}>
                                    <Text style={{
                                        color: text,
                                        fontSize: 15,
                                        marginLeft: "2.8%",
                                        fontWeight: "bold"
                                    }} >{userInfoProfile.tel}</Text>
                                </View>

                                <View style={{ borderRadius: 10, backgroundColor: backgroundHeader, marginTop: 5, marginBottom: 10, padding: "10px", marginLeft: 10, marginRight: 10, height: 48, justifyContent: "center" }}>
                                    <Text style={{
                                        color: text,
                                        fontSize: 15,
                                        marginLeft: "2.8%",
                                        fontWeight: "bold"
                                    }} >Filial: {userInfoProfile.filial.município}</Text>
                                </View>

                                <View style={{ borderRadius: 10, backgroundColor: backgroundHeader, marginTop: 5, marginBottom: 10, padding: "10px", marginLeft: 10, marginRight: 10, height: 48, justifyContent: "center" }}>
                                    <Text style={{
                                        color: text,
                                        fontSize: 15,
                                        marginLeft: "2.8%",
                                        fontWeight: "bold"
                                    }} >
                                        {userInfoProfile.address.município + ", " + userInfoProfile.address.bairro
                                        
                                        //", " + userInfoProfile.address.rua + ", " + userInfoProfile.address.casa
                                    }
                                    </Text>
                                </View>

                            </View>
                        </>
                    ) : (
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
                    )
                    }
                </View>
                <View >
                </View>
            </View>
        </>
    )
}



const styles = StyleSheet.create({
    body: {
        backgroundColor: "#202024",
        width: wp(100),
        Height: hp(100),
        minWidth: wp(100),
        minHeight: hp(100)
    },
    back: {
        width: 30,
        height: 30,
        margin: 10
    },
    imgProfile: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        alignSelf: "center",
        marginTop: 20
    },
    textProfile: {
        color: "#00B37E",
        fontWeight: "bold",
        fontSize: 14,
        alignSelf: "center",
        marginTop: 10
    },

    legendText: {
        fontSize: 16,
        color: "#C4C4C9",
        alignSelf: "flex-start",
        margin: 1,
        fontWeight: "bold"
    },
    container: {
        marginTop: 5,
        marginBottom: 10
    },
    btnLast: {
        width: wp(50),
        height: 50,
        backgroundColor: "#00875F",
        alignSelf: "center",
        borderRadius: 30,
        justifyContent: "center",
        marginBottom: hp(2),
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        bottom: 20
    },
    textBtn: {
        color: "white",
        alignSelf: "center",
        fontSize: 12,
        fontWeight: "bold"

    },
    textBtnSair: {
        alignSelf: "center",
        width: wp(98),
        height: 50,
        backgroundColor: "red",
        borderRadius: 30,
        justifyContent: "center",
        marginTop: hp(1),
    },
    textBtnSair2: {
        color: "white",
        alignSelf: "center",
        fontSize: 18,
        justifyContent: "center",
    }
})