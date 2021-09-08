import React, {useState,useRef,createRef, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Image,
} from 'react-native';
import Share from 'react-native-share';
import ViewShot,{captureRef} from 'react-native-view-shot';
import Quotes from '../Database/Quotes.json';
import {deviceHeight, deviceWidth} from '../Components/constance/AppConstance';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {TextInput} from 'react-native-paper';
import AppConstance from '../Components/constance/AppConstance';
import ActionSheet from "react-native-actions-sheet";
import {  InterstitialAd,AdEventType,RewardedAd, RewardedAdEventType,BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import Snackbar from 'react-native-snackbar';


const IadUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3940256099942544/1033173712';

const interstitial = InterstitialAd.createForAdRequest(IadUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],  
});


const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-3940256099942544/2934735716';

let favFound=false;
const quoteData = Quotes;

const Topics = ({navigation}) => {

  const[listQuote,setListQuote]=useState();

  const swipeListAdd = (item) => {
    setListQuote(item);
    setModalList(!modalList);
  };
  
  const showSnackbarMessageListAdd = () => {
    setTimeout(() => {
      Snackbar.show({
        backgroundColor: '#2596be',
        text: 'Successfully added in List',
        duration: Snackbar.LENGTH_SHORT,
      });
    }, 250);
  };

  const showSnackbarMessageFavRemove = () => {
    setTimeout(() => {
      Snackbar.show({
        backgroundColor: '#2596be',
        text: 'Successfully Removed from Favorties',
        duration: Snackbar.LENGTH_SHORT,
      });
    }, 250);
  };

  const showSnackbarMessageFavAdd = () => {
    setTimeout(() => {
      Snackbar.show({
        backgroundColor: '#2596be',
        text: 'Successfully Favorited',
        duration: Snackbar.LENGTH_SHORT,
      });
    }, 250);
  };

  const removeFav = async (item) => {
    // const productToBeSaved = { ‘item’ : this.state.productDescription , ‘currencyRate’ : this.state.currencyRate , ‘date’ : this.state.date }
    try {
      await AsyncStorage.getItem('favo').then((value) => {
        
        
        let fav;

        if (value === null) {
          fav = [item];
        } else {
          fav = JSON.parse(value);
          const filteredData=fav.filter(obj=>obj!==item);
          //console.log(filteredData)
          fav = JSON.stringify(filteredData);
          //fav.push(item);
        }

        //console.log('---' + fav);
        //fav = JSON.stringify(filteredData);

        console.log('saving ' + fav);
        //  AsyncStorage.setItem('fav', fav)
        AsyncStorage.setItem('favo', fav);
        loadFav();
        favFound=false;
        showSnackbarMessageFavRemove();
        // if(selectedItem.Quote!=="")
        // {
        // if(selectedItem.Quote==item)
        // {
        //   //favCheck=false;
        //   compareArrays(selectedItem.Quote)
        // }  
        // }
        // storeData(favArray);
        // storeData(fav)
      });
    } catch (e) {
      // error reading value
    }
  };

  const swipeFavRemove =  (item) => {
    removeFav(item);
            
          };

  const swipeFavAdd =  (item) => {
    // setSelectedItem(item);
    // modalFav();
    updateFav(item);
            
          };
 

  const [favarray, setfavArray] = useState(["Hello"]);
  const [favCheck,setFavCheck] = useState(false);

  const loadFav = async () => {
    try {
      await AsyncStorage.getItem('favo').then((value) => {
        // favArray=[...favArray,value];
        // favArray=[...favArray,item];
        setfavArray(JSON.parse(value));
        console.log(favarray);
      });
    } catch (e) {
      // try {
      //   const jsonValue = await AsyncStorage.getItem('@storage_Key');
      //   return jsonValue != null ? setArray(JSON.parse(jsonValue)) : null;
      // }
      // error reading value
    }
  };
  compareArrays = (item) => {
    console.log(item.Quote);
    setFavCheck(false);
    //favCheck=false;
    for (let index = 0; index < favarray.length; index++) {
      if(item  == favarray[index])
      {
       setFavCheck(true);
      // favCheck=true;
      }
      
    }
    // const newArr = [...array];
    // // newArr.splice(newArr.findIndex(item => item === e), 1)
    // // setEditImages(newArr);
    // //const filteredData = this.state.data.filter(item =>  item!== id);
    // const filteredData = newArr.filter((item, index)  =>  index!== ind)
    // setArray(filteredData);
  }



  const modalfavFind=(item)=>{
    let myObj = favArray.find(obj => obj==item);
  if(myObj===item)
  {
    //console.log(myObj)
    favFound=true;
    //console.log(favFound);
    //setFavCheck(true)
  }
  else{
    //setFavCheck(false)
    favFound=false;
    //console.log(favFound);
  }
  }


  useEffect(() => {
    loadFav();
    const eventListener = interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        setLoaded(true);
      }
      if (type === AdEventType.CLOSED) {
        
        console.log("ad closed");
        setLoaded(false);
       //afterAd();
        //reload ad 
        interstitial.load();
 
      }
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      eventListener();
    };

}, [])

  const actionSheetRef = createRef();
  let actionSheet;
  const loadTopics = [
    {
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote:
        'None of us really changes over time. We only become more fully what we are.',
      Author: 'Anne Rice',
      Reference: 'The Vampire Lestat',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote:
        'All endings are also beginnings. We just don’t know it at the time.',
      Author: 'Mitch Albom',
      Reference: 'The Five People You Meet In Heaven',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote: 'Pain is inevitable. Suffering is optional.',
      Author: 'Haruki Murakami',
      Reference: 'What I Talk About When I Talk About Running',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {Category: 'Happiness', Color: '#7030a0'},
    {
      Quote:
        'The happiness of your life depends upon the quality of your thoughts',
      Author: 'Marcus Aurelius',
      Reference: 'Meditations',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote: 'I must learn to be content with being happier than I deserve.',
      Author: 'Jane Austen',
      Reference: 'Pride and Prejudice',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        'Stop comparing yourself to other people, just choose to be happy and live your own life.',
      Author: 'Roy T. Bennett',
      Reference: 'The Light in the Heart',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {Category: 'Sad', Color: '#a8d08d'},
    {
      Quote:
        'I guess that’s what saying good-bye is always like — like jumping off an edge. The worst part is making the choice to do it. Once you’re in the air, there’s nothing you can do but let go',
      Author: 'Lauren Oliver',
      Reference: 'Before I Fall',
      Category: 'Sad',
      Color: '#a8d08d',
    },
    {
      Quote:
        'Breathing is hard. When you cry so much, it makes you realize that breathing is hard',
      Author: 'David Levithan',
      Reference: 'Love is the Higher Law',
      Category: 'Sad',
      Color: '#a8d08d',
    },
    {
      Quote:
        'So, this is my life. And I want you to know that I am both happy and sad and I’m still trying to figure out how that could be.',
      Author: 'Stephen Chbosky',
      Reference: 'The Perks of Being a Wallflower',
      Category: 'Sad',
      Color: '#a8d08d',
    },
    {Category: 'Humor', Color: '#ffe599'},
    {
      Quote: 'Grow old along with me! The best is yet to be',
      Author: 'Robert Browning',
      Reference: 'Rabbi Ben Ezra',
      Category: 'Humor',
      Color: '#ffe599',
    },
    {
      Quote:
        'How five crows managed to lift a twenty-pound baby boy into the air was beyond prue, but that was certainly the least of her worries.',
      Author: 'Colin Meloy',
      Reference: 'Wildwood: The Wildwood Chronicles Vol. One',
      Category: 'Humor',
      Color: '#ffe599',
    },
    {
      Quote:
        'For the better part of my childhood, my professional aspirations were simple–i wanted to be an intergalactic princess',
      Author: 'Janet Evanovich',
      Reference: 'Seven up',
      Category: 'Humor',
      Color: '#ffe599',
    },
    {Category: 'Romance', Color: '#4472c4'},
    {
      Quote: 'To love or have loved, that is enough. Ask nothing further',
      Author: 'Victor Hugo',
      Reference: 'LES MISÉRABLES',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote:
        'It was love at first sight, at last sight, at ever and ever sight',
      Author: 'Vladimir Nabokov',
      Reference: 'LOLITA',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote:
        'The minute I heard my first love story, I started looking for you.',
      Author: 'Jalaluddin Rumi',
      Reference: 'THE ILLUSTRATED',
      Category: 'Romance',
      Color: '#4472c4',
    },
  ];
  const [loaded, setLoaded] = useState(false);
  const [listName, setlistName] = useState('');
  const [listDesc, setlistDesc] = useState('');
  const [modalList, setModalList] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  let favArray = [];
  const [array, setArray] = useState([{}]);
  const [listNameArray, setlistNameArray] = useState();
  const [count, setcount] = useState(false);
  const [shareModal, setshareModal] = useState(false);
  const [shareColor, setshareColor] = useState("white");
  const [shareTextColor, setshareTextColor] = useState("black");
  const viewShotRef = useRef(null);
  const whiteColor=()=>{
    setshareTextColor("black");
    setshareColor("white");
  }
  const blackColor=()=>{
    setshareTextColor("white");
    setshareColor("black");
  }
  const blueColor=()=>{``
    setshareTextColor("white");
    setshareColor("blue");
  }
  // const shareDummyImage = async () => {
  //  viewShotRef.current.capture().then((uri) => {
  //     console.log('do something with ', uri);
  //     Share.open({url: uri});
  //   });
  // }

  const shareDummyImage = async () => {
    
    viewShotRef.current.capture().then((uri) => {
       //console.log('do something with ', uri);
       Share.open({url: uri});
       if(loaded==true)
     {
       interstitial.show();
       //setshareTypeModel(!shareTypeModel)
       //actionSheetRef.current.show();
     }
     });
   }


  updateArray = (item) => {
    updateFav(item);
    // setArray([...array,item]);
    // return storeData(array);

    //setArray([...array,item]);
    //return storeData(array);
  };
  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('@storage_Key')
  //   //   {array.map((array,ind) => {
  //   //     return (<Text key={ind}>
  //   //    {array.Quote}

  //   //  </Text>);
  //   //    })}
  //     return jsonValue != null ? console.log(JSON.parse(jsonValue)) : null;

  //   } catch(e) {
  //     // error reading value
  //   }
  // }

  const getFav = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('favo');
      //   {array.map((array,ind) => {
      //     return (<Text key={ind}>
      //    {array.Quote}

      //  </Text>);
      //    })}
      return jsonValue != null ? console.log(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
    }
  };

  const updateFav = async (item) => {
    // const productToBeSaved = { ‘item’ : this.state.productDescription , ‘currencyRate’ : this.state.currencyRate , ‘date’ : this.state.date }
    try {
      await AsyncStorage.getItem('favo').then((value) => {
        let fav;

        if (value === null) {
          fav = [item];
        } else {
          fav = JSON.parse(value);

          fav.push(item);
        }

        console.log('---' + fav);
        fav = JSON.stringify(fav);

        console.log('saving ' + fav);
        //  AsyncStorage.setItem('fav', fav)
        AsyncStorage.setItem('favo', fav);
        loadFav();
        favFound=true;
        showSnackbarMessageFavAdd();
        // if(selectedItem.Quote!=="")
        // {
        // if(selectedItem.Quote==item)
        // {
        //   favFound=true;
        // }  
        // }
        // storeData(favArray);
        // storeData(fav)
      });
    } catch (e) {
      // error reading value
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(listName);
      //   {array.map((array,ind) => {
      //     return (<Text key={ind}>
      //    {array.Quote}

      //  </Text>);
      //    })}
      return jsonValue != null ? console.log(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
    }
  };

  const updateList = async () => {
    let item=listQuote;

    try {
      await AsyncStorage.getItem(listName).then((value) => {
        // favArray=[...favArray,value];
        // favArray=[...favArray,item];
        let fav;

        if (value === null) {
          fav = [item];
        } else {
          fav = JSON.parse(value);

          fav.push(item);
        }

        console.log('---' + fav);
        fav = JSON.stringify(fav);

        console.log('saving ' + fav);
        //  AsyncStorage.setItem('fav', fav)
        AsyncStorage.setItem(listName, fav);
        showSnackbarMessageListAdd();
        setModalList(!modalList);
        // value != null ? favArray.push(JSON.parse(value)):null;
        //  favArray.push(list);
        // createList(favArray);
      });
    } catch (e) {
      // error reading value
    }
  };
  const createList = async (item) => {
    try {
      const jsonValue = JSON.stringify(item);
      await AsyncStorage.setItem(listName, jsonValue);
      favArray.length = 0;
      getList();

      //await AsyncStorage.mergeItem('@storage_Key')
    } catch (e) {
      // saving error
    }
  };

  const getList = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(listName);
      //   {array.map((array,ind) => {
      //     return (<Text key={ind}>
      //    {array.Quote}

      //  </Text>);
      //    })}
      return jsonValue != null ? console.log(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
    }
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('fav', jsonValue);
      //await AsyncStorage.mergeItem('@storage_Key')
      favArray = '';
      return getFav();
    } catch (e) {
      // saving error
    }
  };

  //   //Quote Reducer
  //   const {transactions,AddQuote}=useContext(TrnsacContext);
  //   //const[quote,setqoute]=useState("");

  //   const AddtoList= (item)=>{
  //     const newQuote={
  //         id: Math.floor(Math.random()*1000000),
  //         quote:item.Quote,
  //         name:item.Author
  //     }
  //     AddQuote(newQuote);
  //     alert("Added");

  // }

  const [selectedItem, setSelectedItem] = useState(null);

  const modalShare = async () => {


    if(selectedItem==null)
    {
      alert("Link not available")
    }
    else{
     // Share.open({message: item});
      Share.open({message: selectedItem.Quote});
      if(loaded==true)
    {
      interstitial.show();
      //setshareTypeModel(!shareTypeModel)
      //actionSheetRef.current.show();
    }

   }
    
    //Share.open({message: selectedItem.Quote});
    // try {
    //   const result = await Share.share({
    //     message: selectedItem.Quote,
    //   });
    //   if (result.action === Share.sharedAction) {
    //     if (result.activityType) {
    //       // shared with activity type of result.activityType
    //     } else {
    //       // shared
    //     }
    //   } else if (result.action === Share.dismissedAction) {
    //     // dismissed
    //   }
    // } catch (error) {
    //   alert(error.message);
    // }
  };

  const modalFav = () => {
    //setModalVisible(true);
    updateArray(selectedItem);
    // updateF(selectedItem);
    // AddtoList(item);
  };

  const handleOnSelectItem = (item) => {
    setModalVisible(true);
    setSelectedItem(item);
    modalfavFind(item.Quote);
    //compareArrays(item.Quote);
    //updateArray(item);
    // AddtoList(item);
  };

  // const rightAction = (item) => {
  //   // const trans = progress.interpolate({
  //   //   inputRange: [0, 1],
  //   //   outputRange: [-80, 0],
  //   // });
  //   // console.log(index)
  //   // setSelectedItem(item);
  //   return (
  //     <TouchableOpacity onPress={() => swipeList(item)}>
  //       <View style={styles.swipeContainer}>
  //         <IconMaterialCI style={styles.swipeLogo} name="playlist-plus" />
  //         <Text style={styles.swipeText}>Add</Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  // const leftAction = (quote) => {
  //   // const trans = progress.interpolate({
  //   //   inputRange: [0, 50, 100, 101],
  //   //   outputRange: [-20, 0, 0, 1],
  //   // });
  //   // console.log(index)

  //   // setSelectedItem(item);
  //   return (
  //     <TouchableOpacity onPress={() => swipeShare(quote)}>
  //       <View style={styles.swipeContainer}>
  //         <Icon style={styles.swipeLogo} name="share" />
  //         <Text
  //           //  style={[
  //           //   styles.swipeText,
  //           //   {
  //           //     transform: [{ translateX: trans }],
  //           //   },
  //           // ]}
  //           style={styles.swipeText}>
  //           Share
  //         </Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };


  const rightAction =  (item) => {


    let myObj = favarray.find(obj => obj==item);
    if(myObj===item)
    {
      //console.log(myObj)
      favFound=true;
      //console.log(favFound);
      //setFavCheck(true)
    }
    else{
      //setFavCheck(false)
      favFound=false;
      //console.log(favFound);
    }
    //c ompareArraysSwipe(item);
        
        return (
          
          <View style={{flexDirection:"row"}}>
    <View>
    {favFound==true ?<TouchableOpacity onPress={() => swipeFavRemove(item)}>
            <View style={styles.swipeContainer}>
              <IconMaterial
                  style={styles.swipeLogo}
                        name="favorite"
                        size={30}
                        color="white"
                      /><Text
                      style={styles.swipeText}>
                      Favorite
                    </Text>
                  </View>
                </TouchableOpacity>
                    : <TouchableOpacity onPress={() => swipeFavAdd(item)}>
                    <View style={styles.swipeContainer}><IconMaterial
                    style={styles.swipeLogo}
                    name="favorite-border"
                    size={30}
                    color="white"
                  /><Text
                  style={styles.swipeText}>
                  Favorite
                </Text>
              </View>
            </TouchableOpacity>
    } 
              {/* <IconMaterial style={styles.swipeLogo} name="favorite-border" /> */}
              
    </View>
    <View >
    <TouchableOpacity onPress={() =>  swipeListAdd(item)}>
            <View style={{flexDirection: 'column',
        justifyContent: 'center',
        padding: 30,backgroundColor:"#F3029c",  height:"90%",width:130}}>
              <IconMaterialCI style={styles.swipeLogo} name="playlist-plus" />
              <Text
                style={styles.swipeText}>
                Add To List
              </Text>
            </View>
          </TouchableOpacity>
    </View>
          </View>
          
        );
      };

  const leftAction = (quote) => {
    return (
      <TouchableOpacity onPress={() => swipeShare(quote)}>
        <View style={styles.swipeContainer}>
          <Icon style={styles.swipeLogo} name="share" />
          <Text
            style={styles.swipeText}>
            Share
          </Text>
        </View>
      </TouchableOpacity>
    );
  };


  const swipeList = (item) => {
    setModalList(true);
    setSelectedItem(item);
  };

  const swipeShare = async (item) => {
    setSelectedItem(item);
    actionSheetRef.current.show();
    //Share.open({message: item});
    // try {
    //   const result = await Share.share({
    //     message: item,
    //   });
    //   if (result.action === Share.sharedAction) {
    //     if (result.activityType) {
    //       // shared with activity type of result.activityType
    //     } else {
    //       // shared
    //     }
    //   } else if (result.action === Share.dismissedAction) {
    //     // dismissed
    //   }
    // } catch (error) {
    //   alert(error.message);
    // }
  };

  const flatListRef = React.useRef();
  const [borderColorDynamic, setborderColorDynamic] = useState('#A0EC1C');
  // [shouldShow, setShouldShow] = useState(false);

  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    console.log(currentOffset);
    if (currentOffset > 0) {
      // scroll down or on top of ScrollView
      setcount(true);
    } else {
      // scroll up
      setcount(false);
    }
  };

  const toTop = () => {
    // use current
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  const renderlist = ({item, index}) => {
    if (
      index === 0 ||
      index === 4 ||
      index === 8 ||
      index === 12 ||
      index === 16
    ) {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('TopicView', {number: index})}>
          <View
            style={{
              paddingHorizontal: 30,
              paddingVertical: 30,
              justifyContent: 'center',
            }}>
            <View style={{width: 100, justifyContent: 'center'}}>
              <View
                style={{
                  backgroundColor: item.Color,
                  marginTop: 5,
                  height: 45,
                  width: 45,
                  alignSelf: 'center',
                  borderRadius: 10,
                }}></View>
              <Text
                style={{
                  marginTop: 8,
                  fontSize: 16,
                  color: 'grey',
                  alignSelf: 'center',
                  marginLeft: 2,
                }}>
                {item.Category}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          //onPress={() =>  navigation.navigate("TopicList")}
          onPress={() => handleOnSelectItem(item)}>
          {/* {setborderColorDynamic(item.Color)} */}
          <Swipeable
            renderLeftActions={() => leftAction(item)}
            renderRightActions={() => rightAction(item.Quote)}>
            <View
              style={{
                width: '95%',
                paddingTop: 10,
                padding: 20,
                flexDirection: 'row',
                marginVertical: 8,
                marginHorizontal: 16,
              }}>
              <View
                style={{
                  backgroundColor: item.Color,
                  width: '1.5%',
                  borderRadius: 20,
                }}></View>
              <View
                style={{flexDirection: 'column', marginLeft: 8, width: '92%'}}>
                <Text style={[styles.firstauthor]}>{item.Quote}</Text>
                <Text
                  style={{
                    paddingLeft: 6,
                    fontSize: 10,
                    marginTop: 5,
                    color: 'grey',
                  }}>
                  {item.Author}
                </Text>
                <Text style={[styles.firsttextbody]}>{item.Reference}</Text>
              </View>
            </View>
          </Swipeable>
        </TouchableOpacity>

        //     <View style={styles.item}>
        //     {/* <View style={styles.colorblock}></View> */}
        //     <View style={[{borderColor:item.Color,borderLeftWidth:2, }]}>
        //     <TouchableOpacity
        //     //onPress={() =>  navigation.navigate("TopicList")}
        //      onPress={() => handleOnSelectItem(item)} >
        //     {/* {setborderColorDynamic(item.Color)} */}
        //     <Swipeable
        //     renderLeftActions={leftAction}
        //     renderRightActions={rightAction}
        //     >
        //     <Text
        //    style={[styles.firstauthor]}
        //  >{item.Quote}</Text>

        //  <Text
        //    style={[styles.firsttextbody ]}
        //  >{item.Author}</Text>
        //  <Text
        //     style={[styles.firsttextbody]}
        //  >{item.Reference}</Text>
        //  </Swipeable>
        //   </TouchableOpacity>
        //   </View>
        //   </View>

        // <View style={styles.item}>

        // <Text style={styles.firstauthor}>{item.title}</Text>
        // <Text style={styles.firsttextbody}>{item.body}</Text>
        // </View>
      );
    }
  };

  return (
    <View style={styles.container}>
    
      <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />

      {/* <TouchableOpacity onPress={getData}><Text>Show data</Text></TouchableOpacity> */}

      <FlatList
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        contentContainerStyle={{paddingBottom: 200}}
        ref={flatListRef}
        onScroll={handleScroll}
        data={loadTopics}
        renderItem={renderlist}
        keyExtractor={(item, index) => index.toString()}
      />
      {/* <TouchableOpacity  onPress={() => toTop()} style={styles.fb}>
   <Icon
        style={styles.fabIcon}
         name="arrow-up"
     />

   </TouchableOpacity> */}

      {modalVisible == true ? (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          {/* <View style={styles.modalContainer} > */}
          <SafeAreaView style={styles.modalContainer}>
            <View
              style={{
                width: '100%',
                height: 60,
                justifyContent: 'center',
                borderBottomWidth: 0.5,
                borderColor: 'grey',
                paddingHorizontal: 40,
              }}>
              <TouchableHighlight
                style={{alignSelf: 'flex-end'}}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <IconEntypo name="cross" size={25} color="white" />
              </TouchableHighlight>
            </View>

            <ScrollView>
              <View
                style={{
                  width: deviceWidth,
                  marginTop: 40,
                  paddingHorizontal: 30,
                }}>
                <Text style={{color: 'white', fontSize: 34, textAlign: 'auto'}}>
                  {selectedItem.Quote}
                </Text>
              </View>

              <View
                style={{
                  width: 50,
                  marginTop: 60,
                  backgroundColor: selectedItem.Color,
                  height: 5,
                  alignSelf: 'center',
                  borderRadius: 20,
                  paddingHorizontal: 30,
                }}></View>

              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'column',
                  alignSelf: 'center',
                  borderRadius: 20,
                  paddingHorizontal: 30,
                }}>
                <Text style={{color: 'grey', fontSize: 16}}>
                  {selectedItem.Author}
                </Text>

                <Text
                  style={{
                    color: 'grey',
                    marginTop: 5,
                    fontStyle: 'italic',
                    fontSize: 16,
                  }}>
                  {selectedItem.Reference}
                </Text>
              </View>

              <View
                style={{
                  marginTop: 70,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  borderRadius: 20,
                  paddingHorizontal: 30,
                }}>
 {favFound==true ?<TouchableOpacity onPress={() => swipeFavRemove(selectedItem.Quote)}>
        <View >
          <IconMaterial
              
                    name="favorite"
                    size={30}
                    color="white"
                  />
              </View>
            </TouchableOpacity>
                : <TouchableOpacity onPress={() => swipeFavAdd(selectedItem.Quote)}>
                <View ><IconMaterial
                
                name="favorite-border"
                size={30}
                color="white"
              />
          </View>
        </TouchableOpacity>
} 

                <TouchableHighlight
                  style={{marginLeft: 35,borderColor:'#2596be',borderRadius:8,borderWidth:2,padding:4}}
                  onPress={() => {
                    //modalShare();
                    actionSheetRef.current.show();
                    setModalVisible(!modalVisible);
                  }}>
                  <IconEntypo name="share" size={30} color="white" />
                </TouchableHighlight>

                <TouchableHighlight
                  style={{marginLeft: 35}}
                  onPress={() => {
                    setModalList(!modalList);
                    setListQuote(selectedItem.Quote);
                    setModalVisible(!modalVisible);
                  }}>
                  <IconMaterialCI
                    name="playlist-plus"
                    size={30}
                    color="white"
                  />
                </TouchableHighlight>
              </View>

              <View
                style={{
                  marginTop: 40,
                  backgroundColor: 'grey',
                  height: 0.5,
                  width: deviceWidth,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  borderRadius: 20,
                  paddingHorizontal: 30,
                }}></View>

              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  width: deviceWidth,
                }}>
                <View
                  style={{
                    marginTop: 20,
                    backgroundColor: selectedItem.Color,
                    height: 70,
                    width: 70,
                    alignSelf: 'center',
                    borderRadius: 10,
                    paddingHorizontal: 30,
                  }}></View>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'grey',
                    fontSize: 16,
                    marginTop: 10,
                  }}>
                  {selectedItem.Category}
                </Text>
              </View>

              <View style={{height: 50}}></View>
            </ScrollView>
          </SafeAreaView>

          {/* <View style={styles.modalContainer} >
    
          <View style={styles.modalView}>
        
          <View style={styles.modalTopBar}>
          
          <TouchableHighlight
              
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
         <IconEntypo name="cross" size={25} color="white" />
            </TouchableHighlight>
            </View>

             <View style={styles.modalTextContainer}>
    <Text style={styles.modalQuote}>{selectedItem.Quote}</Text>
    <View style={styles.modalBar}></View>
    <Text style={styles.modalAuthor}>{selectedItem.Author}</Text>
              </View>



         {/* <View style={styles.modalButtonContainer}>
         <TouchableHighlight
              
              onPress={() => {
                modalFav();
              }}
            >
         <IconMaterial  
          name="favorite-border" size={25} color="white"/>
            </TouchableHighlight>

            <TouchableHighlight
              
              onPress={() => {
                modalShare();
              }}
            >
         <IconEntypo  
         name="share" size={25} color="white"/>
            </TouchableHighlight>


            <TouchableHighlight
              
              onPress={() => {
                setModalList(!modalList);
                setModalVisible(!modalVisible);
              }}
            >
         <IconMaterialCI 
         name="playlist-plus" size={25} color="white"/>
            </TouchableHighlight>
         </View> */}

          {/* </View>
        </View>
     */}
        </Modal>
      ) : null}

      {/* {modalVisible==true ?  <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
       
      >
        <View style={styles.modalContainer} >
    
          <View style={styles.modalView}>
          <View style={styles.modalTopBar}>
          <TouchableHighlight
              
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
         <IconEntypo name="cross" size={25} color="white" />
            </TouchableHighlight>
            </View>

             <View style={styles.modalTextContainer}>
    <Text style={styles.modalQuote}>{selectedItem.Quote}</Text>
    <View style={styles.modalBar}></View>
    <Text style={styles.modalAuthor}>{selectedItem.Author}</Text>
              </View>
         <View style={styles.modalButtonContainer}>
         <TouchableHighlight
              
              onPress={() => {
                modalFav();
              }}
            >
         <IconMaterial  
          name="favorite-border" size={25} color="white"/>
            </TouchableHighlight>

            <TouchableHighlight
              
              onPress={() => {
                modalShare();
              }}
            >
         <IconEntypo  
         name="share" size={25} color="white"/>
            </TouchableHighlight>


            <TouchableHighlight
              
              onPress={() => {
                setModalList(!modalList);
                setModalVisible(!modalVisible);
              }}
            >
         <IconMaterialCI 
         name="playlist-plus" size={25} color="white"/>
            </TouchableHighlight>
         </View>

          </View>
        </View>
      </Modal> : null } */}

      {modalList == true ? (
        <Modal animationType="slide" transparent={true} visible={modalList}>
          <View style={styles.modalListContainer}>
            <View style={styles.modalView}>
              <View style={styles.modalTopBar}>
                <TouchableHighlight
                  onPress={() => {
                    setModalList(!modalList);
                  }}>
                  <IconEntypo name="cross" size={25} color="white" />
                </TouchableHighlight>
              </View>
              <View style={styles.modalHeading}>
                <Text style={styles.modalHeadingText}>Create a new list</Text>
              </View>

              <View style={styles.modalTextContainer}>
                <TextInput
                  style={styles.listInput}
                  underlineColor="black"
                  selectionColor="black"
                  label="Name"
                  placeholder="Enter List Name"
                  value={listName}
                  onChangeText={(listName) => setlistName(listName)}
                />
                <TextInput
                  style={styles.listInput}
                  label="Description"
                  placeholder="Enter Description"
                  value={listDesc}
                  onChangeText={(listDesc) => setlistDesc(listDesc)}
                />
              </View>
              <View style={styles.modalListButtonConatiner}>
                <TouchableHighlight
                  style={styles.modalListButtonRed}
                  onPress={() => {
                    //getData();
                    setModalList(!modalList);
                  }}>
                  <Text style={styles.modalListButtonText}>Cancel</Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={styles.modalListButtonGreen}
                  onPress={() => {
                    updateList();
                  }}>
                  <Text style={styles.modalListButtonText}>Create</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      ) : null}

