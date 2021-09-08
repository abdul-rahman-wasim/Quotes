import React, { Component } from 'react';
// import { View, Dimensions, AsyncStorage } from 'react-native';
import { View, Dimensions } from 'react-native';




export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;
 const bgColor= ['#2596be', '#E1092f'];



class AppConstance extends Component {

    static IS_USER_LOGIN = '0' // 0- log out , 1- login
     static colorChosen=bgColor[Math.floor(Math.random()*bgColor.length)];
}
export default AppConstance;