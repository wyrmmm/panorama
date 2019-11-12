import { combineReducers } from "redux";
import {
  SET_LOCATION,
  FETCH_TRENDING_TWEETS_PENDING,
  FETCH_TRENDING_TWEETS_SUCCESS,
  FETCH_TRENDING_TWEETS_ERROR
} from "actions/actions";

const twitterCountries = {
  Worldwide: 1,
  Algeria: 1253079,
  Argentina: 332471,
  Australia: 1098081,
  Austria: 551801,
  Bahrain: 23424753,
  Belarus: 824382,
  Belgium: 23424757,
  Brazil: 455819,
  Canada: 2972,
  Chile: 349859,
  Colombia: 368148,
  Denmark: 23424796,
  "Dominican Republic": 76456,
  Ecuador: 375732,
  Egypt: 1521643,
  France: 580778,
  Germany: 638242,
  Ghana: 1326075,
  Greece: 946738,
  Guatemala: 83123,
  India: 2282863,
  Indonesia: 1030077,
  Ireland: 560472,
  Israel: 1967449,
  Italy: 711080,
  Japan: 1110809,
  Jordan: 1968902,
  Kenya: 1528335,
  Korea: 1130853,
  Kuwait: 23424870,
  Latvia: 854823,
  Lebanon: 23424873,
  Malaysia: 1141268,
  Mexico: 110978,
  Netherlands: 726874,
  "New Zealand": 2348079,
  Nigeria: 1387660,
  Norway: 857105,
  Oman: 2268284,
  Pakistan: 2211096,
  Panama: 23424924,
  Peru: 418440,
  Philippines: 1167715,
  Poland: 493417,
  Portugal: 23424925,
  "Puerto Rico": 23424935,
  Qatar: 23424930,
  Russia: 1997422,
  "Saudi Arabia": 1937801,
  Singapore: 1062617,
  "South Africa": 1580913,
  Spain: 753692,
  Sweden: 890869,
  Switzerland: 782538,
  Thailand: 1225448,
  Turkey: 2323778,
  Ukraine: 918981,
  "United Arab Emirates": 1940119,
  "United Kingdom": 12723,
  "United States": 2352824,
  Venezuela: 395269,
  Vietnam: 1236594
};

const countriesInitialState = {
  current: "Worldwide",
  available: twitterCountries
};

const countries = (state = countriesInitialState, action) => {
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
    case FETCH_TRENDING_TWEETS_PENDING:
      return { ...state, pending: true };
    case FETCH_TRENDING_TWEETS_SUCCESS:
      return { ...state, pending: false, data: action.payload, receivedAt: action.receivedAt };
    case FETCH_TRENDING_TWEETS_ERROR:
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