{shareModal == true ? (
        <Modal animationType="slide" transparent={true} visible={shareModal}>
          <View style={styles.shareModalView}>
            {/* <View style={styles.shareTopBar}>
              <Text>Share Image</Text>
              <TouchableHighlight
                style={styles.shareCorss}
                onPress={() => {
                  setmodalShare(!modalShare);
                }}>
                <IconEntypo name="cross" size={25} color="white" />
              </TouchableHighlight>
            </View> */}
            <View
              style={{
                width: '100%',
                height: 60,
                justifyContent: 'center',
                borderBottomWidth: 0.5,
                borderColor: 'grey',
                paddingHorizontal: 5,
              }}>
                <View
                style={{flexDirection:"row" ,justifyContent:"space-between"}}>
                  <View style={{alignSelf:"flex-start"}}>
                  <Text
                 style={{
                  //alignSelf:"flex-start",
                  color:"white",
                  fontSize: 25,
                }}
                >Share Image</Text>
                  </View>
                <View
                style={{alignSelf:"flex-end"}}>

                <TouchableHighlight
                //style={{alignSelf: 'flex-end'}}
                onPress={() => {
                  setshareModal(!shareModal);
                }}>
                <IconEntypo name="cross" size={25} color="white" />
              </TouchableHighlight>
                </View>
              
                </View>
                
            </View>
            <ScrollView>
            <ViewShot style={styles.sendingView} ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
            <View
                style={{
                  width: deviceWidth,
                  height:deviceHeight/2,
                  marginTop: 40,
                  paddingHorizontal: 15,
                  backgroundColor:shareColor,
                  justifyContent:"center"
                }}>
         <Image source={require('../images/logo.jpg')}
                  style={{alignSelf:"flex-start",height:60,width:60,borderRadius:20,marginTop:3}}/>
                <Text style={{color: shareTextColor, fontSize: 30, textAlign: 'auto',paddingTop:0}}>
                  {selectedItem.Quote}
                </Text>
                <View
                style={{
                  width: 50,
                  marginTop: 10,
                  backgroundColor: selectedItem.Color,
                  height: 5,
                  alignSelf: 'center',
                  borderRadius: 20,
                  paddingHorizontal: 30,
                }}></View>
                <View
                style={{
                  marginTop: 20,
                  flexDirection: 'column',
                  alignSelf: 'center',
                  borderRadius: 20,
                  paddingHorizontal: 30,
                }}>
                <Text style={{color: shareTextColor, fontSize: 16}}>
                  {selectedItem.Author}
                </Text>

                <Text
                  style={{
                    alignSelf:"center",
                    color: shareTextColor,
                    marginTop: 5,
                    fontStyle: 'italic',
                    fontSize: 16,
                  }}>
                  {selectedItem.Reference}
                </Text>
              </View>
              </View>
              

             
               
               
                {/* <Text
                  style={styles.textStyle}>
                  {selectedItem.Quote}
                </Text>
                <View style={styles.dummy}></View> */}
                </ViewShot>              
                <View style={styles.colorRow}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => whiteColor()
                                 }>
                  <View style={styles.colorCol}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        marginLeft: 20,
                        alignSelf: 'center',
                        height: 60,
                        width: 60,
                      }}></View>
                    <Text style={styles.textStyle}> White</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => blackColor()}>
                  <View style={styles.colorCol}>
                    <View
                      style={{
                        backgroundColor: 'black',
                        marginLeft: 20,
                        alignSelf: 'center',
                        height: 60,
                        width: 60,
                      }}></View>
                    <Text style={styles.textStyle}> Black</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => blueColor()}>
                  <View style={styles.colorCol}>
                    <View
                      style={{
                        backgroundColor: 'blue',
                        marginLeft: 20,
                        alignSelf: 'center',
                        height: 60,
                        width: 60,
                      }}></View>
                    <Text style={styles.textStyle}> Colored</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
