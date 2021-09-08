
import Home from "../Screens/Home";
import Discover from "../Screens/Discover";
import Search from "../Screens/Search";
import Topics from "../Screens/Topics";
import Lists from "../Screens/Lists";
// import NavBarBottom from "./Footer";
// import { NativeRouter,Switch, Route, Link,BackButton} from "react-router-native";
// const NavRoutes = () => {

//     return (
      
//    <NativeRouter>
//    <View >
//         {/* <View  style={{
//         display:"flex",
//         flexDirection:"row",
//         justifyContent: "center",
//         alignItems: "center"
        
//       }}> 
//           <Link to="/"><Text>Home</Text></Link>
//           <Link to="/discover"><Text>Discover</Text></Link>
//           <Link to="/topics"><Text>Topics</Text></Link>
//           <Link to="/lists"><Text>Lists</Text></Link>
//           <Link to="/search"><Text>Search</Text></Link>
//         </View> */}
//         <BackButton>
//       <Switch>
//         <Route exact path="/" component={Home}></Route>
//         <Route exact path="/discover" component={Discover}></Route>
//         <Route exact path="/topics" component={Topics}></Route>
//         <Route exact path="/lists" component={Lists}></Route>
//         <Route exact path="/search" component={Search}></Route>
//       </Switch>
//       </BackButton>
//       <NavBarBottom />
//    </View>
    
//       </NativeRouter>
    
//     );
//   };
//    export default NavRoutes;






 import * as React from 'react';
