import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import AsyncStorageStatic from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native"
import { ChevronLeft } from 'lucide-react-native'
import NetInfo from "@react-native-community/netinfo"

export default function Profile() {

    const { background, backgroundHeader, color, colorSlise, colorBtnCall, getDataUser, userInfoProfile, upDateProfile, text } = useContext(AuthContext);
    const navigation = useNavigation();
    const [isConnected, setIsConnected] = useState(false);

    const [avatar, setAvatar] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [dataNascimento, setDataNascimento] = useState(null);
    const [number, setNumber] = useState(null);

    const setData = () => {
        if (userInfoProfile != null) {
            setName(userInfoProfile.name);
            setEmail(userInfoProfile.email);
            setNumber(userInfoProfile.tel);
            setDataNascimento(userInfoProfile.nascimento);
            setAvatar(userInfoProfile.avatar);
        }
    }

    const handleImagePicker = async () => {

        const result = await ImagePicker.launchImageLibraryAsync({
            aspect: [4, 4],
            allowsEditing: true,
            base64: true,
            quality: 1
        });
        if (!result.canceled) {
            console.log(result.assets[0].uri)
            setImage(result.assets[0].uri)
        }

    }

    useEffect(() => {
        getDataUser();
        setData();

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
                backgroundColor: background,
                flex: 1
            }} onLayout={setData} >

                <View style={{
                    flexDirection: "row",
                    width: wp(100),
                    height: 60,
                    backgroundColor: backgroundHeader,
                    justifyContent: "space-between",
                    alignItems: "center",
                }} >

                    <TouchableOpacity onPress={() => { navigation.openDrawer() }} style={{ left: 10 }}>
                        <ChevronLeft size={24} color={color} />
                    </TouchableOpacity>

                    <Text style={{
                        fontSize: 14,
                        color: color,
                        fontWeight: "bold",
                        marginHorizontal: "auto",
                        right: 10
                    }}>Editar Perfil</Text>

                </View>
                <ScrollView style={{flex:1}}>
                    {
                        isConnected ? 
                        (<>
                            <View style={{ width: wp(100), flex: 1 }}>
                                <View >
                                    <Image style={{
                                        width: 130,
                                        height: 130,
                                        borderRadius: "50%",
                                        borderWidth: 2,
                                        borderColor: colorBtnCall,
                                        marginTop: 20,
                                        alignSelf: "center"
                                    }} source={{ uri: avatar }} />
                                    <TouchableOpacity onPress={handleImagePicker} >
                                        <Text style={styles.textProfile} >ALTERAR FOTO</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ marginTop: 15 }}>
                                    <View style={styles.container}>
                                        <TextInput placeholder="Nome Completo" placeholderTextColor={color} style={{
                                            borderWidth: 1,
                                            borderColor: backgroundHeader,
                                            width: wp(95),
                                            height: 48,
                                            backgroundColor: backgroundHeader,
                                            color: text,
                                            fontSize: 15,
                                            borderRadius: 10,
                                            paddingLeft: 15,
                                            paddingRight: 15,
                                            fontWeight: "bold"

                                        }} autoCapitalize="words" value={name} onChangeText={(val) => { setName(val) }} />
                                    </View>

                                    <View style={styles.container}>
                                        <TextInput placeholder="Email" placeholderTextColor={color} style={{
                                            borderWidth: 1,
                                            borderColor: backgroundHeader,
                                            width: wp(95),
                                            height: 48,
                                            backgroundColor: backgroundHeader,
                                            color: text,
                                            fontSize: 15,
                                            borderRadius: 10,
                                            paddingLeft: 15,
                                            paddingRight: 15,
                                            fontWeight: "bold"

                                        }} autoCapitalize="words" value={email} onChangeText={(val) => { setEmail(val) }} />
                                    </View>

                                    <View style={styles.container}>
                                        <TextInput placeholder="Numero de BI" value={dataNascimento} onChangeText={(val) => { setDataNascimento(val) }} placeholderTextColor={color} style={{
                                            borderWidth: 1,
                                            borderColor: backgroundHeader,
                                            width: wp(95),
                                            height: 48,
                                            backgroundColor: backgroundHeader,
                                            color: text,
                                            fontSize: 15,
                                            borderRadius: 10,
                                            paddingLeft: 15,
                                            paddingRight: 15,
                                            fontWeight: "bold"
                                        }} />
                                    </View>

                                    <View style={styles.container}>
                                        <TextInput keyboardType="numeric" placeholder="000000000" placeholderTextColor={color} style={{
                                            borderWidth: 1,
                                            borderColor: backgroundHeader,
                                            width: wp(95),
                                            height: 48,
                                            backgroundColor: backgroundHeader,
                                            color: text,
                                            fontSize: 15,
                                            borderRadius: 10,
                                            paddingLeft: 15,
                                            paddingRight: 15,
                                            fontWeight: "bold"
                                        }} value={number} onChangeText={(val) => { setNumber(val) }} textContentType="telephoneNumber" />
                                    </View>

                                </View>
                            </View>




                            <View style={{ width: wp(100), alignItems: "center", justifyContent: "center" }}>
                                <TouchableOpacity style={styles.btnLast} onPress={() => { upDateProfile(avatar, name, email, number) }}>
                                    <Text style={styles.textBtn} >ACTUALIZAR</Text>
                                </TouchableOpacity>
                            </View></>)
                            :
                            (
                                <View style={{
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    position: "absolute",
                                    flex: 1,
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    alignItems:"center",
                                    justifyContent:"center"

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
                                        backgroundColor: backgroundHeader,
                                        borderRadius: 10,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        alignContent: "center",
                                        marginTop:hp(25)


                                    }}>
                                        <View style={{ padding: 10, width: "255px" }}>
                                            <Text style={{ alignContent: "center", fontWeight: "700", fontSize: 16, color: color, textAlign: "center", letterSpacing: 0.5 }}>Erro de Conexão</Text>
                                            <Text style={{ alignContent: "center", fontWeight: "200", fontSize: 14, top: "10px", color: color, textAlign: "center" }}>Verifique a sua ligação a internet e tente novamente!</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                    }
                </ScrollView>
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
    textProfile: {
        color: "#00B37E",
        fontWeight: "bold",
        fontSize: 13,
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
        width: wp(100),
        marginTop: 5,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "left"
    },
    btnLast: {
        width: wp(95),
        height: 45,
        backgroundColor: "#00875F",
        borderRadius: 10,
        justifyContent: "center",
        marginBottom: hp(3),
        flexDirection: "row",
        alignItems: "center",
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