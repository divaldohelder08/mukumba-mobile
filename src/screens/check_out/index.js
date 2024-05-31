import React,{useEffect, useState} from "react";
import { View , Text, Image, TouchableOpacity, ImageBackground, StyleSheet} from "react-native";
import * as ImagePicker from "expo-image-picker";
import EsconderContent from "./esconderContent";
import Mukumba from "../mukumba";
import { FontAwesome5, Ionicons, Entypo} from "@expo/vector-icons";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
//import {requestBackgroundPermissionsAsync, getCurrentPositionAsync, LocationObject} from "expo-location";
//import MapView from 'react-native-maps';
//import * as Location from "expo-location";

export default function Check_out({navigation}){
    // useEffect(()=>{
    //     requestCameraPermission()
    // },[])

    // const requestCameraPermission = async () => {
    //     try {
    //       const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //         {
    //           title: 'Cool Photo App Camera Permission',
    //           message:
    //             'Cool Photo App needs access to your camera ' +
    //             'so you can take awesome pictures.',
    //           buttonNeutral: 'Ask Me Later',
    //           buttonNegative: 'Cancel',
    //           buttonPositive: 'OK',
    //         },
    //       );
    //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //         console.log('You can use the Location');
    //       } else {
    //         console.log('Location permission denied');
    //       }
    //     } catch (err) {
    //       console.warn(err);
    //     }
    //   };

    //mapa e geolocalizacao-----------------------------------------------------------------------------------------
    // const [location, setLocation] = useState(LocationObject)

    // async function requestLocationPermissions(){
    //     const {granted} = await requestBackgroundPermissionsAsync()

    //     if(granted){
    //        const currentPosition =  await getCurrentPositionAsync()
    //        setLocation(location)
    //     }
    // }

    // useEffect(() => {
    //      requestLocationPermissions()
    // },[]

    // )
    const [container, setContainer] = useState(renderLocation())

    // useEffect(()=>{
    //  renderLocation()
    // },[])
    
function renderLocation(){

    if(1==2){
        return(
            <>
            <TouchableOpacity style={{width:250, height:50, backgroundColor:"#ccc", alignSelf:"center", justifyContent:"center", borderRadius:25, maxWidth:250,margin:10,flexDirection:"row", alignContent:"center"}}>
                <Text style={{color:"#242424",alignSelf:"center", fontSize:18, fontWeight:"bold", marginRight:8}}>Localização</Text>
                <Entypo style={{marginTop:15}} name="location" size={24} color="#0F8662" />
            </TouchableOpacity>
            </>
        )
    }
    else{
    return(
        <>
        <View style={{flexDirection:"row", width:wp(95), height:hp(10)}}>
        <View style={styles.box1}>
           <Entypo name="location" size={40} color="#0F8662" />
        </View>     
        <View >
           <Text style={styles.textLoc}>Localizaçao da Casa</Text>
           <Text style={styles.textLoc2}>Nome do Bairro</Text>
        </View>
        </View>
        </>
    )
    }
}


 //upload da imagem ---------------------------------------------------------------------------------
   const[isVisible, setIsVisible] = useState(true)

   const toogleVisiblity = ()=> {
    setIsVisible(!isVisible)
   }

    const [image, setImage] = useState(null);

    const handleImagePicker = async ()=>{

     const result =  await ImagePicker.launchImageLibraryAsync({
            aspect:[4,4],
            allowsEditing:true,
            base64:true,
            quality:1
        });
        if(!result.canceled){
            setImage(result.assets[0].uri)
            setIsVisible(false)
            toogleVisiblity
        }
        
    }

    return(
        <View style={styles.body}>
            
            <View style={styles.head}>
                <Mukumba />
            </View>

         <View style={{flex:1}}>

           

            <View style={styles.map}>
                {
                //    location &&
                //    <MapView style={styles.imgMap} 
                //    initialRegion={{
                //     latitude:location.coords.latitude,
                //     longitude:location.coords.longitude,
                //     latitudeDelta:0.005,
                //     longitudeDelta:0.005
                //     }} >

                //     <Marker
                //     coordinate={{
                //     latitude:location.coords.latitude,
                //     longitude:location.coords.longitude,
                //     }}
                //     />


                // </MapView>
                
                
                }
            <Image source={require('../img/image1.png')} />   

            </View>

            <View style={styles.main}>
               <View style={styles.container}>

            {
                container
            }
               </View>
              
              <TouchableOpacity style={styles.container2}  onPress={handleImagePicker}>
                
                         <Image source={{uri:image}} style={{position:"absolute", width:wp(90), height:hp(30), alignSelf:"center", backgroundColor:"transparent", justifyContent:"center", borderRadius:5}} />
                       
                        <EsconderContent isVisible={isVisible}>

                        </EsconderContent>

               </TouchableOpacity>
            </View>

          </View>
          
         
          <TouchableOpacity style={{width:150, height:50, backgroundColor:"#ccc", alignSelf:"center", justifyContent:"center", alignContent:"center", borderRadius:25, maxWidth:250,margin:10,flexDirection:"row"}} onPress={()=>{navigation.navigate('Ativacao_concluida')}}>
                <Text style={{color:"#242424",alignSelf:"center", fontSize:18,fontWeight:"bold", marginRight:8}}>Feito</Text>
                <Entypo style={{marginTop:10}} name="arrow-with-circle-right" size={30} color="#0F8662" onPress={()=>{navigation.navigate('Ativacao_concluida')}} />
        </TouchableOpacity>
          

        </View>
    )
} 

const styles = StyleSheet.create({
    body:{
        backgroundColor:"#202024",
        width:wp(100),
        Height:hp(100),
        maxHeight:hp(100),
        minHeight:hp(100),
    },
    map:{
         width:wp(98),
         height:hp(28),
         alignSelf:"center",
         borderWidth:1,
         borderStyle:"solid",
         alignItems:"center",
         alignContent:"center"
    },
    head:{
        alignSelf:"flex-end",
        margin:10,
        position:"relative"
        
    },
    gps:{
        color:"#7C7C8A",
        alignSelf:"center",
        margin:"auto",
        marginLeft:"3%",
        fontSize:15,
        fontWeight:"bold"
    },
    back:{
        margin:"auto",
       
    },
    container:{
        width:340,
        height:50,
        flexDirection:"row",
        alignSelf:"center",
        justifyContent:"center",
        marginTop:"5%",
        marginBottom:"5%"
    },
    box1:{
        width:60,
        height:60,
        backgroundColor:"#29292E",
        marginTop:"3%",
        alignItems:"center",
        justifyContent:"center"
    },
    container2:{
        width:wp(90),
        height:hp(30),
        borderWidth:1,
        borderStyle:"solid",
        borderColor:"#0F8662",
        alignSelf:"center",
        backgroundColor:"#29292E",
        justifyContent:"center",
        borderRadius:5,
        display:"flex",
        marginTop:25
    },
    text1:{
        color:"#00B37E",
        textAlign:"center",
        fontSize:16,
        fontWeight:"bold",
    },
    text2:{
        color:"#746E82",
        textAlign:"center",
        fontSize:14
    },
    img2:{
        width:40,
        height:40,
        alignSelf:"center",
        marginBottom:"5%",
        display:"flex"
    },
    textLoc:{
        color:"#8D8D99",
        marginLeft:5
    },
    textLoc2:{
        marginLeft:4,
        color:"#E1E1E6"
    }
   
})