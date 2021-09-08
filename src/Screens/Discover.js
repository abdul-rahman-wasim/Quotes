import React from 'react'
import { StyleSheet, View,Text } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { deviceHeight, deviceWidth } from '../Components/constance/AppConstance';
 const Discover = () => {
    return (
<View style={styles.container} >

<View style={styles.searchSection}>
<Icon style={styles.searchIcon} name="search" size={20} color="black"/>
<Text  style={styles.input}>About Us</Text>
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
export default Discover