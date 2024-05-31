import "react-native-gesture-handler";
import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import Mukumba from "../mukumba/index";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
//import { ScrollView } from "react-native-gesture-handler";
//import { Ionicons, Entypo, AntDesign, Feather } from "@expo/vector-icons";
import { MotiView } from "@motify/components";
import { Easing } from "react-native-reanimated";
import * as Animatable from 'react-native-animatable';
import { AuthContext } from "../../context/AuthContext";
import AsyncStorageStatic from "@react-native-async-storage/async-storage";
//import {Ionicons, AntDesign, Feather} from "@expo/vector-icons";
import { Feather, AntDesign, Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
//import {} from '@react-native-community/n'
import { Plus, X, AlignJustify, Trash2 } from 'lucide-react-native'
import NetInfo from "@react-native-community/netinfo"
import axios from "axios";
import BASE_URL from "../../services/api";

const Home = ({ navigation }) => {

    const { getTheme, background, backgroundHeader, color, colorRecolha,quantidadeRecolhasCanceladas, setQuantidadeRecolhasCanceladas, setRecEmAndamento, verificarRecolha, setRecolhas, setColorBtn1, setColorBtn2, backgroundBtn, colorBtnCall, modalComment, setModalComment, loadRecolha, emAndamento, callCollection, container, textMain, recolhas, icon, setIcon, call, colorBtn2, colorBtn1, colorAnimation, getDataUser, userInfoProfile, recEmAndamento, setDisabled, disabled } = useContext(AuthContext);

    const [nameFilial, setNameFilial] = useState(null);

    const [isConnected, setIsConnected] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const hour = new Date().getHours();

    let i = 1

    const modalHour = (
        <>
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
                        <Text style={{ alignContent: "center", fontWeight: "700", fontSize: 16, color: color, textAlign: "center", letterSpacing: 0.5 }}>Indisponivel!</Text>
                        <Text style={{ alignContent: "center", fontWeight: "200", fontSize: 14, top: "10px", color: color, textAlign: "center" }}>Indisponivel pedir fazer a recolha do seu Lixo nesse horário as solicitações só podem ser feitas das 6 AM as 17 PM!</Text>
                    </View>
                </View>
            </View>
        </>
    )

    function seeRecolha(idRecolha) {
        AsyncStorageStatic.setItem('IdRecolhaDetail', idRecolha)
        navigation.replace('ChamadaFinalizada')
    }

    function countLetras(palavra, qtd) {
        if (palavra.length > 10) {
            return palavra.substring(0, qtd).trim() + "...";
        }
        else {
            return palavra;
        }
    }

    function formatDate(isoDataString) {
        const date = new Date(isoDataString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    }

    const getLocation = async () => {
        let location = await AsyncStorageStatic.getItem('userInfo');
        location = JSON.parse(location)
        location = location.user.filial.name
        setNameFilial(location)
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
                <ActivityIndicator style={{ marginTop: 130 }} size="large" color="#ccc" />
            </View>
        )
    }

    const getRecolha = async () => {
        setIsLoading(true)
        setColorBtn2("#00875F")
        setColorBtn1('#7C7C8A')

        try {

            const token = await AsyncStorageStatic.getItem('userToken');

            const response = await axios.get(`${BASE_URL}/client/recolhas/finalizadas`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })

            const recolhas = response.data;
            setRecolhas(recolhas)
            AsyncStorageStatic.setItem('recolhas', JSON.stringify(recolhas));
            setTimeout(() => {
                setIsLoading(false)
            }, 500)

            loadRecolha();


        } catch (error) {
            setIsLoading(false)
            console.log(error)
            loadRecolha();

        }

    }

    // const verificarRecolhaEmAndamento = async () => {
    //     console.log('cheguei')
    //     const result = await AsyncStorageStatic.getItem('RecolhaEmAndamento');

    //     const recolha = await  JSON.parse(AsyncStorageStatic.getItem('RecolhaEmAndamentoDados'));

    //     setIcon('close');
    //     setRecolhas(null);

    //     setRecEmAndamento(
    //         <>
    //             <Animatable.View animation={"slideInUp"} iterationCount={1} delay={400} direction='alternate'>
    //                 <TouchableOpacity key={recolha.id} >
    //                     <View style={{
    //                         width: wp(95),
    //                         height: 85,
    //                         alignSelf: "center",
    //                         backgroundColor: backgroundHeader,
    //                         borderRadius: 5,
    //                         marginTop: "5%",
    //                         flexDirection: "row",
    //                         alignItems: "center",
    //                         borderLeftColor: "#FBA94C",
    //                         borderLeftWidth: 10
    //                     }} key={recolha.id}>

    //                         <View style={{ display: "flex", flexDirection: "row", padding: 20, alignItems: "center" }}>
    //                             <View>
    //                                 <Image style={{
    //                                     width: 50,
    //                                     height: 50,
    //                                     marginRight: 10,
    //                                     borderRadius: 25,
    //                                 }} source={{ uri: recolha.avatar}} />
    //                             </View>

    //                             <View >
    //                                 <Text style={{
    //                                     color: color,
    //                                     fontSize: 16,
    //                                     fontWeight: "bold"
    //                                 }}>
    //                                     {recolha.name}
    //                                 </Text>
    //                                 <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>

    //                                     <Text style={{
    //                                         fontSize: 18,
    //                                         color: color,
    //                                         padding: 10
    //                                     }}>
    //                                         {recolha.tel}
    //                                     </Text>
    //                                 </View>

    //                             </View>
    //                         </View>
    //                         <View style={{ right: -85 }}>
    //                             <MaterialCommunityIcons name="timer-sand" size={24} color={"#FBA94C"} />
    //                         </View>
    //                     </View>
    //                 </TouchableOpacity>
    //             </Animatable.View>
    //         </>
    //     )



    //     return result

    // }


    useEffect(() => {
        getTheme();
        getLocation();

        const unsubscribe = NetInfo.addEventListener(state => {
            console.log('Connection type', state.type);
            console.log('Is connected?', state.isConnected);
            let res = state.isConnected;

            if (res == true) {
                if (recEmAndamento == null) {
                    setIsLoading(true);
                    getRecolha();
                    setDisabled(false);
                }

                if (recEmAndamento != null) {

                    setDisabled(true);
                    emAndamento();
                }
                // if (recEmAndamento == null) {
                //     setDisabled(false);
                // }

            }

            if (res == false) {

                setDisabled(true)
            }
            setIsConnected(state.isConnected);

        });

        if (recEmAndamento != null) {
            setDisabled(true);
            emAndamento();
        }
        if (recEmAndamento == null) {
            // if (hour >= 6 && hour <= 17) {
            setDisabled(false);
            //}

        }


        return () => {
            unsubscribe();
        }
    }, [])


    return (

        <>
            <View style={{
                flex: 1,
                backgroundColor: background,
                overflow: "hidden",
                position: "absolute"
            }} >

                <View style={{
                    width: wp(100),
                    height: 95,
                    backgroundColor: backgroundHeader,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#ccc"
                }}>
                    <View style={styles.container2}>
                        <View >
                            <Text style={{ marginLeft: 2, color: "#00875F", fontWeight: "bold", fontSize: 22, letterSpacing: 0.3 }}>Mukumba</Text>
                        </View>

                        <View style={styles.region} >
                            <Image style={styles.imgRegion} source={require('../img/Component2.jpg')} />
                            <Text style={styles.textLocation} onPress={getLocation}>{
                                nameFilial != null ?
                                    countLetras(nameFilial, 8)
                                    :
                                    "Location"
                            }</Text>

                        </View>

                    </View>

                    <View style={styles.btnWithout} >
                        <TouchableOpacity onPress={() => { navigation.openDrawer() }} >
                            <Ionicons name="menu-outline" size={24} color={color} onPress={() => { navigation.openDrawer() }} />
                        </TouchableOpacity>
                    </View>

                </View >

                <View style={{ width: wp(100), height: hp(90), backgroundColor: background }}>

                    {
                        modalComment
                    }
                    <View style={{
                        width: wp(100),
                        height: "auto",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 10,
                    }}>
                        <Text style={{
                            color: color,
                            fontSize: 16,
                            fontWeight: "bold",
                            textAlign: "left"
                        }}>SOLICITAÇÕES</Text>

                    </View>
                    <View style={styles.containerBtn}>
                        <TouchableOpacity style={{
                            width: wp(45),
                            height: 40,
                            borderWidth: 1,
                            borderStyle: "solid",
                            borderColor: colorBtn1,
                            justifyContent: "center",
                            backgroundColor: backgroundBtn,
                            borderRadius: 5,
                        }} onPress={() => {
                            setColorBtn1("#FBA94C")
                            setColorBtn2('#7C7C8A')
                            emAndamento()
                        }}>
                            <Text style={{
                                color: colorBtn1,
                                alignSelf: "center",
                                justifyContent: "center",
                                fontSize: 12,
                                fontWeight: '600'
                            }}>EM ANDAMENTO</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            width: wp(45),
                            height: 40,
                            borderWidth: 1,
                            borderStyle: "solid",
                            borderColor: colorBtn2,
                            backgroundColor: backgroundBtn,
                            justifyContent: "center",
                            borderRadius: 5,
                        }} onPress={() => {
                            setColorBtn2("#00875F")
                            setColorBtn1('#7C7C8A')
                            getRecolha();
                        }}>
                            <Text style={{
                                color: colorBtn2,
                                alignSelf: "center",
                                justifyContent: "center",
                                fontSize: 12,
                                fontWeight: '600'
                            }}>FINALIZADOS</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.Main}>

                        {

                            isConnected ? (

                                <ScrollView>

                                    <View style={{ width: wp(100), height: "auto", alignContent: "center", alignItems: "center" }}>
                                        {

                                            recolhas != null ?
                                                (
                                                    <View>
                                                        {
                                                            isLoading == false ?
                                                                (
                                                                    recolhas.map((recolha) => {
                                                                        i = i + 1;
                                                                        return (
                                                                            <Animatable.View animation={"slideInUp"} iterationCount={1} delay={400 * i} direction='alternate'>
                                                                                <TouchableOpacity key={recolha.id} onPress={() => { seeRecolha(recolha.id) }} >
                                                                                    <View style={{
                                                                                        width: wp(95),
                                                                                        height: 85,
                                                                                        alignSelf: "center",
                                                                                        backgroundColor: backgroundHeader,
                                                                                        borderRadius: 5,
                                                                                        marginTop: "5%",
                                                                                        flexDirection: "row",
                                                                                        alignItems: "center",
                                                                                        borderLeftColor: "#00875F",
                                                                                        borderLeftWidth: 10
                                                                                    }} key={recolha.id}>

                                                                                        <View style={{ display: "flex", flexDirection: "row", padding: 20, alignItems: "center" }}>

                                                                                            <View >
                                                                                                <Text style={{
                                                                                                    color: color,
                                                                                                    fontSize: 16,
                                                                                                    fontWeight: "bold"
                                                                                                }}>RECOLHA: {
                                                                                                        (recolha.id).split('-')[0] + "..."
                                                                                                    }
                                                                                                </Text>
                                                                                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                                                                    <AntDesign name="clockcircle" size={20} color={color} />
                                                                                                    <Text style={{
                                                                                                        fontSize: 18,
                                                                                                        color: color,
                                                                                                        padding: 10
                                                                                                    }}>{formatDate(recolha.createdAt)}
                                                                                                    </Text>
                                                                                                </View>

                                                                                            </View>

                                                                                            <View style={{ right: -100 }}>
                                                                                                <AntDesign name="checkcircle" size={24} color={color} />
                                                                                            </View>
                                                                                        </View>
                                                                                    </View>
                                                                                </TouchableOpacity>
                                                                            </Animatable.View>
                                                                        )

                                                                    })
                                                                )
                                                                :
                                                                renderSpinner()

                                                        }
                                                    </View>
                                                )
                                                :
                                                (
                                                    <View style={{ alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>

                                                        {
                                                            recEmAndamento == null ?
                                                                (
                                                                    <>
                                                                        <View style={{ alignSelf: "center", alignItems: 'center', marginVertical: hp(20) }}>
                                                                            <View style={[{
                                                                                width: 80,
                                                                                height: 80,
                                                                                borderRadius: 100,
                                                                                backgroundColor: colorAnimation,
                                                                                alignSelf: "center",
                                                                            }, styles.center]}>
                                                                                {container}
                                                                                {call}
                                                                            </View>
                                                                        </View>
                                                                        <Text style={styles.textMain}>
                                                                            {textMain}
                                                                        </Text>
                                                                    </>)
                                                                :
                                                                recEmAndamento
                                                        }
                                                    </View>)
                                        }
                                    </View>
                                </ScrollView>)
                                :
                                (<>
                                    <View style={{
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        position: "absolute",
                                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                                        justifyContent: "center",
                                        alignItems: "center"

                                    }}  >


                                        <View style={{
                                            width: "280px",
                                            height: "110px",
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
                                                <Text style={{ alignContent: "center", fontWeight: "700", fontSize: 16, color: color, textAlign: "center", letterSpacing: 0.5 }}>Erro de Conexão</Text>
                                                <Text style={{ alignContent: "center", fontWeight: "200", fontSize: 14, top: "10px", color: color, textAlign: "center" }}>Verifique a sua ligação a internet e tente novamente!</Text>
                                            </View>
                                        </View>
                                    </View>
                                </>)
                        }

                    </View>
                </View>
                <View style={styles.Btns} >

                    <TouchableOpacity
                        disabled={disabled}
                        style={{
                            width: 70,
                            height: 70,
                            borderStyle: "solid",
                            borderRadius: 50,
                            backgroundColor: colorBtnCall,
                            justifyContent: "center",
                            marginBottom: hp(10),
                            position: "absolute",
                            shadowRadius: 10,
                            shadowColor: "#ccc",
                            shadowOpacity: 0.5,
                        }} onPress={() => {
                            if (hour >= 6 && hour <= 17) {
                                if (icon == 'plus') {
                                    callCollection("callColection")
                                }
                                if (icon == 'close') {
                                     setQuantidadeRecolhasCanceladas(()=>{quantidadeRecolhasCanceladas + 1});
                                    callCollection("cancelCallColection");

                                }
                            }
                            if (hour < 6 && hour > 17) {
                                setModalComment(<>
                                    <View style={{
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        position: "absolute",
                                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                                        justifyContent: "center",
                                        alignItems: "center"

                                    }}  >


                                        <View style={{
                                            width: "280px",
                                            height: "120px",
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
                                                <Text style={{ alignContent: "center", fontWeight: "700", fontSize: 10, color: color, textAlign: "center", letterSpacing: 0.5 }}>Fora de Hora</Text>
                                                <Text style={{ alignContent: "center", fontWeight: "200", fontSize: 8, top: "10px", color: color, textAlign: "center" }}>Neste horário não temos motoristas disponiveis!</Text>
                                                <TouchableOpacity onPress={() => { setModalComment(false) }} style={{ width: "100%", borderTopColor: "#ccc", borderTopWidth: 1 }}>
                                                    <Text style={{ alignContent: "center", fontWeight: "700", fontSize: 10, color: color, textAlign: "center", letterSpacing: 0.5 }}>OK</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </>);
                            }
                        }}>

                        <View style={[
                            {
                                borderRadius: 50,
                                alignSelf: "center",
                                backgroundColor: "#00875F",
                                position: "absolute"
                            }, styles.center]}>
                            {
                                icon == 'plus' ?
                                    <Plus size={35} color="white" />
                                    :
                                    <X size={35} color="white" />
                            }
                        </View>
                    </TouchableOpacity>

                </View >



            </View >
        </>)
}


const styles = StyleSheet.create({
    textMain: {
        color: "#8D8D99",
        fontSize: 14,
        alignSelf: "center",
    },

    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnWithout: {
        width: 30,
        height: 40,
        alignSelf: "center",
        marginRight: 5
    },
    container2: {
        marginLeft: 5,
        padding: 5,
        justifyContent: "center"
    },
    region: {
        // width: 140,
        // height: 40,
        paddingLeft: 5,
        flexDirection: "row",
    },
    textLocation: {
        fontSize: 14,
        color: "#996DFF",
        fontWeight: 500,
        paddingTop: 5,
        paddingLeft: 2
    },
    containerBtn: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10
    },
    textMain: {
        fontSize: 18,
        color: "#7C7C8A",
        alignSelf: "center"
    },
    Main: {
        // width:wp(100),
        height: hp(70),
        //  flex:1,
        alignItems: "center",
        justifyContent: "center",
    },
    ImgMain: {
        width: 50,
        height: 50,
        alignSelf: "center",
        margin: 15
    },
    Btns: {
        position: "absolute",
        bottom: hp(20),
        right: 90
    },
    imgRegion: {
        width: 25,
        height: 25
    },
    imgWithout: {
        width: 30,
        height: 30,
    },
    imgmain0: {
        width: 50,
        height: 50,
        alignSelf: "center",
    },
    btnAdd: {
        width: 40,
        height: 40,
        alignSelf: "center",

    },
    center: {
        alignItems: "center",
        justifyContent: "center"
    }
})

export default Home;
