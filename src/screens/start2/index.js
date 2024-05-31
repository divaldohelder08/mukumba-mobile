import React, { useEffect, useContext } from "react";
import { View, Text, StyleSheet} from "react-native";
import * as Animatable from 'react-native-animatable';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AuthContext } from "../../context/AuthContext";

export default function Start({ navigation }) {
const { getTheme, isLoading, background, backgroundHeader, colorSlise, color, colorText, colorTextSlide } = useContext(AuthContext);

useEffect(() => {
    getTheme();
    setTimeout(() => {
        navigation.replace('Home')
    }, 3000)
}, [])
return (

    // <View style={{

    //     backgroundColor: background,
    //     width: wp(100),
    //     Height: hp(100),
    //     maxHeight: hp(100),
    //     minHeight: hp(100),
    //     overflow: "hidden"
    // }}  >
    //     {/* <Spinner  visible={isLoading} /> */}
    //     <View style={styles.logo}>
    //             <Image source={require('../img/mukumba.png')} style={{ width: 140, height: 30 }} />
    //     </View>

    //     <Text style={{
    //         color: colorText,
    //         fontSize: 12,
    //         textAlign: "center",
    //         position: "relative",
    //         marginTop: hp(9)
    //     }}>
    //         Recolha o seu  com apenas um click Sem sair de casa!
    //     </Text>

    //     <Image style={styles.imgMain} source={require('../img/ilustração.png')} />

    //     <Animatable.View animation={"slideInUp"} iterationCount={1} delay={3000} direction='alternate' style={{
    //         width: wp(103),
    //         height: hp(30),
    //         backgroundColor: colorSlise,
    //         marginTop: hp(70),
    //         borderTopRightRadius: 50,
    //         borderTopLeftRadius: 50,
    //         justifyContent: "center",
    //         position: "absolute",
    //         alignSelf: "center"
    //     }}>
    //         <View style={styles.container3}>
    //             <Text style={{
    //                 fontSize: 15,
    //                 color: colorTextSlide,
    //                 fontWeight: "700",
    //                 alignSelf: "center",
    //                 marginBottom: hp(10),
    //                 letterSpacing: -0.7
    //             }}>Seja Bem Vindo(a)!</Text>
    //         </View>
    //     </Animatable.View>

    // </View>
    <View style={{
        backgroundColor:background,
        width: wp(100),
        Height: hp(100),
        flex: 1,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center"
}}  >


    <View style={styles.view}>
        <Animatable.Image  animation={"flipInX"} delay={1000} style={styles.imgMain} source={require('../img/Logo.png')} />
        <View style={styles.logo}>
            <Animatable.View animation={"flipInY"} delay={2000}  >
                <Text style={styles.logo}>
                    Mukumba
                </Text>
            </Animatable.View>
        </View>
    </View>

</View>

)
}

const styles = StyleSheet.create({
    view:{
        display: "flex",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        marginTop:"-30%",
    },

    logo: {
        color: "#3BBF6C",
        fontWeight: "bold",
        fontSize: 24,
        marginTop: "-20%"
    },
    imgMain: {
        width: 200,
        height: 220,
        margin:20
    }
})
