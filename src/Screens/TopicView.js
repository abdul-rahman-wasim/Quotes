import React, {useState, useEffect,useRef,createRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Image,
} from 'react-native';
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
import Share from 'react-native-share';
import ViewShot,{captureRef} from 'react-native-view-shot';
import DropDownPicker from 'react-native-dropdown-picker';
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

const TopicView = ({route}) => {


  const[listQuote,setListQuote]=useState();

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
  const [count, setcount] = useState(false);
  const {number} = route.params;
  const [happy, sethappy] = useState([
    {Category: 'Happiness', Color: '#7030a0'},
    {
      Quote: 'Happiness in intelligent people is the rarest thing I know',
      Author: 'Ernest Hemingway',
      Reference: 'The Garden of Eden',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        "It's so hard to forget pain, but it's even harder to remember sweetness. We have no scar to show for happiness. We learn so little from peace.",
      Author: 'Chuck Palahniuk',
      Reference: 'Chuck Palahniuk',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        'Love is that condition in which the happiness of another person is essential to your own',
      Author: 'Robert A. Heinlein',
      Reference: 'Stranger in a Strange Land',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        "There's nothing like deep breaths after laughing that hard. Nothing in the world like a sore stomach for the right reasons.",
      Author: 'Stephen Chbosky',
      Reference: 'The Perks of Being a Wallflower',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        'The only way to find true happiness is to risk being completely cut open.',
      Author: 'Chuck Palahniuk',
      Reference: 'Invisible Monsters',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote: 'Happiness (is) only real when shared',
      Author: 'Jon Krakauer',
      Reference: 'Into the Wild',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        "I felt my lungs inflate with the onrush of scenery-air, mountains, trees, people. I thought, 'This is what it is to be happy.'",
      Author: 'Sylvia Plath',
      Reference: 'The Bell Jar',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        "It's been my experience that you can nearly always enjoy things if you make up your mind firmly that you will.",
      Author: 'L.M. Montgomery',
      Reference: 'Anne of Green Gables',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        'When the first baby laughed for the first time, its laugh broke into a thousand pieces, and they all went skipping about, and that was the beginning of fairies.',
      Author: 'J.M. Barrie',
      Reference: 'Peter Pan',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote: 'I would always rather be happy than dignified',
      Author: 'Charlotte Bronte',
      Reference: 'Jane Eyre',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        'Cheerfulness and content are great beautifiers, and are famous preservers of youthful looks, depend upon it.',
      Author: 'Charles Dickens',
      Reference: '',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        'Happy are they that hear their detractions, and can put them to mending',
      Author: 'William Shakespeare',
      Reference: 'Much Ado About Nothing',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote: 'Happy is the man who can make a living by his hobby!',
      Author: 'George Bernard Shaw',
      Reference: 'Pygmalion',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        'I had rather have a fool to make me merry than experience to make me sad',
      Author: 'William Shakespeare',
      Reference: 'As You Like It',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        'That the choice for mankind lay between freedom and happiness, and that, for the great bulk of mankind, happiness was better.',
      Author: 'George Orwell',
      Reference: 'Nineteen Eighty-Four',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        'There is no happiness like that of being loved by your fellow-creatures, and feeling that your presence is an addition to their comfort.',
      Author: 'Charlotte Bronte',
      Reference: 'Jane Eyre',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote: 'Surely happiness is reflective, like the light of heaven.',
      Author: 'Washington Irving',
      Reference: 'Old Christmas',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        'To me it seems that those who are happy in this world are better and more lovable people than those who are not.',
      Author: 'Samuel Butler',
      Reference: 'The Way of All Flesh',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        "'Action may not always be happiness,' said the general; 'but there is no happiness without action.'",
      Author: 'Benjamin Disraeli',
      Reference: 'Lothair',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        'Take responsibility of your own happiness, never put it in other people’s hands',
      Author: 'Roy T. Bennett',
      Reference: 'The Light in the Heart',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        'If you want to be happy, do not dwell in the past, do not worry about the future, focus on living fully in the present',
      Author: 'Roy T. Bennett',
      Reference: 'The Light in the Heart',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        'Happiness is holding someone in your arms and knowing you hold the whole world.',
      Author: 'Orhan Pamuk',
      Reference: 'Snow',
      Category: 'Happiness',
      Color: '#7030a0',
    },
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
    {
      Quote:
        'I am not proud, but I am happy; and happiness blinds, I think, more than pride.',
      Author: 'Alexandre Dumas',
      Reference: 'The Count of Monte Cristo',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        'The search for happiness is one of the chief sources of unhappiness.',
      Author: 'Eric Hoffer',
      Reference: 'The Passionate State of Mind',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        'Happiness is an imaginary condition, Formerly often attributed by the living to the dead, now usually attributed by adults to children, and by children to adults',
      Author: 'Thomas Szasz',
      Reference: 'The Second Sin ',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        'So of cheerfulness, or a good temper--the more it is spent, the more of it remains.',
      Author: 'Ralph Waldo Emerson',
      Reference: 'The Conduct of Life',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        'Happiness is an attainable human condition; bliss is reserved for the dead. ',
      Author: 'Shraga Silverstein',
      Reference: 'A Candle by Day',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        "Man only likes to count his troubles; he doesn't calculate his happiness",
      Author: 'Fyodor Dostoyevsky',
      Reference: 'Notes from Underground',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote: "I'd far rather be happy than right any day",
      Author: 'Douglas Adams',
      Reference: "The Hitchhiker's Guide to the Galaxy",
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote: 'With mirth and laughter let old wrinkles come',
      Author: 'William Shakespeare',
      Reference: 'The Merchant of Venice',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        "he problem with people is they forget that most of the time it's the small things that count.",
      Author: 'Jennifer Niven',
      Reference: 'All the Bright Places',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        'Happiness is an accident of nature, a beautiful and flawless aberration.”',
      Author: 'Pat Conroy',
      Reference: 'The Lords of Discipline',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        'It is the very mark of the spirit of rebellion to crave for happiness in this life',
      Author: 'Henrik Ibsen',
      Reference: 'Ghosts',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        'A smile puts you on the right track. A smile makes the world a beautiful place. When you lose your smile, you lose your way in the chaos of life',
      Author: 'Roy T. Bennett',
      Reference: 'The Light in the Heart',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        "And I can't be running back and fourth forever between grief and high delight.",
      Author: 'J.D. Salinger',
      Reference: 'Franny and Zooey',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        'If you want others to be happy, practice compassion. If you want to be happy, practice compassion',
      Author: 'Dalai Lama XIV',
      Reference: 'The Art of Happiness',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        'There are as many styles of beauty as there are visions of happiness.',
      Author: 'Stendhal',
      Reference: 'Love',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        "I don't understand the point of being together if you're not the happiest.",
      Author: 'Gillian Flynn',
      Reference: 'Gone Girl',
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        'Happiness depends on being free, and freedom depends on being courageous',
      Author: 'Marie Rutkoski',
      Reference: "The Winner's Curse",
      Category: 'Happiness',
      Color: '#7030a0',
    },
    {
      Quote:
        'There are two ways to be happy: improve your reality, or lower your expectations.',
      Author: 'Jodi Picoult',
      Reference: 'Nineteen Minutes',
      Category: 'Happiness',
      Color: '#7030a0',
    },
  ]);
  const [sad, setsad] = useState([
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
    {
      Quote:
        'You know, a heart can be broken, but it keeps on beating, just the same.',
      Author: 'Fannie Flagg',
      Reference: 'Fried Green Tomatoes at the Whistle Stop Cafe',
      Category: 'Sad',
      Color: '#a8d08d',
    },
    {
      Quote:
        'As the light begins to intensify, so does my misery, and I wonder how it is possible to hurt so much when nothing is wrong.',
      Author: 'Tabitha Suzuma',
      Reference: 'Forbidden',
      Category: 'Sad',
      Color: '#a8d08d',
    },
    {
      Quote:
        'You see I usually find myself among strangers because I drift here and there trying to forget the sad things that happened to me',
      Author: 'F. Scott Fitzgerald,',
      Reference: 'The Great Gatsby',
      Category: 'Sad',
      Color: '#a8d08d',
    },
    {
      Quote:
        'Sometimes I can hear my bones straining under the weight of all the lives I’m not living',
      Author: 'Jonathan Safran Foer',
      Reference: 'Extremely Loud and Incredibly Close',
      Category: 'Sad',
      Color: '#a8d08d',
    },
    {
      Quote:
        "Of all the words of mice and men, the saddest are, 'It might have been.",
      Author: 'Kurt Vonnegut',
      Reference: "Cat's Cradle",
      Category: 'Sad',
      Color: '#a8d08d',
    },
    {
      Quote:
        'There is no greater agony than bearing an untold story inside you',
      Author: 'Maya Angelou',
      Reference: 'I Know Why the Caged Bird Sings',
      Category: 'Sad',
      Color: '#a8d08d',
    },
    {
      Quote: 'I hid my deepest feelings so well I forgot where I placed them',
      Author: 'Amy Tan',
      Reference: 'Saving Fish from Drowning',
      Category: 'Sad',
      Color: '#a8d08d',
    },
    {
      Quote:
        'Tears shed for another person are not a sign of weakness. They are a sign of a pure heart',
      Author: 'José N. Harris',
      Reference: 'MI VIDA: A Story of Faith, Hope and Love',
      Category: 'Sad',
      Color: '#a8d08d',
    },
    {
      Quote:
        "I can't eat and I can't sleep. I'm not doing well in terms of being a functional human, you know?",
      Author: 'Ned Vizzini',
      Reference: "It's Kind of a Funny Story",
      Category: 'Sad',
      Color: '#a8d08d',
    },
    {
      Quote:
        'So it’s true, when all is said and done, grief is the price we pay for love.',
      Author: 'E.A. Bucchianeri',
      Reference: 'Brushstrokes of a Gadfly',
      Category: 'Sad',
      Color: '#a8d08d',
    },
    {
      Quote:
        "Nothing thicker than a knife's blade separates happiness from melancholy.",
      Author: 'Virginia Woolf',
      Reference: 'Orlando',
      Category: 'Sad',
      Color: '#a8d08d',
    },
    {
      Quote:
        'Give sorrow words; the grief that does not speak knits up the o-er wrought heart and bids it break.',
      Author: 'William Shakespeare',
      Reference: 'Macbeth',
      Category: 'Sad',
      Color: '#a8d08d',
    },
    {
      Quote:
        'Then she was pressing her little proud broken self against his face, as close as she could get, and then they died.',
      Author: 'Philip Pullman',
      Reference: 'The Subtle Knife',
      Category: 'Sad',
      Color: '#a8d08d',
    },
    {
      Quote: 'I was too young to know how to love her',
      Author: 'Antoine de Saint-Exupéry',
      Reference: 'The Little Prince',
      Category: 'Sad',
      Color: '#a8d08d',
    },
    {
      Quote:
        'You can love someone so much...But you can never love people as much as you can miss them.',
      Author: 'John Green',
      Reference: 'An Abundance of Katherines',
      Category: 'Sad',
      Color: '#a8d08d',
    },
    {
      Quote:
        'There’s death all around us. Everywhere we look. 1.8 people kill themselves every second. We just don’t pay attention. Until we do.',
      Author: 'Cynthia Hand',
      Reference: 'The Last Time We Say Goodbye',
      Category: 'Sad',
      Color: '#a8d08d',
    },
    {
      Quote:
        'As the light begins to intensify, so does my misery, and I wonder how it is possible to hurt so much when nothing is wrong',
      Author: 'Tabitha Suzuma',
      Reference: 'Forbidden',
      Category: 'Sad',
      Color: '#a8d08d',
    },
    {
      Quote:
        'Have you ever wondered what a human life is worth? That morning, my brother’s was worth a pocket watch',
      Author: 'Ruta Sepetys',
      Reference: 'Between Shades of Gray',
      Category: 'Sad',
      Color: '#a8d08d',
    },
    {
      Quote:
        'Long time I been on my own, but now really I’m alone. I survive the killing, the starving, all the hate of the Khmer Rouge, but I think maybe now I will die of this, of broken heart.',
      Author: 'Patricia McCormick',
      Reference: 'Never Fall Down',
      Category: 'Sad',
      Color: '#a8d08d',
    },
    {
      Quote: 'Grief is not as heavy as guilt, but it takes more away from you.',
      Author: 'Veronica Roth',
      Reference: 'Insurgent',
      Category: 'Sad',
      Color: '#a8d08d',
    },
    {
      Quote:
        'You were merely wishing for the end of pain, the monster said. Your own pain. An end to how it isolated you. It is the most human wish of all.',
      Author: 'Elizabeth Wein',
      Reference: 'Code Name Verity',
      Category: 'Sad',
      Color: '#a8d08d',
    },
    {
      Quote: 'From the moment we are born, we begin to die.',
      Author: 'Janne Teller',
      Reference: 'Nothing',
      Category: 'Sad',
      Color: '#a8d08d',
    },
    {
      Quote:
        'I saw the world in black and white instead of the vibrant colours and shades I knew existed',
      Author: 'Katie McGarry',
      Reference: 'Pushing the Limits',
      Category: 'Sad',
      Color: '#a8d08d',
    },
  ]);
  const [humor, sethumor] = useState([
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
    {
      Quote:
        'It wasn’t until i had become engaged to miss piano that i began avoiding her.',
      Author: 'Peter De Vries',
      Reference: 'Into Your Tent I’ll Creep',
      Category: 'Humor',
      Color: '#ffe599',
    },
    {
      Quote:
        'I love deadlines. I love the whooshing noise they make as they go by',
      Author: 'Douglas Adams',
      Reference: 'The Salmon of Doubt',
      Category: 'Humor',
      Color: '#ffe599',
    },
    {
      Quote:
        'The trouble with having an open mind, of course, is that people will insist on coming along and trying to put things in it.',
      Author: 'Terry Pratchett',
      Reference: 'Diggers',
      Category: 'Humor',
      Color: '#ffe599',
    },
    {
      Quote: 'Reality continues to ruin my life',
      Author: 'Bill Watterson',
      Reference: 'The Complete Calvin and Hobbes',
      Category: 'Humor',
      Color: '#ffe599',
    },
    {
      Quote:
        'Have you ever noticed how ‘What the hell’ is always the right decision to make?',
      Author: 'Terry Johnson',
      Reference: 'Insignificance',
      Category: 'Humor',
      Color: '#ffe599',
    },
    {
      Quote:
        "Give a man a fire and he's warm for a day, but set fire to him and he's warm for the rest of his life",
      Author: 'Terry Pratchett',
      Reference: 'Jingo',
      Category: 'Humor',
      Color: '#ffe599',
    },
    {
      Quote: 'This life’s hard, but it’s harder if you’re stupid',
      Author: 'George V. Higgins',
      Reference: 'The Friends of Eddie Coyle',
      Category: 'Humor',
      Color: '#ffe599',
    },
    {
      Quote:
        'I do not want people to be very agreeable, as it saves me the trouble of liking them a great deal',
      Author: 'Jane Austen',
      Reference: "Jane Austen's Letters",
      Category: 'Humor',
      Color: '#ffe599',
    },
    {
      Quote:
        'Never let your sense of morals prevent you from doing what is right.',
      Author: 'Isaac Asimov,',
      Reference: 'Foundation',
      Category: 'Humor',
      Color: '#ffe599',
    },
    {
      Quote:
        "It is said that your life flashes before your eyes just before you die. That is true, it's called Life",
      Author: 'Terry Pratchett',
      Reference: 'The Last Continent',
      Category: 'Humor',
      Color: '#ffe599',
    },
    {
      Quote:
        'I have great faith in fools - self-confidence my friends will call it',
      Author: 'Edgar Allan Poe',
      Reference: 'Marginalia',
      Category: 'Humor',
      Color: '#ffe599',
    },
    {
      Quote:
        'There is nothing in the world so irresistibly contagious as laughter and good humor',
      Author: 'Charles Dickens',
      Reference: 'A Christmas Carol',
      Category: 'Humor',
      Color: '#ffe599',
    },
    {
      Quote:
        "'Begin at the beginning', the King said, very gravely, 'and go on till you come to the end: then stop'",
      Author: 'Lewis Carroll',
      Reference: 'Alice in Wonderland',
      Category: 'Humor',
      Color: '#ffe599',
    },
    {
      Quote:
        'I’d said it before and meant it: Alive or undead, the love of my life was a badass.',
      Author: 'Richelle Mead',
      Reference: 'Blood promise',
      Category: 'Humor',
      Color: '#ffe599',
    },
    {
      Quote: 'Tell the truth, or someone will tell it for you',
      Author: 'Stephanie Klein',
      Reference: 'Straight Up and Dirty',
      Category: 'Humor',
      Color: '#ffe599',
    },
    {
      Quote:
        "I suppose I'll have to add the force of gravity to my list of enemies.",
      Author: 'Lemony Snicket',
      Reference: 'The Penultimate Peril',
      Category: 'Humor',
      Color: '#ffe599',
    },
    {
      Quote: "Say 'provoking' again. Your mouth looks provocative when you do.",
      Author: 'Becca Fitzpatrick',
      Reference: 'Hush, Hush',
      Category: 'Humor',
      Color: '#ffe599',
    },
    {
      Quote: 'Time is a drug. Too much of it kills you',
      Author: 'Terry Pratchett',
      Reference: 'Small Gods',
      Category: 'Humor',
      Color: '#ffe599',
    },
    {
      Quote: 'Time is an illusion. Lunchtime doubly so.',
      Author: 'Douglas Adams',
      Reference: "The Hitchhiker's Guide to the Galaxy",
      Category: 'Humor',
      Color: '#ffe599',
    },
    {
      Quote:
        "The capacity for friendship is God's way of apologizing for our families.",
      Author: 'Jay McInerney',
      Reference: 'The Last of the Savages',
      Category: 'Humor',
      Color: '#ffe599',
    },
    {
      Quote:
        "Every now and then I like to do as I'm told, just to confuse people.",
      Author: 'Tamora Pierce',
      Reference: 'Melting Stones',
      Category: 'Humor',
      Color: '#ffe599',
    },
  ]);
  const [roamce, setromance] = useState([
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
    {
      Quote: 'If I loved you less, I might be able to talk about it more',
      Author: 'Jane Austen',
      Reference: 'EMMA',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote: 'If you remember me, then I don’t care if everyone else forgets.',
      Author: 'Haruki Murakami',
      Reference: 'KAFKA ON THE SHORE',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote:
        'Doubt thou the stars are fire; Doubt that the sun doth move; Doubt truth to be a liar; But never doubt I love.',
      Author: 'William Shakespeare',
      Reference: 'HAMLET',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote:
        'If you live to be a hundred, I want to live to be a hundred minus one day, so I never have to live without you.',
      Author: 'A.A. Milne',
      Reference: 'WINNIE-THE-POOH',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote:
        'You don’t love someone because they’re perfect, you love them in spite of the fact that they’re not.',
      Author: 'Jodi Picoult',
      Reference: 'MY SISTER’S KEEPER',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote:
        'I always have many roads to travel, but I take the one which leads to you.',
      Author: 'Amit Kalantri',
      Reference: 'I Love You Too',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote: 'The very essence of romance is uncertainty.',
      Author: 'Oscar Wilde',
      Reference: 'The Importance of Being Earnest and Other Plays',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote:
        "True love is rare, and it's the only thing that gives life real meaning",
      Author: 'Nicholas Sparks',
      Reference: 'Message in a Bottle',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote:
        'You know what charm is: a way of getting the answer yes without having asked any clear question.',
      Author: 'Albert Camus',
      Reference: 'The fall',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote:
        'In vain I have struggled. It will not do. My feelings will not be repressed. You must allow me to tell you how ardently I admire and love you.',
      Author: 'Jane Austen',
      Reference: 'Pride And Prejudice',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote: 'You are my heart, my life, my one and only thought.',
      Author: 'Arthur Conan Doyle',
      Reference: 'The White Company',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote:
        'You are sunlight through a window, which I stand in, warmed. My darling',
      Author: 'Jessie Burton',
      Reference: 'The Miniaturist',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote:
        'Did my heart love till now? Forswear it, sight! For I ne’er saw true beauty till this night.',
      Author: 'William Shakespeare',
      Reference: 'Romeo and Juliet',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote:
        'Doubt thou the stars are fire; Doubt that the sun doth move; Doubt truth to be a liar; But never doubt I love.',
      Author: 'William Shakespeare',
      Reference: 'Hamlet',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote:
        'Her love was entire as a child’s, and though warm as summer it was fresh as spring.',
      Author: 'Thomas Hardy',
      Reference: 'Far From The Madding Crowd',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote:
        'Every atom of your flesh is as dear to me as my own: in pain and sickness it would still be dear.',
      Author: 'Charlotte Brontë',
      Reference: 'Jane Eyre',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote:
        'It is better to love wisely, no doubt: but to love foolishly is better than not to be able to love at all.”',
      Author: 'William Makepeace Thackeray',
      Reference: 'Vanity Fair',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote:
        'True love is rare, and it’s the only thing that gives life real meaning',
      Author: 'Nicholas Sparks',
      Reference: 'Message in a Bottle',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote:
        'The Very first moment I beheld him, my heart was irrevocably gone',
      Author: 'Jane Austen',
      Reference: 'Love and Friendship',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote:
        'Sometimes you wake up from a dream. Sometimes you wake up in a dream. And sometimes, every once in a while, you wake up in someone else’s dream.',
      Author: 'Richelle Mead',
      Reference: 'Succubus Blues (Georgina Kincaid, #1)',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote:
        'When it comes to men who are romantically interested in you, it’s really simple. Just ignore everything they say and only pay attention to what they do.',
      Author: 'Randy Pausch',
      Reference: 'The Last Lecture',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote:
        'For never was a story of more woe than this of Juliet and her Romeo',
      Author: 'William Shakespeare',
      Reference: 'Romeo and Juliet',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote: 'Love all, trust a few, do wrong to none.',
      Author: 'William Shakespeare',
      Reference: 'All’s Well That Ends Well',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote: 'Love looks not with the eyes, but with the mind,',
      Author: 'William Shakespeare',
      Reference: 'A Midsummer Night’s Dream',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote:
        'But I, being poor, have only my dreams; I have spread my dreams under your feet; Tread softly because you tread on my dreams.”',
      Author: 'W.B. Yeats',
      Reference: 'He Wishes for the Cloths of Heaven',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote:
        'But soft! What light through yonder window breaks?It is the east, and Juliet is the sun',
      Author: 'William Shakespeare',
      Reference: 'Romeo and Juliet,',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote:
        'He was my North, my South, my East and West, my working week and my Sunday rest.',
      Author: 'W.H. Auden',
      Reference: 'Stop All the Clocks',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote:
        'If I were to live a thousand years, I would belong to you for all of them. If we were to live a thousand lives, I would want to make you mine in each one.',
      Author: 'Michelle Hodkin',
      Reference: 'The Evolution of Mara Dyer',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote:
        'Every lover is, in his heart, a madman, and, in his head, a minstrel',
      Author: 'Neil Gaiman',
      Reference: 'Stardust',
      Category: 'Romance',
      Color: '#4472c4',
    },
    {
      Quote: "You gave me a forever within the numbered days, and I'm grateful",
      Author: 'John Green',
      Reference: 'The Fault in Our Stars',
      Category: 'Romance',
      Color: '#4472c4',
    },
  ]);
  const [inspi, setinspi] = useState([
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
    {
      Quote: 'You never know what worse luck your bad luck has saved you from.',
      Author: 'Cormac McCarthy',
      Reference: 'No Country For Old Men',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote: 'Appear weak when you are strong, and strong when you are weak.',
      Author: 'Sun Tzu',
      Reference: 'The Art of War',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote:
        'When you want something, all the universe conspires in helping you to achieve it.',
      Author: 'Paulo Coelho',
      Reference: 'The Alchemist',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote: 'Anything worth dying for is certainly worth living for.',
      Author: 'Joseph Heller',
      Reference: 'Catch-22',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote: 'Strive not to be a success, but rather to be of value',
      Author: 'Albert Einstein',
      Reference: 'Words of wisdom',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote: 'I attribute my success to this: I never gave or took any excuse',
      Author: 'Florence Nightingale',
      Reference: 'The commonplace book',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote: 'Definiteness of purpose is the starting point of all achievement',
      Author: 'W. Clement Stone',
      Reference: 'The Purpose Driven Life: The principle',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote:
        'Our time is limited, so don’t waste it living someone else’s life',
      Author: 'Steve Jobs',
      Reference: 'Follow us',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote:
        'It is a far, far better thing that I do, than I have ever done; it is a far, far better rest I go to than I have ever known.',
      Author: 'Charles Dickens',
      Reference: 'A Tale of Two Cities',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote: 'It matters not what someone is born, but what they grow to be',
      Author: 'J.K. Rowling',
      Reference: 'Harry Potter and the Goblet of Fire',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote:
        'Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.',
      Author: 'Martin Luther King Jr.,',
      Reference: 'A Testament of Hope: The Essential Writings and Speeches',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote:
        'Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten.',
      Author: 'Neil Gaiman',
      Reference: 'Coraline',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote:
        'It’s the possibility of having a dream come true that makes life interesting.',
      Author: 'Paulo Coelho',
      Reference: 'The Alchemist',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote: 'Everything is within your power,And your power is within you.',
      Author: 'Janice Trachtman',
      Reference:
        'Catching What Life Throws at You: Inspiring True Stories of Healing',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote:
        'Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart.',
      Author: 'Roy T. Bennett',
      Reference: 'The Light in the Heart',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote:
        'Somehow difficulties are easier to endure when you know your dream is waiting for you at the end',
      Author: 'Lisa Mangum',
      Reference: 'The Golden Spiral',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote: 'The most powerful weapon is hope',
      Author: 'Juliet Marillier',
      Reference: 'Heart’s Blood',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote: 'One often meets her destiny on the road she takes to avoid it',
      Author: 'Jessi Kirby',
      Reference: 'Golden',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote:
        'Every form of art is another way of seeing the world. Another perspective, another window. And science –that’s the most spectacular window of all. You can see the entire universe from there.',
      Author: 'Claudia Gray',
      Reference: 'A Thousand Pieces of You',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote:
        'With courage and hope, we can conquer our fears and do what we once believed impossible.',
      Author: 'Juliet Marillier',
      Reference: 'Heart’s Blood',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote:
        'The books that the world calls immoral are books that show the world its own shame',
      Author: 'Oscar Wilde',
      Reference: 'The Picture of Dorian Gray',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote:
        'That’s the thing about books. They let you travel without moving your feet',
      Author: 'Jhumpa Lahiri',
      Reference: 'The Namesake',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote: 'Time you enjoy wasting is not wasted time',
      Author: 'Marthe Troly-Curtin',
      Reference: 'Phrynette Married',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote:
        'When you can’t find someone to follow, you have to find a way to lead by example.',
      Author: 'Roxane Gay',
      Reference: 'Bad Feminist',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote:
        'She decided long ago that life was a long journey. She would be strong, and she would be weak, and both would be okay.',
      Author: 'Tahereh Mafi',
      Reference: 'Furthermore',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote:
        'It is only with the heart that one can see rightly; what is essential is invisible to the eye.',
      Author: 'Antoine de Saint-Exupéry',
      Reference: 'The Little Prince',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote: 'The worst enemy to creativity is self-doubt.',
      Author: 'Sylvia Plath',
      Reference: 'The Unabridged Journals of Sylvia Plath',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote:
        'Hoping for the best, prepared for the worst, and unsurprised by anything in between.',
      Author: 'Maya Angelou',
      Reference: 'I Know Why the Caged Bird Sings',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote:
        'It is a curious thought, but it is only when you see people looking ridiculous that you realize just how much you love them',
      Author: 'Agatha Christie',
      Reference: 'An Autobiography',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote: 'And, now that you don’t have to be perfect you can be good.',
      Author: 'John Steinbeck',
      Reference: 'East of Eden',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote:
        'There is never a time or place for true love. It happens accidentally, in a heartbeat, in a single flashing, throbbing moment.',
      Author: 'Sarah Dessen',
      Reference: 'The Truth About Forever',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote:
        'It was all very well to be ambitious, but ambition should not kill the nice qualities in you.',
      Author: 'Noel Streatfeild',
      Reference: 'Ballet Shoes',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote:
        'There is nothing sweeter in this sad world than the sound of someone you love calling your name.',
      Author: 'Kate DiCamillo',
      Reference: 'The Tale of Despereaux',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote:
        'Isn’t it nice to think that tomorrow is a new day with no mistakes in it yet?',
      Author: 'L.M. Montgomery',
      Reference: 'Anne of #70ad47 Gables',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote:
        'Our motives are far more successfully hidden from ourselves than they are from others',
      Author: 'Shraga Silverstein',
      Reference: 'A Candle by Day',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote: 'The prologue to inspiration is aspiration',
      Author: 'Shraga Silverstein',
      Reference: 'A Candle by Day',
      Category: 'Inspirational',
      Color: '#70ad47',
    },
    {
      Quote:
        'Courage is resistance to fear, mastery of fearnot absence of fear',
      Author: 'Mark Twain',
      Reference: "Pudd'nhead Wilson",
      Category: 'Inspirational',
      Color: '#70ad47',
    },
  ]);
  const [showData, setshowData] = useState();
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
  ];
  const [loaded, setLoaded] = useState(false);
  const [listName, setlistName] = useState('');
  const [listDesc, setlistDesc] = useState('');
  const [modalList, setModalList] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
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
  const blueColor=()=>{
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



  let favArray = [];
  // const[array,setArray]= useState([{}]);
  // const [listNameArray, setlistNameArray] = useState();

  const flatlistData = () => {
    if (number == 0) {
      setshowData(inspi);
    }
    if (number == 4) {
      setshowData(happy);
    }
    if (number == 8) {
      setshowData(sad);
    }
    if (number == 12) {
      setshowData(humor);
    }
    if (number == 16) {
      setshowData(roamce);
    }
  };

  const updateArray = (item) => {
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

  // const updateFav = async (item) => {
  //   try {
  //     await AsyncStorage.getItem('favo').then((value) => {
  //       // favArray=[...favArray,value];
  //       // favArray=[...favArray,item];
  //       let fav;

  //       if (value === null) {
  //         fav = [item];
  //       } else {
  //         fav = JSON.parse(value);

  //         fav.push(item);
  //       }

  //       console.log('---' + fav);
  //       fav = JSON.stringify(fav);

  //       console.log('saving ' + fav);
  //       //  AsyncStorage.setItem('fav', fav)
  //       AsyncStorage.setItem('favo', fav);
  //     });
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

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

  // const updateList = async (item) => {
  //   let list = {
  //     Quote: item.Quote,
  //   };
  //   try {
  //     await AsyncStorage.getItem(listName).then((value) => {
  //       // favArray=[...favArray,value];
  //       // favArray=[...favArray,item];
  //       let fav;

  //       if (value === null) {
  //         fav = [item];
  //       } else {
  //         fav = JSON.parse(value);

  //         fav.push(item);
  //       }

  //       console.log('---' + fav);
  //       fav = JSON.stringify(fav);

  //       console.log('saving ' + fav);
  //       //  AsyncStorage.setItem('fav', fav)
  //       AsyncStorage.setItem(listName, fav);
  //     });
  //   } catch (e) {
  //     // error reading value
  //   }
  // };


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
      await AsyncStorage.setItem('favo', jsonValue);
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

  // const swipeFavAdd =  (item) => {
  //   setSelectedItem(item);
  //   modalFav();
            
  //         };
    

  const swipeListAdd =  (item) => {
    setListQuote(item);
setModalList(!modalList);
        
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


  const flatListRef = React.useRef();
  const [borderColorDynamic, setborderColorDynamic] = useState('#A0EC1C');
  const [shouldShow, setShouldShow] = useState(false);

  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    if (currentOffset > 0) {
      // scroll down or on top of ScrollView
      setShouldShow(true);
    } else {
      // scroll up
      setShouldShow(false);
    }
  };

  const toTop = () => {
    // use current
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  const renderlist = ({item, index}) => {
    if (index === 0) {
      return (
        <TouchableOpacity
        //onPress={() =>  navigation.navigate("TopicList", {number:index })}
        >
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
            //onSwipeableLeftOpen={leftAction}
            renderLeftActions={() => leftAction(item)}
            renderRightActions={() => rightAction(item.Quote)}
            //onSwipeableRightOpen={swipeShare(item.Quote)}
          >
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

  useEffect(() => {
    flatlistData();
  }, []);

  return (
    <View style={styles.container}>
      

      {/* <TouchableOpacity onPress={getData}><Text>Show data</Text></TouchableOpacity> */}
      <FlatList
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        contentContainerStyle={{paddingBottom: 200}}
        ref={flatListRef}
        //onScroll={handleScroll}
        data={showData}
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
                    getData();
                    //setModalList(!modalList);
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
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: AppConstance.colorChosen,
    position: 'absolute',
    bottom: 10,
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
export default TopicView;
