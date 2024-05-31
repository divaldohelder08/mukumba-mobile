import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FontAwesome5, Ionicons, Entypo } from "@expo/vector-icons";
import AsyncStorageStatic from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native"
import { LineChart } from 'react-native-chart-kit';
import * as Animatable from 'react-native-animatable';
import NetInfo from "@react-native-community/netinfo"

export default function DataGrafic() {

    const navigation = useNavigation();
    const { background, backgroundHeader, color, colorSlise, colorDataGrafics, quantidadeRecolhasCanceladas, loadRecolha, text, getDataUser, userInfoProfile, recolhas } = useContext(AuthContext);
    const [quantidadeRecolhas, setQuantidadeRecolhas] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const recolhasData = [];

    const [dataRecolha, setDataRecolha] = useState([]);
    const [meses, setMeses] = useState([]);


    //let recolhas
    let i = 0;
    let qtd
    let arrayMes = [];
    let newArrayMes = [];

    const calcDataRecolha = () => {
        recolhas.map((recolha) => {
            arrayMes.push(recolha.createdAt)
        })
        setDataRecolha(arrayMes);
        getMonths(dataRecolha);
    }

    const getMonths = (datesArray) => {
        // datesArray.map(dateString => {
        //     const date = new Date(dateString);
        //    // setMeses([...meses, (date.getMonth() + 1)])
        //    newArrayMes.push(date.getMonth() + 1)

        //  });

        console.log(datesArray)

    };

    //useEffect(()=>{
    //loadRecolha()

    //     const fetchData = async()=>{
    //      recolhas = await AsyncStorageStatic.getItem('recolhas')
    //      recolhas = JSON.parse(recolhas)
    //      setQuantidadeRecolhas(recolhas.length)

    //     //  recolhas.map((recolha) => {
    //     //     recolhasData.push({ dataHoraRecolha: recolha.dataHoraRecolha })
    //     // })
    //     }
    //     // console.log(recolhasData)
    //     fetchData();
    // },[recolhas])
    //  const [quantidadeRecolhas, setQuantidadeRecolhas] = useState(recolhas.length);

    const [horaMaisFrequente, setHoraMaisFrequente] = useState(null);

    const data = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
            {
                data: [20, 30, 25, 40, 45, 30, 20, 40, 50, 30, 26, 15],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Cor da linha
                strokeWidth: 2 // Largura da linha

            }
        ]
    };


    useEffect(() => {
        // getRecolha();
        getDataUser();
        loadRecolha();
        recolhas ? setQuantidadeRecolhas(recolhas.length) : setQuantidadeRecolhas('calculando...')


        recolhas ?
            recolhas.map((recolha) => {
                recolhasData.push({ dataHoraRecolha: recolha.dataHoraRecolha })
            })
            : false

        const unsubscribe = NetInfo.addEventListener(state => {
            console.log('Connection type', state.type);
            console.log('Is connected?', state.isConnected);
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        }
    }, [quantidadeRecolhas])



    const ChartComponent = () => {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                alignSelf: "center",
            }}>
                <LineChart
                    data={data}
                    width={wp(95)} // Largura do gráfico
                    height={220} // Altura do gráfico
                    chartConfig={{
                        backgroundColor: '#ccc',
                        backgroundGradientFrom: 'transparent',
                        backgroundGradientTo: 'transparent',
                        decimalPlaces: 0, // Casas decimais
                        // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Cor do texto
                        color: (opacity = 1) => `${color}`, // Cor do texto
                        labelColor: (opacity = 1) => `${color}`, // Cor das labels
                        //labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Cor das labels
                        propsForDots: {
                            r: '6',
                            strokeWidth: '2',
                            stroke: '#ccc',
                        },
                    }}
                    bezier // Estilo da linha (Bezier)
                    style={{
                        marginVertical: 30,
                        borderRadius: 16,

                    }}
                />
            </View>
        );
    };


    //funcao para calcular a frequenciaHoraria
    const calcularFrequenciaHoraria = (recolhasData) => {
        let array = [];
        const contagem = {};

        recolhasData.map((recolha) => {
            array.push(parseInt(recolha.dataHoraRecolha[11] + "" + recolha.dataHoraRecolha[12]));
        });

        array.forEach(hora => {
            contagem[hora] = (contagem[hora] || 0) + 1;
        });

        let horaMaisFrequente;
        let frequenciaMaisAlta = 0;

        for (const hora in contagem) {
            if (contagem[hora] > frequenciaMaisAlta) {
                frequenciaMaisAlta = contagem[hora];
                horaMaisFrequente = hora;
            }
        }

        return horaMaisFrequente;
    };

    //funcao para apresentar a frequenciaHoraria
    const ResultadoFrequenciaHoraria = ({ recolhasData }) => {
        const [horaMaisFrequente, setHoraMaisFrequente] = useState(null);

        useEffect(() => {
            // Chamando a função quando o componente for montado
            const horaMaisFrequenteCalculada = calcularFrequenciaHoraria(recolhasData);
            setHoraMaisFrequente(horaMaisFrequenteCalculada);
        }, [recolhasData]);

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {
                    horaMaisFrequente != undefined ?
                        (<Text>{horaMaisFrequente} horas</Text>)
                        :
                        (<Text>calculando...</Text>)
                }
            </View>
        );
    };



    return (
        <View style={{ flex: 1, backgroundColor: background }} onLayout={() => {
            calcDataRecolha()
        }} >
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
                    textAlign: "center"

                }}>Controle</Text>
            </View>

            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                {
                    isConnected ?
                        (<>
                            <View style={{ marginRight: wp(12) }}>
                                <ChartComponent />
                            </View>

                            <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>

                                <Animatable.View animation={"flipInX"} delay={400} style={{ width: "95%", height: "50px", borderWidth: 1, borderRadius: "10px", borderColor: color, backgroundColor: "transparent", shadowColor: "#ccc", marginBottom: "15px", display: "flex", flexDirection: "row", alignItems: "center" }} >
                                    <Text style={{ color: color, fontSize: "14px", padding: 10, textAlign: "left" }}>Recolhas Total:</Text>
                                    {/* <Text style={{ color: "#996DFF" }}>{quantidadeRecolhas }</Text> */}
                                    <Text style={{ color: colorDataGrafics, fontWeight: "bold" }}>{quantidadeRecolhas}</Text>
                                </Animatable.View>

                                <Animatable.View animation={"flipInX"} delay={800} style={{ width: "95%", height: "50px", borderWidth: 1, borderRadius: "10px", borderColor: color, backgroundColor: "transparent", shadowColor: "#ccc", marginBottom: "15px", display: "flex", flexDirection: "row", alignItems: "center" }} >
                                    <Text style={{ color: color, fontSize: "14px", padding: 10, textAlign: "left" }}>Recolhas Canceladas:</Text>
                                    <Text style={{ color: colorDataGrafics, fontWeight: "bold" }}>{quantidadeRecolhasCanceladas}</Text>
                                </Animatable.View>

                                <Animatable.View animation={"flipInX"} delay={1200} style={{ width: "95%", height: "50px", borderWidth: 1, borderRadius: "10px", borderColor: color, backgroundColor: "transparent", shadowColor: "#ccc", marginBottom: "15px", display: "flex", flexDirection: "row", alignItems: "center" }} >
                                    <Text style={{ color: color, fontSize: "14px", padding: 10, textAlign: "left" }}>Frequencia Horaria:</Text>
                                    <Text style={{ color: colorDataGrafics, fontWeight: "bold" }}><ResultadoFrequenciaHoraria recolhasData={recolhasData} /></Text>
                                </Animatable.View>

                                <Animatable.View animation={"flipInX"} delay={1600} style={{ width: "95%", height: "50px", borderWidth: 1, borderRadius: "10px", borderColor: color, backgroundColor: "transparent", shadowColor: "#ccc", marginBottom: "15px", display: "flex", flexDirection: "row", alignItems: "center" }} >
                                    <Text style={{ color: color, fontSize: "14px", padding: 10, textAlign: "left" }}>Estado Actual:</Text>
                                    <Text style={{ color: colorDataGrafics, fontWeight: "bold" }}>{userInfoProfile.status}</Text>
                                </Animatable.View>
                            </View>
                        </>)
                        : (<>
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
    )
}
