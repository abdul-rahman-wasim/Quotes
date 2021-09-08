import * as React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';



import IconMaterialCm from 'react-native-vector-icons/MaterialCommunityIcons';
import { View ,TouchableOpacity} from "react-native";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import { createStackNavigator} from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from "../Screens/Home";
import Search from "../Screens/Search";
import Topics from "../Screens/Topics";
import TopicView from "../Screens/TopicView";
import Lists from "../Screens/Lists";
import TopicList from "../Screens/TopicList";
import Title from "../Screens/Reference";
import Body from "../Screens/Author";
import Settings from "../Screens/Settings";
import AboutUs from "../Screens/AboutUs";
import SavedLists from "../Screens/SavedLists";
import Favorites from "../Screens/Favorites";
import AppConstance from '../Components/constance/AppConstance';

const ListNav= ()=>{
  return(
    <Stack.Navigator   >
    <Stack.Screen name='Lists' component={Lists}   options={{headerShown:true ,  title:'Accounts',
        
        headerStyle: {
          backgroundColor: '#303030',
             
                  },
                  headerTitleStyle: {
                    color:'#3c9ad6' ,
                  },}}/>
    <Stack.Screen name='AboutUs' component={AboutUs} options={{headerShown:true}}   />
    <Stack.Screen name='Settings' component={Settings}  options={{headerShown:true , headerBackground:'red'}}  />
    <Stack.Screen name='SavedLists' component={SavedLists}   />
    <Stack.Screen name='Favorites' component={Favorites}   />
</Stack.Navigator>
  )
}



const Searchstack= ()=>{
  return(
    <Stack.Navigator   >
    <Stack.Screen name='Search' component={Search}   options={{headerShown:true ,  title:'Search',
        
        headerStyle: {
          backgroundColor: '#303030',
             
                  },
                  headerTitleStyle: {
                    color:'#3c9ad6' ,
                  },}}/>
   
</Stack.Navigator>
  )
}



const Homestack= ()=>{
  return(
    <Stack.Navigator   >
    <Stack.Screen name='Home' component={Home}   options={{headerShown:true ,  title:'Recent',
        
        headerStyle: {
                    backgroundColor: '#303030',
             
                  },
                  headerTitleStyle: {
                    color:'#3c9ad6' ,
                  },}}/>
   
</Stack.Navigator>
  )
}




const TopTab = createMaterialTopTabNavigator();
const Discovertab = ()=> {
  return (
 

    <TopTab.Navigator  tabBarOptions={{
      labelStyle: { fontSize: 18, },
      tabStyle: { width: 130,height:60,paddingLeft:10 , paddingVertical:5 },
      style: { backgroundColor: '#303030' },
      inactiveTintColor:"grey",
      
      activeTintColor:"orange",
      pressColor:"white",
      indicatorStyle:{ backgroundColor: '#303030' },
    }}
    swipeEnabled={false}
    >
      <TopTab.Screen  name="Reference"   component={Title} options={{title:'Reference', }}/>
      <TopTab.Screen name="Author" component={Body} />
    </TopTab.Navigator>

  );
}


const Stack = createStackNavigator();
const TopicNav=()=>{
return (
    <Stack.Navigator >
        <Stack.Screen name='Topics' component={Topics}   
        options={{
          

          title:'Topics',
        
        headerStyle: {
          backgroundColor: '#303030',
             
                  },
                  headerTitleStyle: {
                    color:'#3c9ad6' ,
                  },
              headerLeft: () => (
            <TouchableOpacity style={{position: 'absolute',paddingHorizontal:9,
          alignContent:'flex-start',alignSelf:'flex-start', }}
         
        //  onPress={() => navigation.openDrawer()}
         >
            <Ionicons name='menu' size={30} color='#3c9ad6'/>
        
              {/* <Image source={ require('../Assets/icons/list1.png')} 
         style={{ width: 24, height:24,marginRight:10, alignSelf: 'center' }} resizeMode='contain'
        /> */}
          </TouchableOpacity>
                  
                  
                  
                  )}} 
        
        
        
        
        
        
        
        
        // options={{headerShown:true ,headerTitle:'Topics',  headerStyle: {
        //     backgroundColor: '#268ef5',
     
        //   },
        //   headerTitleAlign:"center",
        //   headerTitleStyle: {
        //     color:'white' ,
        //   }, 
        
        
        
        // }
        //  }
         
         />
        <Stack.Screen name='TopicView' component={TopicView}   />
    </Stack.Navigator>

)

}

const Tab = AnimatedTabBarNavigator();
const BottomNav= () => { 
//console.log(AppConstance.colorChosen)
return(
  <Tab.Navigator
    // default configuration from React Navigation
    tabBarOptions={{
      activeTintColor: "white",
      inactiveTintColor: AppConstance.colorChosen,
      activeBackgroundColor:AppConstance.colorChosen,
      showLabel: false,
    }}
 appearence={{
  topPadding:5,
  
  horizontalPadding:5,
  dotCornerRadius:50,
      tabBarBackground: "#424242",
      //floating: true,

      whenActiveShow:"icon-only",
      dotSize:"small",
  
    }}

  >

 
<Tab.Screen name="Home" component={Homestack} options={{
        tabBarIcon: ({ focused, color, size }) => (
            <Icon
                name="home"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
                color={color}
            />
        )
      }}/>

<Tab.Screen name="Search" component={Searchstack} 
options={{
  
  title:'Topics',
        
  headerStyle: {
              backgroundColor: 'white',
       
            },
            headerTitleStyle: {
              color:'#3c9ad6' ,
            },
      
            
            
        tabBarIcon: ({ focused, color, size }) => (
            <EvilIcons
                name="search"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
                color={color}
            />
        )



      }}/>
  <Tab.Screen name="Discover" component={Discovertab} options={{
        tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons
                name="lightbulb-outline"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
                color={color}
            />
        )
      }}
  />
  <Tab.Screen name="Topics" component={TopicNav} options={{
        tabBarIcon: ({ focused, color, size }) => (
            <AntDesign
                name="tags"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
                color={color}
            />
        )
      }}/>

  <Tab.Screen name="Lists" component={ListNav} options={{
        tabBarIcon: ({ focused, color, size }) => (
            <IconMaterialCm
                name="account-outline"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
                color={color}
            />
        )
      }}/>

  </Tab.Navigator>
);
}
export default BottomNav;