import {  Button, } from 'react-native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import { View, Text, BlurView,TouchableOpacity, TextInput, StyleSheet, Platform, BackHandler, Image, ScrollView,ImageBackground } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { createDrawerNavigator } from '@react-navigation/drawer';
//import {DrawerContentScrollView,DrawerItemList,DrawerItem,} from '@react-navigation/drawer';
//import AppConstance from '../constance/AppConstance';
import { SafeAreaView } from 'react-native-safe-area-context';
// import TrackingSearchDetails from '../screens/TrackingSearchDetails';
// import FindVehcileCarlist from '../screens/FindVehcileCarlist';
// import Prices from '../screens/Prices';
// import Notifications from '../screens/Notifications'
// import Towing from '../screens/Towing'
// import Warehousing from "../screens/Warehousing";
// import Shipping from "../screens/Shipping";
// import DrawerWithoutlogin from "../screens/DrawerWithoutlogin";
// import Accounts from "../screens/Accounts";
// import Exportlist from '../screens/Exportlist';
// import TotalCarlist from '../screens/TotalCarlist';
// import NJVehiclesCarlist from '../screens/NJVehiclesCarlist';
// import GAVehiclesCarlist from '../screens/GAVehivlesCarlist';
// import CAVehiclesCarlist from '../screens/CAVehiclesCarlist';
// import TXVehiclesCarlist from '../screens/TXVehiclesCarlist';
// import TotalTitleCarlist from '../screens/TotalTitleCarlist';
// import NJTitlesCarlist from '../screens/NJTitlesCarlist';
// import GATitlesCarlist from '../screens/GATitlesCarlist';
// import CATitilesCarlist from '../screens/CATitilesCarlist';
// import TXTitlesCarlist from '../screens/TXTitlesCarlist';
// import SplashScreen  from "../screens/SplashScreen";
// import Setting from '../screens/Setting';
// import Faqs from '../screens/Faqs';
// import ExportCarDetails from '../screens/ExportCarDetails'
// import ContainerCarDetails from '../screens/ContainerCarDetails';
// import Welcomescreen from '../screens/Welcomescreen'
//import messaging from '@react-native-firebase/messaging';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const NavRoutes = () => {


 return (
  <Tab.Navigator>
  <Tab.Screen name="Home" component={Home} />
  <Tab.Screen name="Discover" component={Discover} />
  <Tab.Screen name="Topics" component={Topics} />
  <Tab.Screen name="Search" component={Search} />
  <Tab.Screen name="Lists" component={Lists} />
</Tab.Navigator>
//    <Stack.Navigator 
//    //initialRouteName={initialRoute}
//    >

     
// {/* <Stack.Screen name='SplashScreen' component={SplashScreen}  options={{headerShown:false,}} /> */}

//   <Stack.Screen name='Home' component={Home} options={{headerShown:false,}} />
//   <Stack.Screen name='Discover' component={Discover}  options={{headerShown:false,}} />
//   <Stack.Screen name='Topics' component={Topics}  options={{headerShown:false,}} />
//   <Stack.Screen name='Search' component={Search}  options={{headerShown:false,}} />
//   <Stack.Screen name='Lists' component={Lists}  options={{headerShown:false,}} />
  

  
  
//   {/* <Stack.Screen name='Warehousing' component={Warehousing}  options={{headerShown:false,}} />
//   <Stack.Screen name='Shipping' component={Shipping}  options={{headerShown:false,}} />
//   <Stack.Screen name='DrawerWithoutlogin' component={DrawerWithoutlogin}  options={{headerShown:false,}} />
//   <Stack.Screen name='Exportlist' component={Exportlist}  options={{headerShown:false,}} />
//   <Stack.Screen name='Setting' component={Setting}  options={{headerShown:false,}} />


  
  
//   <Stack.Screen name='Dashboard' component={Dashboard}  options={{headerShown:false,}} />
//   <Stack.Screen name='Carlist' component={Carlist}  options={{headerShown:false,}} />
//   <Stack.Screen name='Faqs' component={Faqs}  options={{headerShown:false,}} />





//   <Stack.Screen name='TotalCarlist' component={TotalCarlist}  options={{headerShown:false,}} />
//   <Stack.Screen name='NJVehiclesCarlist' component={NJVehiclesCarlist}  options={{headerShown:false,}} />
//   <Stack.Screen name='GAVehiclesCarlist' component={GAVehiclesCarlist}  options={{headerShown:false,}} />
//   <Stack.Screen name='CAVehiclesCarlist' component={CAVehiclesCarlist}  options={{headerShown:false,}} />
//   <Stack.Screen name='TXVehiclesCarlist' component={TXVehiclesCarlist}  options={{headerShown:false,}} />
  
//   <Stack.Screen name='TotalTitleCarlist' component={TotalTitleCarlist}  options={{headerShown:false,}} />
//   <Stack.Screen name='NJTitlesCarlist' component={NJTitlesCarlist}  options={{headerShown:false,}} />
//   <Stack.Screen name='GATitlesCarlist' component={GATitlesCarlist}  options={{headerShown:false,}} />
//   <Stack.Screen name='CATitilesCarlist' component={CATitilesCarlist}  options={{headerShown:false,}} />
//   <Stack.Screen name='TXTitlesCarlist' component={TXTitlesCarlist}  options={{headerShown:false,}} />
//   <Stack.Screen name='ExportCarDetails' component={ExportCarDetails}  options={{headerShown:false,}} />
//   <Stack.Screen name='ContainerCarDetails' component={ContainerCarDetails}  options={{headerShown:false,}} />


//   <Stack.Screen name='CarDetails' component={CarDetails}  options={{headerShown:false,}} />
//   <Stack.Screen name='alerts' component={alerts}  options={{headerShown:false,}} />
//   <Stack.Screen name='ContainerCarlist' component={ContainerCarlist}  options={{headerShown:false,}} />
//   <Stack.Screen name='Drawer' component={Drawer}  options={{headerShown:false,}} />
//   <Stack.Screen name='TrackingSearchDetails' component={TrackingSearchDetails}  options={{headerShown:false,}} />
//   <Stack.Screen name='FindVehcileCarlist' component={FindVehcileCarlist}  options={{headerShown:false,}} />
//   <Stack.Screen name='Prices' component={Prices}  options={{headerShown:false,}} />
//   <Stack.Screen name='Notifications' component={Notifications}  options={{headerShown:false,}} />
//   <Stack.Screen name='Accounts' component={Accounts}  options={{headerShown:false,}} /> */}

  
  
  
  
//    </Stack.Navigator>
 
 );
}

export default NavRoutes;
