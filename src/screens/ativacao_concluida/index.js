import React from "react";
import { View , Text, Image, TouchableOpacity, ScrollView, StyleSheet} from "react-native";
import Mukumba from "../mukumba/index";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import { Airplay } from 'lucide-react-native'

export default function Ativacao_concluida({navigation}){
    return(
        
        <View style={styles.body}>
            {/* <Feather name="heart" size={100} color="red" /> */}
            <Airplay  size={100} color="red" />
             
            </View>
        
    )
}
const styles = StyleSheet.create({
    body:{
      flex:1,
      backgroundColor:"#fff",
      alignItems:"center",
      justifyContent:"center"
    },
    container:{
        marginBottom:hp(5)
    },
    logo:{
        alignSelf:"center",
        padding:10
    },
    text:{
        color:"#737373",
        fontSize:12,
        textAlign:"center"
    },
    content1:{
        width:wp(80),
        height:80,
        minWidth:250,
        maxWidth:350,
        alignSelf:"flex-end",
        backgroundColor:"#333638",
        marginTop:hp(2),
        marginBottom:hp(3),
        borderRadius:50,
    },
    content2:{
        width:wp(80),
        height:80,
        minWidth:250,
        maxWidth:350,
        backgroundColor:"#333638",
        marginTop:hp(2),
        marginBottom:hp(3),
        borderRadius:50,
    },
    btnLast:{
        width:wp(55),
        height:60,
        backgroundColor:"#00875F",
        alignSelf:"center",
        borderRadius:30,
        marginTop:hp(15),
        marginBottom:hp(1),
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    textBtn:{
        color:"white",
        fontSize:16,
        alignSelf:"center",
        padding:10,
        fontWeight:"bold"
    },
    img1:{
        width:40,
        height:40,
        marginLeft:10,
        marginTop:5,
    },
    img2:{
        width:40,
        height:40,
        marginRight:10,
        marginTop:5,
        marginLeft:10
    },
    img11:{
        flexDirection:"row",
        alignSelf:"flex-start",
        paddingLeft:15
    },
    text1:{
        fontSize:15,
        fontWeight:"500",
        color:"white",
        marginTop:5,
        marginLeft:5
    },
    text2:{
        fontSize:15,
        fontWeight:"500",
        color:"white",
        marginTop:5,
    },
    text0:{
        color:"#c4c4c4",
        fontSize:10,
        marginLeft:25
    },
    text11:{
        color:"#c4c4c4",
        fontSize:10,
        alignSelf:"flex-end",
        marginRight:27
    },
    img22:{
        flexDirection:"row",
        marginTop:5,
        alignSelf:"flex-end",
        paddingRight:20
    },
    scroll:{
        width:wp(100),
        height:hp(100),
        flex:1
    }
    

})