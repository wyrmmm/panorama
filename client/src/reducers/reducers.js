import { combineReducers } from "redux";
import {
  SET_LOCATION,
  FETCH_TWITTER_COUNTRIES_PENDING,
  FETCH_TWITTER_COUNTRIES_SUCCESS,
  FETCH_TWITTER_COUNTRIES_ERROR
} from "actions/actions";

const twitterCountries = [
  { name: "Worldwide", id: 1 },
  { name: "Algeria", id: 1253079 },
  { name: "Argentina", id: 332471 },
  { name: "Australia", id: 1098081 },
  { name: "Austria", id: 551801 },
  { name: "Bahrain", id: 23424753 },
  { name: "Belarus", id: 824382 },
  { name: "Belgium", id: 23424757 },
  { name: "Brazil", id: 455819 },
  { name: "Canada", id: 2972 },
  { name: "Chile", id: 349859 },
  { name: "Colombia", id: 368148 },
  { name: "Denmark", id: 23424796 },
  { name: "Dominican Republic", id: 76456 },
  { name: "Ecuador", id: 375732 },
  { name: "Egypt", id: 1521643 },
  { name: "France", id: 580778 },
  { name: "Germany", id: 638242 },
  { name: "Ghana", id: 1326075 },
  { name: "Greece", id: 946738 },
  { name: "Guatemala", id: 83123 },
  { name: "India", id: 2282863 },
  { name: "Indonesia", id: 1030077 },
  { name: "Ireland", id: 560472 },
  { name: "Israel", id: 1967449 },
  { name: "Italy", id: 711080 },
  { name: "Japan", id: 1110809 },
  { name: "Jordan", id: 1968902 },
  { name: "Kenya", id: 1528335 },
  { name: "Korea", id: 1130853 },
  { name: "Kuwait", id: 23424870 },
  { name: "Latvia", id: 854823 },
  { name: "Lebanon", id: 23424873 },
  { name: "Malaysia", id: 1141268 },
  { name: "Mexico", id: 110978 },
  { name: "Netherlands", id: 726874 },
  { name: "New Zealand", id: 2348079 },
  { name: "Nigeria", id: 1387660 },
  { name: "Norway", id: 857105 },
  { name: "Oman", id: 2268284 },
  { name: "Pakistan", id: 2211096 },
  { name: "Panama", id: 23424924 },
  { name: "Peru", id: 418440 },
  { name: "Philippines", id: 1167715 },
  { name: "Poland", id: 493417 },
  { name: "Portugal", id: 23424925 },
  { name: "Puerto Rico", id: 23424935 },
  { name: "Qatar", id: 23424930 },
  { name: "Russia", id: 1997422 },
  { name: "Saudi Arabia", id: 1937801 },
  { name: "Singapore", id: 1062617 },
  { name: "South Africa", id: 1580913 },
  { name: "Spain", id: 753692 },
  { name: "Sweden", id: 890869 },
  { name: "Switzerland", id: 782538 },
  { name: "Thailand", id: 1225448 },
  { name: "Turkey", id: 2323778 },
  { name: "Ukraine", id: 918981 },
  { name: "United Arab Emirates", id: 1940119 },
  { name: "United Kingdom", id: 12723 },
  { name: "United States", id: 2352824 },
  { name: "Venezuela", id: 395269 },
  { name: "Vietnam", id: 1236594 }
];

const locationInitialState = {
  current: twitterCountries[0],
  available: twitterCountries
};

const countries = (state = locationInitialState, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return Object.assign({}, state, { current: action.payload });
    default:
      return state;
  }
};

const tweetsInitialState = {
  pending: false,
  data: [],
  error: null
};

const tweets = (state = tweetsInitialState, action) => {
  switch (action.type) {
    case FETCH_TWITTER_COUNTRIES_PENDING:
      return { ...state, pending: true };
    case FETCH_TWITTER_COUNTRIES_SUCCESS:
      return { ...state, pending: false, data: action.payload, receivedAt: action.receivedAt };
    case FETCH_TWITTER_COUNTRIES_ERROR:
      return { ...state, pending: false, error: action.error };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  countries,
  tweets
});

export default rootReducer;
