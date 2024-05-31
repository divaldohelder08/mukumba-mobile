import React, { useContext, useEffect, useState } from "react";
import { View, Text, ImageBackground, Image, ActivityIndicator } from "react-native"
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorageStatic from "@react-native-async-storage/async-storage"
import Spinner from "react-native-loading-spinner-overlay";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Home, Settings, PersonStanding, Share2, LogOut } from 'lucide-react-native'

const CustomDrawer = (props) => {

    const { getTheme, background, color, shareApp, getDataUser, userInfoProfile, setUserToken } = useContext(AuthContext);

    const [modalSignOut, setModalSignOut] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const logout = () => {
        setIsLoading(true);

        setTimeout(() => {
            AsyncStorageStatic.removeItem('userInfo');
            AsyncStorageStatic.removeItem('userToken');
            AsyncStorageStatic.removeItem('recolhas');
            AsyncStorageStatic.removeItem('IdRecolhaDetail');
            AsyncStorageStatic.removeItem('RecolhaEmAndamento');
            setUserToken(null);
            setIsLoading(false);
        }, 1000)
    }

    const toggleModal = () => {
        setModalSignOut(!modalSignOut)
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
                <ActivityIndicator size="large" color="#ccc" />
                <Text style={{ alignContent: "center", fontWeight: "200", fontSize: 14, top: "10px", color: color, textAlign: "center" }}>Terminando Sessão!</Text>
            </View>
        )
    }

    useEffect(() => {
        getTheme();
    })

    return (
        <View style={{ flex: 1, backgroundColor: background }} onLayout={getDataUser}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: "#ccc" }}>

                <ImageBackground source={require('../img/Paizagem.png')}
                    style={{ padding: 20, marginTop: -5, width: 300, height: 170 }} >
                    {
                        userInfoProfile != null ? (
                            <Image source={{ uri: userInfoProfile.avatar }} alt="FT..." style={{ width: 90, height: 90, borderRadius: "50%", marginBottom: 10, borderWidth: 1, borderColor: "#141414" }} />
                        ) : (
                            <View style={{ width: 90, height: 90, borderRadius: "50%", marginBottom: 10, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#141414" }} >
                                <Text>
                                    FT...
                                </Text>
                            </View>
                        )
                    }

                    <Text style={{ color: '#ccc', fontSize: 17, fontWeight: "600" }}>{
                        userInfoProfile != null ? (
                            userInfoProfile.name
                        ) :
                            (
                                "usuario..."
                            )

                    }</Text>
                </ImageBackground>

                <View style={{ flex: 1, paddingTop: 10, }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>

            <View style={{ padding: 20, backgroundColor: background }}>

                <TouchableOpacity onPress={() => { shareApp() }} style={{ paddingVertical: 15 }} >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons name="share-social-outline" size={22} color={color} />
                        <Text style={{ fontSize: 13, marginLeft: 5, color: color }}>Compartilhar App</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }} onPress={toggleModal}>
                        <Ionicons name="exit-outline" size={22} color={color} onPress={toggleModal} />
                        <Text style={{ fontSize: 13, marginLeft: 5, color: color }} onPress={toggleModal}  >Terminar Sessão</Text>
                    </View>
                </TouchableOpacity>

            </View>
            {
                modalSignOut && (
                    <>

                        <View style={{
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            width:wp(100),
                            height:hp(100),
                            position: "absolute",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",

                        }}  >
                            <View style={{
                                width: "280px",
                                height: "180px",
                                position: "absolute",
                                top: "40%",
                                left: "27%",
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
                                    {
                                        isLoading ?
                                            renderSpinner()
                                            :
                                            (<>
                                                <Text style={{ alignContent: "center", fontWeight: "700", fontSize: 16, color: color, textAlign: "center", marginTop: 15, letterSpacing: 0.5 }}>Terminar Sessão</Text>
                                                <Text style={{ alignContent: "center", fontWeight: "200", fontSize: 14, top: "10px", color: color, textAlign: "center" }}>Tens a Certeza que queres Terminar a Sessão?</Text>


                                                <View style={{ display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "space-between", width: "100%", padding: "8px", marginTop: "30px" }}>
                                                    <TouchableOpacity style={{ width: 100, height: "40px", alignItems: "center", borderTopWidth: 1, borderTopColor: "#ccc", padding: 10, justifyContent: "center", display: "flex", flexDirection: "row", borderColor: "#ccc" }} onPress={() => { logout() }}><Text style={{ fontWeight: "600", fontSize: 16, color: color, }}>Sim</Text><View style={{ width: "5px", height: "5px", backgroundColor: "green", borderRadius: "50%", marginTop: 7, marginLeft: 5 }}></View> </TouchableOpacity>
                                                    <TouchableOpacity style={{ width: 100, height: "40px", alignItems: "center", borderTopWidth: 1, borderTopColor: "#ccc", padding: 10, justifyContent: "center", display: "flex", flexDirection: "row", borderColor: "#ccc" }} onPress={() => { toggleModal() }}><Text style={{ fontWeight: "600", fontSize: 16, color: color, }}>Nao</Text><View style={{ width: "5px", height: "5px", backgroundColor: "red", borderRadius: "50%", marginTop: 7, marginLeft: 5 }}></View> </TouchableOpacity>
                                                </View>
                                            </>)
                                    }


                                </View>
                            </View>

                        </View>
                    </>
                )
            }

        </View>
    )
}

export default CustomDrawer