import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {deviceHeight, deviceWidth} from '../Components/constance/AppConstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-3940256099942544/2934735716';
const Favorites = () => {
  const [array, setArray] = useState();
  const [favFound, setfavFound] = useState(false);
  const getData = async () => {
    try {
      let savedList=await AsyncStorage.getAllKeys();
      console.log(savedList);
      let mylist = savedList.find((obj) => obj == 'favo');
      if (mylist === 'favo') {
        console.log('found');
        await AsyncStorage.getItem('favo').then((value) => {
          // favArray=[...favArray,value];
          // favArray=[...favArray,item];
          //setArray(JSON.parse(value));
          let fav=JSON.parse(value);
          console.log(fav)
          let myfav = fav.filter((obj) => obj !== 'Hello');
          if (myfav.length>0) {
            setArray(myfav);
            console.log(myfav)
            setfavFound(true);
          } else {
            setfavFound(false);
          }
          //console.log(array);
          //setloadPage(true);
        });
      } else {
        //await AsyncStorage.setItem('favo', "Hello");
        setfavFound(false);
      }
    } catch (e) {}
  };
  const rightAction = (index) => {
    // const trans = progress.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [-80, 0],
    // });
    // console.log(index)
    // setSelectedItem(item);
    return (
      <TouchableOpacity onPress={() => deleteItemByIndex(index)}>
        <View style={styles.swipeContainer}>
          <Icon style={styles.swipeLogo} name="delete" />
          <Text
            //  style={[
            //   styles.swipeText,
            //   {
            //     transform: [{ translateX: trans }],
            //   },
            // ]}
            style={styles.swipeText}>
            Delete
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  deleteItemByIndex = async (ind) => {
    const newArr = [...array];
    // newArr.splice(newArr.findIndex(item => item === e), 1)
    // setEditImages(newArr);
    //const filteredData = this.state.data.filter(item =>  item!== id);
    const filteredData = newArr.filter((item, index) => index !== ind);
    try {
      let fav = JSON.stringify(filteredData);
      await AsyncStorage.setItem('favo', fav);
      getData();
    } catch (error) {}
  };

  const renderlist = ({item, index}) => {
    return (
      <Swipeable renderRightActions={() => rightAction(index)}>
        <View style={styles.item}>
          <Text style={styles.firstauthor}>{item}</Text>
          {/* <Text style={styles.firsttextbody}>{item.Author}</Text>
            <Text style={styles.firsttextbody}>{item.Reference}</Text> */}
        </View>
      </Swipeable>
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {favFound == true ? (
        <View style={styles.container}>
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.FULL_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
          
          <FlatList
            data={array}
            extraData={array}
            renderItem={renderlist}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      ) : (
        <View>
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.FULL_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
          <Text
            style={[
              {
                color: 'white',
                fontSize: 20,
                alignSelf: 'center',
                marginTop: 10,
              },
            ]}>
            No Favorites Found
          </Text>
        </View>
      )}
      {/* <FlatList
        data={array}
        extraData={array}
        renderItem={renderlist}
        keyExtractor={(item, index) => index.toString()}
      /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: deviceHeight,
    width: deviceWidth,
    backgroundColor: '#303030',
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
    color: 'white',
  },
  item: {
    //backgroundColor: 'white',

    padding: 20,
    marginVertical: 8,
    marginHorizontal: 1,
  },
  firstauthor: {
    fontSize: 20,
    color: 'white',
  },
  firsttextbody: {
    fontSize: 14,
    color: 'grey',
  },
  swipeContainer: {
    backgroundColor: 'blue',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 30,
  },
  swipeLogo: {
    justifyContent: 'center',
    color: 'white',
    fontSize: 26,
    paddingTop: 10,
  },
  swipeText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 13,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: '#1f65ff',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
});
export default Favorites;
