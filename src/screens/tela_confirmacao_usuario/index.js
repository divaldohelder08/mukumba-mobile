import React, { useState } from "react";
import {View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";
import Mukumba from "../mukumba";
import {Entypo, Ionicons} from "@expo/vector-icons";

export default function tela_confirmacao_usuario({navigation}){

    const [image, setImage] = useState(null)
    const handleImagePicker = async ()=>{
    const result = await ImagePicker.launchImageLibraryAsync({
        aspect:[4,4],
        allowsEditing:true,
        base64:true,
        quality:1
    });
    if(!result.canceled){
      setImage(result.assets[0].uri)
    }
    }

    return(
        <View style={style.body}>            
                
                <View style={style.up}>
                    <Mukumba  />
                </View>

           <ScrollView>
                <View >
               
                <TouchableOpacity style={style.imgProfile} onPress={handleImagePicker}>
                    <Image style={style.imgProfile}  source={{uri:image}} />
                </TouchableOpacity> 

                <View>
                    <Text style={style.text}>Nome</Text>
                    <TextInput style={style.input} placeholder="Insira o seu nome Completo"></TextInput>
                </View>

                <View>
                    <Text style={style.text}>Numero do BI</Text>
                    <TextInput style={style.input} placeholder="Número do seu BI"></TextInput>
                </View>

                </View>

                <View>
                    <Text style={style.text}>Bairro</Text>
                    <TextInput style={style.input} placeholder="Nome do seu Bairro"></TextInput>
                </View>

                <View style={style.containerContactos}>

                    <View style={style.containerContactos2}>
                         <Text style={style.text2}>Contacto 1</Text>
                         <TextInput keyboardType="numeric" style={style.input2} placeholder="000000000"></TextInput>
                    </View>

                    <View style={style.containerContactos22}>
                         <Text style={style.text22}>Contacto 2</Text>
                         <TextInput keyboardType="numeric" style={style.input3} placeholder="000000000"></TextInput>
                     </View>

                 </View>
 

                <View>
                    <Text style={style.text}>Endereco Fisico</Text>
                    <TextInput style={style.input} placeholder="País, Província, Município..."></TextInput>
                </View>

                <View>
                    <Text style={style.text}>É Você?</Text>

                    <View style={style.ContainerBtnLast}>
                        <View style={style.btnLast}>
                            <TouchableOpacity style={style.ContainerSimNao} onPress={()=>{navigation.navigate('Activacao-Boleto')}}>
                                 
                                  <Text>
                                       <View style={style.btnNao}></View>
                                       Nao
                                  </Text>
                                  
                            </TouchableOpacity>
                        </View>

                        <View style={style.btnLast}>
                            <TouchableOpacity style={style.ContainerSimNao} onPress={()=>{navigation.navigate('Ativacao_concluida')}}> 
                                  
                                    <Text>
                                        <View style={style.btnSim}></View>
                                        Sim
                                   </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                </ScrollView>
        </View>
        
    )
}

const style = StyleSheet.create({
    body:{
        backgroundColor:"#202024",
        width:wp(100),
        height:hp(100),
        minHeight:hp(100),
        maxHeight:hp(100),
        display:"flex",
        
    },
    up:{
        alignSelf:"flex-end",
        margin:10,
    },
    textConfirmacao:{
        textAlign:"center",
        color:"#7C7C8A",
        fontSize:17,
        fontWeight:"bold",
    
    },
    imgProfile:{
        width:100,
        height:100,
        borderRadius:"50%",
        backgroundColor:"grey",
        borderWidth:1,
        borderStyle:"solid",
        borderColor:"#7C7C8A",
        alignSelf:"center"
    },
    text:{
        color:"#7C7C8A",
        fontSize:15,
        marginLeft:wp(7),
        marginTop:hp(5),
        marginBottom:wp(6)
    },
    input:{
        width:wp(97),
        height:50,
        borderRadius:25,
        alignSelf:"center",
        color:"grey",
        backgroundColor:"#121214",
        paddingLeft:15,
        paddingRight:5,
        marginTop:hp(-2.5),
        fontSize:15
    },
    containerContactos:{
        width:wp(100),
        flexDirection:"row",
        alignSelf:"center"
    },
    containerContactos2:{
        color:"#7C7C8A",
        marginTop:"5%",
        marginLeft:wp(3)
    },
    containerContactos22:{
        color:"#7C7C8A",
        marginTop:"5%",
        marginLeft:wp(9)
    },
    input2:{
        width:wp(45),
        height:50,
        backgroundColor:"#121214",
        border:"1px solid #121214",
        borderRadius:25,
        color:"grey",
        marginLeft:"-3%",
        marginTop:"3%",
        paddingLeft:15,
        paddingRight:5
    
    },
    input3:{
        width:wp(45),
        height:50,
        backgroundColor:"#121214",
        border:"1px solid #121214",
        borderRadius:25,
        color:"grey",
        marginLeft:hp(-2.5),
        marginTop:"3%",
        paddingRight:5,
        paddingLeft:15
    },
    btnLast:{
        width:wp(46),
        height:50,
        backgroundColor:"grey",
        borderRadius:25,
        justifyContent:"center"
    
    },
    ContainerBtnLast:{
        flexDirection:"row",
        gap:10,
        alignSelf:"center",
        marginTop:hp(-2.5),
        marginBottom:hp(3)
    },
    btnSim:{
      width:10,
      height:10,
      borderRadius:"50%",
      backgroundColor:"green",
      marginRight:4,
      marginTop:"2%",
    },
    btnNao:{
        width:10,
        height:10,
        borderRadius:"50%",
        backgroundColor:"red",
        justifyContent:"center",
        alignItems:"center",
        marginRight:4,
        marginTop:"2%"
    },
    ContainerSimNao:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
    },
    // text3:{
    //     color:"#7C7C8A",
    //     marginTop:"5%",
    //     marginLeft:,
        
    // },
    text2:{
        color:"#7C7C8A",
        marginLeft:"6%",
        marginTop:"1%",
    },
    text22:{
        color:"#7C7C8A",
        marginTop:"1%",
        marginLeft:hp(0)
    },
    btnBack:{
        //alignSelf:"flex-start"
        marginRight:120
    }
    })