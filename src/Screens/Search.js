import React, {useState, useRef, createRef, useEffect} from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    TouchableHighlight,
    Modal,
    SafeAreaView,
    ScrollView,
    Image,
  } from 'react-native';
import Share from 'react-native-share';
import { deviceHeight, deviceWidth } from '../Components/constance/AppConstance';
import Icon from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, CardItem, Body} from 'native-base';
import Snackbar from 'react-native-snackbar';
import ActionSheet from 'react-native-actions-sheet';
import ViewShot, {captureRef} from 'react-native-view-shot';
import AppConstance from '../Components/constance/AppConstance';
import {
    InterstitialAd,
    AdEventType,
    RewardedAd,
    RewardedAdEventType,
    BannerAd,
    BannerAdSize,
    TestIds,
  } from '@react-native-firebase/admob';
  const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-3940256099942544/2934735716';

const IadUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-3940256099942544/1033173712';

const interstitial = InterstitialAd.createForAdRequest(IadUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});  



let favFound = false;

 const Search = () => {
    const[listQuote,setListQuote]=useState();

    const swipeFavRemove = (item) => {
        removeFav(item);
      };
    
      const swipeFavAdd = (item) => {
        // setSelectedItem(item);
        // modalFav();
        updateFav(item);
      };
    


    const updateList = async () => {
        let item=listQuote;

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
            getData();
            favFound = true;
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
    
      const removeFav = async (item) => {
        try {
          await AsyncStorage.getItem('favo').then((value) => {
            let fav;
    
            if (value === null) {
              fav = [item];
            } else {
              fav = JSON.parse(value);
              const filteredData = fav.filter((obj) => obj !== item);
              //console.log(filteredData)
              fav = JSON.stringify(filteredData);
              //fav.push(item);
            }
    
            //console.log('---' + fav);
            //fav = JSON.stringify(filteredData);
    
            console.log('saving ' + fav);
            //  AsyncStorage.setItem('fav', fav)
            AsyncStorage.setItem('favo', fav);
            getData();
            favFound = false;
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
    
    const shareDummyImage = async () => {
        viewShotRef.current.capture().then((uri) => {
          //console.log('do something with ', uri);
          Share.open({url: uri});
          if (loaded == true) {
            interstitial.show();
            //setshareTypeModel(!shareTypeModel)
            //actionSheetRef.current.show();
          }
        });
      };
      const modalShare = async () => {
        if (selectedItem == null) {
          alert('Link not available');
        } else {
          // Share.open({message: item});
          Share.open({message: selectedItem.Quote});
          if (loaded == true) {
            interstitial.show();
            //setshareTypeModel(!shareTypeModel)
            //actionSheetRef.current.show();
          }
        }
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
    

    const modalfavFind = (item) => {
        let myObj = array.find((obj) => obj == item);
        if (myObj === item) {
          //console.log(myObj)
          favFound = true;
          //console.log(favFound);
          //setFavCheck(true)
        } else {
          //setFavCheck(false)
          favFound = false;
          //console.log(favFound);
        }
      };

    const handleOnSelectItem = (item) => {
        setModalVisible(true);
        setSelectedItem(item);
        modalfavFind(item.Quote);
        //compareArrays(item.Quote);
      };

    const whiteColor = () => {
        setshareTextColor('black');
        setshareColor('white');
      };
    const blackColor = () => {
        setshareTextColor('white');
        setshareColor('black');
      };
    const blueColor = () => {
        setshareTextColor('white');
        setshareColor('blue');
      };

    const [array, setArray] = useState(['Hello']);
    const [shareModal, setshareModal] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalList, setModalList] = useState(false);
    const actionSheetRef = createRef();
    const [shareColor, setshareColor] = useState('white');
    const [shareTextColor, setshareTextColor] = useState('black');
    const [listName, setlistName] = useState('');
    const [listDesc, setlistDesc] = useState('');
    const [loaded, setLoaded] = useState(false);
    let controller;
    const viewShotRef = useRef(null);
    let actionSheet;


    const getData = async () => {
        try {
          const list = await AsyncStorage.getAllKeys();
          //setsavedList(list);
          console.log(list);
          let mylist = list.find((obj) => obj == 'favo');
          console.log(mylist);
          if (mylist === 'favo') {
            console.log('found');
            await AsyncStorage.getItem('favo').then((value) => {
              // favArray=[...favArray,value];
              // favArray=[...favArray,item];
              setArray(JSON.parse(value));
              //console.log(value);
              //console.log(array);
              //loadedFav=true;
            });
          }
          
  
          // });
        } catch (e) {
         
        }
      };
    
      useEffect(() => {
        getData();
        const eventListener = interstitial.onAdEvent((type) => {
          if (type === AdEventType.LOADED) {
            setLoaded(true);
          }
          if (type === AdEventType.CLOSED) {
            console.log('ad closed');
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
      }, []);
    
    const[list , setlist] = useState(false);
    const [data , setdata] = useState([
      

            {
                "Quote": "None of us really changes over time. We only become more fully what we are.",
                "Author": "Anne Rice",
                "Reference": "The Vampire Lestat",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"All endings are also beginnings. We just don’t know it at the time.",
                "Author":"Mitch Albom",
                "Reference":"The Five People You Meet In Heaven",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"Pain is inevitable. Suffering is optional.",
                "Author":"Haruki Murakami",
                "Reference":"What I Talk About When I Talk About Running",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"You never know what worse luck your bad luck has saved you from.",
                "Author":"Cormac McCarthy",
                "Reference":"No Country For Old Men",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"Appear weak when you are strong, and strong when you are weak.",
                "Author":"Sun Tzu",
                "Reference":"The Art of War",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"When you want something, all the universe conspires in helping you to achieve it.",
                "Author":"Paulo Coelho",
                "Reference":"The Alchemist",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"Anything worth dying for is certainly worth living for.",
                "Author":"Joseph Heller",
                "Reference":"Catch-22",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"Strive not to be a success, but rather to be of value",
                "Author":"Albert Einstein",
                "Reference":"Words of wisdom",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },{
                "Quote":"I attribute my success to this: I never gave or took any excuse",
                "Author":"Florence Nightingale",
                "Reference":"The commonplace book",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"Definiteness of purpose is the starting point of all achievement",
                "Author":"W. Clement Stone",
                "Reference":"The Purpose Driven Life: The principle",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"Our time is limited, so don’t waste it living someone else’s life",
                "Author":"Steve Jobs",
                "Reference":"Follow us",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"It is a far, far better thing that I do, than I have ever done; it is a far, far better rest I go to than I have ever known.",
                "Author":"Charles Dickens",
                "Reference":"A Tale of Two Cities",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"It matters not what someone is born, but what they grow to be",
                "Author":"J.K. Rowling",
                "Reference":"Harry Potter and the Goblet of Fire",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.",
                "Author":"Martin Luther King Jr.,",
                "Reference":"A Testament of Hope: The Essential Writings and Speeches",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten.",
                "Author":"Neil Gaiman",
                "Reference":"Coraline",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"It’s the possibility of having a dream come true that makes life interesting.",
                "Author":"Paulo Coelho",
                "Reference":"The Alchemist",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"Everything is within your power,And your power is within you.",
                "Author":"Janice Trachtman",
                "Reference":"Catching What Life Throws at You: Inspiring True Stories of Healing",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart.",
                "Author":"Roy T. Bennett",
                "Reference":"The Light in the Heart",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"Somehow difficulties are easier to endure when you know your dream is waiting for you at the end",
                "Author":"Lisa Mangum",
                "Reference":"The Golden Spiral",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"The most powerful weapon is hope",
                "Author":"Juliet Marillier",
                "Reference":"Heart’s Blood",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"One often meets her destiny on the road she takes to avoid it",
                "Author":"Jessi Kirby",
                "Reference":"Golden",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"Every form of art is another way of seeing the world. Another perspective, another window. And science –that’s the most spectacular window of all. You can see the entire universe from there.",
                "Author":"Claudia Gray",
                "Reference":"A Thousand Pieces of You",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"With courage and hope, we can conquer our fears and do what we once believed impossible.",
                "Author":"Juliet Marillier",
                "Reference":"Heart’s Blood",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"The books that the world calls immoral are books that show the world its own shame",
                "Author":"Oscar Wilde",
                "Reference":"The Picture of Dorian Gray",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"That’s the thing about books. They let you travel without moving your feet",
                "Author":"Jhumpa Lahiri",
                "Reference":"The Namesake",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"Time you enjoy wasting is not wasted time",
                "Author":"Marthe Troly-Curtin",
                "Reference":"Phrynette Married",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"When you can’t find someone to follow, you have to find a way to lead by example.",
                "Author":"Roxane Gay",
                "Reference":"Bad Feminist",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"She decided long ago that life was a long journey. She would be strong, and she would be weak, and both would be okay.",
                "Author":"Tahereh Mafi",
                "Reference":"Furthermore",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"It is only with the heart that one can see rightly; what is essential is invisible to the eye.",
                "Author":"Antoine de Saint-Exupéry",
                "Reference":"The Little Prince",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"The worst enemy to creativity is self-doubt.",
                "Author":"Sylvia Plath",
                "Reference":"The Unabridged Journals of Sylvia Plath",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"Hoping for the best, prepared for the worst, and unsurprised by anything in between.",
                "Author":"Maya Angelou",
                "Reference":"I Know Why the Caged Bird Sings",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"It is a curious thought, but it is only when you see people looking ridiculous that you realize just how much you love them",
                "Author":"Agatha Christie",
                "Reference":"An Autobiography",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"And, now that you don’t have to be perfect you can be good.",
                "Author":"John Steinbeck",
                "Reference":"East of Eden",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"There is never a time or place for true love. It happens accidentally, in a heartbeat, in a single flashing, throbbing moment.",
                "Author":"Sarah Dessen",
                "Reference":"The Truth About Forever",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"It was all very well to be ambitious, but ambition should not kill the nice qualities in you.",
                "Author":"Noel Streatfeild",
                "Reference":"Ballet Shoes",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"There is nothing sweeter in this sad world than the sound of someone you love calling your name.",
                "Author":"Kate DiCamillo",
                "Reference":"The Tale of Despereaux",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"Isn’t it nice to think that tomorrow is a new day with no mistakes in it yet?",
                "Author":"L.M. Montgomery",
                "Reference":"Anne of #70ad47 Gables",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"Our motives are far more successfully hidden from ourselves than they are from others",
                "Author":"Shraga Silverstein",
                "Reference":"A Candle by Day",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"The prologue to inspiration is aspiration",
                "Author":"Shraga Silverstein",
                "Reference":"A Candle by Day",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"Courage is resistance to fear, mastery of fearnot absence of fear",
                "Author":"Mark Twain",
                "Reference":"Pudd'nhead Wilson",
                "Category": "Inspirational",
                "Color": "#70ad47"
            
            },
            {
                "Quote":"To love or have loved, that is enough. Ask nothing further",
                "Author":"Victor Hugo",
                "Reference":"LES MISÉRABLES",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"It was love at first sight, at last sight, at ever and ever sight",
                "Author":"Vladimir Nabokov",
                "Reference":"LOLITA",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"The minute I heard my first love story, I started looking for you.",
                "Author":"Jalaluddin Rumi",
                "Reference":"THE ILLUSTRATED",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"If I loved you less, I might be able to talk about it more",
                "Author":"Jane Austen",
                "Reference":"EMMA",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"If you remember me, then I don’t care if everyone else forgets.",
                "Author":"Haruki Murakami",
                "Reference":"KAFKA ON THE SHORE",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"Doubt thou the stars are fire; Doubt that the sun doth move; Doubt truth to be a liar; But never doubt I love.",
                "Author":"William Shakespeare",
                "Reference":"HAMLET",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"If you live to be a hundred, I want to live to be a hundred minus one day, so I never have to live without you.",
                "Author":"A.A. Milne",
                "Reference":"WINNIE-THE-POOH",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"You don’t love someone because they’re perfect, you love them in spite of the fact that they’re not.",
                "Author":"Jodi Picoult",
                "Reference":"MY SISTER’S KEEPER",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"I always have many roads to travel, but I take the one which leads to you.",
                "Author":"Amit Kalantri",
                "Reference":"I Love You Too",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"The very essence of romance is uncertainty.",
                "Author":"Oscar Wilde",
                "Reference":"The Importance of Being Earnest and Other Plays",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"True love is rare, and it's the only thing that gives life real meaning",
                "Author":"Nicholas Sparks",
                "Reference":"Message in a Bottle",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"You know what charm is: a way of getting the answer yes without having asked any clear question.",
                "Author":"Albert Camus",
                "Reference":"The fall",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"In vain I have struggled. It will not do. My feelings will not be repressed. You must allow me to tell you how ardently I admire and love you.",
                "Author":"Jane Austen",
                "Reference":"Pride And Prejudice",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"You are my heart, my life, my one and only thought.",
                "Author":"Arthur Conan Doyle",
                "Reference":"The White Company",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"You are sunlight through a window, which I stand in, warmed. My darling",
                "Author":"Jessie Burton",
                "Reference":"The Miniaturist",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"Did my heart love till now? Forswear it, sight! For I ne’er saw true beauty till this night.",
                "Author":"William Shakespeare",
                "Reference":"Romeo and Juliet",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"Doubt thou the stars are fire; Doubt that the sun doth move; Doubt truth to be a liar; But never doubt I love.",
                "Author":"William Shakespeare",
                "Reference":"Hamlet",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"Her love was entire as a child’s, and though warm as summer it was fresh as spring.",
                "Author":"Thomas Hardy",
                "Reference":"Far From The Madding Crowd",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"Every atom of your flesh is as dear to me as my own: in pain and sickness it would still be dear.",
                "Author":"Charlotte Brontë",
                "Reference":"Jane Eyre",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"It is better to love wisely, no doubt: but to love foolishly is better than not to be able to love at all.”",
                "Author":"William Makepeace Thackeray",
                "Reference":"Vanity Fair",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"True love is rare, and it’s the only thing that gives life real meaning",
                "Author":"Nicholas Sparks",
                "Reference":"Message in a Bottle",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"The Very first moment I beheld him, my heart was irrevocably gone",
                "Author":"Jane Austen",
                "Reference":"Love and Friendship",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"Sometimes you wake up from a dream. Sometimes you wake up in a dream. And sometimes, every once in a while, you wake up in someone else’s dream.",
                "Author":"Richelle Mead",
                "Reference":"Succubus Blues (Georgina Kincaid, #1)",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"When it comes to men who are romantically interested in you, it’s really simple. Just ignore everything they say and only pay attention to what they do.",
                "Author":"Randy Pausch",
                "Reference":"The Last Lecture",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"For never was a story of more woe than this of Juliet and her Romeo",
                "Author":"William Shakespeare",
                "Reference":"Romeo and Juliet",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"Love all, trust a few, do wrong to none.",
                "Author":"William Shakespeare",
                "Reference":"All’s Well That Ends Well",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"Love looks not with the eyes, but with the mind,",
                "Author":"William Shakespeare",
                "Reference":"A Midsummer Night’s Dream",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"But I, being poor, have only my dreams; I have spread my dreams under your feet; Tread softly because you tread on my dreams.”",
                "Author":"W.B. Yeats",
                "Reference":"He Wishes for the Cloths of Heaven",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"But soft! What light through yonder window breaks?It is the east, and Juliet is the sun",
                "Author":"William Shakespeare",
                "Reference":"Romeo and Juliet,",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"He was my North, my South, my East and West, my working week and my Sunday rest.",
                "Author":"W.H. Auden",
                "Reference":"Stop All the Clocks",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"If I were to live a thousand years, I would belong to you for all of them. If we were to live a thousand lives, I would want to make you mine in each one.",
                "Author":"Michelle Hodkin",
                "Reference":"The Evolution of Mara Dyer",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"Every lover is, in his heart, a madman, and, in his head, a minstrel",
                "Author":"Neil Gaiman",
                "Reference":"Stardust",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"You gave me a forever within the numbered days, and I'm grateful",
                "Author":"John Green",
                "Reference":"The Fault in Our Stars",
                "Category": "Romance",
                "Color": "#4472c4"
            
            },
            {
                "Quote":"Grow old along with me! The best is yet to be",
                "Author":"Robert Browning",
                "Reference":"Rabbi Ben Ezra",
                "Category": "Humor",
                "Color": "#ffe599"
            
            },
            {
                "Quote":"How five crows managed to lift a twenty-pound baby boy into the air was beyond prue, but that was certainly the least of her worries.",
                "Author":"Colin Meloy",
                "Reference":"Wildwood: The Wildwood Chronicles Vol. One",
                "Category": "Humor",
                "Color": "#ffe599"
            
            },
            {
                "Quote":"For the better part of my childhood, my professional aspirations were simple–i wanted to be an intergalactic princess",
                "Author":"Janet Evanovich",
                "Reference":"Seven up",
                "Category": "Humor",
                "Color": "#ffe599"
            
            },
            {
                "Quote":"It wasn’t until i had become engaged to miss piano that i began avoiding her.",
                "Author":"Peter De Vries",
                "Reference":"Into Your Tent I’ll Creep",
                "Category": "Humor",
                "Color": "#ffe599"
            
            },
            {
                "Quote":"I love deadlines. I love the whooshing noise they make as they go by",
                "Author":"Douglas Adams",
                "Reference":"The Salmon of Doubt",
                "Category": "Humor",
                "Color": "#ffe599"
            
            },
            {
                "Quote":"The trouble with having an open mind, of course, is that people will insist on coming along and trying to put things in it.",
                "Author":"Terry Pratchett",
                "Reference":"Diggers",
                "Category": "Humor",
                "Color": "#ffe599"
            
            },
            {
                "Quote":"Reality continues to ruin my life",
                "Author":"Bill Watterson",
                "Reference":"The Complete Calvin and Hobbes",
                "Category": "Humor",
                "Color": "#ffe599"
            
            },
            {
                "Quote":"Have you ever noticed how ‘What the hell’ is always the right decision to make?",
                "Author":"Terry Johnson",
                "Reference":"Insignificance",
                "Category": "Humor",
                "Color": "#ffe599"
            
            },
            {
                "Quote":"Give a man a fire and he's warm for a day, but set fire to him and he's warm for the rest of his life",
                "Author":"Terry Pratchett",
                "Reference":"Jingo",
                "Category": "Humor",
                "Color": "#ffe599"
            
            },
            {
                "Quote":"This life’s hard, but it’s harder if you’re stupid",
                "Author":"George V. Higgins",
                "Reference":"The Friends of Eddie Coyle",
                "Category": "Humor",
                "Color": "#ffe599"
            
            },
            {
                "Quote":"I do not want people to be very agreeable, as it saves me the trouble of liking them a great deal",
                "Author":"Jane Austen",
                "Reference":"Jane Austen's Letters",
                "Category": "Humor",
                "Color": "#ffe599"
            
            },
            {
                "Quote":"Never let your sense of morals prevent you from doing what is right.",
                "Author":"Isaac Asimov,",
                "Reference":"Foundation",
                "Category": "Humor",
                "Color": "#ffe599"
            
            },
            {
                "Quote":"It is said that your life flashes before your eyes just before you die. That is true, it's called Life",
                "Author":"Terry Pratchett",
                "Reference":"The Last Continent",
                "Category": "Humor",
                "Color": "#ffe599"
            
            },
            {
                "Quote":"I have great faith in fools - self-confidence my friends will call it",
                "Author":"Edgar Allan Poe",
                "Reference":"Marginalia",
                "Category": "Humor",
                "Color": "#ffe599"
            
            },
            {
                "Quote":"There is nothing in the world so irresistibly contagious as laughter and good humor",
                "Author":"Charles Dickens",
                "Reference":"A Christmas Carol",
                "Category": "Humor",
                "Color": "#ffe599"
            
            },
            {
                "Quote":"'Begin at the beginning', the King said, very gravely, 'and go on till you come to the end: then stop'",
                "Author":"Lewis Carroll",
                "Reference":"Alice in Wonderland",
                "Category": "Humor",
                "Color": "#ffe599"
            
            },
            {
                "Quote":"I’d said it before and meant it: Alive or undead, the love of my life was a badass.",
                "Author":"Richelle Mead",
                "Reference":"Blood promise",
                "Category": "Humor",
                "Color": "#ffe599"
            
            },
            {
                "Quote":"Tell the truth, or someone will tell it for you",
                "Author":"Stephanie Klein",
                "Reference":"Straight Up and Dirty",
                "Category": "Humor",
                "Color": "#ffe599"
            
            },
            {
                "Quote":"I suppose I'll have to add the force of gravity to my list of enemies.",
                "Author":"Lemony Snicket",
                "Reference":"The Penultimate Peril",
                "Category": "Humor",
                "Color": "#ffe599"
            
            },
            {
                "Quote":"Say 'provoking' again. Your mouth looks provocative when you do.",
                "Author":"Becca Fitzpatrick",
                "Reference":"Hush, Hush",
                "Category": "Humor",
                "Color": "#ffe599"
            
            },
            {
                "Quote":"Time is a drug. Too much of it kills you",
                "Author":"Terry Pratchett",
                "Reference":"Small Gods",
                "Category": "Humor",
                "Color": "#ffe599"
            
            },
            {
                "Quote":"Time is an illusion. Lunchtime doubly so.",
                "Author":"Douglas Adams",
                "Reference":"The Hitchhiker's Guide to the Galaxy",
                "Category": "Humor",
                "Color": "#ffe599"
            
            },
            {
                "Quote":"The capacity for friendship is God's way of apologizing for our families.",
                "Author":"Jay McInerney",
                "Reference":"The Last of the Savages",
                "Category": "Humor",
                "Color": "#ffe599"
            
            },
            {
                "Quote":"Every now and then I like to do as I'm told, just to confuse people.",
                "Author":"Tamora Pierce",
                "Reference":"Melting Stones",
                "Category": "Humor",
                "Color": "#ffe599"
            
            },
            {
                "Quote":"Happiness in intelligent people is the rarest thing I know",
                "Author":"Ernest Hemingway",
                "Reference":"The Garden of Eden",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"It's so hard to forget pain, but it's even harder to remember sweetness. We have no scar to show for happiness. We learn so little from peace.",
                "Author":"Chuck Palahniuk",
                "Reference":"Chuck Palahniuk",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"Love is that condition in which the happiness of another person is essential to your own",
                "Author":"Robert A. Heinlein",
                "Reference":"Stranger in a Strange Land",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"There's nothing like deep breaths after laughing that hard. Nothing in the world like a sore stomach for the right reasons.",
                "Author":"Stephen Chbosky",
                "Reference":"The Perks of Being a Wallflower",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"The only way to find true happiness is to risk being completely cut open.",
                "Author":"Chuck Palahniuk",
                "Reference":"Invisible Monsters",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"Happiness (is) only real when shared",
                "Author":"Jon Krakauer",
                "Reference":"Into the Wild",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"I felt my lungs inflate with the onrush of scenery-air, mountains, trees, people. I thought, 'This is what it is to be happy.'",
                "Author":"Sylvia Plath",
                "Reference":"The Bell Jar",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"It's been my experience that you can nearly always enjoy things if you make up your mind firmly that you will.",
                "Author":"L.M. Montgomery",
                "Reference":"Anne of Green Gables",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"When the first baby laughed for the first time, its laugh broke into a thousand pieces, and they all went skipping about, and that was the beginning of fairies.",
                "Author":"J.M. Barrie",
                "Reference":"Peter Pan",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"I would always rather be happy than dignified",
                "Author":"Charlotte Bronte",
                "Reference":"Jane Eyre",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"Cheerfulness and content are great beautifiers, and are famous preservers of youthful looks, depend upon it.",
                "Author":"Charles Dickens",
                "Reference":"",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"Happy are they that hear their detractions, and can put them to mending",
                "Author":"William Shakespeare",
                "Reference":"Much Ado About Nothing",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"Happy is the man who can make a living by his hobby!",
                "Author":"George Bernard Shaw",
                "Reference":"Pygmalion",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"I had rather have a fool to make me merry than experience to make me sad",
                "Author":"William Shakespeare",
                "Reference":"As You Like It",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"That the choice for mankind lay between freedom and happiness, and that, for the great bulk of mankind, happiness was better.",
                "Author":"George Orwell",
                "Reference":"Nineteen Eighty-Four",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"There is no happiness like that of being loved by your fellow-creatures, and feeling that your presence is an addition to their comfort.",
                "Author":"Charlotte Bronte",
                "Reference":"Jane Eyre",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"Surely happiness is reflective, like the light of heaven.",
                "Author":"Washington Irving",
                "Reference":"Old Christmas",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"To me it seems that those who are happy in this world are better and more lovable people than those who are not.",
                "Author":"Samuel Butler",
                "Reference":"The Way of All Flesh",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"'Action may not always be happiness,' said the general; 'but there is no happiness without action.'",
                "Author":"Benjamin Disraeli",
                "Reference":"Lothair",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"Take responsibility of your own happiness, never put it in other people’s hands",
                "Author":"Roy T. Bennett",
                "Reference":"The Light in the Heart",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"If you want to be happy, do not dwell in the past, do not worry about the future, focus on living fully in the present",
                "Author":"Roy T. Bennett",
                "Reference":"The Light in the Heart",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"Happiness is holding someone in your arms and knowing you hold the whole world.",
                "Author":"Orhan Pamuk",
                "Reference":"Snow",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"The happiness of your life depends upon the quality of your thoughts",
                "Author":"Marcus Aurelius",
                "Reference":"Meditations",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"I must learn to be content with being happier than I deserve.",
                "Author":"Jane Austen",
                "Reference":"Pride and Prejudice",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"Stop comparing yourself to other people, just choose to be happy and live your own life.",
                "Author":"Roy T. Bennett",
                "Reference":"The Light in the Heart",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"I am not proud, but I am happy; and happiness blinds, I think, more than pride.",
                "Author":"Alexandre Dumas",
                "Reference":"The Count of Monte Cristo",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"The search for happiness is one of the chief sources of unhappiness.",
                "Author":"Eric Hoffer",
                "Reference":"The Passionate State of Mind",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"Happiness is an imaginary condition, Formerly often attributed by the living to the dead, now usually attributed by adults to children, and by children to adults",
                "Author":"Thomas Szasz",
                "Reference":"The Second Sin ",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"So of cheerfulness, or a good temper--the more it is spent, the more of it remains.",
                "Author":"Ralph Waldo Emerson",
                "Reference":"The Conduct of Life",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"Happiness is an attainable human condition; bliss is reserved for the dead. ",
                "Author":"Shraga Silverstein",
                "Reference":"A Candle by Day",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"Man only likes to count his troubles; he doesn't calculate his happiness",
                "Author":"Fyodor Dostoyevsky",
                "Reference":"Notes from Underground",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"I'd far rather be happy than right any day",
                "Author":"Douglas Adams",
                "Reference":"The Hitchhiker's Guide to the Galaxy",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"With mirth and laughter let old wrinkles come",
                "Author":"William Shakespeare",
                "Reference":"The Merchant of Venice",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"he problem with people is they forget that most of the time it's the small things that count.",
                "Author":"Jennifer Niven",
                "Reference":"All the Bright Places",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"Happiness is an accident of nature, a beautiful and flawless aberration.”",
                "Author":"Pat Conroy",
                "Reference":"The Lords of Discipline",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"It is the very mark of the spirit of rebellion to crave for happiness in this life",
                "Author":"Henrik Ibsen",
                "Reference":"Ghosts",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"A smile puts you on the right track. A smile makes the world a beautiful place. When you lose your smile, you lose your way in the chaos of life",
                "Author":"Roy T. Bennett",
                "Reference":"The Light in the Heart",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"And I can't be running back and fourth forever between grief and high delight.",
                "Author":"J.D. Salinger",
                "Reference":"Franny and Zooey",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"If you want others to be happy, practice compassion. If you want to be happy, practice compassion",
                "Author":"Dalai Lama XIV",
                "Reference":"The Art of Happiness",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"There are as many styles of beauty as there are visions of happiness.",
                "Author":"Stendhal",
                "Reference":"Love",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"I don't understand the point of being together if you're not the happiest.",
                "Author":"Gillian Flynn",
                "Reference":"Gone Girl",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"Happiness depends on being free, and freedom depends on being courageous",
                "Author":"Marie Rutkoski",
                "Reference":"The Winner's Curse",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"There are two ways to be happy: improve your reality, or lower your expectations.",
                "Author":"Jodi Picoult",
                "Reference":"Nineteen Minutes",
                "Category": "Happiness",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"I guess that’s what saying good-bye is always like — like jumping off an edge. The worst part is making the choice to do it. Once you’re in the air, there’s nothing you can do but let go",
                "Author":"Lauren Oliver",
                "Reference":"Before I Fall",
                "Category": "Sad",
                "Color": "#7030a0"
            
            },
            {
                "Quote":"Breathing is hard. When you cry so much, it makes you realize that breathing is hard",
                "Author":"David Levithan",
                "Reference":"Love is the Higher Law",
                "Category": "Sad",
                "Color": "#a8d08d"
            
            },
            {
                "Quote":"So, this is my life. And I want you to know that I am both happy and sad and I’m still trying to figure out how that could be.",
                "Author":"Stephen Chbosky",
                "Reference":"The Perks of Being a Wallflower",
                "Category": "Sad",
                "Color": "#a8d08d"
            
            },
            {
                "Quote":"You know, a heart can be broken, but it keeps on beating, just the same.",
                "Author":"Fannie Flagg",
                "Reference":"Fried Green Tomatoes at the Whistle Stop Cafe",
                "Category": "Sad",
                "Color": "#a8d08d"
            
            },
            {
                "Quote":"As the light begins to intensify, so does my misery, and I wonder how it is possible to hurt so much when nothing is wrong.",
                "Author":"Tabitha Suzuma",
                "Reference":"Forbidden",
                "Category": "Sad",
                "Color": "#a8d08d"
            
            },
            {
                "Quote":"You see I usually find myself among strangers because I drift here and there trying to forget the sad things that happened to me",
                "Author":"F. Scott Fitzgerald,",
                "Reference":"The Great Gatsby",
                "Category": "Sad",
                "Color": "#a8d08d"
            
            },
            {
                "Quote":"Sometimes I can hear my bones straining under the weight of all the lives I’m not living",
                "Author":"Jonathan Safran Foer",
                "Reference":"Extremely Loud and Incredibly Close",
                "Category": "Sad",
                "Color": "#a8d08d"
            
            },
            {
                "Quote":"Of all the words of mice and men, the saddest are, 'It might have been.",
                "Author":"Kurt Vonnegut",
                "Reference":"Cat's Cradle",
                "Category": "Sad",
                "Color": "#a8d08d"
            
            },
            {
                "Quote":"There is no greater agony than bearing an untold story inside you",
                "Author":"Maya Angelou",
                "Reference":"I Know Why the Caged Bird Sings",
                "Category": "Sad",
                "Color": "#a8d08d"
            
            },
            {
                "Quote":"I hid my deepest feelings so well I forgot where I placed them",
                "Author":"Amy Tan",
                "Reference":"Saving Fish from Drowning",
                "Category": "Sad",
                "Color": "#a8d08d"
            
            },
            {
                "Quote":"Tears shed for another person are not a sign of weakness. They are a sign of a pure heart",
                "Author":"José N. Harris",
                "Reference":"MI VIDA: A Story of Faith, Hope and Love",
                "Category": "Sad",
                "Color": "#a8d08d"
            
            },
            {
                "Quote":"I can't eat and I can't sleep. I'm not doing well in terms of being a functional human, you know?",
                "Author":"Ned Vizzini",
                "Reference":"It's Kind of a Funny Story",
                "Category": "Sad",
                "Color": "#a8d08d"
            
            },
            {
                "Quote":"So it’s true, when all is said and done, grief is the price we pay for love.",
                "Author":"E.A. Bucchianeri",
                "Reference":"Brushstrokes of a Gadfly",
                "Category": "Sad",
                "Color": "#a8d08d"
            
            },
            {
                "Quote":"Nothing thicker than a knife's blade separates happiness from melancholy.",
                "Author":"Virginia Woolf",
                "Reference":"Orlando",
                "Category": "Sad",
                "Color": "#a8d08d"
            
            },
            {
                "Quote":"Give sorrow words; the grief that does not speak knits up the o-er wrought heart and bids it break.",	
                "Author":"William Shakespeare",
                "Reference":"Macbeth",
                "Category": "Sad",
                "Color": "#a8d08d"
            
            },
            {
                "Quote":"Then she was pressing her little proud broken self against his face, as close as she could get, and then they died.",
                "Author":"Philip Pullman",
                "Reference":"The Subtle Knife",
                "Category": "Sad",
                "Color": "#a8d08d"
            
            },
            {
                "Quote":"I was too young to know how to love her",
                "Author":"Antoine de Saint-Exupéry",
                "Reference":"The Little Prince",
                "Category": "Sad",
                "Color": "#a8d08d"
            
            },
            {
                "Quote":"You can love someone so much...But you can never love people as much as you can miss them.",
                "Author":"John Green",
                "Reference":"An Abundance of Katherines",
                "Category": "Sad",
                "Color": "#a8d08d"
            
            },
            {
                "Quote":"There’s death all around us. Everywhere we look. 1.8 people kill themselves every second. We just don’t pay attention. Until we do.",
                "Author":"Cynthia Hand",
                "Reference":"The Last Time We Say Goodbye",
                "Category": "Sad",
                "Color": "#a8d08d"
            
            },
            {
                "Quote":"As the light begins to intensify, so does my misery, and I wonder how it is possible to hurt so much when nothing is wrong",
                "Author":"Tabitha Suzuma",
                "Reference":"Forbidden",
                "Category": "Sad",
                "Color": "#a8d08d"
            
            },
            {
                "Quote":"Have you ever wondered what a human life is worth? That morning, my brother’s was worth a pocket watch",
                "Author":"Ruta Sepetys",
                "Reference":"Between Shades of Gray",
                "Category": "Sad",
                "Color": "#a8d08d"
            
            },
            {
                "Quote":"Long time I been on my own, but now really I’m alone. I survive the killing, the starving, all the hate of the Khmer Rouge, but I think maybe now I will die of this, of broken heart.",
                "Author":"Patricia McCormick",
                "Reference":"Never Fall Down",
                "Category": "Sad",
                "Color": "#a8d08d"
            
            },
            {
                "Quote":"Grief is not as heavy as guilt, but it takes more away from you.",
                "Author":"Veronica Roth",
                "Reference":"Insurgent",
                "Category": "Sad",
                "Color": "#a8d08d"
            
            },
            {
                "Quote":"You were merely wishing for the end of pain, the monster said. Your own pain. An end to how it isolated you. It is the most human wish of all.",
                "Author":"Elizabeth Wein",
                "Reference":"Code Name Verity",
                "Category": "Sad",
                "Color": "#a8d08d"
            
            },
            {
                "Quote":"From the moment we are born, we begin to die.",
                "Author":"Janne Teller",
                "Reference":"Nothing",
                "Category": "Sad",
                "Color": "#a8d08d"
            
            },
            {
                "Quote":"I saw the world in black and white instead of the vibrant colours and shades I knew existed",
                "Author":"Katie McGarry",
                "Reference":"Pushing the Limits",
                "Category": "Sad",
                "Color": "#a8d08d"
            
            },




// start Churchil








            {
                "Quote":"It is a good thing for an uneducated man to read a book of quotations.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": " Books And Reading Quotes",
                "Color": "black"
            
            },



            {
                "Quote":"If you mean to profit, learn to please.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Business Quotes",
                "Color": "black"
            
            },   {
                "Quote":"I cannot forecast to you the action of Russia. It is a riddle wrapped in a mystery inside an enigma: but perhaps there is a key. That key is Russian national interests.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Action Quotes",
                "Color": "black"
            
            },   {
                "Quote":"Never give in, never give in, never; never; never; never - in nothing, great or small, large or petty - never give in except to convictions of honor and good sense",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Conviction Quotes",
                "Color": "black"
            
            },   {
                "Quote":"I do not resent criticism, even when, for the sake of emphasis, it parts for the time with reality.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Critics And Criticism Quotes",
                "Color": "black"
            
            },   {
                "Quote":"Arm yourselves, and be ye men of valour, and be in readiness for the conflict? forit is better for us to perish in battle than to look upon the outrage of our nation andour altar.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Conflict Quotes",
                "Color": "black"
            
            },   {
                "Quote":"Many forms of Government have been tried, and will be tried in this world of sin and woe. No one pretends that democracy is perfect or all-wise. Indeed, it has been said that democracy is the worst form of Government except all those others that have been tried from time to time.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Democracy Quotes",
                "Color": "black"
            
            },   {
                "Quote":"Democracy is the worst form of government except all those other forms that have been tried from time to time.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Democracy Quotes",
                "Color": "black"
            
            },   {
                "Quote":"It has been said that Democracy is the worst form of government except all those other forms that have been tried from time to time.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": " Democracy Quotes",
                "Color": "black"
            
            },   {
                "Quote":"We are happier in many ways when we are old than when we were young. The young sow wild oats. The old grow sage.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Happiness Quotes Age And Aging Quotes",
                "Color": "black"
            
            },   {
                "Quote":"There was unanimous, automatic, unquestioned agreement around our table.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Agreement Quotes",
                "Color": "black"
            
            },   {
                "Quote":"By swallowing evil words unsaid, no one has ever harmed his stomach.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Evil Quotes",
                "Color": "black"
            
            },   {
                "Quote":"If we open a quarrel between the past and the present, we shall find that we have lost the future",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Future Quotes",
                "Color": "black"
            
            },   {
                "Quote":"All men make mistakes, but only wise men learn from their mistakes.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Mistakes Quotes",
                "Color": "black"
            
            },   {
                "Quote":"A man is about as big as the things that make him angry",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Anger Quotes",
                "Color": "black"
            
            },   {
                "Quote":"Always remember, a cat looks down on man, a dog looks up to man, but a pig will look man right in the eye and see his equal.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Animals Quotes",
                "Color": "black"
            
            },   {
                "Quote":"[Lady Nancy Astor:] Winston, if you were my husband, I'd put poison in your coffee. ... Nancy, if you were my wife, I'd drink it.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Coffee Quotes",
                "Color": "black"
            
            },   {
                "Quote":"Beware the sleeping dragon. For when she awakes the Earth will shake [On China].",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": " Advice Quotes",
                "Color": "black"
            
            },   {
                "Quote":"The poor girl does not know how to have a conversation. Unfortunately, she does know how to speak.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": " Conversation Quotes",
                "Color": "black"
            
            },   {
                "Quote":"Nothing would induce me to vote for giving women the franchise. I am not going to be henpecked into a question of such importance.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Democracy Quotes",
                "Color": "black"
            
            },   {
                "Quote":"It has been said that democracy is the worst form of government except all the others that have been tried.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Democracy Quotes",
                "Color": "black"
            
            },   {
                "Quote":"In Franklin Roosevelt there died the greatest American friend we have ever known and the greatest champion of freedom who has ever brought help and comfort from the New World to the Old.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "America Quotes",
                "Color": "black"
            
            },   {
                "Quote":"People imagine that Churchill, Roosevelt and Stalin arrived in Yalta with a blank sheet of paper to decide the fate of Europe. Nothing could be further from the truth.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Fate Quotes",
                "Color": "black"
            
            },   {
                "Quote":"Those who forget history are bound to repeat it",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": " History Quotes",
                "Color": "black"
            
            },   {
                "Quote":"What kind of people do they think we are? Is it possible they do not realize that we shall never cease to preserve against them until they have been taught a lesson which they and the world will never forget?",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Kindness Quotes",
                "Color": "black"
            
            },   {
                "Quote":"No lover ever studied every whim of his mistress as I did those of President Roosevelt.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Love Quotes",
                "Color": "black"
            
            },   {
                "Quote":"Responsibility is the price of greatness.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Greatness Quotes",
                "Color": "black"
            
            },   {
                "Quote":"When the eagles are silent the parrots begin to jabber.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Silence Quotes",
                "Color": "black"
            
            },   {
                "Quote":"Out of intense complexities intense simplicities emerge.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": " Simplicity Quotes",
                "Color": "black"
            
            },   {
                "Quote":"Some regard private enterprise as if it were a predatory tiger to be shot. Others look upon it as a cow that they can milk. Only a handful see it for what it really is--the strong horse that pulls the whole cart.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Patriotism Quotes",
                "Color": "black"
            
            },   {
                "Quote":"Most people, sometime in their lives, stumble across truth. Most jump up, brush themselves off, and hurry on about their business as if nothing had happened.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": " Patriotism Quotes",
                "Color": "black"
            
            },   {
                "Quote":"When I look back on all the worries I remember the story of the old man who said on his deathbed that he had a lot of trouble in his life, most of which never happened.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Worry Quotes",
                "Color": "black"
            
            },   {
                "Quote":"Success is the ability to go from one failure to another with no loss of enthusiasm.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Ability Quotes",
                "Color": "black"
            
            },   {
                "Quote":"I would say to the House, as I said to those who have joined this Government, `I have nothing to offer but blood, toil, tears and sweat.'",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Blood Quotes",
                "Color": "black"
            
            },   {
                "Quote":"I never worry about action, but only about inaction",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": " Action Quotes",
                "Color": "black"
            
            },   {
                "Quote":"There is only one duty, only one safe course, and that is to try to be right.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Conscience Quotes Duty Quotes",
                "Color": "black"
            
            },   {
                "Quote":"Advertising mourishes the consuming power of men. It sets up before a man the goal of a better home, better clothing, better food for himself and his family. It spurs individual exertion and greater production.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Advertising Quotes",
                "Color": "black"
            
            },   {
                "Quote":"It is impossible to obtain a conviction for sodomy from an English jury. Half of them don't believe that it can physically be done, and the other half are doing it.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Conviction Quotes",
                "Color": "black"
            
            },   {
                "Quote":"I was not the lion, but it fell to me to give the lion's roar.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Leaders And Leadership Quotes",
                "Color": "black"
            
            },   {
                "Quote":"Courage is the first of human qualities because it is the quality which guarantees the others.",
                "Author":"Winston Churchil",
                "Reference":"",
                "Category": "Courage Quotes Greek Philosopher Quotes",
                "Color": "black"
            
            },  
            
























// start Vladimir Nabokov



            
            {
                "Quote":"It was love at first sight, at last sight, at ever and ever sight.",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  
            {
                "Quote":"And the rest is rust and stardust.",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  
            {
                "Quote":"Lolita, light of my life, fire of my loins. My sin, my soul. Lo-lee-ta: the tip of the tongue taking a trip of three steps down the palate to tap, at three, on the teeth. Lo. Lee. Ta. She was Lo, plain Lo, in the morning, standing four feet ten in one sock. She was Lola in slacks. She was Dolly at school. She was Dolores on the dotted line. But in my arms she was always Lolita. Did she have a precursor? She did, indeed she did. In point of fact, there might have been no Lolita at all had I not loved, one summer, an initial girl-child. In a princedom by the sea. Oh when? About as many years before Lolita was born as my age was that summer. You can always count on a murderer for a fancy prose style. Ladies and gentlemen of the jury, exhibit number one is what the seraphs, the misinformed, simple, noble-winged seraphs, envied. Look at this tangle of thorns.",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  
            {
                "Quote":"He broke my heart. You merely broke my life.",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  
            {
                "Quote":"Human life is but a series of footnotes to a vast obscure unfinished masterpiece",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },
            {
                "Quote":"I need you, the reader, to imagine us, for we don't really exist if you don't.",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },   {
                "Quote":"Oh, don't cry, I'm so sorry I cheated so much, but that's the way things are.",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },   {
                "Quote":"You can always count on a murderer for a fancy prose style.",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },   {
                "Quote":"Words without experience are meaningless.",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },   {
                "Quote":" knew I had fallen in love with Lolita forever; but I also knew she would not be forever Lolita.",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },   {
                "Quote":"All at once we were madly, clumsily, shamelessly, agonizingly in love with each other; hopelessly, I should add, because that frenzy of mutual possession might have been assuaged only by our actually imbibing and assimilating every particle of each other's soul and flesh; but there we were, unable even to mate as slum children would have so easily found an opportunity to do so",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },   {
                "Quote":"We loved each other with a premature love, marked by a fierceness that so often destroys adult lives.",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },   {
                "Quote":"She was Lo, plain Lo, in the morning, standing four feet ten in one sock. She was Lola in slacks. She was Dolly at school. She was Dolores on the dotted line. But in my arms she was always Lolita",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },   {
                "Quote":"I looked and looked at her, and I knew, as clearly as I know that I will die, that I loved her more than anything I had ever seen or imagined on earth. She was only the dead-leaf echo of the nymphet from long ago - but I loved her, this Lolita, pale and polluted and big with another man's child. She could fade and wither - I didn't care. I would still go mad with tenderness at the mere sight of her face.",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },   {
                "Quote":"And presently I was driving through the drizzle of the dying day, with the windshield wipers in full action but unable to cope with my tears.",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },   {
                "Quote":"I loved you. I was a pentapod monster, but I loved you. I was despicable and brutal, and turpid, and everything, mais je t’aimais, je t’aimais! And there were times when I knew how you felt, and it was hell to know it, my little one. Lolita girl, brave Dolly Schiller.",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },   {
                "Quote":"Perhaps, somewhere, some day, at a less miserable time, we may see each other again.",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },   {
                "Quote":"You have to be an artist and a madman, a creature of infinite melancholy, with a bubble of hot poison in your loins and a super-voluptuous flame permanently aglow in your subtle spine (oh, how you have to cringe and hide!), in order to discern at once, by ineffable signs―the slightly feline outline of a cheekbone, the slenderness of a downy limbs, and other indices which despair and shame and tears of tenderness forbid me to tabulate―the little deadly demon among the wholesome children; she stands unrecognized by them and unconscious herself of her fantastic power.",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },   {
                "Quote":"Life is short. From here to that old car you know so well there is a stretch of twenty, twenty-five paces. It is a very short walk. Make those twenty-five steps. Now. Right now. Come just as you are. And we shall live happily ever after. ",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },   {
                "Quote":"And she was mine, she was mine, the key was in my fist, my fist was in my pocket, she was mine.",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },   {
                "Quote":"I have often noticed that we are inclined to endow our friends with the stability of type that literary characters acquire in the reader's mind. [...] Whatever evolution this or that popular character has gone through between the book covers, his fate is fixed in our minds, and, similarly, we expect our friends to follow this or that logical and conventional pattern we have fixed for them. Thus X will never compose the immortal music that would clash with the second-rate symphonies he has accustomed us to. Y will never commit murder. Under no circumstances can Z ever betray us. We have it all arranged in our minds, and the less often we see a particular person, the more satisfying it is to check how obediently he conforms to our notion of him every time we hear of him. Any deviation in the fates we have ordained would strike us as not only anomalous but unethical. We could prefer not to have known at all our neighbor, the retired hot-dog stand operator, if it turns out he has just produced the greatest book of poetry his age has seen.",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },   {
                "Quote":"I shall be dumped where the weed decays, And the rest is rust and stardust",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },   {
                "Quote":"We all have such fateful objects — it may be a recurrent landscape in one case, a number in another — carefully chosen by the gods to attract events of specific significance for us: here shall John always stumble; there shall Jane's heart always break.",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },   {
                "Quote":"I recall certain moments, let us call them icebergs in paradise, when after having had my fill of her –after fabulous, insane exertions that left me limp and azure-barred–I would gather her in my arms with, at last, a mute moan of human tenderness (her skin glistening in the neon light coming from the paved court through the slits in the blind, her soot-black lashes matted, her grave gray eyes more vacant than ever–for all the world a little patient still in the confusion of a drug after a major operation)–and the tenderness would deepen to shame and despair, and I would lull and rock my lone light Lolita in my marble arms, and moan in her warm hair, and caress her at random and mutely ask her blessing, and at the peak of this human agonized selfless tenderness (with my soul actually hanging around her naked body and ready to repent), all at once, ironically, horribly, lust would swell again–and 'oh, no,' Lolita would say with a sigh to heaven, and the next moment the tenderness and the azure–all would be shattered.",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },   {
                "Quote":"if a violin string could ache, i would be that string.",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },   {
                "Quote":"We live not only in a world of thoughts, but also in a world of things. Words without experience are meaningless.",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },   {
                "Quote":"We had been everywhere. We had really seen nothing. And I catch myself thinking today that our long journey had only defiled with a sinuous trail of slime the lovely, trustful, dreamy, enormous country that by then, in retrospect, was no more to us than a collection of dog-eared maps, ruined tour books, old tires, and her sobs in the night — every night, every night — the moment I feigned sleep.",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            
            
            
            
            
            
            {
                "Quote":" am sufficiently proud of my knowing something to be modest about my not knowing all.",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },   {
                "Quote":"You see, she had absolutely nowhere else to go",
                "Author":"Vladimir Nabokov",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  









// start  Paulo Coelho







            {
                "Quote":"It's the possibility of having a dream come true that makes life interesting",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 

            {
                "Quote":"When we love, we always strive to become better than we are. When we strive to become better than we are, everything around us becomes better too.",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"One is loved because one is loved. No reason is needed for loving",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"There is only one thing that makes a dream impossible to achieve: the fear of failure.",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"So, I love you because the entire universe conspired to help me find you.",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"he secret of life, though, is to fall seven times and to get up eight times.",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"Waiting is painful. Forgetting is painful. But not knowing which to do is the worst kind of suffering.",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"The simple things are also the most extraordinary things, and only the wise can see them.",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"If pain must come, may it come quickly. Because I have a life to live, and I need to live it in the best way possible. If he has to make a choice, may he make it now. Then I will either wait for him or forget him.",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"Everyone seems to have a clear idea of how other people should lead their lives, but none about his or her own",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"Everything tells me that I am about to make a wrong decision, but making mistakes is just part of life. What does the world want of me? Does it want me to take no risks, to go back to where I came from because I didn't have the courage to say 'yes' to life?",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"Remember that wherever your heart is, there you will find your treasure.",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"When someone leaves, it's because someone else is about to arrive",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"Tell your heart that the fear of suffering is worse than the suffering itself. And that no heart has ever suffered when it goes in search of its dreams, because every second of the search is a second's encounter with God and with eternity",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"Love is an untamed force. When we try to control it, it destroys us. When we try to imprison it, it enslaves us. When we try to understand it, it leaves us feeling lost and confused.",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"Don't waste your time with explanations: people only hear what they want to hear.",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"We can never judge the lives of others, because each person knows only their own pain and renunciation. It's one thing to feel that you are on the right path, but it's another to think that yours is the only path.",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"When I had nothing to lose, I had everything. When I stopped being who I am, I found myself",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"No matter what he does, every person on earth plays a central role in the history of the world. And normally he doesn't know it.",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"A child can teach an adult three things: to be happy for no reason, to always be busy with something, and to know how to demand with all his might that which he desires.",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"Nothing in the world is ever completely wrong. Even a stopped clock is right twice a day",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"When you find your path, you must not be afraid. You need to have sufficient courage to make mistakes. Disappointment, defeat, and despair are the tools God uses to show us the way",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"When we least expect it, life sets us a challenge to test our courage and willingness to change; at such a moment, there is no point in pretending that nothing has happened or in saying that we are not yet ready. The challenge will not wait. Life does not look back. A week is more than enough time for us to decide whether or not to accept our destiny",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"Tears are words that need to be written.",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"Don't give in to your fears. If you do, you won't be able to talk to your heart.",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"If I am really a part of your dream, you'll come back one day",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"The two hardest tests on the spiritual road are the patience to wait for the right moment and the courage not to be disappointed with what we encounter.",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"There are moments when troubles enter our lives and we can do nothing to avoid them.But they are there for a reason. Only when we have overcome them will we understand why they were there.",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"Now that she had nothing to lose, she was free.",
                "Author":"Paulo Coelho",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
         




// start  Dale Carnegie




            {
                "Quote":"It isn't what you have or who you are or where you are or what you are doing that makes you happy or unhappy. It is what you think about it.",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
         
            {
                "Quote":"Don't be afraid of enemies who attack you. Be afraid of the friends who flatter you.",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"You can make more friends in two months by becoming interested in other people than you can in two years by trying to get other people interested in you.",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"Any fool can criticize, complain, and condemn—and most fools do. But it takes character and self-control to be understanding and forgiving.",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"When dealing with people, remember you are not dealing with creatures of logic, but with creatures bristling with prejudice and motivated by pride and vanity.",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"Everybody in the world is seeking happiness—and there is one sure way to find it. That is by controlling your thoughts. Happiness doesn't depend on outward conditions. It depends on inner conditions",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"Talk to someone about themselves and they'll listen for hours.",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"Actions speak louder than words, and a smile says, ‘I like you. You make me happy. I am glad to see you",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"When dealing with people, let us remember we are not dealing with creatures of logic. We are dealing with creatures of emotion, creatures bristling with prejudices and motivated by pride and vanity.",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"Personally I am very fond of strawberries and cream, but I have found that for some strange reason, fish prefer worms. So when I went fishing, I didn’t think about what I wanted. I thought about what they wanted. I didn't bait the hook with strawberries and cream. Rather, I dangled a worm or grasshopper in front of the fish and said: 'Wouldn't you like to have that?",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"A man convinced against his will Is of the same opinion still",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"You can't win an argument. You can't because if you lose it, you lose it; and if you win it, you lose it.",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"The difference between appreciation and flattery? That is simple. One is sincere and the other insincere. One comes from the heart out; the other from the teeth out. One is unselfish; the other selfish. One is universally admired; the other universally condemned.",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"To be interesting, be interested.",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"Names are the sweetest and most important sound in any language.",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"I have come to the conclusion that there is only one way under high heaven to get the best of an argument— and that is to avoid it. Avoid it as you would avoid rattlesnakes and earthquakes.",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"If You Want to Gather Honey, Don't Kick Over the Beehive",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"Why talk about what we want? That is childish. Absurd. Of course, you are interested in what you want. You are eternally interested in it. But no one else is. The rest of us are just like you: we are interested in what we want.",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"All men have fears, but the brave put down their fears and go forward, sometimes to death, but always to victory.",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"Instead of condemning people, let’s try to understand them. Let’s try to figure out why they do what they do. That’s a lot more profitable and intriguing than criticism; and it breeds sympathy, tolerance and kindness. “To know all is to forgive all.",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"criticism is dangerous, because it wounds a person's precious pride, hurt his sense of importace and arouse resentment",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"If some people are so hungry for a feeling of importance that they actually go insane to get it, imagine what miracle you and I can achieve by giving people honest appreciation this side of insanity.",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"By fighting you never get enough, but by yielding you get more than you expected.",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"Once I did bad and that I heard ever. Twice I did good, but that I heard never.",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"Only knowledge that is used sticks in your mind.",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"If you argue and rankle and contradict, you may achieve a victory sometimes; but it will be an empty victory because you will never get your opponent's good will.",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"arouse in the other person an eager want. He who can do this has the whole world with him. He who cannot walks a lonely way.",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"A barber lathers a man before he shaves him",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"Winning friends begins with friendliness.",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"he chronic kicker, even the most violent critic, will frequently soften and be subdued in the presence of a patient, sympathetic listener— a listener who will be silent while the irate fault-finder dilates like a king cobra and spews the poison out of his system",
                "Author":"Dale Carnegie",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            











// start   F. Scott Fitzgerald


            {
                "Quote":"So we beat on, boats against the current, borne back ceaselessly into the past.",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"I hope she'll be a fool -- that's the best thing a girl can be in this world, a beautiful little fool.",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"Angry, and half in love with her, and tremendously sorry, I turned away.",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"And I like large parties. They’re so intimate. At small parties there isn’t any privacy.",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"I was within and without, simultaneously enchanted and repelled by the inexhaustible variety of life.",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"And so with the sunshine and the great bursts of leaves growing on the trees, just as things grow in fast movies, I had that familiar conviction that life was beginning over again with the summer.",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"He smiled understandingly-much more than understandingly. It was one of those rare smiles with a quality of eternal reassurance in it, that you may come across four or five times in life. It faced--or seemed to face--the whole eternal world for an instant, and then concentrated on you with an irresistible prejudice in your favor. It understood you just as far as you wanted to be understood, believed in you as you would like to believe in yourself, and assured you that it had precisely the impression of you that, at your best, you hoped to convey",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"I wasn't actually in love, but I felt a sort of tender curiosity.",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"Let us learn to show our friendship for a man when he is alive and not after he is dead.",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"You see I usually find myself among strangers because I drift here and there trying to forget the sad things that happened to me.",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"There are only the pursued, the pursuing, the busy and the tired.",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.'Whenever you feel like criticizing any one,' he told me, 'just remember that all the people in this world haven't had the advantages that you've had",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"Life starts all over again when it gets crisp in the fall.",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"Reserving judgements is a matter of infinite hope.",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"Can’t repeat the past?…Why of course you can!",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"They’re a rotten crowd’, I shouted across the lawn. ‘You’re worth the whole damn bunch put together.",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"In his blue gardens men and girls came and went like moths among the whisperings and the champagne and the stars",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"I couldn’t forgive him or like him, but I saw that what he had done was, to him, entirely justified. It was all very careless and confused. They were careless people, Tom and Daisy—they smashed up things and creatures and then retreated back into their money or their vast carelessness, or whatever it was that kept them together, and let other people clean up the mess they had made.",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"There must have been moments even that afternoon when Daisy tumbled short of his dreams -- not through her own fault, but because of the colossal vitality of his illusion. It had gone beyond her, beyond everything. He had thrown himself into it with a creative passion, adding to it all the time, decking it out with every bright feather that drifted his way. No amount of fire or freshness can challenge what a man will store up in his ghostly heart.",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"It’s a great advantage not to drink among hard drinking people.",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"All I kept thinking about, over and over, was 'You can't live forever; you can't live forever.",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"So we drove on toward death through the cooling twilight",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"I felt a haunting loneliness sometimes, and felt it in others--young clerks in the dusk, wasting the most poignant moments of night and life.",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"His heart beat faster and faster as Daisy’s white face came up to his own. He knew that when he kissed this girl, and forever wed his unutterable visions to her perishable breath, his mind would never romp again like the mind of God. So he waited, listening for a moment longer to the tuning fork that had been struck upon a star. Then he kissed her. At his lips’ touch she blossomed like a flower and the incarnation was complete",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"And as I sat there brooding on the old, unknown world, I thought of Gatsby’s wonder when he first picked out the green light at the end of Daisy’s dock. He had come a long way to this blue lawn, and his dream must have seemed so close that he could hardly fail to grasp it. He did not know that it was already behind him, somewhere back in that vast obscurity beyond the city, where the dark fields of the republic rolled on under the night.Gatsby believed in the green light, the orgastic future that year by year recedes before us. It eluded us then, but that's no matter—to-morrow we will run faster, stretch out our arms farther. . . . And one fine morning——So we beat on, boats against the current, borne back ceaselessly into the past",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"No amount of fire or freshness can challenge what a man will store up in his ghostly heart",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"It takes two to make an accident.",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
         
            {
                "Quote":"He looked at her the way all women want to be looked at by a man",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"If personality is an unbroken series of successful gestures, then there was something gorgeous about him",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            {
                "Quote":"Every one suspects himself of at least one of the cardinal virtues, and this is mine: I am one of the few honest people that I have ever known",
                "Author":" F. Scott Fitzgerald",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 
            






// start Matt Haig











            {
                "Quote":"If you aim to be something you are not, you will always fail. Aim to be you. Aim to look and act and think like you. Aim to be the truest version of you. Embrace that you-ness. Endorse it. Love it. Work hard at it. And don't give a second thought when people mock it or ridicule it. Most gossip is envy in disguise.",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, 

            {
                "Quote":"The only way to learn is to live",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"A person was like a city. You couldn't let a few less desirable parts put you off the whole. There may be bits you don't like, a few dodgy side streets and suburbs, but the good stuff makes it worthwhile",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"We only need to be one person.We only need to feel one existence.We don't have to do everything in order to be everything, because we are already infinite. While we are alive we always contain a future of multifarious possibility.",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices… Would you have done anything different, if you had the chance to undo your regrets?",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"As Thoreau wrote, ‘It’s not what you look at that matters, it’s what you see.",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"And that sadness is intrinsically part of the fabric of happiness. You can’t have one without the other. Of course, they come in different degrees and quantities. But there is no life where you can be in a state of sheer happiness for ever. And imagining there is just breeds more unhappiness in the life you’re in",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"Of course, we can't visit every place or meet every person or do every job, yet most of what we'd feel in any life is still available. We don't have to play every game to know what winning feels like. We don't have to hear every piece of music in the world to understand music. We don't have to have tried every variety of grape from every vineyard to know the pleasure of wine. Love and laughter and fear and pain are universal currencies. We just have to close our eyes and savour the taste of the drink in front of us and listen to the song as it plays. We are as completely and utterly alive as we are in any other life and have access to the same emotional spectrum.",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"Sometimes just to say your own truth out loud is enough to find others like you",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"She wasn't a black hole, she decided. She was a volcano. And like a volcano she couldn't run away from herself. She'd have to stay there and tend to that wasteland.She could plant a forest inside herself",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"Want,’ she told her, in a measured tone, ‘is an interesting word. It means lack. Sometimes if we fill that lack with something else the original want disappears entirely.",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"The thing that looks the most ordinary might end up being the thing that leads you to victory",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"Maybe that's what all lives were, though. Maybe even the most seemingly perfectly intense or worthwhile lives ultimately felt the same. Acres of disappointment and monotony and hurts and rivalries but with flashes of wonder and beauty. Maybe that was the only meaning that mattered. To be the world, witnessing itself",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"hat was how she had felt most of her life.Caught in the middle. Struggling, flailing, just trying to survive while not knowing which way to go. Which path to commit to without regret.",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"You’re overthinking it.’ ‘I have anxiety. I have no other type of thinking available.",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"Regrets don’t leave. They weren’t mosquitoe bites. They itch forever.",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"Look at that chessboard we put back in place,’ said Mrs Elm softly. ‘Look at how ordered and safe and peaceful it looks now, before a game starts. It’s a beautiful thing. But it is boring. It is dead. And yet the moment you make a move on that board, things change. Things begin to get more chaotic. And that chaos builds with every single move you make.",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"It’s an easy game to play,’ she told Nora. ‘But a hard one to master. Every move you make opens a whole new world of possibilities...In chess, as in life, possibility is the basis of everything. Every hope, every dream, every regret, every moment of living...never underestimate the big importance of small things.",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"And even if you were a pawn - maybe we all are - then you should remember that a pawn is the most magical piece of all. It might look small and ordinary but it isn't. because a pawn is never just a pawn. A pawn is a queen-in-waiting. All you need to do is find a way to keep moving forward. One square after another. And you can get to the other side and unlock all kinds of power.",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"The lonely mind in the busy city yearns for connection because it thinks human-to-human connection is the point of everything. But amid pure nature...solitude took on a different character. It became in itself a kind of connection. A connection between herself and the world. And between her and herself.",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"You see, doing one thing differently is very often the same as doing everything differently.",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"“Every second of every day we are entering a new universe. And we spend so much time wishing our lives were different, comparing ourselves to other people and to other versions of ourselves, when really most lives contain degrees of good and degrees of bad.[...]There are patterns of life... Rhythms. It is so easy, while trapped in just the one life, to imagine that times of sadness or tragedy or failure or fear are a result of the particular existence. That it is a by-product of living a certain way, rather than simply living. I mean, it would have mad things a lot easier if we understood there was no way of living that can immunise you against sadness. And that sadness is intrinsically part of the fabric of happiness. You can't have one without the other. Of course, they come in different degrees and quantities. But there is no life where you can be in a state of sheer happiness for ever. And imagining there is just breeds more unhappiness in the life you're in.",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"It was interesting, she mused to herself, how life sometimes simply gave you a whole new perspective by waiting around long enough for you to see it.",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"I don't know. I suppose I want my life to mean something. I want to do something good,",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"Never underestimate the big importance of small things.",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"Happy moments can turn into pain, given time.",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"Regrets ignore chronology. They float around.",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"You don’t have to understand life. You just have to live it",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"Sometimes regrets aren't based on fact at all",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  {
                "Quote":"Fear was when you wandered into a cellar and worried that the door would close shut. Despair was when was the door closed and locked behind you.",
                "Author":"Matt Haig",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },  
            
            
            
            
            
            
            
            
            
            
            
// start Micheal Jordan
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            {
                "Quote":"I've missed more than 9000 shots in my career. I've lost almost 300 games. 26 times, I've been trusted to take the game winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed.",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },
            {
                "Quote":"Talent wins games, but teamwork and intelligence wins championships.",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"I can accept failure, everyone fails at something. But I can't accept not trying.",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"You must expect great things of yourself before you can do them",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"Some people want it to happen, some wish it would happen, and others make it happen",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"My attitude is that if you push me towards something that you think is a weakness, then I will turn that perceived weakness into a strength",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"To be successful you have to be selfish, or else you never achieve. And once you get to your highest level, then you have to be unselfish. Stay reachable. Stay in touch. Don't isolate.",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"Obstacles don’t have to stop you. If you run into a wall, don’t turn around and give up. Figure out how to climb it, go through it, or work around it.",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"I've never lost a game I just ran out of time.",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"If you quit ONCE it becomes a habit.Never quit!!!",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"Everybody has talent, but ability takes hard work.",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"Never say never, because limits, like fears, are often just an illusion",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"Always turn a negative situation into a positive situation.",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"To learn to succeed, you must first learn to fail.",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"Don't let them drag you down by rumors just go with what you believe in.",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"Make It Happen",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"f you do the work you get rewarded. There are no shortcuts in life",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"The minute you get away from fundamentals – whether its proper technique, work ethic or mental preparation – the bottom can fall out of your game, your schoolwork, your job, whatever you’re doing",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"I've failed over and over and over again in my life and that is why I succeed",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"Once I made a decision, I never thought about it again",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"I Own the guy guarding me",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"The key to success is failure",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"What is love? Love is playing every game as if it's your last!",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"The basketball court for me, during a game, is the most peaceful place I can imagine. On the basketball court, I worry about nothing. When I'm out there, no one can bother me...",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"My mother is my root, my foundation. She planted the seed that I base my life on, and that is the belief that the ability to achieve starts in your mind",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"Some people want it to happen, some wish it would happen, others make it happen.",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"learning 's a gift, even when 'pain' ,s your teacher!",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"I realize im black, but id like to be viewed as a person, and that is everybodys wish.",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"Failure is acceptable. but not trying is a whole different ball park.",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"There is no 'I' in team but there is in win.",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"Why would I think about missing a shot that I haven’t taken yet?",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"Some people want it to happen, some people wish it would happen, others make it happen.",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"Some people want it to happen. Some wish it would happen. Others make it happen!",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            }, {
                "Quote":"I’ve failed over and over and over again in my life. And that is why I succeed",
                "Author":"Micheal Jordan",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },
            
            
            
// start Lincoln Quotes 
            {
                "Quote":"[That was the speech -- delivered under a banner reading] Mission Accomplished ... Major combat operations in Iraq have ended.",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },

            {
                "Quote":"I am for the people of the whole nation doing just as they please in all matter which concern the whole nation; for those of each part doing just as they choose in all matters which concern no other part; and for each individual doing just as he chooses in all matters which concern nobody else.",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },
            {
                "Quote":"If I were to try to read, much less answer, all the attacks made on me, this shop might as well be closed for any other business. I do the very best I know how -- the very best I can. And I mean to keep on doing it to the end. If the end brings me out all right, what is said against me will not amount to anything. If the end brings me out all wrong, ten angels swearing I was right would make no difference.",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },

            {
                "Quote":"A lawyer's time and advice are his stock in trade",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },
            {
                "Quote":"If I care to listen to every criticism, let alone act on them, then this shop may as well be closed for all other businesses. I have learned to do my best, and if the end result is good then I do not care for any criticism, but if the end result is not good, then even the praise of ten angels would not make the difference.",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },
            {
                "Quote":"Every person is responsible for his own looks after 40.",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },
            {
                "Quote":"Determine that the thing can and shall be done, and then we shall find the way.",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },
            {
                "Quote":"If you do not like him, let him alone. If God gave him little, that little let him enjoy.",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },
            {
                "Quote":"There are few things wholly evil or wholly good. Almost everything, especially of government policy, is an inseparable compound of the two, so that our best judgment of the preponderance between them is continually demanded.",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },{
                "Quote":"It's a party of hope for America. Lincoln gave Americans hope through equal opportunities for all.",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "Honor Quotes",
                "Color": "black"
            
            },{
                "Quote":"The fiery trials through which we pass will light us down in honor or dishonor to the latest generation.",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },{
                "Quote":"Seriously, I do not think I fit for the presidency",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "Humility Quotes ,Self-esteem Quotes",
                "Color": "black"
            
            },
            
            
            
            
            
            
            {
                "Quote":"",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },{
                "Quote":"",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },{
                "Quote":"",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },{
                "Quote":"",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },{
                "Quote":"",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },{
                "Quote":"",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },{
                "Quote":"",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },{
                "Quote":"",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },{
                "Quote":"",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },{
                "Quote":"",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },{
                "Quote":"",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },{
                "Quote":"",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },{
                "Quote":"",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },{
                "Quote":"",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },{
                "Quote":"",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },{
                "Quote":"",
                "Author":"Lincoln Quotes",
                "Reference":"",
                "Category": "",
                "Color": "black"
            
            },
            
        


    ])

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          console.log(text);
          // Inserted text is not blank
          // Filter the masterDataSource
          // Update FilteredDataSource
          const newData = data.filter(
            function (item) {
              
              // const itemdata2 = item.VIN
              
              const itemData =  item.Quote
                ?  item.Quote.toUpperCase()
                :''.toUpperCase();
    
                // const itemData2 =  item.lot_number
                // ?  item.lot_number.toUpperCase()
                // : ''.toUpperCase();
    
              const textData = text.toUpperCase();
              if(itemData.indexOf(textData) > -1){
                //   setlist(true)
                //   if(text === ''){
                //     setlist(false)

                //   }
                return  itemData.indexOf(textData) > -1;
              }else{
                //   if(text === ''){
                //     setlist(false)

                //   }
              }
            //   return  itemData.indexOf(textData) > -1;

          });
          setFilteredDataSource(newData);
          setSearch(text);
          console.log('text is '+text);
        } else {
          // Inserted text is blank
          console.log('blank');
          // Update FilteredDataSource with masterDataSource
          setFilteredDataSource(data);
          setSearch(text);
        }
      };
      const [search, setSearch] = useState('');
      const [filteredDataSource, setFilteredDataSource] = useState(   [

        {
            "Quote": "None of us really changes over time. We only become more fully what we are.",
            "Author": "Anne Rice",
            "Reference": "The Vampire Lestat",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"All endings are also beginnings. We just don’t know it at the time.",
            "Author":"Mitch Albom",
            "Reference":"The Five People You Meet In Heaven",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"Pain is inevitable. Suffering is optional.",
            "Author":"Haruki Murakami",
            "Reference":"What I Talk About When I Talk About Running",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"You never know what worse luck your bad luck has saved you from.",
            "Author":"Cormac McCarthy",
            "Reference":"No Country For Old Men",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"Appear weak when you are strong, and strong when you are weak.",
            "Author":"Sun Tzu",
            "Reference":"The Art of War",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"When you want something, all the universe conspires in helping you to achieve it.",
            "Author":"Paulo Coelho",
            "Reference":"The Alchemist",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"Anything worth dying for is certainly worth living for.",
            "Author":"Joseph Heller",
            "Reference":"Catch-22",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"Strive not to be a success, but rather to be of value",
            "Author":"Albert Einstein",
            "Reference":"Words of wisdom",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },{
            "Quote":"I attribute my success to this: I never gave or took any excuse",
            "Author":"Florence Nightingale",
            "Reference":"The commonplace book",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"Definiteness of purpose is the starting point of all achievement",
            "Author":"W. Clement Stone",
            "Reference":"The Purpose Driven Life: The principle",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"Our time is limited, so don’t waste it living someone else’s life",
            "Author":"Steve Jobs",
            "Reference":"Follow us",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"It is a far, far better thing that I do, than I have ever done; it is a far, far better rest I go to than I have ever known.",
            "Author":"Charles Dickens",
            "Reference":"A Tale of Two Cities",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"It matters not what someone is born, but what they grow to be",
            "Author":"J.K. Rowling",
            "Reference":"Harry Potter and the Goblet of Fire",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.",
            "Author":"Martin Luther King Jr.,",
            "Reference":"A Testament of Hope: The Essential Writings and Speeches",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten.",
            "Author":"Neil Gaiman",
            "Reference":"Coraline",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"It’s the possibility of having a dream come true that makes life interesting.",
            "Author":"Paulo Coelho",
            "Reference":"The Alchemist",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"Everything is within your power,And your power is within you.",
            "Author":"Janice Trachtman",
            "Reference":"Catching What Life Throws at You: Inspiring True Stories of Healing",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart.",
            "Author":"Roy T. Bennett",
            "Reference":"The Light in the Heart",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"Somehow difficulties are easier to endure when you know your dream is waiting for you at the end",
            "Author":"Lisa Mangum",
            "Reference":"The Golden Spiral",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"The most powerful weapon is hope",
            "Author":"Juliet Marillier",
            "Reference":"Heart’s Blood",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"One often meets her destiny on the road she takes to avoid it",
            "Author":"Jessi Kirby",
            "Reference":"Golden",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"Every form of art is another way of seeing the world. Another perspective, another window. And science –that’s the most spectacular window of all. You can see the entire universe from there.",
            "Author":"Claudia Gray",
            "Reference":"A Thousand Pieces of You",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"With courage and hope, we can conquer our fears and do what we once believed impossible.",
            "Author":"Juliet Marillier",
            "Reference":"Heart’s Blood",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"The books that the world calls immoral are books that show the world its own shame",
            "Author":"Oscar Wilde",
            "Reference":"The Picture of Dorian Gray",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"That’s the thing about books. They let you travel without moving your feet",
            "Author":"Jhumpa Lahiri",
            "Reference":"The Namesake",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"Time you enjoy wasting is not wasted time",
            "Author":"Marthe Troly-Curtin",
            "Reference":"Phrynette Married",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"When you can’t find someone to follow, you have to find a way to lead by example.",
            "Author":"Roxane Gay",
            "Reference":"Bad Feminist",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"She decided long ago that life was a long journey. She would be strong, and she would be weak, and both would be okay.",
            "Author":"Tahereh Mafi",
            "Reference":"Furthermore",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"It is only with the heart that one can see rightly; what is essential is invisible to the eye.",
            "Author":"Antoine de Saint-Exupéry",
            "Reference":"The Little Prince",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"The worst enemy to creativity is self-doubt.",
            "Author":"Sylvia Plath",
            "Reference":"The Unabridged Journals of Sylvia Plath",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"Hoping for the best, prepared for the worst, and unsurprised by anything in between.",
            "Author":"Maya Angelou",
            "Reference":"I Know Why the Caged Bird Sings",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"It is a curious thought, but it is only when you see people looking ridiculous that you realize just how much you love them",
            "Author":"Agatha Christie",
            "Reference":"An Autobiography",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"And, now that you don’t have to be perfect you can be good.",
            "Author":"John Steinbeck",
            "Reference":"East of Eden",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"There is never a time or place for true love. It happens accidentally, in a heartbeat, in a single flashing, throbbing moment.",
            "Author":"Sarah Dessen",
            "Reference":"The Truth About Forever",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"It was all very well to be ambitious, but ambition should not kill the nice qualities in you.",
            "Author":"Noel Streatfeild",
            "Reference":"Ballet Shoes",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"There is nothing sweeter in this sad world than the sound of someone you love calling your name.",
            "Author":"Kate DiCamillo",
            "Reference":"The Tale of Despereaux",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"Isn’t it nice to think that tomorrow is a new day with no mistakes in it yet?",
            "Author":"L.M. Montgomery",
            "Reference":"Anne of #70ad47 Gables",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"Our motives are far more successfully hidden from ourselves than they are from others",
            "Author":"Shraga Silverstein",
            "Reference":"A Candle by Day",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"The prologue to inspiration is aspiration",
            "Author":"Shraga Silverstein",
            "Reference":"A Candle by Day",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"Courage is resistance to fear, mastery of fearnot absence of fear",
            "Author":"Mark Twain",
            "Reference":"Pudd'nhead Wilson",
            "Category": "Inspirational",
            "Color": "#70ad47"
        
        },
        {
            "Quote":"To love or have loved, that is enough. Ask nothing further",
            "Author":"Victor Hugo",
            "Reference":"LES MISÉRABLES",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"It was love at first sight, at last sight, at ever and ever sight",
            "Author":"Vladimir Nabokov",
            "Reference":"LOLITA",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"The minute I heard my first love story, I started looking for you.",
            "Author":"Jalaluddin Rumi",
            "Reference":"THE ILLUSTRATED",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"If I loved you less, I might be able to talk about it more",
            "Author":"Jane Austen",
            "Reference":"EMMA",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"If you remember me, then I don’t care if everyone else forgets.",
            "Author":"Haruki Murakami",
            "Reference":"KAFKA ON THE SHORE",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"Doubt thou the stars are fire; Doubt that the sun doth move; Doubt truth to be a liar; But never doubt I love.",
            "Author":"William Shakespeare",
            "Reference":"HAMLET",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"If you live to be a hundred, I want to live to be a hundred minus one day, so I never have to live without you.",
            "Author":"A.A. Milne",
            "Reference":"WINNIE-THE-POOH",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"You don’t love someone because they’re perfect, you love them in spite of the fact that they’re not.",
            "Author":"Jodi Picoult",
            "Reference":"MY SISTER’S KEEPER",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"I always have many roads to travel, but I take the one which leads to you.",
            "Author":"Amit Kalantri",
            "Reference":"I Love You Too",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"The very essence of romance is uncertainty.",
            "Author":"Oscar Wilde",
            "Reference":"The Importance of Being Earnest and Other Plays",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"True love is rare, and it's the only thing that gives life real meaning",
            "Author":"Nicholas Sparks",
            "Reference":"Message in a Bottle",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"You know what charm is: a way of getting the answer yes without having asked any clear question.",
            "Author":"Albert Camus",
            "Reference":"The fall",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"In vain I have struggled. It will not do. My feelings will not be repressed. You must allow me to tell you how ardently I admire and love you.",
            "Author":"Jane Austen",
            "Reference":"Pride And Prejudice",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"You are my heart, my life, my one and only thought.",
            "Author":"Arthur Conan Doyle",
            "Reference":"The White Company",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"You are sunlight through a window, which I stand in, warmed. My darling",
            "Author":"Jessie Burton",
            "Reference":"The Miniaturist",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"Did my heart love till now? Forswear it, sight! For I ne’er saw true beauty till this night.",
            "Author":"William Shakespeare",
            "Reference":"Romeo and Juliet",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"Doubt thou the stars are fire; Doubt that the sun doth move; Doubt truth to be a liar; But never doubt I love.",
            "Author":"William Shakespeare",
            "Reference":"Hamlet",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"Her love was entire as a child’s, and though warm as summer it was fresh as spring.",
            "Author":"Thomas Hardy",
            "Reference":"Far From The Madding Crowd",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"Every atom of your flesh is as dear to me as my own: in pain and sickness it would still be dear.",
            "Author":"Charlotte Brontë",
            "Reference":"Jane Eyre",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"It is better to love wisely, no doubt: but to love foolishly is better than not to be able to love at all.”",
            "Author":"William Makepeace Thackeray",
            "Reference":"Vanity Fair",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"True love is rare, and it’s the only thing that gives life real meaning",
            "Author":"Nicholas Sparks",
            "Reference":"Message in a Bottle",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"The Very first moment I beheld him, my heart was irrevocably gone",
            "Author":"Jane Austen",
            "Reference":"Love and Friendship",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"Sometimes you wake up from a dream. Sometimes you wake up in a dream. And sometimes, every once in a while, you wake up in someone else’s dream.",
            "Author":"Richelle Mead",
            "Reference":"Succubus Blues (Georgina Kincaid, #1)",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"When it comes to men who are romantically interested in you, it’s really simple. Just ignore everything they say and only pay attention to what they do.",
            "Author":"Randy Pausch",
            "Reference":"The Last Lecture",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"For never was a story of more woe than this of Juliet and her Romeo",
            "Author":"William Shakespeare",
            "Reference":"Romeo and Juliet",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"Love all, trust a few, do wrong to none.",
            "Author":"William Shakespeare",
            "Reference":"All’s Well That Ends Well",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"Love looks not with the eyes, but with the mind,",
            "Author":"William Shakespeare",
            "Reference":"A Midsummer Night’s Dream",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"But I, being poor, have only my dreams; I have spread my dreams under your feet; Tread softly because you tread on my dreams.”",
            "Author":"W.B. Yeats",
            "Reference":"He Wishes for the Cloths of Heaven",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"But soft! What light through yonder window breaks?It is the east, and Juliet is the sun",
            "Author":"William Shakespeare",
            "Reference":"Romeo and Juliet,",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"He was my North, my South, my East and West, my working week and my Sunday rest.",
            "Author":"W.H. Auden",
            "Reference":"Stop All the Clocks",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"If I were to live a thousand years, I would belong to you for all of them. If we were to live a thousand lives, I would want to make you mine in each one.",
            "Author":"Michelle Hodkin",
            "Reference":"The Evolution of Mara Dyer",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"Every lover is, in his heart, a madman, and, in his head, a minstrel",
            "Author":"Neil Gaiman",
            "Reference":"Stardust",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"You gave me a forever within the numbered days, and I'm grateful",
            "Author":"John Green",
            "Reference":"The Fault in Our Stars",
            "Category": "Romance",
            "Color": "#4472c4"
        
        },
        {
            "Quote":"Grow old along with me! The best is yet to be",
            "Author":"Robert Browning",
            "Reference":"Rabbi Ben Ezra",
            "Category": "Humor",
            "Color": "#ffe599"
        
        },
        {
            "Quote":"How five crows managed to lift a twenty-pound baby boy into the air was beyond prue, but that was certainly the least of her worries.",
            "Author":"Colin Meloy",
            "Reference":"Wildwood: The Wildwood Chronicles Vol. One",
            "Category": "Humor",
            "Color": "#ffe599"
        
        },
        {
            "Quote":"For the better part of my childhood, my professional aspirations were simple–i wanted to be an intergalactic princess",
            "Author":"Janet Evanovich",
            "Reference":"Seven up",
            "Category": "Humor",
            "Color": "#ffe599"
        
        },
        {
            "Quote":"It wasn’t until i had become engaged to miss piano that i began avoiding her.",
            "Author":"Peter De Vries",
            "Reference":"Into Your Tent I’ll Creep",
            "Category": "Humor",
            "Color": "#ffe599"
        
        },
        {
            "Quote":"I love deadlines. I love the whooshing noise they make as they go by",
            "Author":"Douglas Adams",
            "Reference":"The Salmon of Doubt",
            "Category": "Humor",
            "Color": "#ffe599"
        
        },
        {
            "Quote":"The trouble with having an open mind, of course, is that people will insist on coming along and trying to put things in it.",
            "Author":"Terry Pratchett",
            "Reference":"Diggers",
            "Category": "Humor",
            "Color": "#ffe599"
        
        },
        {
            "Quote":"Reality continues to ruin my life",
            "Author":"Bill Watterson",
            "Reference":"The Complete Calvin and Hobbes",
            "Category": "Humor",
            "Color": "#ffe599"
        
        },
        {
            "Quote":"Have you ever noticed how ‘What the hell’ is always the right decision to make?",
            "Author":"Terry Johnson",
            "Reference":"Insignificance",
            "Category": "Humor",
            "Color": "#ffe599"
        
        },
        {
            "Quote":"Give a man a fire and he's warm for a day, but set fire to him and he's warm for the rest of his life",
            "Author":"Terry Pratchett",
            "Reference":"Jingo",
            "Category": "Humor",
            "Color": "#ffe599"
        
        },
        {
            "Quote":"This life’s hard, but it’s harder if you’re stupid",
            "Author":"George V. Higgins",
            "Reference":"The Friends of Eddie Coyle",
            "Category": "Humor",
            "Color": "#ffe599"
        
        },
        {
            "Quote":"I do not want people to be very agreeable, as it saves me the trouble of liking them a great deal",
            "Author":"Jane Austen",
            "Reference":"Jane Austen's Letters",
            "Category": "Humor",
            "Color": "#ffe599"
        
        },
        {
            "Quote":"Never let your sense of morals prevent you from doing what is right.",
            "Author":"Isaac Asimov,",
            "Reference":"Foundation",
            "Category": "Humor",
            "Color": "#ffe599"
        
        },
        {
            "Quote":"It is said that your life flashes before your eyes just before you die. That is true, it's called Life",
            "Author":"Terry Pratchett",
            "Reference":"The Last Continent",
            "Category": "Humor",
            "Color": "#ffe599"
        
        },
        {
            "Quote":"I have great faith in fools - self-confidence my friends will call it",
            "Author":"Edgar Allan Poe",
            "Reference":"Marginalia",
            "Category": "Humor",
            "Color": "#ffe599"
        
        },
        {
            "Quote":"There is nothing in the world so irresistibly contagious as laughter and good humor",
            "Author":"Charles Dickens",
            "Reference":"A Christmas Carol",
            "Category": "Humor",
            "Color": "#ffe599"
        
        },
        {
            "Quote":"'Begin at the beginning', the King said, very gravely, 'and go on till you come to the end: then stop'",
            "Author":"Lewis Carroll",
            "Reference":"Alice in Wonderland",
            "Category": "Humor",
            "Color": "#ffe599"
        
        },
        {
            "Quote":"I’d said it before and meant it: Alive or undead, the love of my life was a badass.",
            "Author":"Richelle Mead",
            "Reference":"Blood promise",
            "Category": "Humor",
            "Color": "#ffe599"
        
        },
        {
            "Quote":"Tell the truth, or someone will tell it for you",
            "Author":"Stephanie Klein",
            "Reference":"Straight Up and Dirty",
            "Category": "Humor",
            "Color": "#ffe599"
        
        },
        {
            "Quote":"I suppose I'll have to add the force of gravity to my list of enemies.",
            "Author":"Lemony Snicket",
            "Reference":"The Penultimate Peril",
            "Category": "Humor",
            "Color": "#ffe599"
        
        },
        {
            "Quote":"Say 'provoking' again. Your mouth looks provocative when you do.",
            "Author":"Becca Fitzpatrick",
            "Reference":"Hush, Hush",
            "Category": "Humor",
            "Color": "#ffe599"
        
        },
        {
            "Quote":"Time is a drug. Too much of it kills you",
            "Author":"Terry Pratchett",
            "Reference":"Small Gods",
            "Category": "Humor",
            "Color": "#ffe599"
        
        },
        {
            "Quote":"Time is an illusion. Lunchtime doubly so.",
            "Author":"Douglas Adams",
            "Reference":"The Hitchhiker's Guide to the Galaxy",
            "Category": "Humor",
            "Color": "#ffe599"
        
        },
        {
            "Quote":"The capacity for friendship is God's way of apologizing for our families.",
            "Author":"Jay McInerney",
            "Reference":"The Last of the Savages",
            "Category": "Humor",
            "Color": "#ffe599"
        
        },
        {
            "Quote":"Every now and then I like to do as I'm told, just to confuse people.",
            "Author":"Tamora Pierce",
            "Reference":"Melting Stones",
            "Category": "Humor",
            "Color": "#ffe599"
        
        },
        {
            "Quote":"Happiness in intelligent people is the rarest thing I know",
            "Author":"Ernest Hemingway",
            "Reference":"The Garden of Eden",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"It's so hard to forget pain, but it's even harder to remember sweetness. We have no scar to show for happiness. We learn so little from peace.",
            "Author":"Chuck Palahniuk",
            "Reference":"Chuck Palahniuk",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"Love is that condition in which the happiness of another person is essential to your own",
            "Author":"Robert A. Heinlein",
            "Reference":"Stranger in a Strange Land",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"There's nothing like deep breaths after laughing that hard. Nothing in the world like a sore stomach for the right reasons.",
            "Author":"Stephen Chbosky",
            "Reference":"The Perks of Being a Wallflower",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"The only way to find true happiness is to risk being completely cut open.",
            "Author":"Chuck Palahniuk",
            "Reference":"Invisible Monsters",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"Happiness (is) only real when shared",
            "Author":"Jon Krakauer",
            "Reference":"Into the Wild",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"I felt my lungs inflate with the onrush of scenery-air, mountains, trees, people. I thought, 'This is what it is to be happy.'",
            "Author":"Sylvia Plath",
            "Reference":"The Bell Jar",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"It's been my experience that you can nearly always enjoy things if you make up your mind firmly that you will.",
            "Author":"L.M. Montgomery",
            "Reference":"Anne of Green Gables",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"When the first baby laughed for the first time, its laugh broke into a thousand pieces, and they all went skipping about, and that was the beginning of fairies.",
            "Author":"J.M. Barrie",
            "Reference":"Peter Pan",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"I would always rather be happy than dignified",
            "Author":"Charlotte Bronte",
            "Reference":"Jane Eyre",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"Cheerfulness and content are great beautifiers, and are famous preservers of youthful looks, depend upon it.",
            "Author":"Charles Dickens",
            "Reference":"",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"Happy are they that hear their detractions, and can put them to mending",
            "Author":"William Shakespeare",
            "Reference":"Much Ado About Nothing",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"Happy is the man who can make a living by his hobby!",
            "Author":"George Bernard Shaw",
            "Reference":"Pygmalion",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"I had rather have a fool to make me merry than experience to make me sad",
            "Author":"William Shakespeare",
            "Reference":"As You Like It",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"That the choice for mankind lay between freedom and happiness, and that, for the great bulk of mankind, happiness was better.",
            "Author":"George Orwell",
            "Reference":"Nineteen Eighty-Four",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"There is no happiness like that of being loved by your fellow-creatures, and feeling that your presence is an addition to their comfort.",
            "Author":"Charlotte Bronte",
            "Reference":"Jane Eyre",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"Surely happiness is reflective, like the light of heaven.",
            "Author":"Washington Irving",
            "Reference":"Old Christmas",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"To me it seems that those who are happy in this world are better and more lovable people than those who are not.",
            "Author":"Samuel Butler",
            "Reference":"The Way of All Flesh",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"'Action may not always be happiness,' said the general; 'but there is no happiness without action.'",
            "Author":"Benjamin Disraeli",
            "Reference":"Lothair",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"Take responsibility of your own happiness, never put it in other people’s hands",
            "Author":"Roy T. Bennett",
            "Reference":"The Light in the Heart",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"If you want to be happy, do not dwell in the past, do not worry about the future, focus on living fully in the present",
            "Author":"Roy T. Bennett",
            "Reference":"The Light in the Heart",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"Happiness is holding someone in your arms and knowing you hold the whole world.",
            "Author":"Orhan Pamuk",
            "Reference":"Snow",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"The happiness of your life depends upon the quality of your thoughts",
            "Author":"Marcus Aurelius",
            "Reference":"Meditations",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"I must learn to be content with being happier than I deserve.",
            "Author":"Jane Austen",
            "Reference":"Pride and Prejudice",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"Stop comparing yourself to other people, just choose to be happy and live your own life.",
            "Author":"Roy T. Bennett",
            "Reference":"The Light in the Heart",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"I am not proud, but I am happy; and happiness blinds, I think, more than pride.",
            "Author":"Alexandre Dumas",
            "Reference":"The Count of Monte Cristo",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"The search for happiness is one of the chief sources of unhappiness.",
            "Author":"Eric Hoffer",
            "Reference":"The Passionate State of Mind",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"Happiness is an imaginary condition, Formerly often attributed by the living to the dead, now usually attributed by adults to children, and by children to adults",
            "Author":"Thomas Szasz",
            "Reference":"The Second Sin ",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"So of cheerfulness, or a good temper--the more it is spent, the more of it remains.",
            "Author":"Ralph Waldo Emerson",
            "Reference":"The Conduct of Life",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"Happiness is an attainable human condition; bliss is reserved for the dead. ",
            "Author":"Shraga Silverstein",
            "Reference":"A Candle by Day",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"Man only likes to count his troubles; he doesn't calculate his happiness",
            "Author":"Fyodor Dostoyevsky",
            "Reference":"Notes from Underground",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"I'd far rather be happy than right any day",
            "Author":"Douglas Adams",
            "Reference":"The Hitchhiker's Guide to the Galaxy",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"With mirth and laughter let old wrinkles come",
            "Author":"William Shakespeare",
            "Reference":"The Merchant of Venice",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"he problem with people is they forget that most of the time it's the small things that count.",
            "Author":"Jennifer Niven",
            "Reference":"All the Bright Places",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"Happiness is an accident of nature, a beautiful and flawless aberration.”",
            "Author":"Pat Conroy",
            "Reference":"The Lords of Discipline",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"It is the very mark of the spirit of rebellion to crave for happiness in this life",
            "Author":"Henrik Ibsen",
            "Reference":"Ghosts",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"A smile puts you on the right track. A smile makes the world a beautiful place. When you lose your smile, you lose your way in the chaos of life",
            "Author":"Roy T. Bennett",
            "Reference":"The Light in the Heart",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"And I can't be running back and fourth forever between grief and high delight.",
            "Author":"J.D. Salinger",
            "Reference":"Franny and Zooey",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"If you want others to be happy, practice compassion. If you want to be happy, practice compassion",
            "Author":"Dalai Lama XIV",
            "Reference":"The Art of Happiness",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"There are as many styles of beauty as there are visions of happiness.",
            "Author":"Stendhal",
            "Reference":"Love",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"I don't understand the point of being together if you're not the happiest.",
            "Author":"Gillian Flynn",
            "Reference":"Gone Girl",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"Happiness depends on being free, and freedom depends on being courageous",
            "Author":"Marie Rutkoski",
            "Reference":"The Winner's Curse",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"There are two ways to be happy: improve your reality, or lower your expectations.",
            "Author":"Jodi Picoult",
            "Reference":"Nineteen Minutes",
            "Category": "Happiness",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"I guess that’s what saying good-bye is always like — like jumping off an edge. The worst part is making the choice to do it. Once you’re in the air, there’s nothing you can do but let go",
            "Author":"Lauren Oliver",
            "Reference":"Before I Fall",
            "Category": "Sad",
            "Color": "#7030a0"
        
        },
        {
            "Quote":"Breathing is hard. When you cry so much, it makes you realize that breathing is hard",
            "Author":"David Levithan",
            "Reference":"Love is the Higher Law",
            "Category": "Sad",
            "Color": "#a8d08d"
        
        },
        {
            "Quote":"So, this is my life. And I want you to know that I am both happy and sad and I’m still trying to figure out how that could be.",
            "Author":"Stephen Chbosky",
            "Reference":"The Perks of Being a Wallflower",
            "Category": "Sad",
            "Color": "#a8d08d"
        
        },
        {
            "Quote":"You know, a heart can be broken, but it keeps on beating, just the same.",
            "Author":"Fannie Flagg",
            "Reference":"Fried Green Tomatoes at the Whistle Stop Cafe",
            "Category": "Sad",
            "Color": "#a8d08d"
        
        },
        {
            "Quote":"As the light begins to intensify, so does my misery, and I wonder how it is possible to hurt so much when nothing is wrong.",
            "Author":"Tabitha Suzuma",
            "Reference":"Forbidden",
            "Category": "Sad",
            "Color": "#a8d08d"
        
        },
        {
            "Quote":"You see I usually find myself among strangers because I drift here and there trying to forget the sad things that happened to me",
            "Author":"F. Scott Fitzgerald,",
            "Reference":"The Great Gatsby",
            "Category": "Sad",
            "Color": "#a8d08d"
        
        },
        {
            "Quote":"Sometimes I can hear my bones straining under the weight of all the lives I’m not living",
            "Author":"Jonathan Safran Foer",
            "Reference":"Extremely Loud and Incredibly Close",
            "Category": "Sad",
            "Color": "#a8d08d"
        
        },
        {
            "Quote":"Of all the words of mice and men, the saddest are, 'It might have been.",
            "Author":"Kurt Vonnegut",
            "Reference":"Cat's Cradle",
            "Category": "Sad",
            "Color": "#a8d08d"
        
        },
        {
            "Quote":"There is no greater agony than bearing an untold story inside you",
            "Author":"Maya Angelou",
            "Reference":"I Know Why the Caged Bird Sings",
            "Category": "Sad",
            "Color": "#a8d08d"
        
        },
        {
            "Quote":"I hid my deepest feelings so well I forgot where I placed them",
            "Author":"Amy Tan",
            "Reference":"Saving Fish from Drowning",
            "Category": "Sad",
            "Color": "#a8d08d"
        
        },
        {
            "Quote":"Tears shed for another person are not a sign of weakness. They are a sign of a pure heart",
            "Author":"José N. Harris",
            "Reference":"MI VIDA: A Story of Faith, Hope and Love",
            "Category": "Sad",
            "Color": "#a8d08d"
        
        },
        {
            "Quote":"I can't eat and I can't sleep. I'm not doing well in terms of being a functional human, you know?",
            "Author":"Ned Vizzini",
            "Reference":"It's Kind of a Funny Story",
            "Category": "Sad",
            "Color": "#a8d08d"
        
        },
        {
            "Quote":"So it’s true, when all is said and done, grief is the price we pay for love.",
            "Author":"E.A. Bucchianeri",
            "Reference":"Brushstrokes of a Gadfly",
            "Category": "Sad",
            "Color": "#a8d08d"
        
        },
        {
            "Quote":"Nothing thicker than a knife's blade separates happiness from melancholy.",
            "Author":"Virginia Woolf",
            "Reference":"Orlando",
            "Category": "Sad",
            "Color": "#a8d08d"
        
        },
        {
            "Quote":"Give sorrow words; the grief that does not speak knits up the o-er wrought heart and bids it break.",	
            "Author":"William Shakespeare",
            "Reference":"Macbeth",
            "Category": "Sad",
            "Color": "#a8d08d"
        
        },
        {
            "Quote":"Then she was pressing her little proud broken self against his face, as close as she could get, and then they died.",
            "Author":"Philip Pullman",
            "Reference":"The Subtle Knife",
            "Category": "Sad",
            "Color": "#a8d08d"
        
        },
        {
            "Quote":"I was too young to know how to love her",
            "Author":"Antoine de Saint-Exupéry",
            "Reference":"The Little Prince",
            "Category": "Sad",
            "Color": "#a8d08d"
        
        },
        {
            "Quote":"You can love someone so much...But you can never love people as much as you can miss them.",
            "Author":"John Green",
            "Reference":"An Abundance of Katherines",
            "Category": "Sad",
            "Color": "#a8d08d"
        
        },
        {
            "Quote":"There’s death all around us. Everywhere we look. 1.8 people kill themselves every second. We just don’t pay attention. Until we do.",
            "Author":"Cynthia Hand",
            "Reference":"The Last Time We Say Goodbye",
            "Category": "Sad",
            "Color": "#a8d08d"
        
        },
        {
            "Quote":"As the light begins to intensify, so does my misery, and I wonder how it is possible to hurt so much when nothing is wrong",
            "Author":"Tabitha Suzuma",
            "Reference":"Forbidden",
            "Category": "Sad",
            "Color": "#a8d08d"
        
        },
        {
            "Quote":"Have you ever wondered what a human life is worth? That morning, my brother’s was worth a pocket watch",
            "Author":"Ruta Sepetys",
            "Reference":"Between Shades of Gray",
            "Category": "Sad",
            "Color": "#a8d08d"
        
        },
        {
            "Quote":"Long time I been on my own, but now really I’m alone. I survive the killing, the starving, all the hate of the Khmer Rouge, but I think maybe now I will die of this, of broken heart.",
            "Author":"Patricia McCormick",
            "Reference":"Never Fall Down",
            "Category": "Sad",
            "Color": "#a8d08d"
        
        },
        {
            "Quote":"Grief is not as heavy as guilt, but it takes more away from you.",
            "Author":"Veronica Roth",
            "Reference":"Insurgent",
            "Category": "Sad",
            "Color": "#a8d08d"
        
        },
        {
            "Quote":"You were merely wishing for the end of pain, the monster said. Your own pain. An end to how it isolated you. It is the most human wish of all.",
            "Author":"Elizabeth Wein",
            "Reference":"Code Name Verity",
            "Category": "Sad",
            "Color": "#a8d08d"
        
        },
        {
            "Quote":"From the moment we are born, we begin to die.",
            "Author":"Janne Teller",
            "Reference":"Nothing",
            "Category": "Sad",
            "Color": "#a8d08d"
        
        },
        {
            "Quote":"I saw the world in black and white instead of the vibrant colours and shades I knew existed",
            "Author":"Katie McGarry",
            "Reference":"Pushing the Limits",
            "Category": "Sad",
            "Color": "#a8d08d"
        
        }
        
        ]
      )


      
  const renderlist = ({item,index}) =>{
  
      return(  

       <View style={{borderRadius:10,borderWidth:1,borderColor:'grey', padding:10, marginTop:5}}>
          <TouchableOpacity 
            //onPress={() =>  navigation.navigate("TopicList")}
             onPress={() => handleOnSelectItem(item)} 
             >
        <Text style={{color:'white'}}>{item.Quote}</Text>
        <Text
           style={{color:'grey'}}
         >{item.Author}</Text>
         <Text 
           style={{color:'grey'}}
           >{item.Reference}</Text>
        {/* <Text style={styles.firsttextbody}>{item.body}</Text> */}
        </TouchableOpacity>
        </View>
    
        )
    
     }


    return (
       <View style={styles.container}>
       <View style={styles.searchSection}>
<Icon style={styles.searchIcon} name="search" size={20} color="green"/>
    <TextInput
        style={styles.input}
        placeholder="Enter quote..."
        placeholderTextColor="grey"
        onChangeText={(text) => searchFilterFunction(text)}

        //onChangeText={(searchString) => {this.setState({searchString})}}
        underlineColorAndroid="transparent"
    />

       </View>
       <FlatList 

data={filteredDataSource}       
renderItem={renderlist}

keyExtractor={(item,index) => index.toString()}

/>


{modalVisible == true ? (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}>
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
                    <Text
                      style={{color: 'white', fontSize: 34, textAlign: 'auto'}}>
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
                    {favFound == true ? (
                      <TouchableOpacity
                        onPress={() => swipeFavRemove(selectedItem.Quote)}>
                        <View>
                          <IconMaterial
                            name="favorite"
                            size={30}
                            color="white"
                          />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => swipeFavAdd(selectedItem.Quote)}>
                        <View>
                          <IconMaterial
                            name="favorite-border"
                            size={30}
                            color="white"
                          />
                        </View>
                      </TouchableOpacity>
                    )}

                    <TouchableHighlight
                      style={{marginLeft: 35, borderColor:'#2596be',borderRadius:8,borderWidth:2,padding:4}}
                      onPress={() => {
                        //modalShare();
                        //setshareTypeModel(!shareTypeModel);
                        actionSheetRef.current.show();
                        //setshareModal(!shareModal);
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
                    <Text style={styles.modalHeadingText}>
                      Create a new list
                    </Text>
                  </View>

                  <View style={styles.modalTextContainer}>
                    <TextInput
                      style={[styles.listInput,{backgroundColor:"white",paddingHorizontal:20,paddingVertical:25}]}
                      underlineColor="black"
                      selectionColor="black"
                      label="Name"
                      placeholder="Enter List Name"
                      value={listName}
                      onChangeText={(listName) => setlistName(listName)}
                    />
                    <TextInput
                      style={[styles.listInput,{backgroundColor:"white",paddingHorizontal:20,paddingVertical:25}]}
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

<ActionSheet ref={actionSheetRef}>
            <View style={styles.shareTypeModalView}>
              <TouchableOpacity onPress={() => modalShare()}>
                <View
                  style={{
                    marginTop: 5,
                    paddingHorizontal: 5,
                    flexDirection: 'row',
                  }}>
                  <Text style={{fontSize: 20, color: 'white'}}> Text</Text>
                  <Icon
                    style={{alignSelf: 'flex-end', marginLeft: 20}}
                    size={20}
                    color={'white'}
                    name="type"
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setshareModal(!shareModal)}>
                <View
                  style={{
                    marginTop: 5,
                    paddingHorizontal: 5,
                    flexDirection: 'row',
                  }} //style={styles.shareTypeRow}
                >
                  <Text style={{fontSize: 20, color: 'white'}}> Image</Text>
                  <IconMaterialCI
                    style={{alignSelf: 'flex-end', marginLeft: 20}}
                    size={20}
                    color={'white'}
                    name="image-outline"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </ActionSheet>
          {shareModal == true ? (
            <Modal
              animationType="slide"
              transparent={true}
              visible={shareModal}>
              <View style={styles.shareModalView}>
                <ScrollView>
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
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{alignSelf: 'flex-start'}}>
                        <Text
                          style={{
                            //alignSelf:"flex-start",
                            color: 'white',
                            fontSize: 25,
                          }}>
                          Share Image
                        </Text>
                      </View>
                      <View style={{alignSelf: 'flex-end'}}>
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
                  <ViewShot
                    style={styles.sendingView}
                    ref={viewShotRef}
                    options={{format: 'jpg', quality: 0.9}}>
                    <View
                      style={{
                        width: deviceWidth,
                        //height:deviceHeight/2,
                        marginTop: 40,
                        paddingHorizontal: 15,
                        backgroundColor: shareColor,
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={require('../images/logo.jpg')}
                        style={{
                          alignSelf: 'flex-start',
                          height: 60,
                          width: 60,
                          borderRadius: 20,
                          marginTop: 3,
                        }}
                      />
                      <Text
                        style={{
                          color: shareTextColor,
                          fontSize: 30,
                          textAlign: 'auto',
                          paddingVertical: 5,
                          paddingHorizontal: 5,
                        }}>
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
                            alignSelf: 'center',
                            color: shareTextColor,
                            marginTop: 5,
                            fontStyle: 'italic',
                            fontSize: 16,
                            paddingBottom: 20,
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
                      onPress={() => whiteColor()}>
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
                    style={{
                      backgroundColor: 'blue',
                      height: 60,
                      width: 60,
                      alignSelf: 'center',
                      borderRadius: 30,
                      alignItems: 'center',
                      marginTop: 10,
                    }}
                    onPress={() => shareDummyImage()}>
                    <Icon
                      style={{alignSelf: 'center', paddingTop: 10,paddingRight:8}}
                      name="share"
                      size={30}
                      color="white"
                    />
                  </TouchableOpacity>
                  <View style={{height: 50}}></View>
                </ScrollView>
              </View>
            </Modal>
          ) : null}
{/* { list === true ?


<FlatList 

data={filteredDataSource}       
renderItem={renderlist}

keyExtractor={(item,index) => index.toString()}

/>:null}      */}

       </View>
    )
}
// const styles = StyleSheet.create({
//    container: {
//      flex: 1,
//      paddingHorizontal:20,
//      height:deviceHeight,
//      flexDirection:'column',
//      width:deviceWidth,
//      backgroundColor: '#303030',
     
//    },
//    searchSection: {
//       flexDirection: 'row',
//       alignItems: 'center',
//   },
//   searchIcon: {
//       padding: 10,
//   },
//   input: {
//       flex: 1,
//       paddingTop: 10,
//       paddingRight: 10,
//       fontSize:18,
    
//       paddingBottom: 10,
//       paddingLeft: 15,
//       color: 'grey',
//   },
   
//  });
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:20,
        height:deviceHeight,
        flexDirection:'column',
        width:deviceWidth,
        backgroundColor: '#303030',
        
      },
      searchSection: {
         flexDirection: 'row',
         alignItems: 'center',
     },
     searchIcon: {
         padding: 10,
     },
     input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        fontSize:18,
      
        paddingBottom: 10,
        paddingLeft: 15,
        color: 'grey',
    },  
    item: {
      //backgroundColor: 'white',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 1,
    },
    itemCard: {
      //backgroundColor: 'white',
      padding: 9,
      marginVertical: 8,
      marginHorizontal: 1,
      elevation: 30,
    },
    textbody: {
      fontSize: 20,
      color: 'white',
    },
    author: {
      fontSize: 30,
      color: 'white',
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
    firstauthor: {
      fontSize: 40,
      color: 'white',
    },
    Secondauthor: {
      fontSize: 40,
      color: 'white',
    },
    firsttextbody: {
      fontSize: 14,
      color: 'grey',
    },
    leftbtn: {
      backgroundColor: 'red',
      flex: 1,
      justifyContent: 'center',
    },
    btncontainer: {
      flexDirection: 'row',
      width: '100%',
      height: 120,
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
    boxEffect: {
      padding: 20,
  
      // marginVertical: 8,
      // marginHorizontal: 16,
      justifyContent: 'center',
      // alignItems: "center",
      // borderStyle: 'dashed',
      // borderLeftWidth: 1,
      // borderTopWidth: 1,
      // borderRightWidth: 1,
      // borderBottomWidth: 1,
      // borderTopColor: '#303030',
      // borderBottomEndRadius : 8,
      // borderTopStartRadius: 8,
      // borderTopEndRadius: 8,
      // borderBottomStartRadius: 8,
      // borderBottomLeftRadius:8,
      // borderBottomRightRadius:8,
  
      elevation: 100,
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
      backgroundColor: 'green',
      position: 'absolute',
    },
    modalButtonConatiner: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    modalTextContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
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
      color: 'grey',
      paddingTop: 20,
      color: 'white',
      fontSize: 16,
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
      marginTop: 70,
      height: deviceHeight / 2,
      width: deviceWidth,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      //paddingTop:"50%"
    },
    modalListView: {
      margin: 20,
      backgroundColor: 'transparent',
      padding: 35,
      shadowColor: '#000',
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
      borderRadius: 10,
    },
    shareType: {
      flex: 1,
      flexDirection: 'row',
      width: deviceWidth,
      alignItems: 'center',
    },
    swipeContainer: {
      backgroundColor: '#2596be',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 30,
      height: '90%',
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
  });
  
export default Search