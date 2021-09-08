import React from 'react'
import { StyleSheet, View,Text } from "react-native";
import { deviceHeight, deviceWidth } from '../Components/constance/AppConstance';
 const Settings = () => {
    return (
<View style={styles.container} >

<View style={styles.searchSection}>
<Text  style={styles.input}> This is Settings</Text>
       </View>
 
       </View>
    )
}
const styles = StyleSheet.create({
   container: {
     flex: 1,
     paddingTop:50,
     paddingHorizontal:20,
     height:deviceHeight,
     width:deviceWidth,
     backgroundColor: 'black',
     justifyContent: 'center',

     
   },
   searchSection: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',

  },
  searchIcon: {
      padding: 10,
  },
  input: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      backgroundColor: '#fff',
      color: '#424242',
  },
 });
export default Settings