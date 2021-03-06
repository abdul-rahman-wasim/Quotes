import React, {useState,useEffect} from 'react';
import {
  ScrollView,
  Share,
  TouchableOpacity,
  Linking,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  FlatList,
  Modal,
} from 'react-native';
import {deviceHeight, deviceWidth} from '../Components/constance/AppConstance';
import authorPic from '../images/vladmir.jpg';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconMaterialCI from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import AppConstance from '../Components/constance/AppConstance';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {  InterstitialAd,AdEventType,RewardedAd, RewardedAdEventType,BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import Snackbar from 'react-native-snackbar';

const IadUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3940256099942544/1033173712';

const interstitial = InterstitialAd.createForAdRequest(IadUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],  
});


const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-3940256099942544/2934735716';

const Body = () => {


  const showSnackbarMessage = () => {
    setTimeout(() => {
      Snackbar.show({
        backgroundColor: '#2596be',
        text: 'Link not Found',
        duration: Snackbar.LENGTH_SHORT,
      });
    }, 250);
  };


  useEffect(() => {
    //getData();
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

  const [loaded, setLoaded] = useState(false);
  const [showGrid, setshowGrid] = useState(false);
  const [count, setcount] = useState(false);
  const flatListRef = React.useRef();
  const [modalVisible, setModalVisible] = useState(false);
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
  let controller;
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
  // const [AuthorName, setAuthorName] = useState();
  // const [AuthorPic, setAuthorPic] = useState();
  // const [AuthorQuote, setAuthorQuote] = useState();
  // const [Wiki, setWiki] = useState();
   
  const loadInBrowser = (url) => {
    if(url!=="")
    {
      Linking.openURL(url).catch((err) => console.error('Error', err));
    }
else
{
  showSnackbarMessage();
}
    // Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

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

  const [data, setdata] = useState([
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "I saw the world in black and white instead of the vibrant colours and shades I knew existed"
      ],
      Author: 'Katie McGarry',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "From the moment we are born, we begin to die.",
      ],
      Author: 'Janne Teller',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "You were merely wishing for the end of pain, the monster said. Your own pain. An end to how it isolated you. It is the most human wish of all.",
      ],
      Author: 'Elizabeth Wein',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Grief is not as heavy as guilt, but it takes more away from you.",
      ],
      Author: 'Veronica Roth',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Long time I been on my own, but now really I???m alone. I survive the killing, the starving, all the hate of the Khmer Rouge, but I think maybe now I will die of this, of broken heart.",
      ],
      Author: 'Patricia McCormick',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Have you ever wondered what a human life is worth? That morning, my brother???s was worth a pocket watch",
      ],
      Author: 'Ruta Sepetys',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "As the light begins to intensify, so does my misery, and I wonder how it is possible to hurt so much when nothing is wrong",
        
      ],
      Author: 'Tabitha Suzuma',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "There???s death all around us. Everywhere we look. 1.8 people kill themselves every second. We just don???t pay attention. Until we do.",
      ],
      Author: 'Cynthia Hand',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "You can love someone so much...But you can never love people as much as you can miss them.",
        "You gave me a forever within the numbered days, and I'm grateful",
      ],
      Author: 'John Green',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "I was too young to know how to love her",
        "It is only with the heart that one can see rightly; what is essential is invisible to the eye.",
	
      ],
      Author: 'Antoine de Saint-Exup??ry',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Then she was pressing her little proud broken self against his face, as close as she could get, and then they died.",
	
      ],
      Author: 'Philip Pullman',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Nothing thicker than a knife's blade separates happiness from melancholy.",
      ],
      Author: 'Virginia Woolf',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "So it???s true, when all is said and done, grief is the price we pay for love.",
      ],
      Author: 'E.A. Bucchianeri',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "I can't eat and I can't sleep. I'm not doing well in terms of being a functional human, you know?",

      ],
      Author: 'Ned Vizzini',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Tears shed for another person are not a sign of weakness. They are a sign of a pure heart",

      ],
      Author: 'Jos?? N. Harris',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "I hid my deepest feelings so well I forgot where I placed them",
	
      ],
      Author: 'Amy Tan',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "There is no greater agony than bearing an untold story inside you",
        "Hoping for the best, prepared for the worst, and unsurprised by anything in between.",

      ],
      Author: 'Maya Angelou',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Of all the words of mice and men, the saddest are, 'It might have been.",
      ],
      Author: 'Kurt Vonnegut',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Sometimes I can hear my bones straining under the weight of all the lives I???m not living",

      ],
      Author: 'Jonathan Safran Foer',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "You know, a heart can be broken, but it keeps on beating, just the same.",
      ],
      Author: 'Fannie Flagg',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "So, this is my life. And I want you to know that I am both happy and sad and I???m still trying to figure out how that could be.",
        "There's nothing like deep breaths after laughing that hard. Nothing in the world like a sore stomach for the right reasons.",

      ],
      Author: 'Stephen Chbosky',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Breathing is hard. When you cry so much, it makes you realize that breathing is hard",

      ],
      Author: 'David Levithan',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "I guess that???s what saying good-bye is always like ??? like jumping off an edge. The worst part is making the choice to do it. Once you???re in the air, there???s nothing you can do but let go",
	
      ],
      Author: 'Lauren Oliver',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "There are two ways to be happy: improve your reality, or lower your expectations.",
        "You don???t love someone because they???re perfect, you love them in spite of the fact that they???re not.",

      ],
      Author: 'Jodi Picoult',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Happiness depends on being free, and freedom depends on being courageous",
      ],
      Author: 'Marie Rutkoski',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "I don't understand the point of being together if you're not the happiest.",
      ],
      Author: 'Gillian Flynn',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "There are as many styles of beauty as there are visions of happiness.",
      ],
      Author: 'Stendhal',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "If you want others to be happy, practice compassion. If you want to be happy, practice compassion",

      ],
      Author: 'Dalai Lama XIV',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "And I can't be running back and fourth forever between grief and high delight.",
	
      ],
      Author: 'J.D. Salinger',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "A smile puts you on the right track. A smile makes the world a beautiful place. When you lose your smile, you lose your way in the chaos of life",
        "Don???t be pushed around by the fears in your mind. Be led by the dreams in your heart.",
        "Take responsibility of your own happiness, never put it in other people???s hands",
        "If you want to be happy, do not dwell in the past, do not worry about the future, focus on living fully in the present",
        "Stop comparing yourself to other people, just choose to be happy and live your own life.",

      ],
      Author: 'Roy T. Bennett',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "It is the very mark of the spirit of rebellion to crave for happiness in this life",

      ],
      Author: 'Henrik Ibsen',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Happiness is an accident of nature, a beautiful and flawless aberration.",

      ],
      Author: 'Pat Conroy',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "The problem with people is they forget that most of the time it's the small things that count.",

      ],
      Author: 'Jennifer Niven',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "I'd far rather be happy than right any day",
        "I love deadlines. I love the whooshing noise they make as they go by",
        "Time is an illusion. Lunchtime doubly so.",
      ],
      Author: 'Douglas Adams',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Man only likes to count his troubles; he doesn't calculate his happiness",

      ],
      Author: 'Fyodor Dostoyevsky',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Happiness is an attainable human condition; bliss is reserved for the dead. ",
        "Our motives are far more successfully hidden from ourselves than they are from others",
        "The prologue to inspiration is aspiration",  
      ],
      Author: 'Shraga Silverstein',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "So of cheerfulness, or a good temper--the more it is spent, the more of it remains.",

      ],
      Author: 'Ralph Waldo Emerson',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Happiness is an imaginary condition, Formerly often attributed by the living to the dead, now usually attributed by adults to children, and by children to adults",

      ],
      Author: 'Thomas Szasz',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "The search for happiness is one of the chief sources of unhappiness.",

      ],
      Author: 'Eric Hoffer',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "I am not proud, but I am happy; and happiness blinds, I think, more than pride.",

      ],
      Author: 'Alexandre Dumas',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "I must learn to be content with being happier than I deserve.",
        "If I loved you less, I might be able to talk about it more",
        "In vain I have struggled. It will not do. My feelings will not be repressed. You must allow me to tell you how ardently I admire and love you.",
        "The Very first moment I beheld him, my heart was irrevocably gone",

      ],
      Author: 'Jane Austen',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "The happiness of your life depends upon the quality of your thoughts",

      ],
      Author: 'Marcus Aurelius',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Happiness is holding someone in your arms and knowing you hold the whole world.",

      ],
      Author: 'Orhan Pamuk',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "'Action may not always be happiness,' said the general; 'but there is no happiness without action.'",
     ],
      Author: 'Benjamin Disraeli',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "To me it seems that those who are happy in this world are better and more lovable people than those who are not.",

      ],
      Author: 'Samuel Butler',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Surely happiness is reflective, like the light of heaven.",

      ],
      Author: 'Washington Irving',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "There is no happiness like that of being loved by your fellow-creatures, and feeling that your presence is an addition to their comfort.",
        "I would always rather be happy than dignified",

      ],
      Author: 'Charlotte Bronte',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "That the choice for mankind lay between freedom and happiness, and that, for the great bulk of mankind, happiness was better.",

      ],
      Author: 'George Orwell',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Happy is the man who can make a living by his hobby!",

      ],
      Author: 'George Bernard Shaw',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Cheerfulness and content are great beautifiers, and are famous preservers of youthful looks, depend upon it.",
        "It is a far, far better thing that I do, than I have ever done; it is a far, far better rest I go to than I have ever known.",
        "There is nothing in the world so irresistibly contagious as laughter and good humor",

      ],
      Author: 'Charles Dickens',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "When the first baby laughed for the first time, its laugh broke into a thousand pieces, and they all went skipping about, and that was the beginning of fairies.",

      ],
      Author: 'J.M. Barrie',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "It's been my experience that you can nearly always enjoy things if you make up your mind firmly that you will.",
        "Isn???t it nice to think that tomorrow is a new day with no mistakes in it yet?",

      ],
      Author: 'L.M. Montgomery',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "I felt my lungs inflate with the onrush of scenery-air, mountains, trees, people. I thought, 'This is what it is to be happy.'",
        "The worst enemy to creativity is self-doubt.",

      ],
      Author: 'Sylvia Plath',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Happiness (is) only real when shared",

      ],
      Author: 'Jon Krakauer',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "The only way to find true happiness is to risk being completely cut open.",
        "It's so hard to forget pain, but it's even harder to remember sweetness. We have no scar to show for happiness. We learn so little from peace.",

      ],
      Author: 'Chuck Palahniuk',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Love is that condition in which the happiness of another person is essential to your own",

      ],
      Author: 'Robert A. Heinlein',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Happiness in intelligent people is the rarest thing I know",

      ],
      Author: 'Ernest Hemingway',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Every now and then I like to do as I'm told, just to confuse people.",

      ],
      Author: 'Tamora Pierce',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "The capacity for friendship is God's way of apologizing for our families.",

      ],
      Author: 'Jay McInerney',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Time is a drug. Too much of it kills you",
        "The trouble with having an open mind, of course, is that people will insist on coming along and trying to put things in it.",
        "Give a man a fire and he's warm for a day, but set fire to him and he's warm for the rest of his life",
        "It is said that your life flashes before your eyes just before you die. That is true, it's called Life",

      ],
      Author: 'Terry Pratchett',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Say 'provoking' again. Your mouth looks provocative when you do.",

      ],
      Author: 'Becca Fitzpatrick',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "I suppose I'll have to add the force of gravity to my list of enemies.",
 
      ],
      Author: 'Lemony Snicket',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Tell the truth, or someone will tell it for you",

      ],
      Author: 'Stephanie Klein',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Tell the truth, or someone will tell it for you",
 
      ],
      Author: 'Stephanie Klein',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "I???d said it before and meant it: Alive or undead, the love of my life was a badass.",
        "Sometimes you wake up from a dream. Sometimes you wake up in a dream. And sometimes, every once in a while, you wake up in someone else???s dream.",

      ],
      Author: 'Richelle Mead',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "'Begin at the beginning', the King said, very gravely, 'and go on till you come to the end: then stop'",
      ],
      Author: 'Lewis Carroll',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "I have great faith in fools - self-confidence my friends will call it",

      ],
      Author: 'Edgar Allan Poe',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Never let your sense of morals prevent you from doing what is right.",

      ],
      Author: 'Isaac Asimov',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "This life???s hard, but it???s harder if you???re stupid",

      ],
      Author: 'George V. Higgins',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Have you ever noticed how ???What the hell??? is always the right decision to make?",

      ],
      Author: 'Terry Johnson',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Reality continues to ruin my life",

      ],
      Author: 'Bill Watterson',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "It wasn???t until i had become engaged to miss piano that i began avoiding her.",

      ],
      Author: 'Peter De Vries',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "For the better part of my childhood, my professional aspirations were simple???i wanted to be an intergalactic princess",

      ],
      Author: 'Janet Evanovich',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "How five crows managed to lift a twenty-pound baby boy into the air was beyond prue, but that was certainly the least of her worries.",

      ],
      Author: 'Colin Meloy',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Grow old along with me! The best is yet to be",

      ],
      Author: 'Robert Browning',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Every lover is, in his heart, a madman, and, in his head, a minstrel",
        "Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten.",

      ],
      Author: 'Neil Gaiman',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "If I were to live a thousand years, I would belong to you for all of them. If we were to live a thousand lives, I would want to make you mine in each one.",

      ],
      Author: 'Michelle Hodkin',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "He was my North, my South, my East and West, my working week and my Sunday rest.",

      ],
      Author: 'W.H. Auden',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "But I, being poor, have only my dreams; I have spread my dreams under your feet; Tread softly because you tread on my dreams.???",

      ],
      Author: 'W.B. Yeats',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "When it comes to men who are romantically interested in you, it???s really simple. Just ignore everything they say and only pay attention to what they do.",

      ],
      Author: 'Randy Pausch',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
      ],
      Author: '',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "True love is rare, and it's the only thing that gives life real meaning",

      ],
      Author: 'Nicholas Sparks',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Every atom of your flesh is as dear to me as my own: in pain and sickness it would still be dear.",

      ],
      Author: 'Charlotte Bront??',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "It is better to love wisely, no doubt: but to love foolishly is better than not to be able to love at all.???",

      ],
      Author: 'William Makepeace Thackeray',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Her love was entire as a child???s, and though warm as summer it was fresh as spring.",

      ],
      Author: 'Thomas Hardy',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "You are sunlight through a window, which I stand in, warmed. My darling",

      ],
      Author: 'Jessie Burton',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "You are my heart, my life, my one and only thought.",

      ],
      Author: 'Arthur Conan Doyle',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "You know what charm is: a way of getting the answer yes without having asked any clear question.",

      ],
      Author: 'Albert Camus',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "The very essence of romance is uncertainty.",
        "The books that the world calls immoral are books that show the world its own shame",

      ],
      Author: 'Oscar Wilde',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "I always have many roads to travel, but I take the one which leads to you.",

      ],
      Author: 'Amit Kalantri',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "If you live to be a hundred, I want to live to be a hundred minus one day, so I never have to live without you.",

      ],
      Author: 'A.A. Milne',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "If you remember me, then I don???t care if everyone else forgets.",
        "Pain is inevitable. Suffering is optional.",

      ],
      Author: 'Haruki Murakami',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "To love or have loved, that is enough. Ask nothing further",

      ],
      Author: 'Victor Hugo',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Courage is resistance to fear, mastery of fearnot absence of fear",

      ],
      Author: 'Mark Twain',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "There is nothing sweeter in this sad world than the sound of someone you love calling your name.",

      ],
      Author: 'Kate DiCamillo',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "It was all very well to be ambitious, but ambition should not kill the nice qualities in you.",

      ],
      Author: 'Noel Streatfeild',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "There is never a time or place for true love. It happens accidentally, in a heartbeat, in a single flashing, throbbing moment.",

      ],
      Author: 'Sarah Dessen',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "And, now that you don???t have to be perfect you can be good.",

      ],
      Author: 'John Steinbeck',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "It is a curious thought, but it is only when you see people looking ridiculous that you realize just how much you love them",

      ],
      Author: 'Agatha Christie',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "She decided long ago that life was a long journey. She would be strong, and she would be weak, and both would be okay.",

      ],
      Author: 'Tahereh Mafi',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "When you can???t find someone to follow, you have to find a way to lead by example.",

      ],
      Author: 'Roxane Gay',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Time you enjoy wasting is not wasted time",

      ],
      Author: 'Marthe Troly-Curtin',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "That???s the thing about books. They let you travel without moving your feet",

      ],
      Author: 'Jhumpa Lahiri',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "With courage and hope, we can conquer our fears and do what we once believed impossible.",
        "The most powerful weapon is hope",

      ],
      Author: 'Juliet Marillier',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Every form of art is another way of seeing the world. Another perspective, another window. And science ???that???s the most spectacular window of all. You can see the entire universe from there.",

      ],
      Author: 'Claudia Gray',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "One often meets her destiny on the road she takes to avoid it",

      ],
      Author: 'Jessi Kirby',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Somehow difficulties are easier to endure when you know your dream is waiting for you at the end",

      ],
      Author: 'Lisa Mangum',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Everything is within your power,And your power is within you.",

      ],
      Author: 'Janice Trachtman',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.",

      ],
      Author: 'Martin Luther King Jr',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
      ],
      Author: '',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "It matters not what someone is born, but what they grow to be",

      ],
      Author: 'J.K. Rowling',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Our time is limited, so don???t waste it living someone else???s life",

      ],
      Author: 'Steve Jobs',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Definiteness of purpose is the starting point of all achievement",

      ],
      Author: 'W. Clement Stone',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "Appear weak when you are strong, and strong when you are weak.",

      ],
      Author: 'Sun Tzu',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "You never know what worse luck your bad luck has saved you from.",

      ],
      Author: 'Cormac McCarthy',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "All endings are also beginnings. We just don???t know it at the time.",

      ],
      Author: 'Mitch Albom',
      Wiki: '',
    },
    {
      PicName: require('../images/white.jpg'),

      Quote: [
        "None of us really changes over time. We only become more fully what we are.",
 
      ],
      Author: 'Anne Rice',
      Wiki: '',
    },
    {
      PicName: require('../images/churchhil.jpg'),

      Quote: [
        'It is a good thing for an uneducated man to read a book of quotations.',
        'If you mean to profit, learn to please.',
        'I cannot forecast to you the action of Russia. It is a riddle wrapped in a mystery inside an enigma: but perhaps there is a key. That key is Russian national interests.',
        'Never give in, never give in, never; never; never; never - in nothing, great or small, large or petty - never give in except to convictions of honor and good sense',
        'I do not resent criticism, even when, for the sake of emphasis, it parts for the time with reality.',
        'Arm yourselves, and be ye men of valour, and be in readiness for the conflict? forit is better for us to perish in battle than to look upon the outrage of our nation andour altar.',
        'Many forms of Government have been tried, and will be tried in this world of sin and woe. No one pretends that democracy is perfect or all-wise. Indeed, it has been said that democracy is the worst form of Government except all those others that have been tried from time to time.',
        'Democracy is the worst form of government except all those other forms that have been tried from time to time.',
        'It has been said that Democracy is the worst form of government except all those other forms that have been tried from time to time.',
        'We are happier in many ways when we are old than when we were young. The young sow wild oats. The old grow sage.',
        'There was unanimous, automatic, unquestioned agreement around our table.',
        'By swallowing evil words unsaid, no one has ever harmed his stomach.',
        'If we open a quarrel between the past and the present, we shall find that we have lost the future',
        'All men make mistakes, but only wise men learn from their mistakes.',
        'A man is about as big as the things that make him angry',
        'Always remember, a cat looks down on man, a dog looks up to man, but a pig will look man right in the eye and see his equal.',
        "[Lady Nancy Astor:] Winston, if you were my husband, I'd put poison in your coffee. ... Nancy, if you were my wife, I'd drink it.",
        'Beware the sleeping dragon. For when she awakes the Earth will shake [On China].',
        'The poor girl does not know how to have a conversation. Unfortunately, she does know how to speak.',
        'Nothing would induce me to vote for giving women the franchise. I am not going to be henpecked into a question of such importance.',
        'It has been said that democracy is the worst form of government except all the others that have been tried.',
        'In Franklin Roosevelt there died the greatest American friend we have ever known and the greatest champion of  who has ever brought help and comfort from the New World to the Old.',
        'People imagine that Churchill, Roosevelt and Stalin arrived in Yalta with a blank sheet of paper to decide the fate of Europe. Nothing could be further from the truth.',
        'Those who forget history are bound to repeat it',
        'What kind of people do they think we are? Is it possible they do not realize that we shall never cease to preserve against them until they have been taught a lesson which they and the world will never forget?',
        'No lover ever studied every whim of his mistress as I did those of President Roosevelt.',
        'Responsibility is the price of greatness.',
        'When the eagles are silent the parrots begin to jabber.',
        'Out of intense complexities intense simplicities emerge.',
        'Some regard private enterprise as if it were a predatory tiger to be shot. Others look upon it as a cow that they can milk. Only a handful see it for what it really is--the strong horse that pulls the whole cart.',
        'Most people, sometime in their lives, stumble across truth. Most jump up, brush themselves off, and hurry on about their business as if nothing had happened.',
        'When I look back on all the worries I remember the story of the old man who said on his deathbed that he had a lot of trouble in his life, most of which never happened.',
        'Success is the ability to go from one failure to another with no loss of enthusiasm.',
        "I would say to the House, as I said to those who have joined this Government, `I have nothing to offer but blood, toil, tears and sweat.'",
        'I never worry about action, but only about inaction',
        'There is only one duty, only one safe course, and that is to try to be right.',
        'Advertising mourishes the consuming power of men. It sets up before a man the goal of a better home, better clothing, better food for himself and his family. It spurs individual exertion and greater production.',
        "It is impossible to obtain a conviction for sodomy from an English jury. Half of them don't believe that it can physically be done, and the other half are doing it.",
        "I was not the lion, but it fell to me to give the lion's roar.",
        'Courage is the first of human qualities because it is the quality which guarantees the others.',
      ],
      Author: 'Winston Churchil',
      Wiki: 'https://en.wikipedia.org/wiki/Winston_Churchill',
    },
    {
      PicName: require('../images/vladmir.jpg'),
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
        'I loved you. I was a pentapod monster, but I loved you. I was despicable and brutal, and turpid, and everything, mais je t????????aimais, je t????????aimais! And there were times when I knew how you felt, and it was hell to know it, my little one. Lolita girl, brave Dolly Schiller.',
        'Perhaps, somewhere, some day, at a less miserable time, we may see each other again.',
        'You have to be an artist and a madman, a creature of infinite melancholy, with a bubble of hot poison in your loins and a super-voluptuous flame permanently aglow in your subtle spine (oh, how you have to cringe and hide!), in order to discern at once, by ineffable signsthe slightly feline outline of a cheekbone, the slenderness of a downy limbs, and other indices which despair and shame and tears of tenderness forbid me to tabulatethe little deadly demon among the wholesome children; she stands unrecognized by them and unconscious herself of her fantastic power.',
        'Life is short. From here to that old car you know so well there is a stretch of twenty, twenty-five paces. It is a very short walk. Make those twenty-five steps. Now. Right now. Come just as you are. And we shall live happily ever after. ',
      ],
      Author: 'Vladimir Nabokov',
      Wiki: ' https://www.amazon.com/gp/product/0679723161/?tag=braipick-20',
    },
    {
      PicName: require('../images/matt.jpg'),
      Quote: [
        "If you aim to be something you are not, you will always fail. Aim to be you. Aim to look and act and think  you. Aim to be the truest version of you. Embrace that you-ness. Endorse it. Love it. Work hard at it. And don't give a second thought when people mock it or ridicule it. Most gossip is envy in disguise.",
        'The only way to learn is to live',
        "A person was  a city. You couldn't let a few less desirable parts put you off the whole. There may be bits you don't , a few dodgy side streets and suburbs, but the good stuff makes it worthwhile.",
        "We only need to be one person.We only need to feel one existence.We don't have to do everything in order to be everything, because we are already infinite. While we are alive we always contain a future of multifarious possibility.",
        'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices??????? Would you have done anything different, if you had the chance to undo your regrets?',
        'As Thoreau wrote, ???????It????????s not what you look at that matters, it????????s what you see.',
        'And that sadness is intrinsically part of the fabric of happiness. You can????????t have one without the other. Of course, they come in different degrees and quantities. But there is no life where you can be in a state of sheer happiness for ever. And imagining there is just breeds more unhappiness in the life you????????re in.',
        "Of course, we can't visit every place or meet every person or do every job, yet most of what we'd feel in any life is still available. We don't have to play every game to know what winning feels . We don't have to hear every piece of music in the world to understand music. We don't have to have tried every variety of grape from every vineyard to know the pleasure of wine. Love and laughter and fear and pain are universal currencies. We just have to close our eyes and savour the taste of the drink in front of us and listen to the song as it plays. We are as completely and utterly alive as we are in any other life and have access to the same emotional spectrum.",
        'Sometimes just to say your own truth out loud is enough to find others  you.',
        "The paradox of volcanoes was that they were symbols of destruction but also life. Once the lava slows and cools, it solidifies and then breaks down over time to become soil - rich, fertile soil.She wasn't a black hole, she decided. She was a volcano. And  a volcano she couldn't run away from herself. She'd have to stay there and tend to that wasteland.She could plant a forest inside herself.",
        'Want,???????? she told her, in a measured tone, ???????is an interesting word. It means lack. Sometimes if we fill that lack with something else the original want disappears entirely.',
        'The thing that looks the most ordinary might end up being the thing that leads you to victory.',
        "Maybe that's what all lives were, though. Maybe even the most seemingly perfectly intense or worthwhile lives ultimately felt the same. Acres of disappointment and monotony and hurts and rivalries but with flashes of wonder and beauty. Maybe that was the only meaning that mattered. To be the world, witnessing itself.",
        'That was how she had felt most of her life. Caught in the middle. Struggling, flailing, just trying to survive while not knowing which way to go. Which path to commit to without regret.',
        'You????????re overthinking it.???????? ???????I have anxiety. I have no other type of thinking available.',
        'Regrets don????????t leave. They weren????????t mosquitoe bites. They itch forever.',
        'Look at that chessboard we put back in place,???????? said Mrs Elm softly. ???????Look at how ordered and safe and peaceful it looks now, before a game starts. It????????s a beautiful thing. But it is boring. It is dead. And yet the moment you make a move on that board, things change. Things begin to get more chaotic. And that chaos builds with every single move you make.???????????????It????????s an easy game to play,???????? she told Nora. ???????But a hard one to master. Every move you make opens a whole new world of possibilities...In chess, as in life, possibility is the basis of everything. Every hope, every dream, every regret, every moment of living...never underestimate the big importance of small things.',
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
        'You don????????t have to understand life. You just have to live it.',
        "Sometimes regrets aren't based on fact at all",
        'Fear was when you wandered into a cellar and worried that the door would close shut. Despair was when was the door closed and locked behind you.',
      ],
      Author: 'Matt Haig',
      Wiki: 'http://www.matthaig.com/',
    },
    {
      PicName: require('../images/coelho.jpg'),
      Quote: [
        "It's the possibility of having a dream come true that makes life interesting.",
        'When we love, we always strive to become better than we are. When we strive to become better than we are, everything around us becomes better too.',
        'One is loved because one is loved. No reason is needed for loving.',
        'There is only one thing that makes a dream impossible to achieve: the fear of failure.',
        'So, I love you because the entire universe conspired to help me find you.',
        'The secret of life, though, is to fall seven times and to get up eight times.',
        'Waiting is painful. Forgetting is painful. But not knowing which to do is the worst kind of suffering.',
        'The simple things are also the most extraordinary things, and only the wise can see them.',
        'If pain must come, may it come quickly. Because I have a life to live, and I need to live it in the best way possible. If he has to make a choice, may he make it now. Then I will either wait for him or forget him.',
        'Everyone seems to have a clear idea of how other people should lead their lives, but none about his or her own.',
        "Everything tells me that I am about to make a wrong decision, but making mistakes is just part of life. What does the world want of me? Does it want me to take no risks, to go back to where I came from because I didn't have the courage to say 'yes' to life?",
        'Remember that wherever your heart is, there you will find your treasure.',
        "When someone leaves, it's because someone else is about to arrive.",
        "Tell your heart that the fear of suffering is worse than the suffering itself. And that no heart has ever suffered when it goes in search of its dreams, because every second of the search is a second's encounter with God and with eternity.",
        'Love is an untamed force. When we try to control it, it destroys us. When we try to imprison it, it enslaves us. When we try to understand it, it leaves us feeling lost and confused.',
        "Don't waste your time with explanations: people only hear what they want to hear.",
        "We can never judge the lives of others, because each person knows only their own pain and renunciation. It's one thing to feel that you are on the right path, but it's another to think that yours is the only path.",
        'When I had nothing to lose, I had everything. When I stopped being who I am, I found myself.',
        "No matter what he does, every person on earth plays a central role in the history of the world. And normally he doesn't know it.",
        'A child can teach an adult three things: to be happy for no reason, to always be busy with something, and to know how to demand with all his might that which he desires.',
        'Nothing in the world is ever completely wrong. Even a stopped clock is right twice a day.',
        'When you find your path, you must not be afraid. You need to have sufficient courage to make mistakes. Disappointment, defeat, and despair are the tools God uses to show us the way.',
        'When we least expect it, life sets us a challenge to test our courage and willingness to change; at such a moment, there is no point in pretending that nothing has happened or in saying that we are not yet ready. The challenge will not wait. Life does not look back. A week is more than enough time for us to decide whether or not to accept our destiny.',
        'Tears are words that need to be written.',
        "Don't give in to your fears. If you do, you won't be able to talk to your heart.",
        "If I am really a part of your dream, you'll come back one day.",
        'The two hardest tests on the spiritual road are the patience to wait for the right moment and the courage not to be disappointed with what we encounter.',
        'There are moments when troubles enter our lives and we can do nothing to avoid them.But they are there for a reason. Only when we have overcome them will we understand why they were there.',
        'Now that she had nothing to lose, she was free.',
        "Passion makes a person stop eating, sleeping, working, feeling at peace. A lot of people are frightened because, when it appears, it demolishes all the old things it finds in its path.No one wants their life thrown into chaos. That is why a lot of people keep that threat under control, and are somehow capable of sustaining a house or a structure that is already rotten. They are the engineers of the superseded.Other people think exactly the opposite: they surrender themselves without a second thought, hoping to find in passion the solutions to all their problems. They make the other person responsible for their happiness and blame them for their possible unhappiness. They are either euphoric because something marvelous has happened or depressed because something unexpected has just ruined everything.Keeping passion at bay or surrendering blindly to it - which of these two attitudes is the least destructive?I don't know.",
        "This is what we call love. When you are loved, you can do anything in creation. When you are loved, there's no need at all to understand what's happening, because everything happens within you.",
        'None of us knows what might happen even the next minute, yet still we go forward. Because we trust. Because we have Faith.',
        'People are capable, at any time in their lives, of doing what they dream of.',
        'We are travelers on a cosmic journey,stardust,swirling and dancing in the eddies and whirlpools of infinity. Life is eternal. We have stopped for a moment to encounter each other, to meet, to love, to share.This is a precious moment. It is a little parenthesis in eternity.',
        'When we meet someone and fall in love, we have a sense that the whole universe is on our side. And yet if something goes wrong, there is nothing left! How is it possible for the beauty that was there only minutes before to vanish so quickly? Life moves very fast. It rushes from heaven to hell in a matter of seconds.',
        'But love is always new. Regardless of whether we love once, twice, or a dozen times in our life, we always face a brand-new situation. Love can consign us to hell or to paradise, but it always takes us somewhere. We simply have to accept it, because it is what nourishes our existence. If we reject it, we die of hunger, because we lack the courage to stretch out a hand and pluck the fruit from the branches of the tree of life. We have to take love where we find it, even if that means hours, days, weeks of disappointment and sadness.The moment we begin to seek love, love begins to seek us. And to save us.',
        "I've been in love before, it's  a narcotic. At first it brings the euphoria of complete surrender. The next day you want more. You're not addicted yet, but you  the sensation, and you think you can still control things.You think about the person you love for two minutes then forget them for three hours. But then you get used to that person, and you begin to be completely dependent on them. Now you think about him for three hours and forget him for two minutes. If he's not there, you feel  an addict who can't get a fix. And just as addicts steal and humiliate themselves to get what they need, you're willing to do anything for love.",
        "I can choose either to be a victim of the world or an adventurer in search of treasure. It's all a question of how I view my life.",
        'People never learn anything by being told, they have to find out for themselves.',
        'Everything that happens once can never happen again. But everything that happens twice will surely happen a third time.',
        "If someone isn't what others want them to be, the others become angry. Everyone seems to have a clear idea of how other people should lead their lives, but none about his or her own.",
        'Accept what life offers you and try to drink from every cup. All wines should be tasted; some should only be sipped, but with others, drink the whole bottle.',
        "Ester asked why people are sad.'That????????s simple,' says the old man. 'They are the prisoners of their personal history. Everyone believes that the main aim in life is to follow a plan. They never ask if that plan is theirs or if it was created by another person. They accumulate experiences, memories, things, other people's ideas, and it is more than they can possibly cope with. And that is why they forget their dreams.",
        'I dont live in either my past or my future. I????????m interested only in the present. If you can concentrate always on the present, you????????ll be a happy man. Life will be a party for you, a grand festival, because life is the moment we????????re living now.',
        'Anyone who has lost something they thought was theirs forever finally comes to realise that nothing really belongs to them.',
        'No one loses anyone, because no one owns anyone. That is the true experience of : having the most important thing in the world without owning it',
        'In real life, love has to be possible. Even if it is not returned right away, love can only survive when the hope exists that you will be able to win over the person you desire.',
        'Anyone who loves in the expectation of being loved in return is wasting their time.',
        "Anyone who is in love is making love the whole time, even when they're not. When two bodies meet, it is just the cup overflowing. They can stay together for hours, even days. They begin the dance one day and finish it the next, or--such is the pleasure they experience--they may never finish it. No eleven minutes for them.",
        'Your eyes show the strength of your soul.',
        'When each day is the same as the next, it????????s because people fail to recognize the good things that happen in their lives every day that the sun rises.',
        'How much I missed, simply because I was afraid of missing it.',
        'The strongest love is the love that can demonstrate its fragility.',
        "What is a teacher? I'll tell you: it isn't someone who teaches something, but someone who inspires the student to give of her best in order to discover what she already knows.",
        'Life is too short, or too long, for me to allow myself the luxury of living it so badly.',
        'Our true friends are those who are with us when the good things happen. They cheer us on and are pleased by our triumphs. False friends only appear at difficult times, with their sad, supportive faces, when, in fact, our suffering is serving to console them for their miserable lives.',
        "Anyone who is observant, who discovers the person they have always dreamed of, knows that sexual energy comes into play before sex even takes place. The greatest pleasure isn't sex, but the passion with which it is practiced. When the passion is intense, then sex joins in to complete the dance, but it is never the principal aim.",
        "After all, what is happiness? Love, they tell me. But love doesn't bring and never has brought happiness. On the contrary, it's a constant state of anxiety, a battlefield; it's sleepless nights, asking ourselves all the time if we're doing the right thing. Real love is composed of ecstasy and agony.",
      ],
      Author: 'Paulo Coelho',
      Wiki: 'https://en.wikipedia.org/wiki/Paulo_Coelho',
    },
    {
      PicName: require('../images/jordan.jpg'),
      Quote: [
        "I've missed more than 9000 shots in my career. I've lost almost 300 games. 26 times, I've been trusted to take the game winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed.",
        'Talent wins games, but teamwork and intelligence wins championships.',
        "I can accept failure, everyone fails at something. But I can't accept not trying.",
        'You must expect great things of yourself before you can do them.',
        'Some people want it to happen, some wish it would happen, and others make it happen.',
        'My attitude is that if you push me towards something that you think is a weakness, then I will turn that perceived weakness into a strength.',
        "To be successful you have to be selfish, or else you never achieve. And once you get to your highest level, then you have to be unselfish. Stay reachable. Stay in touch. Don't isolate.",
        'Obstacles don????????t have to stop you. If you run into a wall, don????????t turn around and give up. Figure out how to climb it, go through it, or work around it.',
        "I've never lost a game I just ran out of time.",
        'If you quit ONCE it becomes a habit.Never quit!!!',
        'Everybody has talent, but ability takes hard work.',
        'Never say never, because limits,  fears, are often just an illusion.',
        'Always turn a negative situation into a positive situation.',
        'To learn to succeed, you must first learn to fail.',
        "Don't let them drag you down by rumors just go with what you believe in.",
        'Make It Happen',
        'If you do the work you get rewarded. There are no shortcuts in life.',
        'The minute you get away from fundamentals ???????? whether its proper technique, work ethic or mental preparation ???????? the bottom can fall out of your game, your schoolwork, your job, whatever you????????re doing.',
        "I've failed over and over and over again in my life and that is why I succeed.",
        'Once I made a decision, I never thought about it again.',
        'I Own the guy guarding me',
        'The key to success is failure',
        "What is love? Love is playing every game as if it's your last!",
        "The basketball court for me, during a game, is the most peaceful place I can imagine. On the basketball court, I worry about nothing. When I'm out there, no one can bother me...",
        'My mother is my root, my foundation. She planted the seed that I base my life on, and that is the belief that the ability to achieve starts in your mind.',
        'Some people want it to happen, some wish it would happen, others make it happen.',
        "learning 's a gift, even when 'pain' ,s your teacher!",
        'I realize im black, but id  to be viewed as a person, and that is everybodys wish.',
        'Failure is acceptable. but not trying is a whole different ball park.',
        "There is no 'I' in team but there is in win.",
        'Why would I think about missing a shot that I haven????????t taken yet?',
        'Some people want it to happen, some people wish it would happen, others make it happen.',
        'Some people want it to happen. Some wish it would happen. Others make it happen!',
        'I????????ve failed over and over and over again in my life. And that is why I succeed.',
      ],
      Author: 'Micheal Jordan',
      Wiki: 'https://en.wikipedia.org/wiki/Michael_Jordan',
    },
    {
      PicName: require('../images/scott.jpg'),
      Quote: [
        'So we beat on, boats against the current, borne back ceaselessly into the past.',
        "I hope she'll be a fool -- that's the best thing a girl can be in this world, a beautiful little fool.",
        'Angry, and half in love with her, and tremendously sorry, I turned away.',
        'And I  large parties. They????????re so intimate. At small parties there isn????????t any privacy.',
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
        'Can????????t repeat the past????????Why of course you can!',
        'They????????re a rotten crowd????????, I shouted across the lawn. ???????You????????re worth the whole damn bunch put together.',
        'In his blue gardens men and girls came and went  moths among the whisperings and the champagne and the stars.',
        'I couldn????????t forgive him or  him, but I saw that what he had done was, to him, entirely justified. It was all very careless and confused. They were careless people, Tom and Daisy????????they smashed up things and creatures and then retreated back into their money or their vast carelessness, or whatever it was that kept them together, and let other people clean up the mess they had made.',
        'There must have been moments even that afternoon when Daisy tumbled short of his dreams -- not through her own fault, but because of the colossal vitality of his illusion. It had gone beyond her, beyond everything. He had thrown himself into it with a creative passion, adding to it all the time, decking it out with every bright feather that drifted his way. No amount of fire or freshness can challenge what a man will store up in his ghostly heart.',
        'It????????s a great advantage not to drink among hard drinking people.',
        "All I kept thinking about, over and over, was 'You can't live forever; you can't live forever.",
        'So we drove on toward death through the cooling twilight.',
        'I felt a haunting loneliness sometimes, and felt it in others--young clerks in the dusk, wasting the most poignant moments of night and life.',
        'His heart beat faster and faster as Daisy????????s white face came up to his own. He knew that when he kissed this girl, and forever wed his unutterable visions to her perishable breath, his mind would never romp again  the mind of God. So he waited, listening for a moment longer to the tuning fork that had been struck upon a star. Then he kissed her. At his lips???????? touch she blossomed  a flower and the incarnation was complete.',
        "And as I sat there brooding on the old, unknown world, I thought of Gatsby????????s wonder when he first picked out the green light at the end of Daisy????????s dock. He had come a long way to this blue lawn, and his dream must have seemed so close that he could hardly fail to grasp it. He did not know that it was already behind him, somewhere back in that vast obscurity beyond the city, where the dark fields of the republic rolled on under the night.Gatsby believed in the green light, the orgastic future that year by year recedes before us. It eluded us then, but that's no matter????????to-morrow we will run faster, stretch out our arms farther. . . . And one fine morning????????????????  So we beat on, boats against the current, borne back ceaselessly into the past.",
        'No amount of fire or freshness can challenge what a man will store up in his ghostly heart.',
        'It takes two to make an accident.',
        'He looked at her the way all women want to be looked at by a man.',
        'If personality is an unbroken series of successful gestures, then there was something gorgeous about him',
        'Every one suspects himself of at least one of the cardinal virtues, and this is mine: I am one of the few honest people that I have ever known.',
      ],
      Author: 'F. Scott Fitzgerald',
      Wiki: '',
    },
    {
      PicName: require('../images/dale.jpg'),

      // "PicName":require('../images/carnegie.jpg'),
      Quote: [
        "It isn't what you have or who you are or where you are or what you are doing that makes you happy or unhappy. It is what you think about it.",

    
      
      "Don't be afraid of enemies who attack you. Be afraid of the friends who flatter you.",
      
      
      
      
      "You can make more friends in two months by becoming interested in other people than you can in two years by trying to get other people interested in you.",
      
      
      
      
      "Any fool can criticize, complain, and condemn???and most fools do. But it takes character and self-control to be understanding and forgiving.",
      
      
      
      "When dealing with people, remember you are not dealing with creatures of logic, but with creatures bristling with prejudice and motivated by pride and vanity.",
      
      
      
      
      "Everybody in the world is seeking happiness???and there is one sure way to find it. That is by controlling your thoughts. Happiness doesn't depend on outward conditions. It depends on inner conditions.",
      
      
    
      
      "Talk to someone about themselves and they'll listen for hours.",
  
      
      "Actions speak louder than words, and a smile says, ???I  you. You make me happy. I am glad to see you",
      
      
      
      "When dealing with people, let us remember we are not dealing with creatures of logic. We are dealing with creatures of emotion, creatures bristling with prejudices and motivated by pride and vanity.",
      
    
      
      "Personally I am very fond of strawberries and cream, but I have found that for some strange reason, fish prefer worms. So when I went fishing, I didn???t think about what I wanted. I thought about what they wanted. I didn't bait the hook with strawberries and cream. Rather, I dangled a worm or grasshopper in front of the fish and said Wouldn't you  to have that? Why not use the same common sense when fishing for people?",
      
       
      
      "A man convinced against his will Is of the same opinion still",
      
  
      
      "You can't win an argument. You can't because if you lose it, you lose it; and if you win it, you lose it.",
      
    
      
      "The difference between appreciation and flattery? That is simple. One is sincere and the other insincere. One comes from the heart out; the other from the teeth out. One is unselfish; the other selfish. One is universally admired; the other universally condemned.",
      
    
      
      "To be interesting, be interested.",
      
    
      
      "Names are the sweetest and most important sound in any language.",
      
    
      
      "I have come to the conclusion that there is only one way under high heaven to get the best of an argument??? and that is to avoid it. Avoid it as you would avoid rattlesnakes and earthquakes.",
      
  
      
      "If You Want to Gather Honey, Don't Kick Over the Beehive",
      
      
      
      "Why talk about what we want? That is childish. Absurd. Of course, you are interested in what you want. You are eternally interested in it. But no one else is. The rest of us are just  youwe are interested in what we want.",
      
      
      
      "All men have fears, but the brave put down their fears and go forward, sometimes to death, but always to victory.",
      
      
      
      "Instead of condemning people, let???s try to understand them. Let???s try to figure out why they do what they do. That???s a lot more profitable and intriguing than criticism; and it breeds sympathy, tolerance and kindness. ???To know all is to forgive all.",
      
      
      
      "Criticism is dangerous, because it wounds a person's precious pride, hurt his sense of importace and arouse resentment.",
      
      
      
      "If some people are so hungry for a feeling of importance that they actually go insane to get it, imagine what miracle you and I can achieve by giving people honest appreciation this side of insanity.",
      
      
      
      "By fighting you never get enough, but by yielding you get more than you expected.",
   
      
      "Once I did bad and that I heard ever. Twice I did good, but that I heard never.",
      
    
      
      "Only knowledge that is used sticks in your mind.",
      
    
      
      "If you argue and rankle and contradict, you may achieve a victory sometimes; but it will be an empty victory because you will never get your opponent's good will.",
      
       
      
      "Arouse in the other person an eager want. He who can do this has the whole world with him. He who cannot walks a lonely way.",
      
      
      
      "A barber lathers a man before he shaves him.",
      
       
      
      "Winning friends begins with friendliness.",
      
       
      
      "The chronic kicker, even the most violent critic, will frequently soften and be subdued in the presence of a patient, sympathetic listener??? a listener who will be silent while the irate fault-finder dilates  a king cobra and spews the poison out of his system.",
      
           
      
      "Personally I am very fond of strawberries and cream, but I have found that for some strange reason, fish prefer worms. So when I went fishing, I didn???t think about what I wanted. I thought about what they wanted. I didn't bait the hook with strawberries and cream. Rather, I dangled a worm or grasshopper in front of the fish and said Wouldn't you  to have that? Why not use the same common sense when fishing for people?",
      
      
      "Let's not allow ourselves to be upset by small things we should despise and forget. Remember is too short to be little.",
           
      	
      "When I asked him -Mr.Henry Ford- if he ever worried, he replied No. I believe God is managing affairs and that He doesn't need any advice from me. With God in charge, I believe that every-thing will work out for the best in the end.So what is there to worry about?",
      
      "Let's find and remedy all our weaknesses before our enemies get a chance to say a word. That is what Charles Darwin did. ...When Darwin completed the manuscript of his immortal book The Origin Of Species he realized that the publication of his revolutionary concept of creation would rock the intellectual and religious worlds. So he became his own critic and spent another 15 years checking his data, challenging his reasoning, and criticizing his conclusions.",
       
      "John Wanamaker, founder of the stores that bear his name, once confessed I learned thirty years ago that it is foolish to scold. I have enough trouble overcoming my own limitations without fretting over the fact that God has not seen fit to distribute evenly the gift of intelligence.",
      
      
      "When we are harassed and reach the limit of our own strength, many of us then turn in desperation to God- There are no atheists in foxholes. But why wait till we are desperate? Why not renew our strength every day? Why wait even until Sunday? For years I have had the habit of dropping into empty churches on weekday afternoons. When I feel that I am too rushed and hurried to spare a few minutes to think about spiritual things, I say to myself Wait a minute, Dale Carnegie, wait a minute. Why all the feverish hurry and rush, little man? You need to pause and acquire a little perspective. At such times, I frequently drop into the first church that I find open. Although I am a Protestant, I frequently, on weekday afternoons, drop into St. Patrick's Cathedral on Fifth Avenue, and remind myself that I'll be dead in another thirty years, but that the great spiritual truths that all churches teach are eternal. I close my eyes and pray. I find that doing this calms my nerves, rests my body, clarifies my perspective, and helps me revalue my values. May I recommend this practice to you?",
        
      "Students of public speaking continually ask, How can I overcome self-consciousness and the fear that paralyzes me before an audience? Did you ever notice in looking from a train window that some horses feed near the track and never even pause to look up at the thundering cars, while just ahead at the next railroad crossing a farmer's wife will be nervously trying to quiet her scared horse as the train goes by? How would you cure a horse that is afraid of cars???graze him in a back-woods lot where he would never see steam-engines or automobiles, or drive or pasture him where he would frequently see the machines? Apply horse-sense to ridding yourself of self-consciousness and fearface an audience as frequently as you can, and you will soon stop shying. You can never attain freedom from stage-fright by reading a treatise. A book may give you excellent suggestions on how best to conduct yourself in the water, but sooner or later you must get wet, perhaps even strangle and be half scared to death. There are a great many wetless bathing suits worn at the seashore, but no one ever learns to swim in them. To plunge is the only way.",
            
      
      "If You Have A Lemon, Make A Lemonade That is what a great educator does. But the fool does the exact opposite. If he finds that  has handed him a lemon, he gives up and says I'm beaten. It is fate. I haven't got a chance. Then he proceeds to rail against the world and indulge in an orgy of selfpity. But when the wise man is handed a lemon, he says What lesson can I learn from this misfortune? How can I improve my situation? How can I turn this lemon into a lemonade?",
      
      
      "The words Think and Thank are inscribed in many of the Cromwellian churches of England. These words ought to be inscribed in our hearts, too Think and Thank. Think of all we have to be grateful for, and thank God for all our boons and bounties.",
       
      
	
      "When two partners always agree, one of them is not necessary. If there is some point you haven't thought about, be thankful if it is brought to your attention.",
      
      
      
      "The first sign of greatness is when a man does not attempt to look and act great. Before you can call yourself a man at all, Kipling assure us, you must not look too good nor talk too wise.",
      
      
      "When the friendly jailer gave Socrates the poison cup to drink, the jailer said Try to bear lightly what needs must be. Socrates did. He faced death with a calmness and resignation that touched the hem of divinity.",
      
      
      "One of the most distinguished psychiatrists living, Dr. Carl Jung, says in his book Modern Man in Search of a Soul", 
      "During the past thirty years, people from all the civilized countries of the earth have consulted me. I have treated many hundreds of patients. Among all my patients in the second half of -that is to say, over thirty-five-there has not been one whose problem in the last resort was not that of finding a religious outlook on . It is safe to say that every one of them fell ill because he had lost that which the living religions of every age have given to their followers, and none of them has been really healed who did not regain his religious outlook.",
           
      
      "Five hundred years before Christ was born, the Greek philosopher Heraclitus told his students that everything changes except the law of change. He said You cannot step in the same river twice. The river changes every second; and so does the man who stepped in it.  is a ceaseless change. The only certainty is today. Why mar the beauty of living today by trying to solve the problems of a future that is shrouded in ceaseless change and uncertainty-a future that no one can possibly foretell?",
      
      
      
      "One of the most tragic things I know about human nature is that all of us tend to put off living. We are all dreaming of some magical rose garden over the horizon instead of enjoying the roses that are blooming outside our windows today.",
      
      
      
      "I will chum with you, and suffer when you suffer, and laugh when you laugh. I will bite my tongue when impatient words come. I will keep saying as if it were a ritual He is nothing but a boy -- a little boy!",
      
      
      
      "I don't blame you one iota for feeling as you do. If I were you I would undoubtedly feel just as you do.(...) You can say that and be 100 percent sincere, because if you were the other person you, of course, would feel just as he does (...) Suppose you had inherited the same body and temperament and mind (...) Suppose you had had his environment and experiences. You would then be precisely what he was - and where he was. For it is those things -and only those things - that made him what he was. (...) You deserve very little credit for being what you are - and remember, the people who come to you irritated, bigoted, unreasoning, deserve very little discredit for being what they are.",
      ],
      Author: 'Dale Carnegie',
      Wiki: 'https://en.wikipedia.org/wiki/Dale_Carnegie',
    },
    {
      PicName: require('../images/lincoln.jpg'),
      Quote: [
        '[That was the speech -- delivered under a banner reading] Mission Accomplished ... Major combat operations in Iraq have ended.',

        'I am for the people of the whole nation doing just as they please in all matter which concern the whole nation; for those of each part doing just as they choose in all matters which concern no other part; and for each individual doing just as he chooses in all matters which concern nobody else.',

        'If I were to try to read, much less answer, all the attacks made on me, this shop might as well be closed for any other business. I do the very best I know how -- the very best I can. And I mean to keep on doing it to the end. If the end brings me out all right, what is said against me will not amount to anything. If the end brings me out all wrong, ten angels swearing I was right would make no difference.',

        "A lawyer's time and advice are his stock in trade",

        'If I care to listen to every criticism, let alone act on them, then this shop may as well be closed for all other businesses. I have learned to do my best, and if the end result is good then I do not care for any criticism, but if the end result is not good, then even the praise of ten angels would not make the difference.',

        'Every person is responsible for his own looks after 40.',

        'Determine that the thing can and shall be done, and then we shall find the way.',

        'If you do not like him, let him alone. If God gave him little, that little let him enjoy.',
        'There are few things wholly evil or wholly good. Almost everything, especially of government policy, is an inseparable compound of the two, so that our best judgment of the preponderance between them is continually demanded.',

        "It's a party of hope for America. Lincoln gave Americans hope through equal opportunities for all.",

        'The fiery trials through which we pass will light us down in honor or dishonor to the latest generation.',

        'Seriously, I do not think I fit for the presidency.',

        "No man is good enough to govern another man without that other's consent.",

        'In law it is good policy never to plead what you need not, lest you oblige yourself to prove what you cannot',

        'Do not worry; eat three square meals a day; say your prayers; be courteous to your creditors; keep your digestion good; exercise; go slow and easy. Maybe there are other things your special case requires to make you happy, but my friend, these I reckon will give you a good lift. -',
        'No matter how much cats fight, there always seem to be plenty of kittens.',

        'Among free men there can be no successful appeal from the ballot to the bullet.',

        'I could as easily bail out the Potomac River with a teaspoon as attend to all the details of the army',

        'Character is like a tree and reputation like a shadow. The shadow is what we think of it; the tree is the real thing.',

        'Am I not destroying my enemies when I make friends of them?',

        '[That was the speech -- delivered under a banner reading] Mission Accomplished ... Major combat operations in Iraq have ended.',

        'I am for the people of the whole nation doing just as they please in all matter which concern the whole nation; for those of each part doing just as they choose in all matters which concern no other part; and for each individual doing just as he chooses in all matters which concern nobody else.',

        'If I were to try to read, much less answer, all the attacks made on me, this shop might as well be closed for any other business. I do the very best I know how -- the very best I can. And I mean to keep on doing it to the end. If the end brings me out all right, what is said against me will not amount to anything. If the end brings me out all wrong, ten angels swearing I was right would make no difference.',

        "A lawyer's time and advice are his stock in trade",

        'If I care to listen to every criticism, let alone act on them, then this shop may as well be closed for all other businesses. I have learned to do my best, and if the end result is good then I do not care for any criticism, but if the end result is not good, then even the praise of ten angels would not make the difference.',

        'Every person is responsible for his own looks after 40.',

        'Determine that the thing can and shall be done, and then we shall find the way.',

        'If you do not like him, let him alone. If God gave him little, that little let him enjoy.',

        'There are few things wholly evil or wholly good. Almost everything, especially of government policy, is an inseparable compound of the two, so that our best judgment of the preponderance between them is continually demanded.',

        "It's a party of hope for America. Lincoln gave Americans hope through equal opportunities for all.",

        'The fiery trials through which we pass will light us down in honor or dishonor to the latest generation.',

        'Seriously, I do not think I fit for the presidency.',

        "No man is good enough to govern another man without that other's consent.",

        'In law it is good policy never to plead what you need not, lest you oblige yourself to prove what you cannot',

        'Do not worry; eat three square meals a day; say your prayers; be courteous to your creditors; keep your digestion good; exercise; go slow and easy. Maybe there are other things your special case requires to make you happy, but my friend, these I reckon will give you a good lift. -',

        'No matter how much cats fight, there always seem to be plenty of kittens.',

        'Among free men there can be no successful appeal from the ballot to the bullet.',

        'I could as easily bail out the Potomac River with a teaspoon as attend to all the details of the army',
        'Character is like a tree and reputation like a shadow. The shadow is what we think of it; the tree is the real thing.',

        'Am I not destroying my enemies when I make friends of them?',
      ],
      Author: 'Abraham Lincoln',
      Wiki: 'https://en.wikipedia.org/wiki/Abraham_Lincoln',
    },
    {
      PicName: require('../images/einstein.jpg'),
      Quote: [
        'People like you and I, though mortal of course like everyone else, do not grow old no matter how long we live.... [We] never cease to stand like curious children before the great mystery into which we were born.',

        'God always takes the simplest way.',

        'I like to think that the moon is there even if I am not looking at it',

        'Mere unbelief in a personal God is no philosophy at all',

        'I believe that a simple and unassuming manner of life is best for everyone, best both for the body and the mind.',

        'You have to learn the rules of the game. And then you have to play better than anyone else.',

        'Anger dwells only in the bosom of fools.',

        "Isn't it strange that I who have written only unpopular books should be such a popular fellow?",

        'Fortunate Newton, happy childhood of science. Nature to him was an open book. He stands before us strong, certain, and alone.',

        'My life is a simple thing that would interest no one. It is a known fact that I was born and that is all that is necessary.',

        'A theory can be proved by experiment; but no path leads from experiment to the birth of a theory.',

        'a brave man, whose only fault was being a woman.',

        'But their intervention makes our acts to serve ever less merely the immediate claims of our instincts.',

        'All such action would cease if those powerful elemental forces were to cease stirring within us.',

        "I believe in Spinoza's God who reveals himself in the orderly harmony of what exists, not in a God who concerns himself with fates and actions of human beings",

        'I am neither especially clever nor especially gifted. I am only very, very curious.',

        'Education is what remains after one has forgotten everything he learned in school.',

        'Since the mathematicians have invaded the theory of relativity, I do not understand it myself anymore.',

        'Reality is merely an illusion, although a very persistent one',

        'I think that a particle must have a separate reality independent of the measurements. That is an electron has spin, location and so forth even when it is not being measured. I like to think that the moon is there even if I am not looking at it.',

        'We cannot solve our problems with the same thinking we used when we created them.',

        'I lived in solitude in the country and noticed how the monotony of a quiet life stimulates the creative mind.',

        'I have just got a new theory of eternity.',

        'Common sense is merely the deposit of prejudice laid down in the human mind before the age of 18',

        'Small is the number of them that see with their own eyes, and feel with their own hearts',

        'The true value of a human being can be found in degrees to which he has attained liberation from the self.',

        'Enjoying the joys of others and suffering with them - these are the best guides for man.',

        'The hardest thing in the world to understand is the income tax',

        'The road to perdition has ever been accompanied by lip service to an ideal.',

        'Solitude is painful when one is young, but delightful when one is more mature.',

        'He who can no longer pause to wonder and stand rapt in awe, is as good as dead; his eyes are closed.',

        'Force always attracts men of low morality.',

        'The faster you go, the shorter you are.',

        'It is a miracle that curiosity survives formal education.',

        'A person who never made a mistake never tried anything new.',

        'Without deep reflection one knows from daily life that one exists for other people.',

        'I am enough of an artist to draw freely upon my imagination.',

        'The attempt to combine wisdom and power has only rarely been successful and then only for a short while.',

        'To raise new questions, new possibilities, to regard old problems from a new angle, requires creative imagination and marks real advance in science.',

        'When I examine myself and my methods of thought, I come to the conclusion that the gift of fantasy has meant more to me than any talent for abstract, positive thinking.',

        'Few people are capable of expressing with equanimity opinions which differ from the prejudices of their social environment. Most people are even incapable of forming such opinions.',

        'The distinction between the past, present and future is only a stubbornly persistent illusion.',

        'We cannot despair of humanity, since we ourselves are human beings.',

        'If I would be a young man again and had to decide how to make my living, I would not try to become a scientist or teacher. I would rather choose to be a plumber or a peddler in the hope to find that modest degree of independence still available under present circumstances.',

        'Gravitation can not be held responsible for people falling in love',

        'Out of clutter, find Simplicity. From discord, find Harmony. In the middle of difficulty lies Opportunity.',

        'If men as individuals surrender to the call of their elementary instincts, avoiding pain and seeking satisfaction only for their own selves, the result for them all taken together must be a state of insecurity, of fear, and of promiscuous misery.',

        'The most powerful force in the universe is compound interest.',

        "If I can't picture it, I can't understand it.",

        'The more I study physics, the more I am drawn to metaphysics.',

        'Mathematics are well and good but nature keeps dragging us around by the nose.',

        'How I wish that somewhere there existed an island for those who are wise and of goodwill! In such a place even I would be an ardent patriot.',

        'The fairest thing we can experience is the mysterious. It is the fundamental emotion which stands at the cradle of true art and true science. He who know it not and can no longer wonder, no longer feel amazement, is as good as dead, a snuffed-out can.',

        'Try not to become a man of success but rather to become a man of value.',

        'Science is the century-old endeavor to bring together by means of systematic thought the perceptible phenomena of this world into as thorough-going an association as possible.',

        'Formal symbolic representation of qualitative entities is doomed to its rightful place of minor significance in a world where flowers and beautiful women abound.',

        'Reality is merely an illusion, albeit a very persistent one.',

        'The value of a man should be seen in what he gives and not in what he is able to receive.',

        'If most of us are ashamed of shabby clothes and shoddy furniture, let us be more ashamed of shabby ideas and shoddy philosophies... It would be a sad situation if the wrapper were better than the meat wrapped inside it.',

        'Unthinking respect for authority is the greatest enemy of truth.',

        'I am satisfied with the mystery of the eternity of life and with the awareness and a glimpse of the marvelous structure of the existing world, together with the devoted striving to comprehend a portion, be it ever so tiny, of the Reason that manifest',

        'A knowledge of the existence of something we cannot penetrate, of the manifestations of the profoundest reason and the most radiant beauty, which are only accessible to our reason in their most elementary forms ????????????????? it is this knowledge and this feeling',

        'During the last century, and part of the one before, it was widely held that there was an unreconcilable conflict between knowledge and belief.',

        'Not thoughtlessly submit to hereditary prejudices but honestly and courageously uses his intelligence.',

        "All these primary impulses, not easily described in words, are the springs of man's actions.",

        'Generations to come will scarce believe that such a one as this walked the earth in flesh and blood.',

        'Do you believe in immortality? No, and one life is enough for me',

        'I cannot believe that God plays dice with the cosmos',

        'The value of achievement lies in the achieving.',

        'Nothing will benefit human health and increase the chances for survival of life on Earth as much as the evolution to a vegetarian diet.',

        'You see, wire telegraph is a kind of a very, very long cat. You pull his tail in New York and his head is meowing in Los Angeles. Do you understand this? And radio operates exactly the same way: you send signals here, they receive them there.',

        'One should guard against preaching to young people success in the customary form as the main aim in life. The most important motive for work in school and in life is pleasure in work, pleasure in its result and the knowledge of the value of the result to the community.',

        "Since I do not foresee that atomic energy is to be a great boon for a long time, I have to say that for the present it is a menace. Perhaps it is well that it should be. It many intimidate the human race into bringing order into it's international af",
        'Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning.',

        'To put it boldly, it is the attempt at a posterior reconstruction of existence by the process of conceptualization.',

        'Remember your humanity and forget the rest',

        'Feeling and longing are the motive forces behind all human endeavor and human creations.',

        'I cannot imagine a God who rewards and punishes the objects of his creation [and] is but a reflection of human frailty.',

        'In the middle of difficulty lies opportunity.',

        'If A equals success, then the formula is: A = X + Y + Z, X is work. Y is play. Z is keep your mouth shut',
      ],
      Author: 'Albert Einstein',
      Wiki: 'https://en.wikipedia.org/wiki/Albert_Einstein',
    },
    {
      PicName: require('../images/gates.jpg'),
      Quote: [
        "This is a very exciting time in the world of information. It's not just that the personal computer has come along as a great tool. The whole pace of business is moving faster. Globalization is forcing companies to do things in new ways.",

        'Steve will absolutely be the business leader, ... I decided I wanted to spend more time with our product groups and drive the breakthroughs. Think of Steve as the business leader and customer champion.',

        'With Windows, people have a vast choice of tools, applications and devices to start anything they like.',

        "Software will be the single most important force in digital entertainment over the next decade. XNA underscores Microsoft's commitment to the game industry and our desire to work with partners to take the industry to the next level.",

        "It is really gratifying, for example, to visit India now and see that because they've had good educational institutions, and they've had a focus on it, there are more and more people in India participating in the world economy.",

        'The criticism is (that) we do new software too fast with too many new features, and that (that) makes it hard for people to compete against us,',

        'You could say this is a bet-the-company kind of thing,',

        'This is what competition is all about, ... Sure, we want new versions of Windows to be popular.',

        'They will provide us competition in some areas,',

        "Be nice to nerds. Chances are you'll end up working for one.",

        'The vision is really that in the information age the microprocessor-based machine, the PC, along with great software, can become sort of the ultimate tool dealing with not just text, but numbers and pictures, and eventually, even difficult things lik',

        'We are entering a digital decade where smart, connected devices and advanced home-entertainment solutions will enable people to utilize technology in new ways and maximize its full potential.',

        'There are some things that we are always thinking about. For example, when will speech recognition be good enough for everybody to use that? And we have made a lot more progress this year on that. I think we will surprise people a bit on how well we will do on our speech recognition.',

        'The breadth of experience that people have as they browse the Web is going to get larger and larger.',

        'There is no area where privacy is more important than health records.',

        "The vision is really about empowering workers, giving them all the information about what's going on so they can do a lot more than they've done in the past.",

        'The goals and the deal are quite different, so obviously they would have known they are quite different,',

        "I realized about 10 years ago that my wealth has to go back to society. A fortune, the size of which is hard to imagine, is best not passed on to one's children. It's not constructive for them.",

        "We all learn best in our own ways. Some people do better studying one subject at a time, while some do better studying three things at once. Some people do best studying in structured, linear way, while others do best jumping around, ''surrounding'' a subject rather than traversing it. Some people prefer to learn by manipulating models, and others by reading.",

        'I like my job because it involves learning. I like being around smart people who are trying to figure out new things. I like the fact that if people really try they can figure out how to invent things that actually have an impact.',

        'We are pleased that a number of states have joined the Department of Justice in supporting this settlement, ... The fact that so many states have joined the federal government in supporting this agreement is a very significant, positive step toward resolving these issues once and for all.',

        "Having great software that lets your people see digital information, lets them collaborate, lets you build a great Web site, that's going to be very, very important for all companies going forward, ... And Windows 2000 is the key platform where that starts.",

        "The software is where the magic is. If you're going to have all this power be simple enough, appealing enough and cool enough, it's going to be because the software is right.",

        'Citizens are interested in more information if they can easily reach out and get it.',
        'It is a great pleasure for me to announce that Steve Ballmer -- my long-term partner in building Microsoft and a great business leader -- is being named CEO,',

        "There's still a lot of common technology and a common mission that spans all these different groups.",

        'No one should think that shareholder value would be preserved ... Microsoft would be greatly damaged by this kind of split.',

        'My value is still so much higher than I ever expected it to be by a factor of about 50. So the fact that at one point it was say, a factor of 60, well -- that wealth is all going back to society anyway.',

        "If I'd had some set idea of a finish line, don't you think I would have crossed it years ago?",

        "It's fine to celebrate success but it is more important to heed the lessons of failure.",

        'This is a space that we see as critical to our vision,',

        "The live phenomenon is not just about Microsoft. It's partners, it's competitors...the whole space is being transformed.",

        'There is a certain responsibility that accrued to me when I got to this unexpected position.',

        "People always fear change. People feared electricity when it was invented, didn't they? People feared coal, they feared gas-powered engines... There will always be ignorance, and ignorance leads to fear. But with time, people will come to accept their silicon masters.",

        "Information technology and business are becoming inextricably interwoven. I don't think anybody can talk meaningfully about one without the talking about the other.",

        'When the PC was launched, people knew it was important.',

        'When you want to do your homework, fill out your tax return, or see all the choices for a trip you want to take, you need a full-size screen.',

        "Life is not divided into semesters. You don't get summers off and very few employers are interested in helping you find yourself.",

        'Life is not fair; get used to it.',

        "Once they get that opened, they'll essentially be running as close to normal as possible,",

        "We've got to put a lot of money into changing behavior.",

        "I think it's fair to say that personal computers have become the most empowering tool we've ever created. They're tools of communication, they're tools of creativity, and they can be shaped by their user.",

        'That license is concrete proof of government commitment to strengthen the awareness and the activities around intellectual property.',

        "This antitrust thing will blow over, ... We haven't changed our business practices at all.",

        "It's very exciting to renew our commitment to the Macintosh. We're very pleased to be supporting Apple. We think Apple makes a huge contribution to the computer industry.",

        'If we hope to maintain our economic and intellectual leadership in the U.S., we must renew this commitment. Unless there is reform, American competitiveness will suffer as other countries benefit from the international talent that U.S. employers cannot hire or retain.',

        'Building on our strengths as a software company, X-Box will offer game developers a powerful platform and game enthusiasts an incredible experience, ... We want X-Box to be the platform of choice for the best and most creative game developers in the world.',

        "To create a new standard it takes something that's not just a little bit different. It takes something that's really new and really captures people's imagination. And the Macintosh, of all the machines I've ever seen, is the only one that meets that standard.",
      ],
      Author: 'Bill Gates',
      Wiki: 'https://en.wikipedia.org/wiki/Bill_Gates',
    },
    {
      PicName: require('../images/rumi.jpg'),
      Quote: [
        'Fear is the cheapest room in the house.',

        'Look at Love...how it tangleswith the one fallen in love.',

        'Out beyond ideas of wrongdoing and rightdoing, there is a field. I will meet you there.',

        'Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.',

        'Reason is like an officer when the king appears. The officer then loses his power and hides himself. Reason is the shadow cast by God; God is the sun.',

        'This is love: to fly toward a secret sky, to cause a hundred veils to fall each moment. First to let go of life. Finally, to take a step without feet.',

        'The hurt you embrace becomes joy.',

        'Everyone has been made for some particular work, and the desire for that work has been put in every heart.',

        'The way you make love is the wayGod will be with you.',

        'You are quaffing drink from a hundred fountains: whenever any of these hundred yields less, your pleasure is diminished. But when the sublime fountain gushes from within you, no longer need you steal from the other fountains.',

        'In your light I learn how to love.In your beauty, how to make poems.You dance inside my chest,where no one sees you.',

        'Let the beauty of what you love be what you do.',

        'Let the lover be disgraceful, crazy, absent-minded. Someone sober will worry about events going badly. Let the lover be.',

        'Every tree and plant in the meadow seemed to be dancing, those which average eyes would see as fixed and still',

        'Oh soul, you worry too much. You have seen your own strength. You have seen your own beauty. You have seen your golden wings. Of anything less, why do you worry? You are in truth the soul, of the soul, of the soul.',

        'The lion is most handsome when looking for food',

        'Why do you stay in prisonwhen the door is so wide open?Move outside the tangle of fear-thinking.Live in silence.',

        'I died a mineral, and became a plant. I died a plant and rose an animal. I died an animal and I was man. Why should I fear? When was I less by dying?',

        'Sell your cleverness and buy bewilderment.',

        "It may be that the satisfaction I need depends on my going away, so that when I've gone and come back, I'll find it at home.",

        'You were born with wings. Why prefer to crawl through life?',

        'Only from the heart Can you touch the sky.',

        'The Eternal looked upon me for a moment with His eye of power, and annihilated me in His being, and become manifest to me in His essence. I saw I existed through Him.',

        'He is like a man using a candle to look for the sun',

        "Don't grieve. Anything you lose comes round in another form.",

        'To praise the sun is to praise your own eyes.',

        'Oh soul,you worry too much.You have seen your own strength.You have seen your own beauty.You have seen your golden wings.Of anything less,why do you worry?You are in truththe soul, of the soul, of the soul.',
      ],
      Author: 'Jalal Rumi',
      Wiki: 'https://en.wikipedia.org/wiki/Rumi',
    },
    {
      PicName: require('../images/vinci.jpg'),
      Quote: [
        "People react to fear, not love - they don't teach that in Sunday School, but it's true.",

        "A good painter is to paint two main things, men and the working of man's mind.",

        'Intellectual passion drives out sensuality',

        'While I thought that I was learning how to live, I have been learning how to die.',

        "I have offended God and mankind because my work didn't reach the quality it should have.",

        'As every divided kingdom falls, so every mind divided between many studies confounds and saps itself.',

        'Intellectual passion dries out sensuality.',

        'Patience serves as a protection against wrongs as clothes do against cold. For if you put on more clothes as the cold increases, it will have no power to hurt you. So in like manner you must grow in patience when you meet with great wrongs, and they will be powerless to vex your mind.',

        'Nothing can be love or hated unless it is first known.',

        'Wisdom is the daughter of experience.',

        'I roamed the countryside searching for answers to things I did not understand. Why thunder lasts longer than that which causes it, and why immediately on its creation the lightning becomes visible to the eye while thunder requires time to travel. How the various circles of water form around the spot which has been struck by a stone and why a bird sustains itself in the air. These questions and other strange phenomena engaged my thought throughout my life.',

        "It's easier to resist at the beginning than at the end.",

        'Iron rusts from disuse; water loses its purity from stagnation ... even so does inaction sap the vigour of the mind.',

        'I have been impressed with the urgency of doing. Knowing is not enough; we must apply. Being willing is not enough; we must do.',

        'Patience serves as a protection against wrongs as clothes do against cold. For if you put on more clothes as the cold increases, it will have no power to hurt you. So in like manner you must grow in patience when you meet with great wrongs, and they',

        'Where there is shouting, there is no true knowledge.',

        'Learning never exhausts the mind',

        'You do ill to praise, but worse to censure, what you do not understand',

        'Beyond a doubt truth bears the same relation to falsehood as light to darkness.',

        'Just as eating contrary to the inclination is injurious to the health, so study without desire sports the memory, and it retains nothing that it takes in.',

        'Learning acquired in youth arrests the evil of old age; and if you understand that old age has wisdom for its food, you will so conduct yourself in youth that your old age will not lack for nourishment.',

        'He who does not punish evil commands it to be done.',

        'Who sows virtue reaps honor.',

        'Every now and then go away, have a little relaxation, for when you come back to your work your judgment will be surer. Go some distance away because then the work appears smaller and more of it can be taken in at a glance and a lack of harmony and proportion is more readily seen.',

        'Life well spent is long.',

        'Men of lofty genius when they are doing the least work are most active.',

        'Anyone who conducts an argument by appealing to authority is not using his intelligence he is just using his memory',

        'The depth and strength of a human character are defined by its moral reserves. People reveal themselves completely only when they are thrown out of the customary conditions of their life, for only then do they have to fall back on their reserves.',

        'Just as iron rusts from disuse, even so does inaction spoil the intellect.',

        'Obstacles cannot crush me. Every obstacle yields to stern resolve. He who is fixed to a star does not change his mind.',

        'Simplicity is the ultimate sophistication.',

        'The greatest deception men suffer is from their own opinions.',
      ],
      Author: 'Leonardo da Vinci',
      Wiki: 'https://en.wikipedia.org/wiki/Leonardo_da_Vinci',
    },
    {
      PicName: require('../images/gandhi.jpg'),
      Quote: [
        'An eye for eye only ends up making the whole world blind.',

        'A man with a grain of faith in God never loses hope, because he ever believes in the ultimate triumph of Truth',

        'An ounce of practice is worth more than tons of preaching.',

        'Nearly everything you do is of no importance, but it is important that you do it',

        'That action alone is just that does not harm either party to a dispute',

        'If you have no character to lose, people will have no faith in you',

        'Each one has to find his peace from within. And peace to be real must be unaffected by outside circumstances.',

        'Force, violence, pressure, or compulsion with a view to conformity, are both uncivilized and undemocratic',

        'Not to have control over the senses is like sailing in a rudderless ship, bound to break to pieces on coming in contact with the very first rock',

        "A 'NO' uttered from deepest conviction is better and greater than a 'YES' merely uttered to please, or what is worse, to avoid trouble.",

        'Well, India is a country of nonsense',

        'If we wish to create a lasting peace we must begin with the children.',

        'Exercise of faith will be the safest where there is a clear determination summarily to reject all that is contrary to truth and love',

        'In matters of conscience, the law of the majority has no place.',

        'That service is the noblest which is rendered for its own sake.',

        'God comes to the hungry in the form of food.',

        'To believe what has not occurred in history will not occur at all, is to argue disbelief in the dignity of man.',

        'There is more to life than simply increasing its speed.',

        'Justice that love gives is a surrender, justice that law gives is a punishment.',

        'Even if you are a minority of one, the truth is the truth.',

        'Prayer is the key of the morning and the bolt of the evening.',

        'Commonsense is the realised sense of proportion.',

        'Truth stands, even if there be no public support. It is self-sustained.',

        'Patience means self-suffering.',

        'Whether humanity will consciously follow the law of love, I do not know. But that need not disturb me. The law will work just as the law of gravitation works, whether we accept it or not. The person who discovered the law of love was a far greater scientist than any of our modern scientists. Only our explorations have not gone far enough and so it is not possible for everyone to see all its workings.',

        "Men often become what they believe themselves to be. If I believe I cannot do something, it makes me incapable of doing it. But when I believe I can, then I acquire the ability to do it even if I didn't have it in the beginning.",

        'One can measure the greatness and the moral progress of a nation by looking at how it treats its animals',

        'Whatever you do may seem insignificant, but it is most important that you do it',

        'Those with the greatest awareness have the greatest nightmares.',

        'A man who throws himself on God ceases to fear man',

        'All of your scholarship, all your study of Shakespeare and Wordsworth would be vain if at the same time you did not build your character and attain mastery over your thoughts and your actions',

        'We do not need to proselytise either by our speech or by our writing. We can only do so really with our lives. Let our lives be open books for all to study.',

        'The future depends on what we do in the present.',

        "Don't listen to friends when the Friend inside you says 'Do this.'",

        'My life is an indivisible whole, and all my attitudes run into one another; and they all have their rise in my insatiable love for mankind.',

        'In this age of the rule of brute force, it is almost impossible for anyone to believe that any one else could possibly reject the law of the final supremacy of brute force',

        'There is a higher court than courts of justice and that is the court of conscience. It supercedes all other courts.',

        'There is nothing that wastes the body like worry, and one who has any faith in God should be ashamed to worry about anything whatsoever',
      ],
      Author: 'Mahatma Gandhi',
      Wiki: 'https://en.wikipedia.org/wiki/Mahatma_Gandhi',
    },
    {
      PicName: require('../images/ali.jpg'),
      Quote: [
        "To be a great champion you must believe you are the best. If you're not, pretend you are.",

        "Old age is just a record of one's whole life.",

        "If you even dream of beating me you'd better wake up and apologize.",

        'There are no pleasures in a fight but some of my fights have been a pleasure to win.',

        "A rooster crows only when it sees the light. Put him in the dark and he'll never crow. I have seen the light and I'm crowing.",

        'A man who views the world the same at fifty as he did at twenty has wasted thirty years of his life.',

        'He who is not courageous enough to take risks will accomplish nothing in life.',

        'Wars of nations are fought to change maps. But wars of poverty are fought to map change.',

        'Frazier is so ugly that he should donate his face to the US Bureau of Wild Life.',

        'I am the greatest, I said that even before I knew I was.',

        "It isn't the mountains ahead to climb that wear you out; it's the pebble in your shoe.",

        'Only a man who knows what it is like to be defeated can reach down to the bottom of his soul and come up with the extra ounce of power it takes to win when the match is even.',

        'When you can whip any man in the world, you never know peace.',

        'The man who has no imagination has no wings.',

        'My toughest fight was with my first wife.',

        'There are more pleasant things to do than beat up people.',

        "Champions aren't made in the gyms. Champions are made from something they have deep inside them -- a desire, a dream, a vision.",

        "I'm going to, not I'm gonna. Talk intelligent,",

        "No one knows what to say in the loser's locker room.",

        'When you are as great as I am it is hard to be humble.',

        "I am the astronaut of boxing. Joe Louis and Dempsey were just jet pilots. I'm in a world of my own.",

        'I figured that if I said it enough, I would convince the world that I really was the greatest.',

        "I'm not the greatest; I'm the double greatest. Not only do I knock 'em out, I pick the round.",

        "Hating people because of their color is wrong. And it doesn't matter which color does the hating. It's just plain wrong.",

        "My way of joking is to tell the truth. That's the funniest joke in the world.",

        "It's lack of faith that makes people afraid of meeting challenges, and I believed in myself.",

        'Give up what appears to be doubtful for what is certain. Truth brings peace of mind, and deception doubt.',

        "Friendship... is not something you learn in school. But if you haven't learned the meaning of friendship, you really haven't learned anything.",

        'The man who views the world at fifty the same as he did at twenty has wasted thirty years of his life.',

        "Superman don't need no seat belt.",

        'The man who views the world at 50 the same as he did at 20 has wasted 30 years of his life.',

        'I wish people would love everybody else the way they love me. It would be a better world.',

        'Age is whatever you think it is. You are as old as you think you are.',

        "It's hard to be humble, when you're as great as I am.",

        "Friendship is the hardest thing in the world to explain. It's not something you learn in school. But if you haven't learned the meaning of friendship, you really haven't learned anything.",

        'Boxing is a lot of white men watching two black men beat each other up.',

        "At home I am a nice guy: but I don't want the world to know. Humble people, I've found, don't get very far.",

        'If they can make penicillin out of mouldy bread, they can sure make something out of you.',

        "Silence is golden when you can't think of a good answer.",

        "I'll be floating like a butterfly and stinging like a bee.",

        "I'll beat him so bad he'll need a shoehorn to put his hat on.",

        "I figure I'll be champ for about ten years and then I'll let my brother take over - like the Kennedys down in Washington.",

        "I know where I'm going and I know the truth, and I don't have to be what you want me to be. I'm free to be what I want.",

        "It's not bragging if you can back it up.",

        'To be able to give away riches is mandatory if you wish to possess them. This is the only way that you will be truly rich.',

        'I am the greatest. Not only do I knock em out, I pick the round!',

        "It's just a job. Grass grows, birds fly, waves pound the sand. I beat people up.",

        "I never thought of losing, but now that it' s happened, the only thing is to do it right. That's my obligation to all the people who believe in me. We all have to take defeats in life.",

        "I'm so fast that last night I turned off the light switch in my hotel room and was in bed before the room was dark.",

        'We have one life; it soon will be past; what we do for God is all that will last.',

        "I hated every minute of training, but I said, ''Don't quit. Suffer now and live the rest of your life as a champion.''",

        'The fight is won or lost far away from witnesses - behind the lines, in the gym, and out there on the road, long before I dance under those lights.',

        'What keeps me going is goals.',

        "Life is a gamble. You can get hurt, but people die in plane crashes, lose their arms and legs in car accidents; people die every day. Same with fighters: some die, some get hurt, some go on. You just don't let yourself believe it will happen to you.",
      ],
      Author: 'Muhammad Ali',
      Wiki: 'https://en.wikipedia.org/wiki/Muhammad_Ali',
    },
    {
      PicName: require('../images/napoleon.jpg'),
      Quote: [
        'Take time to deliberate, but when the time for action has arrived, stop thinking and go in.',

        'The only victory over love is flight.',

        'Doctors will have more lives to answer for in the next world than even we generals',

        'The only conquests which are permanent and leave no regrets are our conquests over ourselves.',

        'The conscience is the sacred haven of the liberty of man.',

        'When firmness is sufficient, rashness is unnecessary.',

        'Greatness be nothing unless it be lasting.',

        'Among those who dislike oppression are many who like to oppress.',

        'A leader is a dealer in hope.',

        "The great proof of madness is the disproportion of one's designs to one's means.",

        'From the heights of these pyramids, forty centuries look down on us.',

        'The word impossible is not in my dictionary.',

        'Skepticism is a virtue in history as well as in philosophy.',

        'Victory belongs to the most persevering.',

        'It requires more courage to suffer than to die.',

        'A man will fight harder for his interests than for his rights.',

        'Ten people who speak make more noise than ten thousand who are silent.',

        'The infectiousness of crime is like that of the plague.',

        'A man cannot become an atheist merely by wishing it.',

        'Riches do not consist in the possession of treasures, but in the use made of them.',

        'An order that can be misunderstood will be misunderstood.',

        'History is the version of past events that people have decided to agree upon.',

        'Who saves his country violates no law.',

        'There are two levers for moving men -- interest and fear.',

        'Doctors will have more lives to answer for in the next world than even we generals.',

        'The only one who is wiser than anyone is everyone.',

        'He who fears being conquered is sure of defeat.',

        'Never awake me when you have good news to announce, because with good news nothing presses; but when you have bad news, arouse me immediately, for then there is not an instant to be lost.',

        'Never interrupt your enemy when he is making a mistake.',

        'Ability is nothing without opportunity.',

        'One should never forbid what one lacks the power to prevent.',

        'Four hostile newspapers are more to be feared than a thousand bayonets.',

        'With audacity one can undertake anything, but not do everything.',

        'If you want a thing done well, do it yourself.',

        'To do all that one is able to do, is to be a man; to do all that one would like to do, is to be a god.',

        "The best way to keep one's word is not to give it.",

        'A revolution is an idea which has found its bayonets.',

        'There are only two forces in the world, the sword and the spirit. In the long run the sword will always be conquered by the spirit.',

        'Fashion condemns us to many follies; the greatest is to make ourselves its slave',

        'I must see her and press her to my heart. I love her to the point of madness, and I cannot continue to be separated from her. If she no longer loved me, I would have nothing left to do on earth.',
      ],
      Author: 'Napoleon Bonaparte',
      Wiki: 'https://en.wikipedia.org/wiki/Napoleon',
    },

    {
      PicName: require('../images/mandela.jpg'),
      Quote: [
        '[That was the speech -- delivered under a banner reading] Mission Accomplished ... Major combat operations in Iraq have ended.',

        'I am for the people of the whole nation doing just as they please in all matter which concern the whole nation; for those of each part doing just as they choose in all matters which concern no other part; and for each individual doing just as he chooses in all matters which concern nobody else.',

        'If I were to try to read, much less answer, all the attacks made on me, this shop might as well be closed for any other business. I do the very best I know how -- the very best I can. And I mean to keep on doing it to the end. If the end brings me out all right, what is said against me will not amount to anything. If the end brings me out all wrong, ten angels swearing I was right would make no difference.',

        "A lawyer's time and advice are his stock in trade",

        'If I care to listen to every criticism, let alone act on them, then this shop may as well be closed for all other businesses. I have learned to do my best, and if the end result is good then I do not care for any criticism, but if the end result is not good, then even the praise of ten angels would not make the difference.',

        'Every person is responsible for his own looks after 40.',

        'Determine that the thing can and shall be done, and then we shall find the way.',

        'If you do not like him, let him alone. If God gave him little, that little let him enjoy.',

        'There are few things wholly evil or wholly good. Almost everything, especially of government policy, is an inseparable compound of the two, so that our best judgment of the preponderance between them is continually demanded.',

        "It's a party of hope for America. Lincoln gave Americans hope through equal opportunities for all.",

        'The fiery trials through which we pass will light us down in honor or dishonor to the latest generation.',

        'Seriously, I do not think I fit for the presidency.',

        "No man is good enough to govern another man without that other's consent.",

        'In law it is good policy never to plead what you need not, lest you oblige yourself to prove what you cannot',

        'Do not worry; eat three square meals a day; say your prayers; be courteous to your creditors; keep your digestion good; exercise; go slow and easy. Maybe there are other things your special case requires to make you happy, but my friend, these I reckon will give you a good lift.-',

        'No matter how much cats fight, there always seem to be plenty of kittens.',

        'Among free men there can be no successful appeal from the ballot to the bullet.',

        'I could as easily bail out the Potomac River with a teaspoon as attend to all the details of the army',

        'Character is like a tree and reputation like a shadow. The shadow is what we think of it; the tree is the real thing.',

        'Am I not destroying my enemies when I make friends of them?',

        'Where poverty exists, there is not true , ... The world is hungry for action, not words. I am proud to wear the symbol of this global cause to action.',

        'You know you are really famous when becoming a comic character.',

        'Truly non-racist and non-sexist democracy.',

        'I have walked that long road to . I have tried not to falter; I have made missteps along the way. But I have discovered the secret that after climbing a great hill, one only finds that there are many more hills to climb. I have taken a moment.',

        'The time comes in the life of any nation when there remains only two choices - submit or fight. That time has now come to South Africa. We shall not submit and we have no choice but to hit back by all means in our power in defense of our people...',

        'Is eager for peace. He is a passionate fighter for peace.',

        'reaching the end of a long and heroic struggle.',
      ],
      Author: 'Nelson Mandela',
      Wiki: 'https://en.wikipedia.org/wiki/Nelson_Mandela',
    },
    {
      PicName: require('../images/omar.jpg'),
      Quote: [
        'When I want to understand what is happening today or try to decide what will happen tomorrow, I look back.',

        "Living Life Tomorrow's fate, though thou be wise, Thou canst not tell nor yet surmise; Pass, therefore, not today in vain, For it will never come again.",

        'A loaf of bread, a jug of wine, and thou.',

        'The moving finger writes; and having writ, moves on: nor all thy piety nor wit shall lure it back to cancel half a line nor all thy tears wash out a word of it.',

        'You know, my friends, with what a brave carouse I made a Second Marriage in my house; favored old barren reason from my bed, and took the daughter of the vine to spouse.',

        'Be happy for this moment. This moment is your life.',

        'Myself when young did eagerly frequent doctor and saint, and heard great argument about it and about: but evermore came out by the same door as in I went.',

        'There was a door to which I found no key: There was the veil through which I might not see.',

        'I sent my soul through the invisible,',

        'The thoughtful soul to solitude retires.',

        'A hair divides what is false and true.',

        'Drink! for you know not whence you came nor why: drink! for you know not why you go, nor where.',

        'The moving finger writes, and having written moves on. Nor all thy piety nor all thy wit, can cancel half a line of it.',
      ],
      Author: 'Omar Khayyam',
      Wiki: 'https://en.wikipedia.org/wiki/Omar_Khayyam',
    },
    {
      PicName: require('../images/oscar.jpg'),
      Quote: [
        'There is luxury in self reproach. When we blame ourselves, we feel no one else has a right to blame us.',

        'Hatred is blind, as well as love.',

        'To believe is very dull. To doubt is intensely engrossing.',

        'People fashion their God after their own understanding. They make their God first and worship him afterwards.',

        'I can believe anything as long as it is incredible',

        'Formerly we used to canonize our heroes. The modern method is to vulgarize them. Cheap editions of great books may be delightful, but cheap editions of great men are absolutely detestable.',

        'His style is chaos illumined by flashes of lightning. As a writer he has mastered everything except language.',

        'Unless one is wealthy there is no use in being a charming fellow. Romance is the privilege of the rich, not the profession of the unemployed. The poor should be practical and prosaic. It is better to have a permanent income than to be fascinating.',

        'I was disappointed in Niagara - most people must be disappointed in Niagara. Every American bride is taken there, and the sight of the stupendous waterfall must be one of the earliest, if not the keenest, disappointments in American married life.',

        'Absolute catholicity of taste is not without its dangers. It is only an auctioneer who should admire all schools of art.',

        'There is only one class in the community that thinks more about money than the rich, and that is the poor. The poor can think of nothing else.',

        'In the wild struggle for existance, we want to have something that endures, and so we fill our minds with rubbish and facts, in the silly hope of keeping our place.',

        'Conversation should touch everything, but should concentrate itself on nothing.',

        'It is always a silly thing to give advice, but to give good advice is absolutely fatal',

        'The public have an insatiable curiosity to know everything, except what is worth knowing',

        'Keep love in your heart. A life without it is like a sunless garden when the flowers are dead.',

        'A thing is not necessarily true because a man dies for it.',

        'Education is an admirable thing, but it is well to remember from time to time that nothing that is worth knowing can be taught.',

        'There is much to be said in favour of modern journalism. By giving us the opinions of the uneducated, it keeps us in touch with the ignorance of the community.',

        "I don't like compliments, and I don't see why a man should think he is pleasing a woman enormously when he says to her a whole heap of things that he doesn't mean",

        "I don't at all like knowing what people say of me behind my back. It makes me far too conceited.",
        'The old believe everything; the middle aged suspect everything: the young know everything.',
        "One should never trust a woman who tells her real age. If she tells that, she'll tell anything.",

        "Never speak disrespectfully of Society. Only people who can't get into it do that.",

        'The public is wonderfully tolerant. It forgives everything except genius.',

        'It is only the modern that ever becomes old fashioned.',

        'Fashion, by which what is really fantastic becomes for a moment the universal.',

        "Woman's first duty in life is to her dressmaker. What the second duty is no one has yet discovered.",

        'In going to America one learns that poverty is not a necessary accompaniment to civilization.',

        'Yet each man kills the thing he loves, By each let this be heard, Some do it with a bitter look, Some with a flattering word, The coward does it with a kiss, The brave man with a sword!',

        'There is no country in the world where machinery is so lovely as in America.',

        'In America, the young are always ready to give to those older than themselves the full benefit of their inexperience',

        'Art is the most intense mode of individualism that the world has known.',

        'The world is a stage, but the play is badly cast.',

        'Scandal is gossip made tedious by morality',

        'I love talking about nothing. It is the only thing I know anything about.',

        'Of course I have played outdoor games. I once played dominoes in an open air cafe in Paris.',

        'What people call insincerity is simply a method by which we can multiply our personalities.',

        'Ridicule is the tribute paid to the genius by the mediocrities.',

        'I see when men love women. They give them but a little of their lives. But women when they love give everything.',

        'An acquaintance that begins with a compliment is sure to develop into a real friendship.',

        'As one knows the poet by his fine music, so one can recognize the liar by his rich rhythmic utterance, and in neither case will the casual inspiration of the moment suffice. Here, as elsewhere, practice must precede perfection.',

        'The difference between literature and journalism is that journalism is unreadable, and literature is not read',

        'Children begin by loving their parents; after a time they judge them; rarely, if ever, do they forgive them.',

        'When a man has once loved a woman he will do anything for her except continue to love her.',

        'Fashion is a form of ugliness so intolerable that we have to alter it every six months.',

        "I am so clever that sometimes I don't understand a single word of what I am saying.",

        'The true mystery of the world is the visible, not the invisible.',

        'Man is least himself when he talks in his own person. Give him a mask, and he will tell you the truth.',

        'The critic has to educate the public; the artist has to educate the critic.',

        'The only way to get rid of temptation is to yield to it... I can resist everything but temptation.',

        'To love oneself is the beginning of a lifelong romance.',

        'To lose one parent may be regarded as a misfortune; to lose both looks like carelessness.',

        'No man is rich enough to buy back his past.',

        'The man who can dominate a London dinner-table can dominate the world.',

        "One's real life is so often the life that one does not lead.",

        'It is through Art, and through Art only, that we can realise our perfection.',

        'Women are never disarmed by compliments. Men always are. That is the difference between the two sexes.',

        "A man can't be too careful in the choice of his enemies.",

        'Man can believe the impossible, but man can never believe the improbable.',
      ],
      Author: 'Oscar Wilde',
      Wiki: 'https://en.wikipedia.org/wiki/Oscar_Wilde',
    },
    {
      PicName: require('../images/mann.jpg'),
      Quote: [
        'Her foreign policy influence in 2005 was very impressive and constructive, in contrast to her time as National Security Council adviser [her role in the first term of the Bush administration]. She has charisma - that rock star appearance at the football game in Alabama was really something. Whether that makes her a viable candidate for the presidency is another matter entirely.',

        'The meeting in the open of two dogs, strangers to each other, is one of the most painful, thrilling, and pregnant of all conceivable encounters; it is surrounded by an atmosphere of the last canniness, presided over by a constraint for which I have no precise name; they simply cannot pass each other, their mutual embarrassment is frightful to behold.',

        'For to be poised against fatality, to meet adverse conditions gracefully, is more than simple endurance; it is an act of aggression, a positive triumph.',

        'Bush inherited a bitterly partisanship atmosphere in Washington but governed and campaigned in a fashion that greatly exacerbated it. He is now partly responsible for that tone, and nothing in his State of the Union speech leads me to believe it will change in the months before the November elections.',

        "There's no way to turn this into something that works to his advantage.",

        "It's not a pretty sight up on Capitol Hill these days. It's unusual to get so many major events packed in a single week. Of course, that wasn't the plan.",

        'Space, like time, engenders forgetfulness; but it does so by setting us bodily free from our surroundings and giving us back our primitive, unattached state',

        'Opinions cannot survive if one has no chance to fight for them',

        "I have always been an admirer. I regard the gift of admiration as indispensable if one is to amount to something; I don't know where I would be without it.",

        'There is something suspicious about music, gentlemen. I insist that she is, by her nature, equivocal. I shall not be going too far in saying at once that she is politically suspect.',

        'A great truth is a truth whose opposite is also a truth.',

        'What we call mourning for our dead is perhaps not so much grief at not being able to call them back; as it is grief at not being able to want to do so',

        'Literature. . . is the union of suffering with the instinct for form.',

        'Speech is civilization itself. The word... preserves contact -- it is silence which isolates.',

        "I shall need to sleep three weeks on end to get rested from the rest I've had",

        'He has been reluctant to share information with anyone, particularly the Congress and considers himself basically not bound by what others would see as normal requirements of transparency.',

        'One must die to life in order to be utterly a creator',

        'Extraordinary creature! So close a friend, and yet so remote.',

        'Human reason needs only to will more strongly than fate, and she is fate',

        'A harmful truth is better than a useful lie',

        'Solitude gives birth to the original in us, to beauty unfamiliar and perilous- to poetry. But also, it gives birth to the opposite: to the perverse, the illicit, the absurd.',

        "People's behavior makes sense if you think about it in terms of their goals, needs, and motives",

        'Middle and working-class families continue to struggle with stagnant wages, high gas, health care and college expenses and bleaker prospects for good jobs.',

        'Every reasonable human being should be a moderate Socialist.',
      ],
      Author: 'Thomas Mann',
      Wiki: 'https://en.wikipedia.org/wiki/Thomas_Mann',
    },
    {
      PicName: require('../images/disney.jpg'),
      Quote: [
        'There is great comfort and inspiration in the feeling of close human relationships and its bearing on our mutual fortunes - a powerful force, to overcome the tough breaks which are certain to come to most of us from time to time',

        "We keep moving forward, opening new doors, and doing new things, because we're curious and curiosity keeps leading us down new paths.",

        "I only hope that we don't lose sight of one thing - that it was all started by a mouse.",

        "You reach a point where you don't work for money.",

        "I never called my work an 'art' It's part of show business, the business of building entertainment.",

        "It's no secret that we were sticking just about every nickel we had on the chance that people would really be interested in something totally new and unique in the field of entertainment.",

        'I have no use for people who throw their weight around as celebrities, or for those who fawn over you just because you are famous.',

        "You're dead if you aim only for kids. Adults are only kids grown up, anyway.",

        "You can't just let nature run wild.",

        'There is more treasure in books than in all the pirates loot on Treasure Island and best of all, you can enjoy these riches every day of your life.',

        "Somehow I can't believe that there are any heights that can't be scaled by a man who knows the secrets of making dreams come true. This special secret, it seems to me, can be summarized in four C s. They are curiosity, confidence, courage, and consta",

        'Animation can explain whatever the mind of man can conceive. This facility makes it the most versatile and explicit means of communication yet devised for quick mass appreciation.',

        'You can design and create, and build the most wonderful place in the world. But it takes people to make the dream a reality.',

        'All our dreams can come true, if we have the courage to pursue them.',

        "I'd say it's been my biggest problem all my life... it's money. It takes a lot of money to make these dreams come true.",

        'Crowded classrooms and half-day sessions are a tragic waste of our greatest national resource - the minds of our children.',

        "When you're curious, you find lots of interesting things to do.",

        'Disneyland will never be completed. It will continue to grow as long as there is imagination left in the world.',

        'You can dream, create, design and build the most wonderful place in the world, but it requires people to make the dream a reality.',

        'We have created characters and animated them in the dimension of depth, revealing through them to our perturbed world that the things we have in common far outnumber and outweigh those that divide us.',

        'Disneyland is a show.',

        'The way to get started is to quit talking and begin doing.',

        'I always like to look on the optimistic side of life, but I am realistic enough to know that life is a complex matter.',

        'The more you like yourself, the less you are like anyone else, which makes you unique.',

        "Somehow I can't believe that there are any heights that can't be scaled by a man who knows the secrets of making dreams come true. This special secret, it seems to me, can be summarized in four C s. They are curiosity, confidence, courage, and constancy, and the greatest of all is confidence. When you believe in a thing, believe in it all the way, implicitly and unquestionable.",

        'We did it [Disneyland], in the knowledge that most of the people I talked to thought it would be a financial disaster - closed and forgotten within the first year.',

        'A man should never neglect his family for business.',

        "I don't like formal gardens. I like wild nature. It's just the wilderness instinct in me, I guess.",

        'We believed in our idea - a family park where parents and children could have fun- together.',

        'We allow no geniuses around our Studio.',

        "I have been up against tough competition all my life. I wouldn't know how to get along without it.",

        'Or heritage and ideals, our code and standards - the things we live by and teach our children - are preserved or diminished by how freely we exchange ideas and feelings.',

        'People still think of me as a cartoonist, but the only thing I lift a pen or pencil for these days is to sign a contract, a check, or an autograph.',

        'All cartoon characters and fables must be exaggeration, caricatures. It is the very nature of fantasy and fable.',

        "We are not trying to entertain the critics. I'll take my chances with the public.",

        'Mickey Mouse is, to me, a symbol of independence. He was a means to an end.',

        'Movies can and do have tremendous influence in shaping young lives in the realm of entertainment towards the ideals and objectives of normal adulthood.',

        "Laughter is America's most important export.",

        'You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you.',

        "Disneyland is a work of love. We didn't go into Disneyland just with the idea of making money.",

        'All our dreams can come true...if we have the courage to pursue them.',

        "All the adversity I've had in my life, all my troubles and obstacles, have strengthened me... You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you.",

        "[McDonald's says that its DreamWorks partnership will create ads and promotions that appeal to all age groups, not just to children.] The appeal of McDonald's and the appeal of DreamWorks is very broad, ... It's families and it's adults.",

        'If you can dream it, you can do it. Always remember this whole thing was started by a mouse.',

        "When people laugh at Mickey Mouse, it's because he's so human; and that is the secret of his popularity.",

        'All your dreams can come true if you have the courage to pursue them.',

        'I am not influenced by the techniques or fashions of any other motion picture company.',

        'I believe in being an innovator.',

        'We did it Disneyland, in the knowledge that most of the people I talked to thought it would be a financial disaster - closed and forgotten within the first year.',

        'If you can dream it, you can do it. Always remember that this whole thing was started with a dream and a mouse.',

        'Disneyland is the star, everything else is in the supporting role.',

        'Animation offers a medium of story telling and visual entertainment which can bring pleasure and information to people of all ages everywhere in the world.',

        'When you believe in a thing, believe in it all the way, implicitly and unquestionable.',

        "There is more treasure in books than in all the pirate's loot on Treasure Island.",

        'Disney will promote IE (and no other browser) as the client browser software of choice for users of Disney Content.',

        'I would rather entertain and hope that people learned something than educate people and hope they were entertained.',

        'I love Mickey Mouse more than any woman I have ever known.',

        "Girls bored me, they still do. I love Mickey Mouse more than any woman I've ever known.",
      ],
      Author: 'Walt Disney',
      Wiki: 'https://en.wikipedia.org/wiki/Walt_Disney',
    },
    {
      PicName: require('../images/william.jpg'),
      Quote: [
        'Stiffen the sinews, summon up the blood.',

        'It is the mind that makes the body rich; and as the sun breaks through the darkest clouds, so honor peereth in the meanest habit.',

        "God be prais'd, that to believing souls, Gives light in darkness, comfort in despair",

        'Pleasure and action make the hours seem short.',

        'Stay we no longer, dreaming of renown, But sound the trumpets, and about our task',

        'I would there were no age between ten and three-and-twenty, or that youth would sleep out the rest; for there is nothing in the between but getting wenches with child, wronging the ancientry, stealing, fighting',

        'My age is as a lusty winter, frosty but kindly.',

        'Love is too young to know what conscience is.',

        'Now join your hands, and with your hands your hearts.',

        "When you do dance, I wish you a wave o' the sea, that you might ever do nothing but that",

        'He that dies pays all his debts.',

        'So may the outward shows be least themselves: The world is still deceived with ornament.',

        'When you fear a foe, fear crushes your strength; and this weakness gives strength to your opponents.',

        'A wretched soul bruised with adversity, We bid be quiet when we hear it cry; But were we burdened with like weight of pain, As much, or more, we should ourselves complain.',

        "Adversity's sweet milk, philosophy",

        'Is it not strange that desire should so many years outlive performance?',

        'Now I perceive the devil understands Welsh.',

        "Youth is full of sport, age's breath is short; youth is nimble, age is lame; Youth is hot and bold, age is weak and cold; Youth is wild, and age is tame.",

        'All is not well; I doubt some foul play.',

        'Crabbed age and youth cannot live together; Youth is full of pleasance, age full of care; Youth like the summer morn, age like winter weather; Youth like summer brave, age like winter bare',

        "But now I am cabin'd, cribb'd, confined, bound in To saucy doubts and fears.",

        "Time's thievish progress to eternity.",

        'He is evil by his very nature.',

        'Vini, Vici, Vidi (I came, I saw, I conquered). - Julius Caesar',

        '. . . I am bound upon a wheel of fire, that mine own tears do scald like molten lead.',

        "But thought's the slave of life, and life time's fool;And time, that takes survey of all the world,Must have a stop.",

        'Wisely, and slow. They stumble that run fast.',

        'It is neither good nor bad, but thinking makes it so.',

        'Parting is such sweet sorrow.',

        'There is a tide in the affairs of men, which taken at the flood, leads on to fortune; Omitted, all the voyage of their life is bound by shallows and in misery. [Julius Caesar]',

        'Now is the winter of our discontent.',

        'False face must hide what the false heart doth know.',

        'O! for a muse of fire, that would ascend the brightest heaven of invention.',

        'Give every man thy ear, but few thy voice.',

        'If we are marked to die, we are enough to do our country loss; and if to live, the fewer men, the greater share of honor.',

        'What is past is prologue.',

        'By that sin fell the angels.',

        'Let every eye negotiate for itself and trust no agent.',

        'O, had I but followed the arts!',

        'Now, God be praised, that to believing souls gives light in darkness, comfort in despair.',
      ],
      Author: 'William Shakespeare',
      Wiki: 'https://en.wikipedia.org/wiki/William_Shakespeare',
    },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleOnSelectItem = (item) => {
    setSelectedItem(item);
    setModalVisible(!modalVisible);
    if(loaded==true)
    {
      interstitial.show();

    }
  };

  const renderquote = ({item, index}) => {
    //{setimageName(item.PicName)}
    return (
      <View>
        {/* {setAuthorName(item.Author)}
              {setAuthorPic(item.PicName)}
              {setAuthorQuote(item.Quote)}
              {setWiki(item.wiki)} */}

        <View style={styles.modaltextContainer}>
          <Text style={styles.modalauthorName}>{item}</Text>
        </View>
      </View>
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
              <Text style={styles.authorName}>{item.Author}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
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
         >
           
          <View style={styles.profileImgContainer}>
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
              <Text style={styles.authorName}>{item.Author}</Text>
            </View>


          </View>
        </TouchableOpacity>
      
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
    try {
      const result = await Share.share({
        message: item,
      });
      if(loaded==true)
      {
        interstitial.show();
      }

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
   
    }}
    
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

       
       onPress={() =>setExpanded(!expanded)} >
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




   {showGrid==false ?  <FlatList
        onScroll={handleScroll}
        ref={flatListRef}
        contentContainerStyle={{paddingTop: 10}}
        data={data}
        renderItem={renderlist}
        keyExtractor={(item, index) => index.toString()}
      />  :
      <FlatList
        onScroll={handleScroll}
        ref={flatListRef}
        contentContainerStyle={{paddingTop: 10}}
        data={data}
        key={1}
        horizontal={false}
        numColumns={2}
        columnWrapperStyle={{ marginTop: 10 }}
        renderItem={renderColumnList}
        keyExtractor={(item, index) => index.toString()}
      />}

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
              <View style={styles.imgContainer}>
                {console.log(selectedItem.PicName)}
                <Image source={selectedItem.PicName} style={styles.modalprofileImg} />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.modalauthorName}>
                  {selectedItem.Author}
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
                contentContainerStyle={{paddingBottom: 50}}
                //keyExtractor={item => item.id.toString()}
                renderItem={renderquote}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <View
            style={[{height:50}]}>

            </View>
          </ScrollView>
        </Modal>
      ) : null}
      {/* <Swipeable renderRightActions={rightAction}
>
<TouchableHighlight
          style={styles.profileImgContainer}
        >
        <View style={styles.imgContainer}>
             <Image source={authorPic} style={styles.profileImg} />
             <View style={styles.textContainer}>
    <Text style={styles.authorName}>Author Name Vladmir</Text>
    <Text style={styles.authorBook}>Author Name Vladmir</Text>
            </View>
        </View>
   
</TouchableHighlight>
</Swipeable> */}

      {count === true ? (
        <TouchableOpacity onPress={() => toTop()} style={styles.fb}>
          <Icon style={styles.fabIcon} name="arrow-up-circle" />
        </TouchableOpacity>
      ) : null}
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
  profileImgContainer: {
    flexDirection:"column",
    alignItems:"center",
    paddingLeft: 20,
    marginBottom: 10,
  },
  profileImgColumn: {
    overflow: 'hidden',
    height: 150,
    alignSelf: 'center',
    width: 150,
    borderRadius: 75,
  },
  imgContainer: {
    flexDirection: 'row',
    paddingLeft: 20,
    marginBottom: 10,
  },
  profileImg: {
    overflow: 'hidden',
    height: 90,
    alignSelf: 'center',
    width: 90,
    borderRadius: 40,
  },
  modalprofileImg: {
    overflow: 'hidden',
    height: 120,
    width: 120,
    borderRadius: 60,
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
    flexDirection: 'column',
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
  iconDots: {
    fontSize: 30,
    color: 'white',
  },
  btnIcon: {
    fontSize: 30,
    color: 'grey',
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
});
export default Body;