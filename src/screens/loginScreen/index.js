import React, { useEffect, useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AuthContext } from "../../context/AuthContext";
import { Entypo, Ionicons } from '@expo/vector-icons';
import AsyncStorageStatic from "@react-native-async-storage/async-storage";
import BASE_URL from '../../services/api';
import axios from "axios";

const LoginScreen = ({ navigation }) => {

    const { getTheme, background, colorText, colorBtnLogin, setUserInfo, setUserToken, color } = useContext(AuthContext);

    const [secret, setSecret] = useState(true)
    const [secretIcon, setSecretName] = useState('eye')
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false);

    const login = async (email, password) => {
        setIsLoading(true)
        try {
            if (password.length >= 4) {

                    if (email && password != null) {
                     
                        await axios.post(`${BASE_URL}/client/authenticate`, {
                            email,
                            password
                        }).then(res => {
                            
                            let userInfo = res.data;
                            setUserInfo(userInfo);
                            setUserToken(userInfo);
                            AsyncStorageStatic.setItem("userInfo", JSON.stringify(userInfo))
                            AsyncStorageStatic.setItem("userToken", userInfo.token)
                            setIsLoading(false)

                        }).catch(e => {
                            setIsLoading(false)
                            console.log(`login error ${e}`);
                            throw setError(
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
                                            width: 280,
                                            height: 120,
                                            position: "absolute",
                                            top: "50%",
                                            left: "27%",
                                            transform: [
                                                { translateX: -50 },
                                                { translateY: -50 },
                                            ],
                                            backgroundColor: background,
                                            borderRadius: 10,
                                        }}>
                                            <View style={{
                                                padding: 10, width: 280,
                                                height: 200,
                                            }}>
                                                <Text style={{ alignContent: "center", fontWeight: "700", fontSize: 10, color: color, textAlign: "center", marginTop: 15 }}>Credenciais Erradas</Text>
                                                <Text style={{ alignContent: "center", fontWeight: "200", fontSize: 8, top: "10px", color: color, textAlign: "center" }}>Usuario ou Palavra-Passe incorrecta!, verifique e volte a tentar</Text>

                                                <View style={{ alignItems: "center", justifyContent: "center", width: "100%", padding: 10, marginTop: 15 }}>
                                                    <TouchableOpacity style={{ width: "100%", height: "40px", fontWeight: "600", fontSize: 16, color: color, alignItems: "center", justifyContent: "center", borderTopWidth: 1, borderTopColor: "#ccc", padding: 10 }} onPress={() => { setError(false) }}><Text style={{ fontSize: 11, color: color, textAlign: "center", alignSelf: "center" }}>OK</Text></TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </>)

                        })
                    }
                    else {
                        setIsLoading(false)
                        throw setError(
                            <>
                                <View style={{
                                    width: 280,
                                    height: 120,
                                    position: "absolute",
                                    top: "50%",
                                    left: "27%",
                                    transform: [
                                        { translateX: -50 },
                                        { translateY: -50 },
                                    ],
                                    backgroundColor: background,
                                    borderRadius: 10,

                                }}>
                                    <View style={{
                                        padding: 10, width: 280,
                                        height: 200,
                                    }}>
                                        <Text style={{ alignContent: "center", fontWeight: "700", fontSize: 10, color: color, textAlign: "center", marginTop: 15 }}>Campos Vazios</Text>
                                        <Text style={{ alignContent: "center", fontWeight: "200", fontSize: 10, top: "10px", color: color, textAlign: "center" }}>Preecha os Campos com o seu Email e a sua PassWord!</Text>

                                        <View style={{ alignItems: "center", justifyContent: "center", width: "100%", padding: 10, marginTop: 15 }}>
                                            <TouchableOpacity style={{ width: "100%", height: "40px", fontWeight: "600", fontSize: 16, color: color, alignItems: "center", justifyContent: "center", borderTopWidth: 1, borderTopColor: "#ccc", padding: 10 }} onPress={() => { setError(false) }}><Text style={{ fontSize: 11, color: color, textAlign: "center", alignSelf: "center" }}>OK</Text></TouchableOpacity>
                                        </View>

                                    </View>

                                </View>
                            </>)

                    }
            }
        }
        catch (error) {
            console.log(error)
            setTimeout(() => {
                setIsLoading(false)
                throw setError(
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
                                width: 280,
                                height: 130,
                                position: "absolute",
                                top: "50%",
                                left: "30%",
                                transform: [
                                    { translateX: -50 },
                                    { translateY: -50 },
                                ],
                                backgroundColor: background,
                                borderRadius: 10,

                            }}>
                                <View style={{
                                    padding: 10, 
                                    width: 280,
                                    height: 200,
                                }}>
                                    <Text style={{ alignContent: "center", fontWeight: "700", fontSize: 10, color: color, textAlign: "center", marginTop: 15 }}>Erro ao Entrar</Text>
                                    <Text style={{ alignContent: "center", fontWeight: "200", fontSize: 8, top: "10px", color: color, textAlign: "center" }}>A sua password não pode ser inferior a 4, nem os campos podem ser vazios!</Text>

                                    <View style={{ alignItems: "center", justifyContent: "center", width: "100%", padding: 10, marginTop: 15 }}>
                                        <TouchableOpacity style={{ width: "100%", height: "40px", fontWeight: "600", fontSize: 16, color: color, alignItems: "center", justifyContent: "center", borderTopWidth: 1, borderTopColor: "#ccc", padding: 10 }} onPress={() => { setError(false) }}><Text style={{ fontSize: 11, color: color, textAlign: "center", alignSelf: "center" }}>OK</Text></TouchableOpacity>
                                    </View>

                                </View>

                            </View>

                        </View>
                    </>)
            }, 1000)

        }

    }


    const renderSpinner = () => {
        return (
            <View style={{
                position: "relative",
                right: 0,
                left: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent'
            }}>
                <ActivityIndicator size="small" color="#ccc" />
            </View>
        )
    }

    useEffect(() => {
        getTheme();
    }, [])

    return (
        <View style={{
            backgroundColor: background,
            flex: 1,
        }}>

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={styles.Container}>

                    <View style={{ width: "100%", height: "auto", alignItems: "center" }}>
                        <View style={styles.ContainerLogo} >
                            <Image source={require('../img/mukumba.png')} style={{ width: 160, height: 30 }} />
                        </View>
                    </View>

                    <View style={{ padding: 15 }}>
                        <View style={{ marginBottom: 15 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderStyle: "solid", borderColor: colorText, height: 50, backgroundColor: background, borderRadius: 10 }} >
                                <Entypo style={{ marginRight: 10, paddingLeft: 10 }} name="mail" size={24} color={colorText} />
                                <TextInput style={{
                                    flex: 1,
                                    height: 50,
                                    color: colorText,
                                    outline: "none",
                                    borderWidth: 0,
                                    paddingRight: 10,
                                    fontSize: 10

                                }}
                                    autoCapitalize="none"
                                    placeholder="E-mail" value={email} onChangeText={(val) => {
                                        setEmail(val)

                                    }} placeholderTextColor={colorText}

                                />
                            </View>
                        </View>

                        <View style={{ marginBottom: 15 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderStyle: "solid", borderColor: colorText, height: 50, backgroundColor: background, borderRadius: 10 }}>
                                <Entypo style={{ marginRight: 10, paddingLeft: 10 }} name="key" size={24} color={colorText} />
                                <TextInput style={{
                                    flex: 1,
                                    height: 50,
                                    color: colorText,
                                    outline: "none",
                                    borderWidth: 0,
                                    paddingRight: 10,
                                    fontSize: 10
                                }} placeholder="Senha" value={password} onChangeText={(val) => { setPassword(val) }} secureTextEntry={secret} placeholderTextColor={colorText} />

                                <Ionicons style={{ marginRight: 10 }} name={secretIcon} size={24} color={colorText} onPress={() => {
                                    if (secret == true) {
                                        setSecret(false)
                                        setSecretName('eye-off')
                                    }
                                    if (secret == false) {
                                        setSecret(true)
                                        setSecretName('eye')
                                    }
                                }} />
                            </View>
                        </View>

                        <View>

                            <View style={{ alignItems: "center", justifyContent: "center" }} onPress={() => { login(email, password) }} >

                                <TouchableOpacity style={{
                                    width: "100%",
                                    height: 50,
                                    backgroundColor: colorBtnLogin,
                                    color: "white",
                                    borderRadius: 10,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }} onPress={() => { login(email, password) }} >
                                    {
                                        isLoading == true ? renderSpinner() : <Text style={styles.textBtn} onPress={() => { login(email, password) }}>entrar</Text>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            {
                error
            }
        </View>
    )
}

const styles = StyleSheet.create({

    img: {
        width: 80,
        height: 80,
        top: -28,
        right: -20
    },
    Container: {
        gap: 15,
        width: wp(100),
        alignContent: "center",
        alignSelf: "center",
        justifyContent: "center"

    },

    textBtn: {
        color: "white",
        fontSize: 11,
    },
    link: {
        color: "#242424",
        alignSelf: "center",
        fontSize: 15,
        fontWeight: "bold",
        marginRight: 8
    },
    linkBtn: {
        width: 200,
        height: 50,
        backgroundColor: "#ccc",
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 25,
        maxWidth: 250,
        margin: 10,
        flexDirection: "row",
        alignContent: "center"
    },
    icon1: {
        position: "absolute",
        marginLeft: 15,
        marginTop: -100
    },
    icon2: {
        position: "absolute",
        marginLeft: 15,
        marginTop: 25
    },
    ContainerLogo: {
        margin: 10,
    },
    secret: {
        marginLeft: wp(88),
        marginTop: 25,
        position: "absolute"
    }
})

export default LoginScreen;