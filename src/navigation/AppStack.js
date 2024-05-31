// Importações necessárias
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Qrcode from "../screens/qrcode";
import Check_out from "../screens/check_out";
import Ativacao_concluida from "../screens/ativacao_concluida";
import Home_Chamada_Finalizada from "../screens/home_chamadas_finalizadas";
import Start from "../screens/start2";
import Profile from '../screens/profile/Profile'
import ProfileEdit from '../screens/profile/index'
import Settings from "../screens/settings"
import AboutUs from '../screens/settings/AboutUs';
import information from '../screens/settings/Information';
import { AuthContext } from '../context/AuthContext';
import DataGrafic from '../screens/dataGrafic'
import Home from '../screens/home';
import CustomDrawer from '../screens/drawerNavigation/CustomDrawer';
import { UserRoundCog, Cog, HomeIcon} from 'lucide-react-native';
import { Ionicons } from '@expo/vector-icons';
import Seguranca from '../screens/settings/Seguranca'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () =>{
  const { background,colorBtnCall,backgroundHeader, backgroundTabBottom } = useContext(AuthContext)
  return(
  
  // <Tab.Navigator initialRouteName='Home' screenOptions={({ route }) => ({
  //   tabBarIcon: ({ focused, color, size }) => {
  //     let iconName;

  //     if (route.name === 'Home') {
  //       iconName = focused ? 'home' : 'home-outline';
  //       size = focused ? 35 : 25;
  //     }
  //     if (route.name === 'Profile') {
  //       iconName = focused ? 'person' : 'person-outline';
  //        size = focused ? 35 : 25;
  //     }
  //     if (route.name === 'Data') {
  //       iconName = focused ? 'pie-chart' : 'pie-chart-outline';
  //       size = focused ? 35 : 25;
  //     }
  //     return <Ionicons name={iconName} size={size} color={color} />
  //   },
  //   tabBarStyle:{height:60, backgroundColor:backgroundTabBottom, paddingBottom:"10px"},
  //   tabBarShowLabel: false,
  //   headerShown:false
    
  // })} 
  
  // tabBarOptions={{
  //   activeTintColor:colorBtnCall,
  //   inactiveTintColor:'#ccc'
  // }}>
  //   <Tab.Screen name='Profile' component={Profile}/>
  //   <Tab.Screen name='Home'component={Home}/>
  //   <Tab.Screen name='Data' component={DataGrafic}/>
  // </Tab.Navigator>
  <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            size = focused ? 35 : 25;
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
            size = focused ? 35 : 25;
          } else if (route.name === 'Data') {
            iconName = focused ? 'pie-chart' : 'pie-chart-outline';
            size = focused ? 35 : 25;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          height: 60,
          backgroundColor: backgroundTabBottom,
          paddingBottom: 10, // troque "10px" por 10 para evitar erro de unidade
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: colorBtnCall, // adicione estas duas linhas
        tabBarInactiveTintColor: '#ccc'      // adicione estas duas linhas
      })}
    >
      <Tab.Screen name='Profile' component={Profile} />
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Data' component={DataGrafic} />
    </Tab.Navigator>

  )
}


const DrawerNavigator = () => {
  const { colorBtn2 , color, backgroundBtnDrawer} = useContext(AuthContext)
 
  return(
  <Drawer.Navigator 
  drawerContent={props => <CustomDrawer {...props} />}
  screenOptions={{
      drawerActiveBackgroundColor: backgroundBtnDrawer,
      drawerActiveTintColor:"#000000",
      drawerInactiveTintColor: '#333',
      drawerLabelStyle: { marginLeft: -25, fontSize: 12 },
      drawerItemStyle: { borderRadius: 5 },
      drawerPosition:"left",
      headerShown:false,
  
  }}>
    <Drawer.Screen name='Principal' component={TabNavigator} options={{
                    drawerIcon: ({ color }) => (
                      <Ionicons name="home-outline" size={22} color={color} />
                    ), headerShown: false
                }}/>
    <Drawer.Screen name='Editar Perfil' component={ProfileEdit} options={{
                    drawerIcon: ({ color }) => (
                      <Ionicons name="person-outline" size={22} color={color} />
                    ), headerShown: false
                }}/>
    <Drawer.Screen name='Configuracoes' component={Settings} options={{
                    drawerIcon: ({ color }) => (
                      <Ionicons name="settings-outline" size={22} color={color} />
                    ), headerShown: false
                }}/>
  </Drawer.Navigator>
  )
}

const StackNavigator = () =>(
  <Stack.Navigator screenOptions={{headerShown:false}}>
     <Stack.Screen name="Start" component={Start} />
     <Stack.Screen name="Home" component={DrawerNavigator} />
     <Stack.Screen name="ChamadaFinalizada" component={Home_Chamada_Finalizada} />
     <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
     <Stack.Screen name="Ativacao_concluida" component={Ativacao_concluida} />
     <Stack.Screen name="informacoes" component={information} />
     <Stack.Screen name="Sobre" component={AboutUs} />
     <Stack.Screen name="seguranca" component={Seguranca} />
  </Stack.Navigator>
)

const AppStack = () =>{
return(
    <Drawer.Navigator initialRouteName='StackNavigator' screenOptions={{headerShown:false}}>
        <Drawer.Screen name='DrawerNavigator' component={StackNavigator}/>
    </Drawer.Navigator>
)
}
export default AppStack;