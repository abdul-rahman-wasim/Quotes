import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList,ScrollView} from 'react-native';
import {deviceHeight, deviceWidth} from '../Components/constance/AppConstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';


const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-3940256099942544/2934735716';
const SavedLists = () => {
  const [array, setArray] = useState();
  const[listSelect,setlistSelect]=useState();
  const[listFound,setlistFound]=useState(false);
  //const[listFound,setlistFound]=useState(false);
  const [list, setlist] = useState();

  const rightAction = (item) => {
   
    return (
      <TouchableOpacity onPress={() => deleteItemByIndex(item)}>
        <View style={styles.swipeContainer}>
          <Icon style={styles.swipeLogo} name="delete" />
          <Text style={styles.swipeText}>Delete</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const rightActionQuote = (ind) => {
   
    return (
      <TouchableOpacity onPress={() => deleteListItemByIndex(ind)}>
        <View style={styles.swipeContainer}>
          <Icon style={styles.swipeLogo} name="delete" />
          <Text style={styles.swipeText}>Delete</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const deleteItemByIndex = async(item) => {
    //const newArr = [...array];
    // newArr.splice(newArr.findIndex(item => item === e), 1)
    // setEditImages(newArr);
    //const filteredData = this.state.data.filter(item =>  item!== id);
    //const filteredData = newArr.filter((item, index) => index !== ind);
    try {
      //let list=JSON.stringify(filteredData)
      await AsyncStorage.removeItem(item);
      getLists();
    } catch (error) {
      
    }
    //setArray(filteredData);
  };

  const deleteListItemByIndex = async(ind) => {
    const newArr = [...list];
    // newArr.splice(newArr.findIndex(item => item === e), 1)
    // setEditImages(newArr);
    //const filteredData = this.state.data.filter(item =>  item!== id);
    const filteredData = newArr.filter((item, index) => index !== ind);
    try {
      let list=JSON.stringify(filteredData)
      await AsyncStorage.setItem(listSelect, list);
    } catch (error) {
      
    }
    setlist(filteredData);
  };

  const getLists = async () => {
    //listArray.length=0;
    try {
      setlistFound(false);
      // await AsyncStorage.getAllKeys().then((value)=>{
      //   // listArray=[...listArray,value];
      //   // listArray=[...listArray,item];
      //   value != null ? listArray.push(JSON.parse(value)):null;
      let lists=await AsyncStorage.getAllKeys();
      //setArray(await AsyncStorage.getAllKeys());
      console.log(lists);
      let mylist =lists.find(obj => obj=="favo");
      console.log(mylist)
      if(mylist=='favo')
      {
      const filteredData = lists.filter(item => item !== "favo" );
      console.log(filteredData)
      if(filteredData.length>0)
      {
        setArray(filteredData);
        setlistFound(true);
        console.log(listFound)
      }
      if(filteredData ==" ")
      {
        setlistFound(false);
      }
      }

    } catch (e) {
      // try {
      //   setsavedListsName(await AsyncStorage.getAllKeys());
      // }
      // read key error
    }
    // console.log(savedListsName);
    // {for (let index = 0; index < savedListsName.length; index++) {
    //     const name = savedListsName[index];
    //     <Text style={styles.input} >{name}</Text>
    // }}
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  };

  const showList = async (item) => {
    setlistSelect(item);
    try {
      await AsyncStorage.getItem(item).then((value) => {
        // favArray=[...favArray,value];
        // favArray=[...favArray,item];
        setlist(JSON.parse(value));
        console.log(list);
      });
    } catch (e) {
      // try {
      //   const jsonValue = await AsyncStorage.getItem('@storage_Key');
      //   return jsonValue != null ? setArray(JSON.parse(jsonValue)) : null;
      // }
      // error reading value
    }
  };

  const renderlist = ({item, index}) => {
    return (
      <Swipeable renderRightActions={() => rightAction(item)}>
        <View style={styles.Listitem}>
          <TouchableOpacity onPress={() => showList(item)}>
            <Text style={styles.Listfirstauthor}>{item}</Text>

            {/* <Text
             style={styles.firsttextbody}
           >{item.Author}</Text>
           <Text 
              style={styles.firsttextbody}
           >{item.Reference}</Text>  */}
          </TouchableOpacity>
        </View>
      </Swipeable>
    );
  };

  const renderquote = ({item, index}) => {
    return (
      <View>
        <Swipeable renderRightActions={()=>rightActionQuote(index)}>
          <View style={styles.item}>
          
        
              <Text style={styles.firstauthor}>{item}</Text>

              {/* <Text style={styles.firsttextbody}>{item.Author}</Text>
              <Text style={styles.firsttextbody}>{item.Reference}</Text> */}
          
          </View>
        </Swipeable>
      </View>
    );
  };

  useEffect(() => {
    getLists();
  }, []);

  return (
    <View style={styles.container}>
       {listFound==true ? (<View style={styles.container}>
        <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
    <ScrollView>
    <View>
    <FlatList
  data={array}
  extraData={array}
  //extraData={favArray}
  renderItem={renderlist}
  keyExtractor={(item, index) => index.toString()}
/>
    </View>

<ScrollView>
<FlatList
  data={list}
  extraData={list}
  //extraData={favArray}
  renderItem={renderquote}
  keyExtractor={(item, index) => index.toString()}
/>      
<View
style={[{height:50}]}>
  
</View>
      </ScrollView>
      <View
      style={[{height:120}]}>

      </View>
      </ScrollView>
</View>)
:(<View>
  <BannerAd
  unitId={adUnitId}
  size={BannerAdSize.FULL_BANNER}
  requestOptions={{
    requestNonPersonalizedAdsOnly: true,
  }}
/>
  <Text style={[{color:"white",fontSize:20,alignSelf:"center",marginTop:10}]}>No Lists Found</Text>
</View>)}
      {/* <FlatList
        data={array}
        extraData={array}
        //extraData={favArray}
        renderItem={renderlist}
        keyExtractor={(item, index) => index.toString()}
      />
      <FlatList
        data={list}
        extraData={list}
        //extraData={favArray}
        renderItem={renderquote}
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
  Listitem: {
    //backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 1,
  },
  Listfirstauthor: {
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
});
export default SavedLists;
