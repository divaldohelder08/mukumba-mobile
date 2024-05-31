import React, { useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Animatable from 'react-native-animatable';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AuthContext } from "../../context/AuthContext";



export default function Start({ navigation }) {

    const { getTheme, background } = useContext(AuthContext);


    useEffect(() => {
        getTheme();
        
        setTimeout(() => {
            navigation.replace('Login')
        }, 3000)
    }, [])

    return (

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