// import * as React from 'react';
// import Icon from 'react-native-vector-icons/Feather';
// import { View } from "react-native";
// import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
// import { createStackNavigator} from '@react-navigation/stack';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import Home from "../Screens/Home";
// import Search from "../Screens/Search";
// import Topics from "../Screens/Topics";
// import Lists from "../Screens/Lists";
// import TopicList from "../Screens/TopicList";
// import Title from "../Screens/Reference";
// import Body from "../Screens/Author";
// import Settings from "../Screens/Settings";
// import AboutUs from "../Screens/AboutUs";
// import SavedLists from "../Screens/SavedLists";
// import Favorites from "../Screens/Favorites";
// import { deviceHeight, deviceWidth } from './constance/AppConstance';

// const ListNav= ()=>{
//   return(
//     <Stack.Navigator >
//     <Stack.Screen name='Lists' component={Lists}   options={{headerShown:false}}/>
//     <Stack.Screen name='AboutUs' component={AboutUs}   />
//     <Stack.Screen name='Settings' component={Settings}   />
//     <Stack.Screen name='SavedLists' component={SavedLists}   />
//     <Stack.Screen name='Favorites' component={Favorites}   />
// </Stack.Navigator>
//   )
// }


// const TopTab = createMaterialTopTabNavigator();
// const Discovertab = ()=> {
//   return (
 

//     <TopTab.Navigator  tabBarOptions={{
//       labelStyle: { fontSize: 18, },
//       tabStyle: { width: 120,height:50,paddingLeft:10 },
//       style: { backgroundColor: 'black' },
//       inactiveTintColor:"white",
//       activeTintColor:"orange",
//       pressColor:"white",
//       indicatorStyle:{ backgroundColor: 'black' },
//     }}
//     swipeEnabled={false}
//     >
//       <TopTab.Screen  name="Reference" component={Title} />
//       <TopTab.Screen name="Author" component={Body} />
//     </TopTab.Navigator>

//   );
// }


// const Stack = createStackNavigator();
// const TopicNav=()=>{
// return (
//     <Stack.Navigator >
//         <Stack.Screen name='Topics' component={Topics}   options={{headerShown:false}}/>
//         <Stack.Screen name='TopicList' component={TopicList}   />
//     </Stack.Navigator>

// )

// }

// const Tab = AnimatedTabBarNavigator();
// const BottomNav= () => { 

// return(
//   <Tab.Navigator
//     // default configuration from React Navigation
//     tabBarOptions={{
//       activeTintColor: "black",
//       inactiveTintColor: "black",
//       activeBackgroundColor:"#40E0D0",
//       showLabel: false,
//     }}
//  appearence={{
//       tabBarBackground: "#D0D3D4 ",
//       //floating: true,
//       whenActiveShow:"icon-only",
//       dotSize:"small",
  
//     }}

//   >

 
// <Tab.Screen name="Home" component={Home} options={{
//         tabBarIcon: ({ focused, color, size }) => (
//             <Icon
//                 name="home"
//                 size={size ? size : 24}
//                 color={focused ? color : "#222222"}
//                 focused={focused}
//                 color={color}
//             />
//         )
//       }}/>
//   <Tab.Screen name="Discover" component={Discovertab} options={{
//         tabBarIcon: ({ focused, color, size }) => (
//             <Icon
//                 name="compass"
//                 size={size ? size : 24}
//                 color={focused ? color : "#222222"}
//                 focused={focused}
//                 color={color}
//             />
//         )
//       }}
//   />
//   <Tab.Screen name="Topics" component={TopicNav} options={{
//         tabBarIcon: ({ focused, color, size }) => (
//             <Icon
//                 name="aperture"
//                 size={size ? size : 24}
//                 color={focused ? color : "#222222"}
//                 focused={focused}
//                 color={color}
//             />
//         )
//       }}/>
//   <Tab.Screen name="Search" component={Search} options={{
//         tabBarIcon: ({ focused, color, size }) => (
//             <Icon
//                 name="search"
//                 size={size ? size : 24}
//                 color={focused ? color : "#222222"}
//                 focused={focused}
//                 color={color}
//             />
//         )
//       }}/>
//   <Tab.Screen name="Lists" component={ListNav} options={{
//         tabBarIcon: ({ focused, color, size }) => (
//             <Icon
//                 name="bell"
//                 size={size ? size : 24}
//                 color={focused ? color : "#222222"}
//                 focused={focused}
//                 color={color}
//             />
//         )
//       }}/>

//   </Tab.Navigator>
// );
// }
// export default BottomNav;