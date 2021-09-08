import React from 'react'
import { StyleSheet, View,ScrollView,TouchableOpacity,Text } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { deviceHeight, deviceWidth } from '../Components/constance/AppConstance';
import {  InterstitialAd,AdEventType,RewardedAd, RewardedAdEventType,BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';



const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-3940256099942544/2934735716';

 const Lists = ({ navigation }) => {
    return (
<View style={styles.container}>

<BannerAd
      unitId={adUnitId}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />

<ScrollView  style={styles.s1}>



       <TouchableOpacity
        onPress={() =>navigation.navigate("SavedLists")}  
       style={styles.item}>
       <Icon style={styles.searchIcon} name="star" size={25} color="white"/>
<Text  style={styles.input}>Lists</Text>



       </TouchableOpacity>





       <TouchableOpacity  style={styles.item}
       onPress={() =>navigation.navigate("Favorites")}>
       <Icon style={styles.searchIcon} name="heart" size={25} color="white"/>
<Text  style={styles.input}>Favorites</Text>



       </TouchableOpacity>



       <TouchableOpacity  style={styles.item}>
       <Icon style={styles.searchIcon} name="help-circle" size={25} color="white"/>
<Text  style={styles.input}>About Us</Text>



       </TouchableOpacity>



       <TouchableOpacity  style={styles.item}>
       <Icon style={styles.searchIcon} name="phone-call" size={25} color="white"/>
<Text  style={styles.input}>Contact Us</Text> 



       </TouchableOpacity>

</ScrollView>











        {/* <Content padder>
          <Card>
            <CardItem button onPress={() =>  navigation.navigate("TopicList")}>
            <View style={styles.searchSection}>
<Icon style={styles.searchIcon} name="star" size={20} color="black"/>
<Text  style={styles.input}>Lists</Text>
       </View>
            </CardItem>

            <CardItem button onPress={() =>  navigation.navigate("Favorites")}>
              <View style={styles.searchSection}>
<Icon style={styles.searchIcon} name="heart" size={20} color="black"/>
<Text  style={styles.input}>Favorites</Text>
       </View>
            </CardItem>

            <CardItem button onPress={() =>  navigation.navigate("AboutUs")}>
              <View style={styles.searchSection}>
<Icon style={styles.searchIcon} name="globe" size={20} color="black"/>
<Text  style={styles.input}>About Us</Text>
       </View>
            </CardItem>

            <CardItem button onPress={() =>  navigation.navigate("Settings")}>
            <View style={styles.searchSection}>
<Icon style={styles.searchIcon} name="phone-call" size={20} color="black"/>
<Text  style={styles.input}>Conteact Us</Text> 
       </View>
            </CardItem>

          </Card>
        </Content>
 */}


{/*  <View style={styles.searchSection}>
<Icon style={styles.searchIcon} name="star" size={20} color="black"/>
<Text  style={styles.input}>Lists</Text>
       </View>
       <View style={styles.searchSection}>
<Icon style={styles.searchIcon} name="globe" size={20} color="black"/>
<Text  style={styles.input}>About Us</Text>
       </View>
       <View style={styles.searchSection}>
<Icon style={styles.searchIcon} name="settings" size={20} color="black"/>
<Text  style={styles.input}>Settings</Text> 
       </View> */}
{/* <Text style={styles.links}>Lists</Text>
<Text style={styles.links}>About Us</Text>
<Text style={styles.links}>Settings</Text> */}
 
       </View>
    )
}
const styles = StyleSheet.create({
   container: {
     flex: 1,
     height:deviceHeight,
     width:deviceWidth,

     
   },
   s1:{
          width:'100%',
          backgroundColor: '#303030',
          paddingHorizontal:35,
          paddingTop:5
       


   },
   item:{
       marginTop:10,
       paddingVertical:10,
       paddingHorizontal:10,
       flexDirection:'row'
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
      marginLeft:15,
      fontSize:18,
      paddingBottom: 10,
      paddingLeft: 0,
      color: 'white',
  },
 });
export default Lists