import React, {useState,createRef,useRef, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  Modal,
  FlatList,
  Linking,
  ScrollView,
  SafeAreaView
} from 'react-native';
import {deviceHeight, deviceWidth} from '../Components/constance/AppConstance';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconMaterialCI from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import AppConstance from '../Components/constance/AppConstance';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ViewShot,{captureRef} from 'react-native-view-shot';
import ActionSheet from "react-native-actions-sheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-paper';
import Share from 'react-native-share';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import {  InterstitialAd,AdEventType,RewardedAd, RewardedAdEventType,BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import Snackbar from 'react-native-snackbar';

const IadUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3940256099942544/1033173712';

const interstitial = InterstitialAd.createForAdRequest(IadUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],  
});


const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-3940256099942544/2934735716';
let favFound=false;

const Title = () => {

  const showSnackbarMessage = () => {
    setTimeout(() => {
      Snackbar.show({
        backgroundColor: '#2596be',
        text: 'Link not Found',
        duration: Snackbar.LENGTH_SHORT,
      });
    }, 250);
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
 


  const [loaded, setLoaded] = useState(false);
  const [favarray, setfavArray] = useState(["hello"]);
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

},[])


  const actionSheetRef = createRef();
  let actionSheet;
  const [listName, setlistName] = useState('');
  const [listDesc, setlistDesc] = useState('');
  const [shareModal, setshareModal] = useState(false);
  const [modalList, setModalList] = useState(false);
  const [modalMain, setModalMain] = useState(false);
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
  const blueColor=()=>{
    setshareTextColor("white");
    setshareColor("blue");
  }
  const shareDummyImage = async () => {
   viewShotRef.current.capture().then((uri) => {
      console.log('do something with ', uri);
      Share.open({url: uri});
    });
  }
  const modalShare = async () => {
    Share.open({message: selectedQuote});

  };

  const updateArray = (item) => {
    updateFav(item);
  };

  const storeData = async (value) => {
    try {
      let jsonValue = JSON.stringify(value);

      console.log('saving ' + jsonValue);
      await AsyncStorage.setItem('favo', jsonValue);
      //await AsyncStorage.mergeItem('@storage_Key')
      favArray = '';
      return getFav();
    } catch (e) {
      // saving error
    }
  };
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


  const updateList = async () => {
item=selectedQuote;
    // const productToBeSaved = { ‘item’ : this.state.productDescription , ‘currencyRate’ : this.state.currencyRate , ‘date’ : this.state.date }
    try {
      await AsyncStorage.getItem(listName).then((value) => {
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

        // storeData(favArray);
        // storeData(fav)
      });
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



  const modalFav = () => {
    //setModalVisible(true);
    updateArray(selectedQuote);
    // updateF(selectedItem);
    // AddtoList(item);
  };




  const [value, setValue] = useState(null);
  const [items, setItems] = useState([ 
    {label: '', value: 'false', 
    icon: () =>
      <Icon
      style={styles.btnIcon} 
      name="list" />,selected:true
    }, 
    {label: '', value: 'true',
    icon: () => 
    <IconMaterialCI 
     style={styles.btnIcon}
     name="grid" />
    }

    
  ]);
  let controller;
  const [itemsSort, setItemsSort] = useState([
    {
      label: '',
      value: 'false',
      icon: () => (
        <IconFontAwesome5 style={styles.btnIcon} name="sort-numeric-up" />
      ),
      selected: true,
    },
    {
      label: '',
      value: 'true',
      icon: () => (
        <IconFontAwesome5 style={styles.btnIcon} name="sort-numeric-down" />
      ),
    },
  ]);
  const sortt = (itemValue, itemIndex) => {
    let newarray = [...data];

    newarray.sort((a, b) => {
      if (a.location == itemIndex) {
        return -1;
      } else {
        return 1;
      }
    });
    setdata(newarray);
  };

  const [showGrid, setshowGrid] = useState(false);
  //const [modalVisible, setModalVisible] = useState(false);
  // const [AuthorName, setAuthorName] = useState();
  // const [AuthorPic, setAuthorPic] = useState();
  // const [AuthorQuote, setAuthorQuote] = useState();
  // const [Wiki, setWiki] = useState();
  const [count, setcount] = useState(false);
  const flatListRef = React.useRef();

  const toTop = () => {
    // use current
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    //console.log(currentOffset)
    if (currentOffset > 0) {
      // scroll down or on top of ScrollView
      setcount(true);
    } else {
      // scroll up
      setcount(false);
    }
  };

  const loadInBrowser = (url) => {
    if(url!=="")
    {
      Linking.openURL(url).catch((err) => console.error('Error', err));
    }
else
{
  showSnackbarMessage();
}
    //Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedQuote, setSelectedQuote] = useState(null);

  const handleOnSelectItem = (item) => {
    setSelectedItem(item);
    setModalVisible(!modalVisible);
    if(loaded==true)
    {
      interstitial.show();

    }
  };

  const modalfavFind=(item)=>{
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
  }

  const shareQuoteSelect = (item) => {
    setSelectedQuote(item);
    setModalVisible(!modalVisible);
    setModalMain(!modalMain);
    //compareArrays(item);
    modalfavFind(item);
  };

  const [data, setdata] = useState([
    {
      PicName: require('../images/veronica.jpg'),
      Reference:"Veronica decided to die",
      Quote: [
        'The two hardest tests on the spiritual road are the patience to wait for the right moment and the courage not to be disappointed with what we encounter.',
        'People never learn anything by being told, they have to find out for themselves.',

      ],
      Author: 'Paulo Coelho',
      Wiki: 'https://www.amazon.com/gp/product/0061124265/ref=x_gr_w_bb_glide_sout?ie=UTF8&tag=x_gr_w_bb_glide_sout-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0061124265&SubscriptionId=1MGPYB6YW3HWK55XCGG2',
    },
    {
      PicName: require('../images/alchemist.jpg'),
      Reference:"The Alchemist",
      Quote: [
        'Your eyes show the strength of your soul.',
        'When each day is the same as the next, itâ€™s because people fail to recognize the good things that happen in their lives every day that the sun rises.',

        "It's the possibility of having a dream come true that makes life interesting.",
        'When we love, we always strive to become better than we are. When we strive to become better than we are, everything around us becomes better too.',
        'One is loved because one is loved. No reason is needed for loving.',
        'There is only one thing that makes a dream impossible to achieve: the fear of failure.',
        'So, I love you because the entire universe conspired to help me find you.',
        'The secret of life, though, is to fall seven times and to get up eight times.',
        'The simple things are also the most extraordinary things, and only the wise can see them.',
        'Everyone seems to have a clear idea of how other people should lead their lives, but none about his or her own.',
        'Everyone seems to have a clear idea of how other people should lead their lives, but none about his or her own.',
        'Remember that wherever your heart is, there you will find your treasure.',
        "Tell your heart that the fear of suffering is worse than the suffering itself. And that no heart has ever suffered when it goes in search of its dreams, because every second of the search is a second's encounter with God and with eternity.",
        "No matter what he does, every person on earth plays a central role in the history of the world. And normally he doesn't know it.",
        "Don't give in to your fears. If you do, you won't be able to talk to your heart.",
        "This is what we call love. When you are loved, you can do anything in creation. When you are loved, there's no need at all to understand what's happening, because everything happens within you.",
        'People are capable, at any time in their lives, of doing what they dream of.',
        'We are travelers on a cosmic journey,stardust,swirling and dancing in the eddies and whirlpools of infinity. Life is eternal. We have stopped for a moment to encounter each other, to meet, to love, to share.This is a precious moment. It is a little parenthesis in eternity.',
        'Everything that happens once can never happen again. But everything that happens twice will surely happen a third time.',
        "If someone isn't what others want them to be, the others become angry. Everyone seems to have a clear idea of how other people should lead their lives, but none about his or her own.",
        'I dont live in either my past or my future. Iâ€™m interested only in the present. If you can concentrate always on the present, youâ€™ll be a happy man. Life will be a party for you, a grand festival, because life is the moment weâ€™re living now.',

      ],
      Author: 'Paulo Coelho',
      Wiki: 'https://www.amazon.com/Alchemist-Paulo-Coelho/dp/0062315005/ref=sr_1_2?crid=2KZPKELRQBP4V&dchild=1&keywords=paulo+coelho&qid=1611820549&sprefix=paulo%2Caps%2C416&sr=8-2',
    },
    {
      PicName: require('../images/zahir.jpg'),
      Reference:"The Zahir",
      Quote: [
        "When someone leaves, it's because someone else is about to arrive.",
        "Ester asked why people are sad.'Thatâ€™s simple,' says the old man. 'They are the prisoners of their personal history. Everyone believes that the main aim in life is to follow a plan. They never ask if that plan is theirs or if it was created by another person. They accumulate experiences, memories, things, other people's ideas, and it is more than they can possibly cope with. And that is why they forget their dreams.",
        'Life is too short, or too long, for me to allow myself the luxury of living it so badly.',
        'Our true friends are those who are with us when the good things happen. They cheer us on and are pleased by our triumphs. False friends only appear at difficult times, with their sad, supportive faces, when, in fact, our suffering is serving to console them for their miserable lives.',

      ],
      Author: 'Paulo Coelho',
      Wiki: 'https://www.amazon.com/gp/product/0060832819/ref=x_gr_w_bb_glide_sout?ie=UTF8&tag=x_gr_w_bb_glide_sout-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0060832819&SubscriptionId=1MGPYB6YW3HWK55XCGG2',
    },  
    {
      PicName: require('../images/portobello.jpg'),
      Reference:"The Witch of Porto Bello",
      Quote: [
        "Anyone who is observant, who discovers the person they have always dreamed of, knows that sexual energy comes into play before sex even takes place. The greatest pleasure isn't sex, but the passion with which it is practiced. When the passion is intense, then sex joins in to complete the dance, but it is never the principal aim.",
        "After all, what is happiness? Love, they tell me. But love doesn't bring and never has brought happiness. On the contrary, it's a constant state of anxiety, a battlefield; it's sleepless nights, asking ourselves all the time if we're doing the right thing. Real love is composed of ecstasy and agony.",
        "What is a teacher? I'll tell you: it isn't someone who teaches something, but someone who inspires the student to give of her best in order to discover what she already knows.",

      ],
      Author: 'Paulo Coelho',
      Wiki: 'https://www.amazon.com/gp/product/0061338818/ref=x_gr_w_bb_glide_sout?ie=UTF8&tag=x_gr_w_bb_glide_sout-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0061338818&SubscriptionId=1MGPYB6YW3HWK55XCGG2',
    },  
    {
      PicName: require('../images/mountain.jpg'),
      Reference:"The Fifth Mountain",
      Quote: [
        'There are moments when troubles enter our lives and we can do nothing to avoid them.But they are there for a reason. Only when we have overcome them will we understand why they were there.',

      ],
      Author: 'Paulo Coelho',
      Wiki: 'https://www.amazon.com/Fifth-Mountain-Novel-Paulo-Coelho/dp/0061729256/ref=sr_1_1?dchild=1&keywords=the+fifth+mountain&qid=1611821928&s=books&sr=1-1',
    },  
    {
      PicName: require('../images/prym.jpg'),
      Reference:"The Devil and Miss Prym",
      Quote: [
        'When we least expect it, life sets us a challenge to test our courage and willingness to change; at such a moment, there is no point in pretending that nothing has happened or in saying that we are not yet ready. The challenge will not wait. Life does not look back. A week is more than enough time for us to decide whether or not to accept our destiny.',
        'Anyone who loves in the expectation of being loved in return is wasting their time.',

      ],
      Author: 'Paulo Coelho',
      Wiki: 'https://www.amazon.com/gp/product/0060527994/ref=x_gr_w_bb_sout?ie=UTF8&tag=x_gr_w_bb_sout-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0060527994&SubscriptionId=1MGPYB6YW3HWK55XCGG2',
    },  
    {
      PicName: require('../images/eleven.jpg'),
      Reference:"Eleven Minutes",
      Quote: [
        "Everything tells me that I am about to make a wrong decision, but making mistakes is just part of life. What does the world want of me? Does it want me to take no risks, to go back to where I came from because I didn't have the courage to say 'yes' to life?",
        "When I had nothing to lose, I had everything. When I stopped being who I am, I found myself.",
        "I can choose either to be a victim of the world or an adventurer in search of treasure. It's all a question of how I view my life.",
        'Anyone who has lost something they thought was theirs forever finally comes to realise that nothing really belongs to them.',
        'No one loses anyone, because no one owns anyone. That is the true experience of : having the most important thing in the world without owning it',
        'The strongest love is the love that can demonstrate its fragility.',
        "Anyone who is in love is making love the whole time, even when they're not. When two bodies meet, it is just the cup overflowing. They can stay together for hours, even days. They begin the dance one day and finish it the next, or--such is the pleasure they experience--they may never finish it. No eleven minutes for them.",

        "Passion makes a person stop eating, sleeping, working, feeling at peace. A lot of people are frightened because, when it appears, it demolishes all the old things it finds in its path.No one wants their life thrown into chaos. That is why a lot of people keep that threat under control, and are somehow capable of sustaining a house or a structure that is already rotten. They are the engineers of the superseded.Other people think exactly the opposite: they surrender themselves without a second thought, hoping to find in passion the solutions to all their problems. They make the other person responsible for their happiness and blame them for their possible unhappiness. They are either euphoric because something marvelous has happened or depressed because something unexpected has just ruined everything.Keeping passion at bay or surrendering blindly to it - which of these two attitudes is the least destructive?I don't know.",     
        'When we meet someone and fall in love, we have a sense that the whole universe is on our side. And yet if something goes wrong, there is nothing left! How is it possible for the beauty that was there only minutes before to vanish so quickly? Life moves very fast. It rushes from heaven to hell in a matter of seconds.',
 
            ],
      Author: 'Paulo Coelho',
      Wiki: 'https://www.amazon.com/Eleven-Minutes-Novel-Paulo-Coelho/dp/0060589280/ref=sr_1_1?crid=1HSSBQ1Q4R5HM&dchild=1&keywords=eleven+minutes+by+paulo+coelho&qid=1611820729&sprefix=eleven+minutes%2Caps%2C361&sr=8-1',
    },  
    {
      PicName: require('../images/wept.jpg'),
      Reference:"By the River Piedra I Sat Down and Wept",
      Quote: [
        'Waiting is painful. Forgetting is painful. But not knowing which to do is the worst kind of suffering.',
        'If pain must come, may it come quickly. Because I have a life to live, and I need to live it in the best way possible. If he has to make a choice, may he make it now. Then I will either wait for him or forget him.',
        'But love is always new. Regardless of whether we love once, twice, or a dozen times in our life, we always face a brand-new situation. Love can consign us to hell or to paradise, but it always takes us somewhere. We simply have to accept it, because it is what nourishes our existence. If we reject it, we die of hunger, because we lack the courage to stretch out a hand and pluck the fruit from the branches of the tree of life. We have to take love where we find it, even if that means hours, days, weeks of disappointment and sadness.The moment we begin to seek love, love begins to seek us. And to save us.',
        "I've been in love before, it's  a narcotic. At first it brings the euphoria of complete surrender. The next day you want more. You're not addicted yet, but you  the sensation, and you think you can still control things.You think about the person you love for two minutes then forget them for three hours. But then you get used to that person, and you begin to be completely dependent on them. Now you think about him for three hours and forget him for two minutes. If he's not there, you feel  an addict who can't get a fix. And just as addicts steal and humiliate themselves to get what they need, you're willing to do anything for love.",
        'In real life, love has to be possible. Even if it is not returned right away, love can only survive when the hope exists that you will be able to win over the person you desire.',

      ],
      Author: 'Paulo Coelho',
      Wiki: 'https://www.amazon.com/s?k=By+the+River+Piedra+I+Sat+Down+and+Wept&SubscriptionId=AKIAINWTLHI2USOG4VUA&tag=bookrags&ref=nb_sb_noss',
    },  
    {
      PicName: require('../images/brida.jpg'),
      Reference:"Brida",
      Quote: [
        'Nothing in the world is ever completely wrong. Even a stopped clock is right twice a day.',
        'When you find your path, you must not be afraid. You need to have sufficient courage to make mistakes. Disappointment, defeat, and despair are the tools God uses to show us the way.',
        'None of us knows what might happen even the next minute, yet still we go forward. Because we trust. Because we have Faith.',
        'Accept what life offers you and try to drink from every cup. All wines should be tasted; some should only be sipped, but with others, drink the whole bottle.',
        'How much I missed, simply because I was afraid of missing it.',

      ],
      Author: 'Paulo Coelho',
      Wiki: 'https://www.amazon.com/gp/product/0061578932/ref=x_gr_w_bb_sout?ie=UTF8&tag=x_gr_w_bb_sout-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0061578932&SubscriptionId=1MGPYB6YW3HWK55XCGG2',
    },  
    {
      PicName: require('../images/speaking.jpg'),
      Reference:"The art of public speaking",
      Quote: [
        "Students of public speaking continually ask, How can I overcome self-consciousness and the fear that paralyzes me before an audience? Did you ever notice in looking from a train window that some horses feed near the track and never even pause to look up at the thundering cars, while just ahead at the next railroad crossing a farmer's wife will be nervously trying to quiet her scared horse as the train goes by? How would you cure a horse that is afraid of cars—graze him in a back-woods lot where he would never see steam-engines or automobiles, or drive or pasture him where he would frequently see the machines? Apply horse-sense to ridding yourself of self-consciousness and fearface an audience as frequently as you can, and you will soon stop shying. You can never attain freedom from stage-fright by reading a treatise. A book may give you excellent suggestions on how best to conduct yourself in the water, but sooner or later you must get wet, perhaps even strangle and be half scared to death. There are a great many wetless bathing suits worn at the seashore, but no one ever learns to swim in them. To plunge is the only way.",
            
      
      "If You Have A Lemon, Make A Lemonade That is what a great educator does. But the fool does the exact opposite. If he finds that  has handed him a lemon, he gives up and says I'm beaten. It is fate. I haven't got a chance. Then he proceeds to rail against the world and indulge in an orgy of selfpity. But when the wise man is handed a lemon, he says What lesson can I learn from this misfortune? How can I improve my situation? How can I turn this lemon into a lemonade?",
      "The words Think and Thank are inscribed in many of the Cromwellian churches of England. These words ought to be inscribed in our hearts, too Think and Thank. Think of all we have to be grateful for, and thank God for all our boons and bounties.",
       
      
	
      "When two partners always agree, one of them is not necessary. If there is some point you haven't thought about, be thankful if it is brought to your attention.",
      
      
      
      "The first sign of greatness is when a man does not attempt to look and act great. Before you can call yourself a man at all, Kipling assure us, you must not look too good nor talk too wise.",
      
  
      ],
      Author: 'Dale Carnegie',
      Wiki: 'https://www.amazon.com/gp/product/1602069379/ref=x_gr_w_bb_sout?ie=UTF8&tag=x_gr_w_bb_sout-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=1602069379&SubscriptionId=1MGPYB6YW3HWK55XCGG2',
    },  
    {
      PicName: require('../images/influence.jpg'),
      Reference:"How to Win Friends and Influence People",
      Quote: [
        "It isn't what you have or who you are or where you are or what you are doing that makes you happy or unhappy. It is what you think about it.",

    
      
        "Don't be afraid of enemies who attack you. Be afraid of the friends who flatter you.",
        
        
        
        
        "You can make more friends in two months by becoming interested in other people than you can in two years by trying to get other people interested in you.",
        
        
        
        
        "Any fool can criticize, complain, and condemn—and most fools do. But it takes character and self-control to be understanding and forgiving.",
        
        
        
        "When dealing with people, remember you are not dealing with creatures of logic, but with creatures bristling with prejudice and motivated by pride and vanity.",
        
        
        
        
        "Everybody in the world is seeking happiness—and there is one sure way to find it. That is by controlling your thoughts. Happiness doesn't depend on outward conditions. It depends on inner conditions.",
        
        
      
        
        "Talk to someone about themselves and they'll listen for hours.",
    
        
        "Actions speak louder than words, and a smile says, ‘I  you. You make me happy. I am glad to see you",
        
        
        
        "When dealing with people, let us remember we are not dealing with creatures of logic. We are dealing with creatures of emotion, creatures bristling with prejudices and motivated by pride and vanity.",
        
      
        
        "Personally I am very fond of strawberries and cream, but I have found that for some strange reason, fish prefer worms. So when I went fishing, I didn’t think about what I wanted. I thought about what they wanted. I didn't bait the hook with strawberries and cream. Rather, I dangled a worm or grasshopper in front of the fish and said Wouldn't you  to have that? Why not use the same common sense when fishing for people?",
        
         
        
        "A man convinced against his will Is of the same opinion still",
        
    
        
        "You can't win an argument. You can't because if you lose it, you lose it; and if you win it, you lose it.",
        
      
        
        "The difference between appreciation and flattery? That is simple. One is sincere and the other insincere. One comes from the heart out; the other from the teeth out. One is unselfish; the other selfish. One is universally admired; the other universally condemned.",
        
      
        
        "To be interesting, be interested.",
        
      
        
        "Names are the sweetest and most important sound in any language.",
        
      
        
        "I have come to the conclusion that there is only one way under high heaven to get the best of an argument— and that is to avoid it. Avoid it as you would avoid rattlesnakes and earthquakes.",
        
    
        
        "If You Want to Gather Honey, Don't Kick Over the Beehive",
        
        
        
        "Why talk about what we want? That is childish. Absurd. Of course, you are interested in what you want. You are eternally interested in it. But no one else is. The rest of us are just  youwe are interested in what we want.",
        
        
        
        "All men have fears, but the brave put down their fears and go forward, sometimes to death, but always to victory.",
        
        
        
        "Instead of condemning people, let’s try to understand them. Let’s try to figure out why they do what they do. That’s a lot more profitable and intriguing than criticism; and it breeds sympathy, tolerance and kindness. “To know all is to forgive all.",
        
        
        
        "Criticism is dangerous, because it wounds a person's precious pride, hurt his sense of importace and arouse resentment.",
        
        
        
        "If some people are so hungry for a feeling of importance that they actually go insane to get it, imagine what miracle you and I can achieve by giving people honest appreciation this side of insanity.",
        
        
        
        "By fighting you never get enough, but by yielding you get more than you expected.",
     
        
        "Once I did bad and that I heard ever. Twice I did good, but that I heard never.",
        
      
        
        "Only knowledge that is used sticks in your mind.",
        
      
        
        "If you argue and rankle and contradict, you may achieve a victory sometimes; but it will be an empty victory because you will never get your opponent's good will.",
        
         
        
        "Arouse in the other person an eager want. He who can do this has the whole world with him. He who cannot walks a lonely way.",
        
        
        
        "A barber lathers a man before he shaves him.",
        
         
        
        "Winning friends begins with friendliness.",
        
         
        
        "The chronic kicker, even the most violent critic, will frequently soften and be subdued in the presence of a patient, sympathetic listener— a listener who will be silent while the irate fault-finder dilates  a king cobra and spews the poison out of his system.",
        "Personally I am very fond of strawberries and cream, but I have found that for some strange reason, fish prefer worms. So when I went fishing, I didn’t think about what I wanted. I thought about what they wanted. I didn't bait the hook with strawberries and cream. Rather, I dangled a worm or grasshopper in front of the fish and said Wouldn't you  to have that? Why not use the same common sense when fishing for people?",

  
      ],
      Author: 'Dale Carnegie',
      Wiki: 'https://www.amazon.com/s?k=How+to+Win+Friends+and+Influence+People&i=stripbooks&adid=082VK13VJJCZTQYGWWCZ&campaign=211041&creative=374001&tag=x_gr_w_bb_sout-20&ref=x_gr_w_bb_sout',
    },  
    {
      PicName: require('../images/living.jpg'),
      Reference:"How to Stop Worrying and Start Living",
      Quote: [
        "When the friendly jailer gave Socrates the poison cup to drink, the jailer said Try to bear lightly what needs must be. Socrates did. He faced death with a calmness and resignation that touched the hem of divinity.",
      
      
        "One of the most distinguished psychiatrists living, Dr. Carl Jung, says in his book Modern Man in Search of a Soul", 
        "During the past thirty years, people from all the civilized countries of the earth have consulted me. I have treated many hundreds of patients. Among all my patients in the second half of -that is to say, over thirty-five-there has not been one whose problem in the last resort was not that of finding a religious outlook on . It is safe to say that every one of them fell ill because he had lost that which the living religions of every age have given to their followers, and none of them has been really healed who did not regain his religious outlook.",
             
        
        "Five hundred years before Christ was born, the Greek philosopher Heraclitus told his students that everything changes except the law of change. He said You cannot step in the same river twice. The river changes every second; and so does the man who stepped in it.  is a ceaseless change. The only certainty is today. Why mar the beauty of living today by trying to solve the problems of a future that is shrouded in ceaseless change and uncertainty-a future that no one can possibly foretell?",
        
        
        
        "One of the most tragic things I know about human nature is that all of us tend to put off living. We are all dreaming of some magical rose garden over the horizon instead of enjoying the roses that are blooming outside our windows today.",
        
        
        
        "I will chum with you, and suffer when you suffer, and laugh when you laugh. I will bite my tongue when impatient words come. I will keep saying as if it were a ritual He is nothing but a boy -- a little boy!",
        
        
        
        "I don't blame you one iota for feeling as you do. If I were you I would undoubtedly feel just as you do.(...) You can say that and be 100 percent sincere, because if you were the other person you, of course, would feel just as he does (...) Suppose you had inherited the same body and temperament and mind (...) Suppose you had had his environment and experiences. You would then be precisely what he was - and where he was. For it is those things -and only those things - that made him what he was. (...) You deserve very little credit for being what you are - and remember, the people who come to you irritated, bigoted, unreasoning, deserve very little discredit for being what they are.",
        "Let's not allow ourselves to be upset by small things we should despise and forget. Remember is too short to be little.",
           
      	
      "When I asked him -Mr.Henry Ford- if he ever worried, he replied No. I believe God is managing affairs and that He doesn't need any advice from me. With God in charge, I believe that every-thing will work out for the best in the end.So what is there to worry about?",
      
      "Let's find and remedy all our weaknesses before our enemies get a chance to say a word. That is what Charles Darwin did. ...When Darwin completed the manuscript of his immortal book The Origin Of Species he realized that the publication of his revolutionary concept of creation would rock the intellectual and religious worlds. So he became his own critic and spent another 15 years checking his data, challenging his reasoning, and criticizing his conclusions.",
       
      "John Wanamaker, founder of the stores that bear his name, once confessed I learned thirty years ago that it is foolish to scold. I have enough trouble overcoming my own limitations without fretting over the fact that God has not seen fit to distribute evenly the gift of intelligence.",
      
      
      "When we are harassed and reach the limit of our own strength, many of us then turn in desperation to God- There are no atheists in foxholes. But why wait till we are desperate? Why not renew our strength every day? Why wait even until Sunday? For years I have had the habit of dropping into empty churches on weekday afternoons. When I feel that I am too rushed and hurried to spare a few minutes to think about spiritual things, I say to myself Wait a minute, Dale Carnegie, wait a minute. Why all the feverish hurry and rush, little man? You need to pause and acquire a little perspective. At such times, I frequently drop into the first church that I find open. Although I am a Protestant, I frequently, on weekday afternoons, drop into St. Patrick's Cathedral on Fifth Avenue, and remind myself that I'll be dead in another thirty years, but that the great spiritual truths that all churches teach are eternal. I close my eyes and pray. I find that doing this calms my nerves, rests my body, clarifies my perspective, and helps me revalue my values. May I recommend this practice to you?",
      ],
      Author: 'Dale Carnegie',
      Wiki: 'https://www.amazon.com/gp/product/0671035975/ref=x_gr_w_bb_sout?ie=UTF8&tag=x_gr_w_bb_sout-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0671035975&SubscriptionId=1MGPYB6YW3HWK55XCGG2',
    },  
    {
      PicName: require('../images/lolita.jpg'),
      Reference:"Lolita",
      Quote: [
        'It was love at first sight, at last sight, at ever and ever sight.',
        'And the rest is rust and stardust.',
        'Lolita, light of my life, fire of my loins. My sin, my soul. Lo-lee-ta: the tip of the tongue taking a trip of three steps down the palate to tap, at three, on the teeth. Lo. Lee. Ta. She was Lo, plain Lo, in the morning, standing four feet ten in one sock. She was Lola in slacks. She was Dolly at school. She was Dolores on the dotted line. But in my arms she was always Lolita. Did she have a precursor? She did, indeed she did. In point of fact, there might have been no Lolita at all had I not loved, one summer, an initial girl-child. In a princedom by the sea. Oh when? About as many years before Lolita was born as my age was that summer. You can always count on a murderer for a fancy prose style. Ladies and gentlemen of the jury, exhibit number one is what the seraphs, the misinformed, simple, noble-winged seraphs, envied. Look at this tangle of thorns.',
        'He broke my heart. You merely broke my life.',
        'Human life is but a series of footnotes to a vast obscure unfinished masterpiece',
        "I need you, the reader, to imagine us, for we don't really exist if you don't.",
        "Oh, don't cry, I'm so sorry I cheated so much, but that's the way things are.",
        'You can always count on a murderer for a fancy prose style.',
        'Words without experience are meaningless.',
        'I knew I had fallen in love with Lolita forever; but I also knew she would not be forever Lolita.',
        "All at once we were madly, clumsily, shamelessly, agonizingly in love with each other; hopelessly, I should add, because that frenzy of mutual possession might have been assuaged only by our actually imbibing and assimilating every particle of each other's soul and flesh; but there we were, unable even to mate as slum children would have so easily found an opportunity to do so.",
        'We loved each other with a premature love, marked by a fierceness that so often destroys adult lives.',
        'She was Lo, plain Lo, in the morning, standing four feet ten in one sock. She was Lola in slacks. She was Dolly at school. She was Dolores on the dotted line. But in my arms she was always Lolita.',
        "I looked and looked at her, and I knew, as clearly as I know that I will die, that I loved her more than anything I had ever seen or imagined on earth. She was only the dead-leaf echo of the nymphet from long ago - but I loved her, this Lolita, pale and polluted and big with another man's child. She could fade and wither - I didn't care. I would still go mad with tenderness at the mere sight of her face.",
        'And presently I was driving through the drizzle of the dying day, with the windshield wipers in full action but unable to cope with my tears.',
        'I loved you. I was a pentapod monster, but I loved you. I was despicable and brutal, and turpid, and everything, mais je tâ€™aimais, je tâ€™aimais! And there were times when I knew how you felt, and it was hell to know it, my little one. Lolita girl, brave Dolly Schiller.',
        'Perhaps, somewhere, some day, at a less miserable time, we may see each other again.',
        'You have to be an artist and a madman, a creature of infinite melancholy, with a bubble of hot poison in your loins and a super-voluptuous flame permanently aglow in your subtle spine (oh, how you have to cringe and hide!), in order to discern at once, by ineffable signsthe slightly feline outline of a cheekbone, the slenderness of a downy limbs, and other indices which despair and shame and tears of tenderness forbid me to tabulatethe little deadly demon among the wholesome children; she stands unrecognized by them and unconscious herself of her fantastic power.',
        'Life is short. From here to that old car you know so well there is a stretch of twenty, twenty-five paces. It is a very short walk. Make those twenty-five steps. Now. Right now. Come just as you are. And we shall live happily ever after. ',
      ],
      Author: 'Vladimir Nabokov',
      Wiki: 'https://www.amazon.com/gp/product/0679723161/?tag=braipick-20',
    },  
    {
      PicName: require('../images/getsby.jpg'),
      Reference:"The great Getsby",
      Quote: [
        'So we beat on, boats against the current, borne back ceaselessly into the past.',
        "I hope she'll be a fool -- that's the best thing a girl can be in this world, a beautiful little fool.",
        'Angry, and half in love with her, and tremendously sorry, I turned away.',
        'And I  large parties. Theyâ€™re so intimate. At small parties there isnâ€™t any privacy.',
        'I was within and without, simultaneously enchanted and repelled by the inexhaustible variety of life.',
        'And so with the sunshine and the great bursts of leaves growing on the trees, just as things grow in fast movies, I had that familiar conviction that life was beginning over again with the summer.',
        'He smiled understandingly-much more than understandingly. It was one of those rare smiles with a quality of eternal reassurance in it, that you may come across four or five times in life. It faced--or seemed to face--the whole eternal world for an instant, and then concentrated on you with an irresistible prejudice in your favor. It understood you just as far as you wanted to be understood, believed in you as you would  to believe in yourself, and assured you that it had precisely the impression of you that, at your best, you hoped to convey.',
        "I wasn't actually in love, but I felt a sort of tender curiosity.",
        'Let us learn to show our friendship for a man when he is alive and not after he is dead.',
        'You see I usually find myself among strangers because I drift here and there trying to forget the sad things that happened to me.',
        'There are only the pursued, the pursuing, the busy and the tired.',
        "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.'Whenever you feel  criticizing any one', he told me, 'just remember that all the people in this world haven't had the advantages that you've had.'",
        'Life starts all over again when it gets crisp in the fall.',
        'Reserving judgements is a matter of infinite hope.',
        'Canâ€™t repeat the past?â€¦Why of course you can!',
        'Theyâ€™re a rotten crowdâ€™, I shouted across the lawn. â€˜Youâ€™re worth the whole damn bunch put together.',
        'In his blue gardens men and girls came and went  moths among the whisperings and the champagne and the stars.',
        'I couldnâ€™t forgive him or  him, but I saw that what he had done was, to him, entirely justified. It was all very careless and confused. They were careless people, Tom and Daisyâ€”they smashed up things and creatures and then retreated back into their money or their vast carelessness, or whatever it was that kept them together, and let other people clean up the mess they had made.',
        'There must have been moments even that afternoon when Daisy tumbled short of his dreams -- not through her own fault, but because of the colossal vitality of his illusion. It had gone beyond her, beyond everything. He had thrown himself into it with a creative passion, adding to it all the time, decking it out with every bright feather that drifted his way. No amount of fire or freshness can challenge what a man will store up in his ghostly heart.',
        'Itâ€™s a great advantage not to drink among hard drinking people.',
        "All I kept thinking about, over and over, was 'You can't live forever; you can't live forever.",
        'So we drove on toward death through the cooling twilight.',
        'I felt a haunting loneliness sometimes, and felt it in others--young clerks in the dusk, wasting the most poignant moments of night and life.',
        'His heart beat faster and faster as Daisyâ€™s white face came up to his own. He knew that when he kissed this girl, and forever wed his unutterable visions to her perishable breath, his mind would never romp again  the mind of God. So he waited, listening for a moment longer to the tuning fork that had been struck upon a star. Then he kissed her. At his lipsâ€™ touch she blossomed  a flower and the incarnation was complete.',
        "And as I sat there brooding on the old, unknown world, I thought of Gatsbyâ€™s wonder when he first picked out the green light at the end of Daisyâ€™s dock. He had come a long way to this blue lawn, and his dream must have seemed so close that he could hardly fail to grasp it. He did not know that it was already behind him, somewhere back in that vast obscurity beyond the city, where the dark fields of the republic rolled on under the night.Gatsby believed in the green light, the orgastic future that year by year recedes before us. It eluded us then, but that's no matterâ€”to-morrow we will run faster, stretch out our arms farther. . . . And one fine morningâ€”â€”  So we beat on, boats against the current, borne back ceaselessly into the past.",
        'No amount of fire or freshness can challenge what a man will store up in his ghostly heart.',
        'It takes two to make an accident.',
        'He looked at her the way all women want to be looked at by a man.',
        'If personality is an unbroken series of successful gestures, then there was something gorgeous about him',
        'Every one suspects himself of at least one of the cardinal virtues, and this is mine: I am one of the few honest people that I have ever known.',
      ],
      Author: 'F. Scott Fitzgerald',
      Wiki: 'https://www.amazon.com/gp/product/0743273567/?tag=braipick-20',
    },  
    {
      PicName: require('../images/lib.jpg'),
      Reference:"The Midnight Library",
      Quote: [
        "If you aim to be something you are not, you will always fail. Aim to be you. Aim to look and act and think  you. Aim to be the truest version of you. Embrace that you-ness. Endorse it. Love it. Work hard at it. And don't give a second thought when people mock it or ridicule it. Most gossip is envy in disguise.",
        'The only way to learn is to live',
        "A person was  a city. You couldn't let a few less desirable parts put you off the whole. There may be bits you don't , a few dodgy side streets and suburbs, but the good stuff makes it worthwhile.",
        "We only need to be one person.We only need to feel one existence.We don't have to do everything in order to be everything, because we are already infinite. While we are alive we always contain a future of multifarious possibility.",
        'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choicesâ€¦ Would you have done anything different, if you had the chance to undo your regrets?',
        'As Thoreau wrote, â€˜Itâ€™s not what you look at that matters, itâ€™s what you see.',
        'And that sadness is intrinsically part of the fabric of happiness. You canâ€™t have one without the other. Of course, they come in different degrees and quantities. But there is no life where you can be in a state of sheer happiness for ever. And imagining there is just breeds more unhappiness in the life youâ€™re in.',
        "Of course, we can't visit every place or meet every person or do every job, yet most of what we'd feel in any life is still available. We don't have to play every game to know what winning feels . We don't have to hear every piece of music in the world to understand music. We don't have to have tried every variety of grape from every vineyard to know the pleasure of wine. Love and laughter and fear and pain are universal currencies. We just have to close our eyes and savour the taste of the drink in front of us and listen to the song as it plays. We are as completely and utterly alive as we are in any other life and have access to the same emotional spectrum.",
        'Sometimes just to say your own truth out loud is enough to find others  you.',
        "The paradox of volcanoes was that they were symbols of destruction but also life. Once the lava slows and cools, it solidifies and then breaks down over time to become soil - rich, fertile soil.She wasn't a black hole, she decided. She was a volcano. And  a volcano she couldn't run away from herself. She'd have to stay there and tend to that wasteland.She could plant a forest inside herself.",
        'Want,â€™ she told her, in a measured tone, â€˜is an interesting word. It means lack. Sometimes if we fill that lack with something else the original want disappears entirely.',
        'The thing that looks the most ordinary might end up being the thing that leads you to victory.',
        "Maybe that's what all lives were, though. Maybe even the most seemingly perfectly intense or worthwhile lives ultimately felt the same. Acres of disappointment and monotony and hurts and rivalries but with flashes of wonder and beauty. Maybe that was the only meaning that mattered. To be the world, witnessing itself.",
        'That was how she had felt most of her life. Caught in the middle. Struggling, flailing, just trying to survive while not knowing which way to go. Which path to commit to without regret.',
        'Youâ€™re overthinking it.â€™ â€˜I have anxiety. I have no other type of thinking available.',
        'Regrets donâ€™t leave. They werenâ€™t mosquitoe bites. They itch forever.',
        'Look at that chessboard we put back in place,â€™ said Mrs Elm softly. â€˜Look at how ordered and safe and peaceful it looks now, before a game starts. Itâ€™s a beautiful thing. But it is boring. It is dead. And yet the moment you make a move on that board, things change. Things begin to get more chaotic. And that chaos builds with every single move you make.â€™â€˜Itâ€™s an easy game to play,â€™ she told Nora. â€˜But a hard one to master. Every move you make opens a whole new world of possibilities...In chess, as in life, possibility is the basis of everything. Every hope, every dream, every regret, every moment of living...never underestimate the big importance of small things.',
        "And even if you were a pawn - maybe we all are - then you should remember that a pawn is the most magical piece of all. It might look small and ordinary but it isn't. because a pawn is never just a pawn. A pawn is a queen-in-waiting. All you need to do is find a way to keep moving forward. One square after another. And you can get to the other side and unlock all kinds of power.",
        'The lonely mind in the busy city yearns for connection because it thinks human-to-human connection is the point of everything. But amid pure nature...solitude took on a different character. It became in itself a kind of connection. A connection between herself and the world. And between her and herself.',
        'You see, doing one thing differently is very often the same as doing everything differently.',
        "Every second of every day we are entering a new universe. And we spend so much time wishing our lives were different, comparing ourselves to other people and to other versions of ourselves, when really most lives contain degrees of good and degrees of bad.[...]There are patterns of life... Rhythms. It is so easy, while trapped in just the one life, to imagine that times of sadness or tragedy or failure or fear are a result of the particular existence. That it is a by-product of living a certain way, rather than simply living. I mean, it would have mad things a lot easier if we understood there was no way of living that can immunise you against sadness. And that sadness is intrinsically part of the fabric of happiness. You can't have one without the other. Of course, they come in different degrees and quantities. But there is no life where you can be in a state of sheer happiness for ever. And imagining there is just breeds more unhappiness in the life you're in.",
        'It was interesting, she mused to herself, how life sometimes simply gave you a whole new perspective by waiting around long enough for you to see it.',
        'Is happiness the aim?',
        "I don't know. I suppose I want my life to mean something. I want to do something good,",
        'Never underestimate the big importance of small things.',
        'Happy moments can turn into pain, given time.',
        'Regrets ignore chronology. They float around.',
        'You donâ€™t have to understand life. You just have to live it.',
        "Sometimes regrets aren't based on fact at all",
        'Fear was when you wandered into a cellar and worried that the door would close shut. Despair was when was the door closed and locked behind you.',
      ],
      Author: 'Matt Haig',
      Wiki: 'https://www.amazon.co.uk/s/ref=x_gr_w_bb_sout?tag=x_gr_w_bb_uk-21&index=books&keyword=The+Midnight+Library',
    },
    {
      PicName: require('../images/avengers.jpg'),
      Reference:"Avengers",
      Quote: [
        'There’s no throne, there is no version of this, where you come out on top. Maybe your army comes and maybe it’s too much for us, but it’s all on you. Because if we can’t protect the Earth, you can be damned well sure we’ll avenge it.',
        'We have a Hulk',
        'I had my eyes opened. I came to realize that I had more to offer this world than just making things that blow up',
        'It’s not enough to be against something. You have to be for something better.',
        "It's not about how much we lost. It's about how much we have left.",
        'No amount of money ever bought a second of time.',
        'Part of the journey is the end.',
        'Tony, trying to get you to stop has been one of the few failures of my entire life',
        'You know, I keep telling everybody they should move on and grow. Some do. But not us.',
        'No mistakes. No do-overs. Look out for each other. This is the fight of our lives.',
        'I don’t want to kill anyone. I don’t like bullies. I don’t care where they’re from.',
        'I can do this all day.',
        'The hardest choices require the strongest wills.',
        'Today we don’t fight for one life, we fight for all of them.',
        'I would rather be a good man than a great king.',
        'I choose to run towards my problems, and not away from them. Because’s that– because’s that what heroes do.',
        'But a thing isn’t beautiful because it lasts. It’s a privilege to be among them.',
        'The world has changed and none of us can go back. All we can do is our best, and sometimes the best that we can do is to start over.',
        'Faith is my sword. Truth is my shield. Knowledge my armor.',
        'No man can win every battle, but no man should fall without a struggle.',
        "How ironic, Tony. Trying to rid of the world of weapons, you gave it its best one ever! And now, I'm going to kill you with it!",
        'He will be the first in a new breed of super-soldiers. And they will personally escort Adolf Hitler to the gates of Hell.',
        'That’s my secret, Captain. I’m always angry.',
      ],
      Author: 'Avengers',
      Wiki: 'https://en.wikipedia.org/wiki/Avenger',
    },
   
    {
      PicName: require('../images/batman.jpg'),
      Reference:"Batman",
      Quote: [
        'Adults…struggle desperately with fiction, demanding constantly that it conform to the rules of everyday life. Adults foolishly demand to know how Superman can possibly fly, or how Batman can possibly run a multi-billion-dollar business empire during the day and fight crime at night, when the answer is obvious even to the smallest child: because it’s not real',
        'The whereabouts of Batman remain unknown. And yet… I can see him now, in the grip of implacable forces, innumerable foes. Somewhere without hope. In a place where all seems lost. And I know this… the enemy will look away, for just a moment, underestimating him for that single fraction of a second too long. And no matter how dark the night… there will be no hiding place for evil.',
        'If I have to have a past, then I prefer it to be multiple choice.',
        'You don’t get heaven or hell. Do you know the only reward you get for being Batman? You get to be Batman.',
        'Don’t talk like one of them. You’re not! Even if you’d like to be. To them, you’re just a freak, like me! They need you right now, but when they don’t, they’ll cast you out, like a leper! You see, their morals, their code, it’s a bad joke. Dropped at the first sign of trouble. They’re only as good as the world allows them to be. I’ll show you. When the chips are down, these… these civilized people, they’ll eat each other. See, I’m not a monster. I’m just ahead of the curve',
        'But I know the rage that drives you. That impossible anger strangling the grief, until the memory of your loved ones is just poison in your veins. And one day you catch yourself wishing the person you loved had never existed, so you’d be spared your pain.?',
        'This is what happens when an unstoppable force meets an immovable object. You truly are incorruptible, aren’t you? You won’t kill me out of some misplaced sense of self-righteousness. And I won’t kill you because you’re just too much fun. I think you and I are destined to do this forever.',
        'Desire becomes surrender. Surrender becomes Power.',
        'Ladies. Gentlemen. You have eaten well. You’ve eaten Gotham’s wealth. Its spirit. Your feast is nearly over. From this moment on…none of you are safe.',
        'I’m the goddamn Batman',
        'Alfred: Hmf. I suppose you’ll take up flying next, like that fellow in Metropolis.',
        'A gun is a coward’s weapon. A liar’s weapon. We kill…too often because we’ve made it easy…too easy…sparing ourselves the mess.. and the work..',
        'You either die a hero or you live long enough to see yourself become the villain.',
        'The night is darkest just before the dawn. And I promise you, the dawn is coming.',
        'Batman: a force of chaos in my world of perfect order. The dark side of the Soviet dream. Rumored to be a thousand murdered dissidents, they said he was a ghost. A walking dead man. A symbol of rebellion that would never fade as long as the system survived. Anarchy in black',
        'Batman is easily my most favorite character beside Spawn.',
        'It’s not who I am underneath, but what I do that defines me.',
        'Sometimes the truth isn’t good enough, sometimes people need more.',
        'A hero can be anyone, even a man doing something as simple as reassuring putting a coat on a young boy’s shoulders.',
        'I have one power. I never give up.',
        'Why do we fall? So that we can learn to pick ourselves up.',
        'All men have limits. They learn what they are and learn not to exceed them. I ignore mine',
        'Everything’s impossible until somebody does it.',
        'If you can carry it to the top of the mountain you may find what you were looking for in the first place.',
        'Bats frighten me. It’s time my enemies share my dread.',
        'Perhaps the knife was too slow',
        'Tell me where the trigger is, then you have my permission to die',
        'People need dramatic examples to shake them out of apathy and I can’t do that as Bruce Wayne. As a man I’m flesh and blood, I can be ignored, I can be destroyed, but as a symbol, as a symbol I can be incorruptible. I can be everlasting.',
        'It’s not who I am underneath, but what I do that defines me',
        'I’m whatever Gotham needs me to be.',
        'Show some respect. They were your grandparents.’ ‘Just names and dusty frames on the wall to me.’ ‘I take exception to that. There is not a speck of dust collecting on those portraits.',
        'There are no heroes and there are no villains. There are just opposing points of view. That’s all history is… the viscously long battle between world views. And eventually -Finally- no matter how much it may hurt, Truth wins out. Every. Damn. Time',
        'Fear clears the mind. Panic clouds it.',
        '[At his parents’ graves] I’ve brought a young man — a boy, actually — to stay at the house. He’s … lost his parents at roughly the same age that I … That I lost you. I don’t know what will happen. I don’t see myself as any sort of father figure. But … I think I can make a difference in his life.',
        'Harvey. Grundy. Myself. Each of us lost pieces of our lives……and hid what was left in the dark, is this what I want for myself? A world that exists only in darkness?',
        'Gotham may have lost its king and queen, Bruce, but it could still have its prince',
        'And yes, it all might end at any moment for any of us, in violence or not, but what matters is what we do before that. The lives we lead.',
        'Run, Bruce! Run from the truth! Run like you always have…but when you feel that prickling on the back of your neck, know that I’m coming for you! Reaching you from the other side of your reflection!',
        'Batman was human. He had no powers. He stood next to Gods and said, “I handle my city.',
        'Batman’s not a hero. He’s a complicated character. I don’t think I could ever play a real hero — there’s always got to be something a little bit wrong. I think it’s because one of my eyes is smaller than the other one.',
        'Sometimes people identified too strongly with the famous—it was one of the prices of notoriety, especially when so many considered you to be a hero. Batman sometimes filled much too large a hole in people’s lives.',
        'Drive sports cars, date movie stars, buy things that are not for sale… who knows, Master Wayne? You start pretending to have fun, you might even have a little by accident.',
        'Because we have to chase him. Because he’s the hero Gotham deserves, but not the one it needs right now, so we’ll hunt him. Because he can take it, because he’s not a hero. He’s a silent guardian, a watchful protector, a Dark Knight.',
        'You’re not a superhero. You’re a spy. With a gun. You’re not Wing-Knight or Nightwing or whatever. You’re agent 37',
        'The Joker as sadistic chaos, the Batman as merciless order. This mirror-image theme would come to define the two characters’ relationship in the comics and across all media for the next forty years.',


     
      ],
      Author: 'Batman',
      Wiki: 'https://en.wikipedia.org/wiki/Batman',
    },
     {
      PicName: require('../images/ryan.jpg'),
      Reference:"Private Ryan",
      Quote: [
        'Someday We Might Look Back On This And Decide That Saving Private Ryan Was The One Decent Thing We Were Able To Pull Out Of This Whole Godawful, Sh*Tty Mess.',
        'Sergeant, We Have Crossed Some Strange Boundary Here. The World Has Taken A Turn For The Surreal.',
        "It's Like Finding A Needle In A Stack Of Needles.",
        'War Educates The Senses, Calls Into Action The Will, Perfects The Physical Constitution, Brings Men Into Such Swift And Close Collision In Critical Moments That Man Measures Man.',
        "Keep The Sand Out Of Your Weapons. Keep Those Actions Clear. I'll See You On The Beach.",
        'Please, I Like America! Fancy Schmancy! What A Cinch! Go Fly A Kite! Cat Got Your Tongue! Hill Of Beans! Betty Boop, What A Dish. Betty Grable, Nice Gams.',
        'When Was The Last Time You Felt Good About Anything?',
        'Well When I Think Of Home, I... I Think Of Something Specific. I Think Of My, My Hammock In The Backyard Or My Wife Pruning The Rosebushes In A Pair Of My Old Work Gloves.',
        'I Just Know That Every Man I Kill The Farther Away From Home I Feel.',
        'F*Cked Up Beyond All Recognition',
      ],
      Author: 'Private Ryan',
      Wiki: 'https://en.wikipedia.org/wiki/Saving_Private_Ryan',
    },
    {
      PicName: require('../images/titanic.jpg'),
      Reference:"Titanic",
      Quote: [
        "Rose, You're No Picnic. You're A Spoiled Little Brat, Even.",
        "I'll Never Let Go, Jack.",
        "I'd Rather Be His Whore Than Your Wife.",
        'It Was The Ship Of Dreams.',
        'You Have A Gift, Jack. You See People.',
        "I Saw My Whole Life As If I'd Already Lived It.",
        'When You Got Nothing, You Got Nothing To Lose.',
        'You Jump, I Jump.',
        "I Figure Life's A Gift And I Don't Intend On Wasting It.",
      ],
      Author: 'Titanic',
      Wiki: 'https://en.wikipedia.org/wiki/Titanic',
    },
    {
      PicName: require('../images/harry.jpg'),
      Reference:"Harry Potter",
      Quote: [
        "I hope you're pleased with yourselves. We could all have been killed — or worse, expelled. Now if you don't mind, I'm going to bed.",
        'Fear of a name only increases fear of the thing itself.',
        "Honestly, am I the only person who's ever bothered to read 'Hogwarts: A History?'",
        'Twitchy little ferret, aren’t you, Malfoy?',
        'Just because it’s taken you three years to notice, Ron, doesn’t mean no one else has spotted I’m a girl!',
        "I think I'll just go down and have some pudding and wait for it all to turn up — it always does in the end.",
        "I mean, it's sort of exciting, isn't it, breaking the rules?",
        'Dumbledore says people find it far easier to forgive others for being wrong than being right.',
        'It does not do well to dwell on dreams and forget to live.',
        'To the well-organized mind, death is but the next great adventure.',
        'It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.',
        'The truth. It is a beautiful and terrible thing, and should therefore be treated with great caution.',
        '’Ah, music,’ he said, wiping his eyes. ‘A magic beyond all we do here!',
        'It is our choices, Harry, that show what we truly are, far more than our abilities.',
        'Fawkes is a phoenix, Harry. Phoenixes burst into flame when it is time for them to die and are reborn from the ashes.',
        'But you know, happiness can be found even in the darkest of times, if one only remembers to turn on the light.',
        'You think the dead we loved truly ever leave us? You think that we don’t recall them more clearly in times of great trouble?',
        'It matters not what someone is born, but what they grow to be.',
        'We are only as strong as we are united, as weak as we are divided.',
        'Numbing the pain for a while will make it worse when you finally feel it.',
        'Curiosity is not a sin…. But we should exercise caution with our curiosity… yes, indeed.',
        'Differences of habit and language are nothing at all if our aims are identical and our hearts are open.',
        'Indifference and neglect often do much more damage than outright dislike.',
        'Youth can not know how age thinks and feels. But old men are guilty if they forget what it was to be young.',
        'And now, Harry, let us step out into the night and pursue that flighty temptress, adventure.',
        'Age is foolish and forgetful when it underestimates youth.',
        'It is the unknown we fear when we look upon death and darkness, nothing more.',
        'Words are, in my not-so-humble opinion, our most inexhaustible source of magic. Capable of both inflicting injury, and remedying it.',
        'It is a curious thing, Harry, but perhaps those who are best suited to power are those who have never sought it. Those who, like you, have leadership thrust upon them, and take up the mantle because they must, and find to their own surprise that they wear it well.',
        'Of course it is happening inside your head, Harry, but why on earth should that mean that it is not real?',
        "You're a little scary sometimes, you know that? Brilliant ... but scary.",
        'Hearing voices no one else can hear isn’t a good sign, even in the wizarding world.',
        'When in doubt, go to the library.',
        'Don’t let the muggles get you down.',
        "There will be no foolish wand-waving or silly incantations in this class. As such, I don't expect many of you to appreciate the subtle science and exact art that is potion-making. However, for those select few who possess the predisposition, I can teach you how to bewitch the mind and ensnare the senses. I can tell you how to bottle fame, brew glory, and even put a stopper in death. Then again, maybe some of you have come to Hogwarts in possession of abilities so formidable that you feel confident enough to not pay attention!",
        'Yer a wizard Harry.',
        "I am what I am, an' I'm not ashamed. 'Never be ashamed,' my ol' dad used ter say, 'there's some who'll hold it against you, but they're not worth botherin' with.",
        'Dobby is free.',
        'Training for the ballet, Potter?',
        'Honestly, if you were any slower, you’d be going backward.',
        'I’ll be in my bedroom, making no noise and pretending I’m not there.',
        'I solemnly swear I am up to no good.',
        'Are you insane? Of course I want to leave the Dursleys! Have you got a house? When can I move in?',
        'Mischief Managed!',
        "Give her hell from us, Peeves.' And Peeves, whom Harry had never seen take an order from a student before, swept his belled hat from his head and sprang to a salute as Fred and George wheeled about to tumultuous applause from the students below and sped out of the open front doors into the glorious sunset.",
        'There is no need to call me ‘sir,’ Professor',
        'Fame is a fickle friend, Harry. Celebrity is as celebrity does. Remember that.',
        'I want to commit the murder I was imprisoned for.',
        'If you want to know what a man’s like, take a good look at how he treats his inferiors, not his equals.',
        'We’ve all got both light and dark inside us. What matters is the part we choose to act on. That’s who we really are',
        'Why, dear boy, we don’t send wizards to Azkaban just for blowing up their aunts.',
        'Your devotion is nothing more than cowardice. You would not be here if you had anywhere else to go.',
        'Anyone can speak Troll. All you have to do is point and grunt',
        "I think I'll just go down and have some pudding and wait for it all to turn up — it always does in the end.",
        'Things we lose have a way of coming back to us in the end, if not always in the way we expect.',
        'Wit beyond measure is man’s greatest treasure.',
        'You’re just as sane as I am.',
        "The thing about growing up with Fred and George is that you sort of start thinking anything's possible if you've got enough nerve",
      ],
      Author: 'Harry Potter',
      Wiki: 'https://en.wikipedia.org/wiki/Harry_Potter',
    },
      
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  // const createModel=(summary,wikilink,pic) =>{
  //   setModalVisible(!modalVisible);
  //   return(
  //     <Modal
  //       animationType="slide"
  //       transparent={true}
  //       visible={modalVisible}

  //     >
  //       <View style={styles.centeredView}>
  //         <View style={styles.modalView}>
  //         <View style={styles.imgContainer}>
  //            <Image source={pic}
  //            //source={require('../images/' + refer.PicName + '.jpg')
  //            style={styles.profileImg} />
  //            <View style={styles.textContainer}>
  //   <Text style={styles.authorName}>{summary}</Text>
  //   <Text style={styles.authorBook}>{wikilink}</Text>
  //           </View>
  //           </View>

  //           <TouchableHighlight
  //             style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
  //             onPress={() => {
  //               setModalVisible(!modalVisible);
  //             }}
  //           >
  //             <Text style={styles.textStyle}>Hide Modal</Text>
  //           </TouchableHighlight>
  //         </View>
  //       </View>
  //     </Modal>

  //   )
  // }

  const renderquote = ({item, index}) => {
    //{setimageName(item.PicName)}
    return (
      <ScrollView>
            <TouchableOpacity
          onPress={() => shareQuoteSelect(item)}
          >
        {/* {setAuthorName(item.Author)}
              {setAuthorPic(item.PicName)}
              {setAuthorQuote(item.Quote)}
              {setWiki(item.wiki)} */}

        <View style={styles.modaltextContainer}>

          <Text style={styles.modalauthorName}>{item}</Text>

        </View>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const renderColumnList = ({item, index}) => {
    //{setimageName(item.PicName)}

    return (
      <TouchableOpacity
        onPress={() => handleOnSelectItem(item)}
        // onPress={() => {
        //   setModalVisible(!modalVisible);
        // }}
        style={styles.profileImgContainer}>
        <View >
          {/* {setAuthorName(item.Author)}
                {setAuthorPic(item.PicName)}
                {setAuthorQuote(item.Quote)}
                {setWiki(item.wiki)} */}
          <Image //source={item.PicName}
            //  source={require(item.PicName)}
            source={item.PicName}
            style={styles.profileImgColumn}
          />
          <View style={styles.textContainer}>
            <Text style={styles.authorName}>{item.Reference}</Text>
          </View>
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => swipeShare(item.Wiki)}>
            <IconMaterialCI style={styles.iconDots} name="dots-horizontal" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderlist = ({item, index}) => {
    //{setimageName(item.PicName)}

    return (
      <Swipeable renderRightActions={() => rightAction(item.Wiki)}>
        <TouchableHighlight
          onPress={() => handleOnSelectItem(item)}
          // onPress={() => {
          //   setModalVisible(!modalVisible);
          // }}
          >
          <View style={styles.imgContainer}>
            {/* {setAuthorName(item.Author)}
                {setAuthorPic(item.PicName)}
                {setAuthorQuote(item.Quote)}
                {setWiki(item.wiki)} */}
            <Image //source={item.PicName}
              //  source={require(item.PicName)}
              source={item.PicName}
              style={styles.profileImg}
            />
            <View style={styles.textContainer}>
              <Text style={styles.authorName}>{item.Reference}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    );
  };

  const rightAction = (quote) => {
    // const trans = progress.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [-80, 0],
    // });
    // console.log(index)
    // setSelectedItem(item);
    return (
      <TouchableOpacity onPress={() => swipeShare(quote)}>
        <View style={styles.swipeContainer}>
          <Icon style={styles.swipeLogo} name="share" />
          <Text
            //  style={[
            //   styles.swipeText,
            //   {
            //     transform: [{ translateX: trans }],
            //   },
            // ]}
            style={styles.swipeText}>
            Share
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const swipeShare = async (item) => {
    if(item=="")
    {
      alert("Link not available")
    }
    else{
      Share.open({message: item});
      if(loaded==true)
      {
        interstitial.show();
      }


   }
    // if(item=="")
    //     {
    //       alert("Link not available")
    //     }
    //     else{
    //     try {
    //       const result = await Share.share({
    //         message: item,
    //       });
    //       if (result.action === Share.sharedAction) {
    //         if (result.activityType) {
    //           // shared with activity type of result.activityType
    //         } else {
    //           // shared
    //         }
    //       } else if (result.action === Share.dismissedAction) {
    //         // dismissed
    //       }
    //     } catch (error) {
       
    //     }}
        
      };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>

<View style={styles.btncontainer}>
<DropDownPicker
          style={{
            width: 50,
            height: 30,
            backgroundColor: '#303030',
            borderWidth: 0,
            borderColor: '#303030',
          }}
          containerStyle={{height: 40}}
          dropDownStyle={{
            backgroundColor: 'white',
            height: 110,
            marginTop: -35,
            width: 60,
          }}
          itemStyle={{
            justifyContent: 'center',
          }}
          items={itemsSort}
          controller={(instance) => (controller = instance)}
          // onChangeList={(items, callback) => {
          //     new Promise((resolve, reject) => resolve(setItems(items)))
          //         .then(() => callback())
          //         .catch(() => {});
          // }}
          showArrow={false}
          //defaultValue={value}
          //onChangeItem={item => setValue(item.value)}
          onChangeItem={() => sortt()}
        />


       {/* <TouchableOpacity 
                          style={{marginLeft:10,alignSelf:'center', }}

       
       onPress={() =>changeData()} >
   <Icon
        style={styles.btnIcon}
         name="type"
     /></TouchableOpacity> */}

<View style={{borderRadius:100/2,backgroundColor:'purple',marginLeft:20, alignSelf:'center', height:10,width:10}}>

</View>

<DropDownPicker
style={{width:50,height:30,backgroundColor: '#303030', borderWidth:0, borderColor:'#303030'}}
containerStyle={{height: 40}}
dropDownStyle={{backgroundColor: 'white',height:110,marginTop:-35, width:60}}
itemStyle={{
  justifyContent: "center"
}}
    items={items}
    controller={instance => controller = instance}
    // onChangeList={(items, callback) => {
    //     new Promise((resolve, reject) => resolve(setItems(items)))
    //         .then(() => callback())
    //         .catch(() => {});
    // }}
    showArrow={false}
    //defaultValue={value}
    //onChangeItem={item => setValue(item.value)}
    onChangeItem={() => setshowGrid(!showGrid)}
/>




          </View>

          <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />

     {showGrid==false ? <FlatList
        data={data}
        onScroll={handleScroll}
        contentContainerStyle={{paddingTop: 30}}
        ref={flatListRef}
        //keyExtractor={item => item.id.toString()}
        renderItem={renderlist}
        keyExtractor={(item, index) => index.toString()}
      />:

      <FlatList
        data={data}
        onScroll={handleScroll}
        ref={flatListRef}
        contentContainerStyle={{paddingTop: 30}}
        key={1}
        horizontal={false}
        numColumns={2}
        columnWrapperStyle={{ marginTop: 10 }}
        //keyExtractor={item => item.id.toString()}
        renderItem={renderColumnList}
        keyExtractor={(item, index) => index.toString()}
      />}

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
       
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal> */}
      {modalVisible == true ? (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <ScrollView>
            <View style={styles.modalView}>
              <View style={styles.modalTopBar}>
                <TouchableHighlight
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <IconEntypo name="cross" size={25} color="white" />
                </TouchableHighlight>
              </View>
              <View style={[styles.imgContainer,{justifyContent:"center"}]}>
                {console.log(selectedItem.PicName)}
                <Image
                  source={selectedItem.PicName}
                  style={styles.modalprofileImg}
                />
              </View>

              <View style={styles.textContainer}>
                <Text style={[styles.modalauthorName,{alignSelf:"center"}]}>
                  {selectedItem.Reference}
                </Text>
              </View>
              <View style={styles.modalListButtonConatiner}>
                <TouchableHighlight
                  style={styles.moadlButton}
                  onPress={() => {
                    loadInBrowser(selectedItem.Wiki);
                  }}>
                  <IconFontAwesome
                    style={styles.modalButtonIcon}
                    name="wikipedia-w"
                    size={25}
                    color="white"
                  />
                </TouchableHighlight>

                <TouchableHighlight
                  style={styles.moadlButton}
                  onPress={() => {
                    loadInBrowser(selectedItem.Wiki);
                  }}>
                  <IconSimpleLineIcons
                    style={styles.modalButtonIcon}
                    name="globe"
                    size={25}
                    color="white"
                  />
                </TouchableHighlight>

                {/* <TouchableHighlight
                  style={styles.moadlButton}
                  // onPress={() => {
                  //   setModalVisible(!modalVisible);
                  // }}
                  >
                  <Icon
                    style={styles.modalButtonIcon}
                    name="list"
                    size={25}
                    color="white"
                  />
                </TouchableHighlight> */}
              </View>
              <FlatList
                data={selectedItem.Quote}
                //keyExtractor={item => item.id.toString()}
                renderItem={renderquote}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <View style={[{height:50}]}>

            </View>
          </ScrollView>
        </Modal>
      ) : null}

      {count === true ? (
        <TouchableOpacity onPress={() => toTop()} style={styles.fb}>
          <Icon style={styles.fabIcon} name="arrow-up-circle" />
        </TouchableOpacity>
      ) : null}









{modalMain == true ? (
        <Modal animationType="slide" transparent={true} visible={modalMain}>
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
                  setModalMain(!modalMain)
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
                  {selectedQuote}
                </Text>
              </View>

              <View
                style={{
                  width: 50,
                  marginTop: 60,
                  backgroundColor: 'black',
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
               
               {favFound==true ?<TouchableOpacity onPress={() => swipeFavRemove(selectedQuote)}>
        <View >
          <IconMaterial
              
                    name="favorite"
                    size={30}
                    color="white"
                  />
              </View>
            </TouchableOpacity>
                : <TouchableOpacity onPress={() => swipeFavAdd(selectedQuote)}>
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
                      //setshareTypeModel(!shareTypeModel);
                      actionSheetRef.current.show();
                    //setshareModal(!shareModal);
                    setModalMain(!modalMain);
                  }}>
                  <IconEntypo name="share" size={30} color="white" />
                </TouchableHighlight>

                <TouchableHighlight
                  style={{marginLeft: 35}}
                  onPress={() => {
                    setModalList(!modalList);
                    setModalMain(!modalMain);
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
                    backgroundColor: "#70ad47",
                    height: 70,
                    width: 70,
                    alignSelf: 'center',
                    borderRadius: 10,
                    paddingHorizontal: 30,
                  }}></View>
                {/* <Text
                  style={{
                    alignSelf: 'center',
                    color: 'grey',
                    fontSize: 16,
                    marginTop: 10,
                  }}>
                  {selectedItem.Category}
                </Text> */}
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



{modalList == true ? (
        <Modal animationType="slide" transparent={true} visible={modalList}>
          <View style={styles.modalListContainer}>
            <View style={styles.modalListView}>
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
                  //height:deviceHeight/2,
                  marginTop: 40,
                  paddingHorizontal: 15,
                  backgroundColor: shareColor,
                  justifyContent: 'center',
                }}>
         <Image source={require('../images/logo.jpg')}
                  style={{alignSelf:"flex-start",height:60,width:60,borderRadius:20,marginTop:3}}/>
                <Text style={{color: shareTextColor, fontSize: 30, textAlign: 'auto',paddingVertical:5}}>
                  {selectedQuote}
                </Text>
                <View
                style={{
                  width: 50,
                  marginTop: 10,
                  backgroundColor: "#70ad47",
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
              <View
      style={[{height:50}]}>

      </View>
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



      {/* <Swipeable renderRightActions={rightAction}
onSwipeableRightOpen={onShare}
>
<TouchableHighlight
        onPress={() => {

          createModel("Author Name Vladmir","Author Name Vladmir",referencePic);
        }}
        >
        <View style={styles.imgContainer}>
             <Image source={referencePic} style={styles.profileImg} />
             <View style={styles.textContainer}>
    <Text style={styles.authorName}>Author Name Vladmir</Text>
    <Text style={styles.authorBook}>Author Name Vladmir</Text>
            </View>
        </View>
        </TouchableHighlight>
        </Swipeable> */}
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
  imgContainer: {
    flexDirection: 'row',
    paddingLeft: 20,
    marginBottom: 10,
  },
  profileImg: {
    overflow: 'hidden',
    height: 120,
    alignSelf: 'center',
    width: 100,
    //borderRadius: 10,
  },
  modalprofileImg: {
    overflow: 'hidden',
    height: 170,
    width: 130,
    //borderRadius: 60,
  },
  modalauthorName: {
    marginTop: 10,
    color: 'white',
    fontSize: 16,
  },
  authorName: {
    marginLeft: 20,
    paddingTop: 10,
    color: 'white',
    fontSize: 12,
  },
    authorBook: {
    marginLeft: 20,
    paddingTop: 10,
    color: 'white',
    fontSize: 10,
  },
  textContainer: {
    //justifyContent:"center",
    //flexDirection: 'column',
    alignSelf: 'center',
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
  modalView: {
    borderRadius: 20,
    margin: 20,
    backgroundColor: '#303030',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textContainer: {
    flexDirection: 'column',
  },
  modalTopBar: {
    alignSelf: 'flex-end',
    paddingTop: 5,
    paddingRight: 12,
    position: 'absolute',
  },
  modalListButtonConatiner: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',

    alignSelf: 'center',
  },
  moadlButton: {
    marginRight: 10,
    width: 70,
    height: 75,
    backgroundColor: 'blue',
    elevation: 80,
    //borderRadius:30,
  },
  modalButtonIcon: {
    alignSelf: 'center',
    paddingTop: 25,
  },
  modaltextContainer: {
    justifyContent: 'center',
  },
  modalauthorName: {
    marginTop: 10,
    padding: 5,
    color: 'white',
    fontSize: 16,
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
  fabIcon: {
    fontSize: 24,
    color: 'grey',
  },
  btncontainer:{
    flexDirection:"row",
    width:"100%",
    height:120,
    paddingHorizontal:8,
    alignItems:"baseline",
    backgroundColor: '#303030',
  },  
  iconDots: {
    fontSize: 30,
    color: 'white',
  },
  btnIcon: {
    fontSize: 30,
    color: 'grey',
  },
  profileImgContainer: {
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    paddingLeft: 20,
    marginBottom: 10,
  },
  profileImgColumn: {
    overflow: 'hidden',
    height: 160,
    alignSelf: 'center',
    width: 140,
    //borderRadius: 75,
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
    color: 'black',
  },
  modalListContainer: {
    height: deviceHeight / 2,
    width: deviceWidth,
    backgroundColor: 'transparent',
    justifyContent:"center",
    //paddingTop:"50%"
  },
  modalListView: {
    margin: 20,
    backgroundColor: 'transparent',
    padding: 35,
    shadowColor: '#000',
  },
  modalListButtonConatiner: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',

    alignSelf: 'center',
  },
  moadlButton: {
    marginRight: 10,
    width: 60,
    height: 60,
    //backgroundColor:"blue",
    elevation: 2,
    borderRadius: 30,
  },
  modalButtonIcon: {
    alignSelf: 'center',
    paddingTop: 16,
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
  btnIcon: {
    fontSize: 30,
    color: 'grey',
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
  sendingView:{
    padding: 20, 
    alignItems: 'center'
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
  modalContainer: {
    height: deviceHeight,
    width: deviceWidth,
    backgroundColor: '#303030',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#303030',
    padding: 35,
    shadowColor: '#000',
  },
});
export default Title;
