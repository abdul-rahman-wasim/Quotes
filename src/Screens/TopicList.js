import React from 'react'
import { Text, View,TouchableOpacity,StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deviceHeight, deviceWidth } from '../Components/constance/AppConstance';
import AppConstance from '../Components/constance/AppConstance';



 const TopicList = () => {
  const getAllKeys = async () => {
      let keys = []
      try {
        keys = await AsyncStorage.getAllKeys()
      } catch(e) {
        // read key error
      }
    
      console.log(keys)
      // example console.log result:
      // ['@MyApp_user', '@MyApp_key']
    }
    
    return (
       <View style={styles.container}>
         <TouchableOpacity  
          onPress={()=>getAllKeys()}>
         
         <Text>This is Topics</Text>
         </TouchableOpacity>

       </View>
    )
}


const styles = StyleSheet.create({
   container: {
     height:deviceHeight,
     width:deviceWidth,
     backgroundColor: '#303030',
     justifyContent: 'center',
     
   },
 });
export default TopicList