import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Entypo, AntDesign } from "@expo/vector-icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import AsyncStorageStatic from "@react-native-async-storage/async-storage";
//import MapComponent from "../../services/MapComponent";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import BASE_URL from "../../services/api";
import NetInfo from "@react-native-community/netinfo"

const Home_Chamada_Finalizada = ({ navigation }) => {

    const { background, backgroundHeader, colorRecolha, colorSlise, color } = useContext(AuthContext);

    const [recolha, setRecolhas] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    
    const loadRecolha = async () => {
        try {
            let token = await JSON.parse(await AsyncStorageStatic.getItem('userInfo'));
            token = token.token;
            let idRecolha = await AsyncStorageStatic.getItem('IdRecolhaDetail')

            const response = await axios.get(`${BASE_URL}/client/recolhas/${idRecolha}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const recolha = (response.data)
            setRecolhas(recolha)
            console.log(recolha)

        }
        catch (e) {
            console.log(`erro ao carregar os dados ${e}`)
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
    function countLetras(palavra, qtd) {
        if (palavra.length > 10) {
            return palavra.substring(0, qtd).trim() + "...";
        }
        else {
            return palavra;
        }
    }

    useEffect(() => {
        loadRecolha();

        const unsubscribe = NetInfo.addEventListener(state => {
            console.log('Connection type', state.type);
            console.log('Is connected?', state.isConnected);
            let res = state.isConnected;
            setIsConnected(state.isConnected);
            if (res == true) {
                loadRecolha();
            }
            if (res == false) {

            }
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
            }} >

                <View style={{
                    flexDirection: "row",
                    width: wp(100),
                    height: 60,
                    backgroundColor: backgroundHeader,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <TouchableOpacity style={{ position: "absolute", left: 10 }} onPress={() => { navigation.navigate('Home') }}>
                        <Entypo name="chevron-left" size={24} color="#cccccc" />
                    </TouchableOpacity>


                    <View >
                        <Text style={{
                            fontSize: "16px",
                            color: "#ccc",
                            fontWeight: "bold",
                            marginHorizontal: "auto",
                        }} >Finalizada</Text>
                    </View>

                </View >
                {
                    isConnected ? (
                        <>
                            <View style={styles.map}>
                                <Image style={styles.map} source={require('../img/image1.png')}></Image>
                                {/* <MapComponent /> */}

                            </View>


                            <View>
                                {recolha != null ? (
                                    <>
                                        <Animatable.View animation={"slideInUp"} iterationCount={1} delay={400} direction='alternate'>

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
                                                    <View>
                                                        <Image style={styles.imgUser} source={{ uri: recolha.driver.avatar }} />
                                                    </View>

                                                    <View >
                                                        <Text style={{
                                                            color: color,
                                                            fontSize: 16,
                                                            fontWeight: "bold"
                                                        }}>
                                                            {recolha.driver.name}
                                                        </Text>
                                                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>

                                                            <Text style={{
                                                                fontSize: 18,
                                                                color: color,
                                                                padding: 10
                                                            }}>
                                                                {recolha.driver.veiculo.matricula}
                                                            </Text>
                                                        </View>

                                                    </View>
                                                </View>
                                            </View>

                                        </Animatable.View>

                                        <Animatable.View animation={"slideInUp"} iterationCount={1} delay={600} direction='alternate'>

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
                                                        }}>
                                                            Distância Percorrida: {recolha.distance}
                                                        </Text>
                                                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                            <AntDesign name="clockcircle" size={20} color={color} />
                                                            <Text style={{
                                                                fontSize: 18,
                                                                color: color,
                                                                padding: 10
                                                            }}>
                                                                Duração: {recolha.duration}
                                                            </Text>
                                                        </View>

                                                    </View>
                                                </View>
                                            </View>

                                        </Animatable.View>

                                        <Animatable.View animation={"slideInUp"} iterationCount={1} delay={800} direction='alternate'>

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
                                                                countLetras(recolha.id, 20)
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
                                                </View>
                                            </View>

                                        </Animatable.View>
                                        {
                                            recolha.comment != null ?
                                                (<>
                                                    <Animatable.View animation={"slideInUp"} iterationCount={1} delay={800} direction='alternate'>

                                                        <View style={{
                                                            width: wp(95),
                                                            minHeight: 85,
                                                            height: 125,
                                                            alignSelf: "center",
                                                            backgroundColor: backgroundHeader,
                                                            borderRadius: 5,
                                                            marginTop: "5%",
                                                            borderLeftColor: "#00875F",
                                                            borderLeftWidth: 10,

                                                        }}>
                                                            <Text style={{ fontSize: 16, color: color, paddingLeft: 20, paddingTop: 10 }}>Comentário</Text>
                                                            <View style={{ padding: 20, overflow: "scroll", height: 80 }}>
                                                                <Text style={{
                                                                    fontSize: 14,
                                                                    color: color,
                                                                    textAlign: "justify",

                                                                }}>
                                                                    {recolha.comment}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </Animatable.View>
                                                </>)
                                                :
                                                null
                                        }
                                    </>)
                                    :
                                    (<>
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
                                            <Text style={{ alignContent: "center", fontWeight: "200", fontSize: 10, top: "10px", color: color, textAlign: "center" }}>Carregando os Dados!</Text>
                                        </View>
                                    </>)
                                }
                            </View>
                        </>)
                        :
                        (
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
                                            <Text style={{ alignContent: "center", fontWeight: "700", fontSize:10, color: color, textAlign: "center", letterSpacing: 0.5 }}>Erro de Conexão</Text>
                                            <Text style={{ alignContent: "center", fontWeight: "200", fontSize: 8, top: "10px", color: color, textAlign: "center" }}>Verifique a sua ligação a internet e tente novamente!</Text>
                                        </View>
                                    </View>
                                </View>
                            </>
                        )
                }


            </View>



            <View style={{
                flex: 0,
                fontSize: 14,
                alignSelf: "center",
                bottom: 40
            }}>
                <Text style={{ color: colorSlise }}>Dados Sincronizados</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    map: {
        width: "98%",
        height: 200,
        alignSelf: "center"
    },
    nomeUser: {
        color: "white",
        fontSize: 15
    },
    imgUser: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
    },
    matricula: {
        fontSize: 18,
        color: "#cccccc"
    },
    box1: {
        width: 40,
        height: 40,
        backgroundColor: "#29292E",
        borderRadius: 25,
        margin: "auto"
    },
    textLoc: {
        color: "white",
        marginLeft: 5
    },
    textLoc2: {
        marginLeft: 4,
        color: "#ccc"
    },
});

export default Home_Chamada_Finalizada;