import React, { createContext, useState, useEffect, useRef } from 'react';
import AsyncStorageStatic from "@react-native-async-storage/async-storage";
import axios from 'axios';
import BASE_URL from '../services/api';
import { View, Text, Image, TextInput, TouchableOpacity, Modal, StyleSheet, Share } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Ionicons, Entypo, AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "@motify/components";
import { Easing } from "react-native-reanimated";
//import { Entypo } from 'react-native-vector-icons/Entypo'
import * as Animatable from 'react-native-animatable';
import moment from 'moment'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [userInfoProfile, setUserInfoProfile] = useState(null);
    const [totalRecolhas, setTotalRecolhas] = useState(null);
    const [recolhas, setRecolhas] = useState(null);
    const [recEmAndamento, setRecEmAndamento] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [verificarRecolha, setVerificarRecolha] = useState(null);
    const [verifySetInterval, setVerifySetInterval] = useState(true);
    const [quantidadeRecolhasCanceladas, setQuantidadeRecolhasCanceladas] = useState(0)


    const textInputRef = useRef(null);
    let array = []
    let verify = false;

    //cores do tema
    const [background, setBackground] = useState("#141414");
    const [backgroundHeader, setBackgroundHeader] = useState('#202024');
    const [color, setColor] = useState('#E1E1E6');
    const [colorSlise, setcolorSlise] = useState('#737373');
    const [colorText, setColorText] = useState('#737373');
    const [text, setText] = useState('#737373');
    const [colorBtnLogin, setcolorBtnLogin] = useState('#00875F');
    const [colorTextSlide, setColorTextSlide] = useState('#202024');
    const [colorRecolha, setColorRecolha] = useState('#4A735F');
    const [backgroundBtn, setBackgroundBtn] = useState('#202024');
    const [backgroundBtnDrawer, setBackgroundBtnDrawer] = useState('#FBA94C');
    const [colorBtnCall, setColorBtnCall] = useState('#00875F');
    const [backgroundTabBottom, setBackgroundTabBottom] = useState('#202024');
    const [colorLogotipo, setColorLogotipo] = useState('#3BBF6C');

    const [modalComment, setModalComment] = useState(null)

    //states do efeito wave do button etc...
    const [container, setContainer] = useState();
    const [textMain, setTextMain] = useState('');
    const [icon, setIcon] = useState('plus');
    const [call, setCall] = useState(null)
    const [colorBtn2, setColorBtn2] = useState('#00875F');
    const [colorBtn1, setColorBtn1] = useState('#7C7C8A');
    const [colorAnimation, setColorAnimation] = useState('transparent');
    const [colorDataGrafics, setColorDataGrafics] = useState('#996DFF');


    const auxModalOk = async (textInputRef, setTextoInput) => {

        const valueInput = textInputRef.current?.value;

        console.log(valueInput);
        if (valueInput != null && valueInput.trim() !== '') {
            try {
                const idRecolha = await AsyncStorageStatic.getItem('RecolhaEmAndamento');
                const token = await AsyncStorageStatic.getItem('userToken');

                const response = await axios.post(
                    `${BASE_URL}/client/recolhas/${idRecolha}/update-comment`,
                    { comment: valueInput },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                setTextoInput('')
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log('Comentário não pode estar vazio');
        }

        // functionUnsetAnimation(); // Supondo que você tenha essa função definida em algum lugar
    };

    const InputToggle = () => {
        const [mostrarInput, setMostrarInput] = useState(false);
        const [textoInput, setTextoInput] = useState('');
        const textInputRef = useRef(null);


        return (
            <View style={{ width: '100%' }}>
                <TouchableOpacity
                    style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', backgroundColor: backgroundHeader, padding: 10, borderRadius: "10px", }}
                    onPress={() => setMostrarInput(!mostrarInput)}
                >
                    <Text style={{ fontSize: 14, color: '#ccc', textAlign: 'left' }}>Comentário</Text>
                    <Ionicons name="chevron-down" size={24} color="#ccc" />
                </TouchableOpacity>
                {mostrarInput && (
                    <TextInput
                        ref={textInputRef}
                        value={textoInput}
                        onChangeText={setTextoInput}
                        placeholder="Insira um Comentário"
                        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, borderRadius: "10px", marginTop: 10, color: 'gray', backgroundColor: backgroundHeader }}
                        placeholderTextColor="gray"
                    />
                )}
                <View style={{ display: "flex", alignContent: "center", width: "100%", padding: "8px", marginTop: "15px", justifyContent: "center", alignItems: "center" }} >
                    <TouchableOpacity style={{ width: "120px", height: "50px", borderWidth: 1, borderStyle: 'solid', borderRadius: "10px", justifyContent: "center", alignItems: "center", borderColor: "#ccc" }}
                        onPress={() => {
                            auxModalOk(textInputRef, setTextoInput)
                            setModalComment(false);

                        }}
                    ><Text style={{ fontSize: "14", fontWeight: "600", color: "#ccc" }} >OK</Text></TouchableOpacity>
                </View>

            </View>
        );
    }

    let theme;

    const getLixo = () => {

        const recolhaId = recolhas.ultima.recolha
        useEffect(() => {

            const fetchData = async () => {
                try {
                    //pegar a recolha pelo id
                    const response = await axios.get(`${BASE_URL}/recolhas/${recolhaId}`)


                    if (response.data.recolha) { //condicao para apresentar a modal depois da recolha ser finalizada pelo motorista
                        setModalComment(
                            <>
                                <View style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Modal
                                        animationType="slide"
                                        transparent={true}
                                        visible={true}>
                                        <View style={{
                                            flex: 1,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: 'rgba(0,0,0,0.5)'
                                        }}>
                                            <View style={{ width: "330px", height: "auto", padding: "10px", borderRadius: "10px", backgroundColor: background, alignItems: "center" }}>
                                                <View style={{ width: "100%", height: "auto", alignItems: "center", justifyContent: "center" }}>
                                                    <Text style={{ color: "#ccc", fontSize: "16", margin: "10px", fontWeight: "bold" }}>RECOLHA FINALIZADA</Text>
                                                </View>
                                                <View style={{ width: "95%", height: "60px", borderRadius: "10px", backgroundColor: backgroundHeader, display: "flex", flexDirection: "row", alignItems: "center", padding: "10px", marginTop: "15px" }}>
                                                    <View>
                                                        <Image style={{ width: "50px", height: "50px", borderWidth: 1, borderColor: "#ccc", borderRadius: "50%" }} />
                                                    </View>
                                                    <View>
                                                        <Text style={{ color: "#ccc", fontSize: "14", marginLeft: "10px" }}>nome motorista</Text>
                                                        <Text style={{ color: "#ccc", fontSize: "14", marginLeft: "10px" }}>matricula</Text>
                                                    </View>
                                                </View>
                                                <View style={{ width: "95%", height: "auto", borderRadius: "10px", backgroundColor: backgroundHeader, display: "flex", flexDirection: "row", alignItems: "center", padding: "10px", marginTop: "15px" }}>
                                                    <View>
                                                        <Text style={{ color: "#ccc", fontSize: "14", marginLeft: "10px" }}>02/10/2024 16:30:49</Text>
                                                    </View>
                                                </View>
                                                <View style={{ width: "95%", height: "auto", borderRadius: "10px", backgroundColor: backgroundHeader, display: "flex", alignItems: "center", padding: "10px", marginTop: "15px" }}>
                                                    <InputToggle />
                                                </View>
                                                <View style={{ display: "flex", alignContent: "center", width: "100%", padding: "8px", marginTop: "15px", justifyContent: "center", alignItems: "center" }} >
                                                    <TouchableOpacity style={{ width: "120px", height: "50px", borderWidth: 1, borderStyle: 'solid', borderRadius: "10px", justifyContent: "center", alignItems: "center", borderColor: "#ccc" }} onPress={() => {
                                                        setModalComment(false)
                                                    }}><Text style={{ fontSize: "14", fontWeight: "600", color: "#ccc" }} >OK</Text></TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </Modal>
                                </View>
                            </>
                        )
                        auxModalOk(); //funcao para tirar os efeitos de wave do botao, icone etc...
                    }

                } catch (error) {
                    console.error("erro ao buscar os dados ", error)
                }

            }
            fetchData();

        }, [])


        setTimeout(() => {

        }, 5000)




    }

    const loadRecolha = async () => {

        const recolhas = await AsyncStorageStatic.getItem('recolhas');
        if (recolhas == '[]') {
            setTextMain('')
            setRecolhas(null)
            setCall('')
            setColorAnimation('transparent')
            setContainer(
                <>
                    <View style={{ width: 350, height: 300, }}>
                        <View style={styles.ImgMain}>
                            <Image style={styles.imgmain0} source={require('../screens/img/Component1.png')} />
                        </View>
                        <Text style={styles.textMain}>Você não tem histórico de Recolhas!</Text>
                    </View>
                </>)


        }

    }

    const functionSetAnimation = async () => {

        setColorBtn2('#7C7C8A')
        setColorBtn1('#FBA94C')

        setRecolhas(null);
        setTextMain('Chamando para Recolher');
        setIcon('close');
        setCall(<Feather name="phone-outgoing" size={22} color="#fff" />);

        setContainer(
            [...Array(3).keys()].map((index) => {

                return (
                    <MotiView
                        from={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 0, scale: 5 }}
                        transition={{
                            type: 'timing',
                            duration: 2000,
                            easing: Easing.out(Easing.ease),
                            delay: index * 400,
                            repeatReverse: false,
                            loop: true,
                        }}
                        key={index}
                        style={[StyleSheet.absoluteFillObject, {
                            width: 80,
                            height: 80,
                            borderRadius: 100,
                            backgroundColor: colorBtnCall,
                            alignSelf: "center",
                        }]}

                    />
                );
            })
        );

        let token1 = await JSON.parse(await AsyncStorageStatic.getItem('userInfo'));
        token1 = token1.token;
        let response;
        try {
            response = await axios.post(`${BASE_URL}/client/recolhas`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token1}`
                    }
                }
            );
            if (response.status == 200) {
                const recolha = response.data;

                setVerificarRecolha(recolha.id)

                AsyncStorageStatic.setItem('RecolhaEmAndamento', recolha.id);

                setTimeout(() => {

                    setRecEmAndamento(
                        <>
                            <Animatable.View animation={"slideInUp"} iterationCount={1} delay={400} direction='alternate'>
                                <TouchableOpacity key={recolha.id} >
                                    <View style={{
                                        width: wp(95),
                                        height: 85,
                                        alignSelf: "center",
                                        backgroundColor: backgroundHeader,
                                        borderRadius: 5,
                                        marginTop: "5%",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        borderLeftColor: "#FBA94C",
                                        borderLeftWidth: 10
                                    }} key={recolha.id}>

                                        <View style={{ display: "flex", flexDirection: "row", padding: 20, alignItems: "center" }}>
                                            <View>
                                                <Image style={{
                                                    width: 50,
                                                    height: 50,
                                                    marginRight: 10,
                                                    borderRadius: 25,
                                                }} source={{ uri: recolha.driver.avatar }} />
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
                                                        {recolha.driver.tel}
                                                    </Text>
                                                </View>

                                            </View>
                                        </View>
                                        <View style={{ right: -85 }}>
                                            <MaterialCommunityIcons name="timer-sand" size={24} color={"#FBA94C"} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Animatable.View>
                        </>
                    )
                    setDisabled(true);
                    controlStatus();
                    // functionUnsetAnimation();
                }, 10000)

            }

            if (response.status != 200) {
                setRecEmAndamento(
                    <>
                        <View style={{
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            position: "relative",
                            flex: 1,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
    
                        }}  >
    
    
                            <View style={{
                                width: "280px",
                                height: "115px",
                                position: "absolute",
                                top: "40%",
                                left: "5%",
                                transform: [
                                    { translateX: -50 },
                                    { translateY: -50 },
                                ],
                                backgroundColor: backgroundHeader,
                                borderRadius: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                marginTop: 150,
                                paddingTop: 20
    
                            }}>
                                <View style={{ padding: 20, width: "255px" }}>
                                    <Text style={{ alignContent: "center", fontWeight: "700", fontSize: 16, color: color, textAlign: "center", letterSpacing: 0.5 }}>Indisponibilidade</Text>
                                    <Text style={{ alignContent: "center", fontWeight: "200", fontSize: 14, top: "10px", color: color, textAlign: "center" }}>{response.data}</Text>
                                    <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                                        <TouchableOpacity onPress={() => {
                                            setRecEmAndamento(null);
    
                                            setIcon('plus');
                                            setTextMain('')
                                            setCall('')
                                            setColorAnimation('transparent')
                                            setContainer(
                                                <View style={{ width: 350, height: 300, }}>
                                                    <View style={styles.ImgMain}>
                                                        <Image style={styles.imgmain0} source={require('../screens/img/Component1.png')} />
                                                    </View>
                                                    <Text style={styles.textMain}>Você não tem recolha em Andamento!</Text>
                                                </View>)
    
                                        }} style={{ padding: 10, marginTop: 10 }}>
                                            <Text style={{ color: color, fontSize: 15 }}>OK</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </>
                )
            }
        } catch (error) {
            console.log(error)


            setRecEmAndamento(
                <>
                    <View style={{
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        position: "relative",
                        flex: 1,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",

                    }}  >


                        <View style={{
                            width: "280px",
                            height: "115px",
                            position: "absolute",
                            top: "40%",
                            left: "5%",
                            transform: [
                                { translateX: -50 },
                                { translateY: -50 },
                            ],
                            backgroundColor: backgroundHeader,
                            borderRadius: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                            marginTop: 150,
                            paddingTop: 20

                        }}>
                            <View style={{ padding: 20, width: "255px" }}>
                                <Text style={{ alignContent: "center", fontWeight: "700", fontSize: 16, color: color, textAlign: "center", letterSpacing: 0.5 }}>Motoristas Indisponiveis</Text>
                                <Text style={{ alignContent: "center", fontWeight: "200", fontSize: 14, top: "10px", color: color, textAlign: "center" }}>Neste momento os motoristas estão indísponiveis!</Text>
                                <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                                    <TouchableOpacity onPress={() => {
                                        setRecEmAndamento(null);

                                        setIcon('plus');
                                        setTextMain('')
                                        setCall('')
                                        setColorAnimation('transparent')
                                        setContainer(
                                            <View style={{ width: 350, height: 300, }}>
                                                <View style={styles.ImgMain}>
                                                    <Image style={styles.imgmain0} source={require('../screens/img/Component1.png')} />
                                                </View>
                                                <Text style={styles.textMain}>Você não tem recolha em Andamento!</Text>
                                            </View>)

                                    }} style={{ padding: 10, marginTop: 10 }}>
                                        <Text style={{ color: color, fontSize: 15 }}>OK</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </>
            )
            // functionUnsetAnimation();setRecEmAndamento(null)
        }







    }

    const controlStatus = async () => {

        const token = await AsyncStorageStatic.getItem('userToken');

        const RecolhaEmAndamento = await AsyncStorageStatic.getItem('RecolhaEmAndamento')

        const fetchData = async () => {

            const response = await axios.get(`${BASE_URL}/client/recolhas/${RecolhaEmAndamento}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })

            const date = new Date(response.data.createdAt);
            const formatDate = moment(date).format('DD/MM/YYYY HH:mm:ss');

            let status = response.data.status;

            if (status == 'finalizada') {
                console.log(response.data)
                clearInterval(intervalId);
                setModalComment(
                    <>
                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={true}>
                                <View style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: 'rgba(0,0,0,0.5)'
                                }}>
                                    <View style={{ width: "330px", height: "auto", padding: "10px", borderRadius: "10px", backgroundColor: background, alignItems: "center" }}>
                                        <View style={{ width: "100%", height: "auto", alignItems: "center", justifyContent: "center" }}>
                                            <Text style={{ color: "#ccc", fontSize: "16", margin: "10px", fontWeight: "bold" }}>RECOLHA FINALIZADA</Text>
                                        </View>
                                        <View style={{ width: "95%", height: "60px", borderRadius: "10px", backgroundColor: backgroundHeader, display: "flex", flexDirection: "row", alignItems: "center", padding: "10px", marginTop: "15px" }}>
                                            <View>
                                                <Image source={{ uri: response.data.driver.avatar }} style={{ width: "50px", height: "50px", borderWidth: 1, borderColor: "#ccc", borderRadius: "50%" }} />
                                            </View>
                                            <View>
                                                <Text style={{ color: "#ccc", fontSize: "14", marginLeft: "10px" }}>{response.data.driver.name}</Text>
                                                <Text style={{ color: "#ccc", fontSize: "14", marginLeft: "10px" }}>{response.data.driver.veiculo.matricula}</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: "95%", height: "auto", borderRadius: "10px", backgroundColor: backgroundHeader, display: "flex", flexDirection: "row", alignItems: "center", padding: "10px", marginTop: "15px" }}>
                                            <View>
                                                <Text style={{ color: "#ccc", fontSize: "14", marginLeft: "10px" }}>{formatDate}</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: "100%", height: "auto", borderRadius: "10px", display: "flex", alignItems: "center", padding: "10px", marginTop: "15px" }}>
                                            <InputToggle />
                                        </View>

                                    </View>
                                </View>
                            </Modal>
                        </View>
                    </>
                )
                AsyncStorageStatic.removeItem('RecolhaEmAndamento')
                setRecEmAndamento(null);

                setIcon('plus');
                setTextMain('')
                setCall('')
                setColorAnimation('transparent')
                setContainer(
                    <View style={{ width: 350, height: 300, }}>
                        <View style={styles.ImgMain}>
                            <Image style={styles.imgmain0} source={require('../screens/img/Component1.png')} />
                        </View>
                        <Text style={styles.textMain}>Você não tem recolha em Andamento!</Text>
                    </View>)

                // await getRecolha();

            }
        }

        const intervalId = setInterval(() => {
            fetchData();
        }, 5000)








        //  auxModalOk()



    }

    const functionUnsetAnimation = async () => {
        let theme = await AsyncStorageStatic.getItem('Theme')
        if (theme == "Dark") {
            setColorBtn2('#7C7C8A')
            setColorBtn1('#FBA94C')
        }
        if (theme == "Light") {
            setColorBtn1("#00875F")
            setColorBtn2('#7C7C8A')
        }

        if (icon == 'close') {

            setRecEmAndamento(null);

            setIcon('plus');
            setTextMain('')
            setCall('')
            setColorAnimation('transparent')
            setContainer(
                <View style={{ width: 350, height: 300, }}>
                    <View style={styles.ImgMain}>
                        <Image style={styles.imgmain0} source={require('../screens/img/Component1.png')} />
                    </View>
                    <Text style={styles.textMain}>Você não tem recolha em Andamento!</Text>
                </View>)
        }
    }

    const callCollection = async (res) => {
        theme = await AsyncStorageStatic.getItem('Theme')
        if (res == "callColection") {
            if (icon == 'plus') {
                functionSetAnimation()
            }
        }

        if (res == "cancelCallColection") {
            //   setErrorHome(null)

            if (icon == 'close') {
                // setTextMain('')
                // setCall('')
                // setColorAnimation('transparent')
                // setContainer(recEmAndamento)
                functionUnsetAnimation();

            }
        }

    }

    const emAndamento = async () => {

        setColorBtn1("#FBA94C")
        setColorBtn2('#7C7C8A')
            if (recEmAndamento == null) {
                if (icon == 'plus') {
                    setTextMain('')
                    setRecolhas(null)
                    setCall('')
                    setColorAnimation('transparent')
                    setContainer(
                        <>
                            <View style={{ width: 350, height: 300, }}>
                                <View style={styles.ImgMain}>
                                    <Image style={styles.imgmain0} source={require('../screens/img/Component1.png')} />
                                </View>
                                <Text style={styles.textMain}>Você não tem recolha em Andamento!</Text>
                            </View>
                        </>)
                }
            }

            if (recEmAndamento != null) {
                setRecolhas(null);
                setRecEmAndamento(recEmAndamento);
            }

    }

    const getTheme = async () => {
        theme = await AsyncStorageStatic.getItem('Theme')
        if (theme == 'Dark') {
            setBackground("#141414")
            setBackgroundHeader("#202024")
            setColor("#ccc")
            setColorRecolha('#4A735F')
            setBackgroundBtn('#202024')
            setColorText('#737373')
            setText('#737373')
            setcolorSlise('#737373')
            setColorTextSlide('#202024')
            setBackgroundBtnDrawer('#FBA94C')
            setcolorBtnLogin("#00875F")
            setBackgroundTabBottom('#141414')
            setColorDataGrafics("#996DFF")
        }
        if (theme == 'Light') {
            setBackgroundHeader("#EAEAEA")
            setBackground("#FFFFFF")
            setColor("black")
            setColorRecolha('#EAEAEA')
            setBackgroundBtn('#fff')
            setText('#291E11')
            setColorText('#291E11')
            setcolorSlise('#00875F')
            setColorTextSlide('white')
            setBackgroundBtnDrawer('#00875F')
            setcolorBtnLogin("#291E11")
            setBackgroundTabBottom('#AAAAAA')
            setColorDataGrafics("#000000")
        }

    }

    const isLoggedIn = async () => {
        try {
            // setIsLoading(true);
            let userInfo = await AsyncStorageStatic.getItem('userInfo');
            let userToken = await AsyncStorageStatic.getItem('userToken');
            userInfo = JSON.parse(userInfo)

            if (userInfo) {
                setUserToken(userToken);
                setUserInfo(userInfo);

            }
            // setIsLoading(false);
        } catch (e) {
            console.log(`Desculpe ocorreu algum erro! ${e}`);
        }

    }

    const shareApp = async () => {
        try {
            const result = await Share.share({
                message:
                    'Enviar Aplicativo'
            })
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('Enviado via ', result.activityType);
                }
                else {
                    console.log('Enviado');
                }
            }
            else if (result.action === Share.dismissedAction) {
                console.log('Cancelado')
            }

        } catch (error) {
            console.error('Erro ao enviar app: ', error)

        }
    }

    // const getRecolha = async () => {

    //      setColorBtn2("#00875F")
    //      setColorBtn1('#7C7C8A')
    //     try {

    //         const token = await AsyncStorageStatic.getItem('userToken');

    //         const response = await axios.get(`${BASE_URL}/client/recolhas/finalizadas`, {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //                 'Content-Type': 'application/json'
    //             }
    //         })

    //         const recolhas = response.data;
    //         setRecolhas(recolhas)
    //         AsyncStorageStatic.setItem('recolhas', JSON.stringify(recolhas));

    //         loadRecolha();


    //     } catch (error) {

    //         console.log(error)

    //         loadRecolha();

    //     }

    // }

    const upDateProfile = async (avatar, name, email, tel) => {

        try {
            const token = await AsyncStorageStatic.getItem('userToken');
            const response = await axios.patch(`${BASE_URL}/client/settings/update-profile`, {
                avatar,
                name,
                email,
                tel
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }

            })
            console.log('Actualizado com sucesso')

        }
        catch (error) {
            console.log("erro ao atcualizar perfil: " + error)
        }


    }

    const getDataUser = async () => {

        try {
            const token = await AsyncStorageStatic.getItem('userToken');

            const response = await axios.get(`${BASE_URL}/client/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })

            if (response.status !== 200) {
                throw new Error('Erro ao obter os dados de usuario')
            }

            setUserInfoProfile(response.data);
            console.log(response.data);


        } catch (error) {
            console.error('Erro', error)
        }
    }

    useEffect(() => {
        isLoggedIn();
        //getRecolha();

    }, [])

    return (
        <AuthContext.Provider value={{ getTheme, getLixo, callCollection, setRecEmAndamento, emAndamento, loadRecolha, shareApp, getDataUser, upDateProfile, setUserToken, setUserInfo, setDisabled, setModalComment, setColorBtn1, setColorBtn2, setRecolhas, setIcon, quantidadeRecolhasCanceladas, setQuantidadeRecolhasCanceladas, verificarRecolha, disabled, recEmAndamento, userInfoProfile, text, container, textMain, recolhas, icon, call, colorBtn2, colorDataGrafics, colorLogotipo, colorBtn1, colorAnimation, modalComment, isLoading, userToken, userInfo, background, backgroundHeader, color, colorRecolha, backgroundBtn, colorText, colorSlise, colorTextSlide, backgroundBtnDrawer, colorBtnLogin, colorBtnCall, backgroundTabBottom }} >
            {children}
        </AuthContext.Provider>
    )
}


const styles = StyleSheet.create({

    textMain: {
        fontSize: 18,
        color: "#7C7C8A",
        alignSelf: "center"
    },

    ImgMain: {
        width: 50,
        height: 50,
        alignSelf: "center",
        margin: 15
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