style={{backgroundColor:"blue",height:60,width:60, alignSelf:"center",
borderRadius:30,alignItems:"center",marginTop:10}}
                onPress={() => shareDummyImage()}>
                 <Icon style={{alignSelf:"center",paddingTop:10}} name="share" size={30} color="white"/>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>
      ) : null}



<ActionSheet ref={actionSheetRef}>
        <View style={styles.shareTypeModalView}>
          <TouchableOpacity
          onPress={() => modalShare()}>
          <View style={{marginTop:5,paddingHorizontal:5,flexDirection:"row"}}>
          <Text style={{fontSize:20,color:"white"}}> Text</Text>
          <Icon style={{alignSelf:"flex-end",marginLeft:20}} size={20} color={"white"}   name="type" />
            
          </View>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => setshareModal(!shareModal)}>
          <View style={{marginTop:5,paddingHorizontal:5,flexDirection:"row"}} //style={styles.shareTypeRow}
          >
            <Text style={{fontSize:20,color:"white"}}> Image</Text>
            <IconMaterialCI style={{alignSelf:"flex-end",marginLeft:20}} size={20} color={"white"}   name="image-outline" />
          </View>
          </TouchableOpacity>
        </View>
      </ActionSheet>


      {count === true ? (
        <TouchableOpacity onPress={() => toTop()} style={styles.fb}>
          <Icon style={styles.fabIcon} name="arrow-up-circle" />
        </TouchableOpacity>
      ) : null}
      {/* {shouldShow == true ? <TouchableOpacity  onPress={() => toTop()} style={styles.fb}>
   <Icon
        style={styles.fabIcon}
         name="arrow-up"
     />
   </TouchableOpacity> : null}   */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: deviceHeight,
    width: deviceWidth,
    backgroundColor: '#303030',
    justifyContent: 'center',
  },
  item: {
    //backgroundColor: 'white',
    paddingTop: 10,
    padding: 20,
    width: '95%',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  firstauthor: {
    paddingLeft: 6,
    fontSize: 20,
    color: 'white',
  },
  firsttextbody: {
    paddingLeft: 6,
    fontSize: 10,
    color: 'grey',
  },
  btncontainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 8,
    alignItems: 'baseline',
    backgroundColor: '#303030',
  },
  headerbtn: {
    width: 60,
    height: 60,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: 'white',
    position: 'absolute',
  },
  cirlceIcon: {
    fontSize: 30,
    color: 'black',
  },
  fabIcon: {
    fontSize: 40,
    color: 'white',
  },
  colorblock: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  fabIcon: {
    fontSize: 24,
    color: 'grey',
  },
  fb: {
    justifyContent: 'center',
    //alignSelf:"baseline",
    //marginBottom:120,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: AppConstance.colorChosen,
    position: 'absolute',
    bottom: 140,
    right: 10,
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#303030',
    padding: 35,
    shadowColor: '#000',
  },
  modalTopBar: {
    alignSelf: 'flex-end',
    marginTop: -5,
    position: 'absolute',
  },
  modalButtonConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalBar: {
    marginLeft: 60,
    width: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  modalQuote: {
    padding: 5,
    color: 'white',
    fontSize: 35,
  },
  modalAuthor: {
    marginLeft: 50,
    paddingTop: 20,
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    height: deviceHeight,
    width: deviceWidth,
    backgroundColor: '#303030',
  },
  modalListContainer: {
    height: deviceHeight / 2,
    width: deviceWidth,
    backgroundColor: '#303030',
  },
  modalListButtonConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignSelf: 'flex-end',
  },
  modalListButtonGreen: {
    backgroundColor: 'green',
    width: '30%',
    height: 40,

    marginLeft: 5,
    marginRight: 5,
    borderRadius: 2,
  },
  modalListButtonRed: {
    backgroundColor: '#303030',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 50,
    width: '30%',
    height: 40,
  },
  modalListButtonText: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  modalTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  swipeContainer: {
    backgroundColor: '#2596be',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 30,
    height:"90%"
  },
  swipeLogo: {
    color: 'white',
    fontSize: 40,
    paddingTop: 10,
  },
  swipeText: {
    color: 'white',
    fontSize: 20,
  },  
  listInput: {
    padding: 5,
    marginTop: 10,
    marginBottom: 20,
    width: 250,

    fontSize: 20,
  },
  modalHeading: {
    alignItems: 'center',
    marginBottom: 12,
  },
  modalHeadingText: {
    fontSize: 22,
    color: 'white',
  },
  colorRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  colorCol: {
    flexDirection: 'column',
    paddingRight: 10,
  },
  shareModalView: {
    flexDirection: 'column',
    height: deviceHeight,
    width: deviceWidth,
    backgroundColor: '#303030',
    justifyContent: 'center',
  },
  textStyle: {
    paddingTop: 5,
    alignSelf: 'center',
    paddingLeft: 15,
    color: 'white',
  },
  shareTopBar: {
    flexDirection: 'row',
  },
  shareCorss: {},
  dummy: {
    width: 0,
    height: 0,
    borderTopWidth: 120,
    borderTopColor: 'yellow',
    borderLeftColor: 'black',
    borderLeftWidth: 120,
    borderRightColor: 'black',
    borderRightWidth: 120,
    borderBottomColor: 'yellow',
    borderBottomWidth: 120,
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
    borderBottomRightRadius: 120,
    borderBottomLeftRadius: 120,
  },
  sendingView: {
    padding: 20,
    alignItems: 'center',
  },
  shareTypeModalView: {
    height: 100,
    width: deviceWidth,
    backgroundColor: '#303030',
    borderRadius:10
  },
  shareType: {
    flex:1,
    flexDirection: 'row',
    width: deviceWidth,
    alignItems:"center",
  },
});
export default Topics;
