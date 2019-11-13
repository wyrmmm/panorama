import { combineReducers } from "redux";
import {
  SET_LOCATION,
  FETCH_TRENDING_TWEETS_PENDING,
  FETCH_TRENDING_TWEETS_SUCCESS,
  FETCH_TRENDING_TWEETS_ERROR,
  FETCH_NEWS_PENDING,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_ERROR,
  FETCH_GOOGLE_TRENDS_PENDING,
  FETCH_GOOGLE_TRENDS_SUCCESS,
  FETCH_GOOGLE_TRENDS_ERROR
} from "actions/actions";

const lookupCountries = {
  Algeria: { id: 1253079, "ISO-3166": "dz", lat: 28, lng: 3 },
  Argentina: { id: 332471, "ISO-3166": "ar", lat: -34, lng: -64 },
  Australia: { id: 1098081, "ISO-3166": "au", lat: -27, lng: 133 },
  Austria: { id: 551801, "ISO-3166": "at", lat: 47.33333333, lng: 13.33333333 },
  Bahrain: { id: 23424753, "ISO-3166": "bh", lat: 26, lng: 50.55 },
  Belarus: { id: 824382, "ISO-3166": "by", lat: 53, lng: 28 },
  Belgium: { id: 23424757, "ISO-3166": "be", lat: 50.83333333, lng: 4 },
  Brazil: { id: 455819, "ISO-3166": "br", lat: -10, lng: -55 },
  Canada: { id: 2972, "ISO-3166": "ca", lat: 60, lng: -95 },
  Chile: { id: 349859, "ISO-3166": "cl", lat: -30, lng: -71 },
  Colombia: { id: 368148, "ISO-3166": "co", lat: 4, lng: -72 },
  Denmark: { id: 23424796, "ISO-3166": "dk", lat: 56, lng: 10 },
  "Dominican Republic": { id: 76456, "ISO-3166": "do", lat: 19, lng: -70.66666666 },
  Ecuador: { id: 375732, "ISO-3166": "ec", lat: -2, lng: -77.5 },
  Egypt: { id: 1521643, "ISO-3166": "eg", lat: 27, lng: 30 },
  France: { id: 580778, "ISO-3166": "fr", lat: 46, lng: 2 },
  Germany: { id: 638242, "ISO-3166": "de", lat: 51, lng: 9 },
  Ghana: { id: 1326075, "ISO-3166": "gh", lat: 8, lng: -2 },
  Greece: { id: 946738, "ISO-3166": "gr", lat: 39, lng: 22 },
  Guatemala: { id: 83123, "ISO-3166": "gt", lat: 15.5, lng: -90.25 },
  India: { id: 2282863, "ISO-3166": "in", lat: 20, lng: 77 },
  Indonesia: { id: 1030077, "ISO-3166": "id", lat: -5, lng: 120 },
  Ireland: { id: 560472, "ISO-3166": "ie", lat: 53, lng: -8 },
  Israel: { id: 1967449, "ISO-3166": "il", lat: 31.5, lng: 34.75 },
  Italy: { id: 711080, "ISO-3166": "it", lat: 42.83333333, lng: 12.83333333 },
  Japan: { id: 1110809, "ISO-3166": "jp", lat: 36, lng: 138 },
  Jordan: { id: 1968902, "ISO-3166": "jo", lat: 31, lng: 36 },
  Kenya: { id: 1528335, "ISO-3166": "ke", lat: 1, lng: 38 },
  Kuwait: { id: 23424870, "ISO-3166": "kw", lat: 29.5, lng: 45.75 },
  Latvia: { id: 854823, "ISO-3166": "lv", lat: 57, lng: 25 },
  Lebanon: { id: 23424873, "ISO-3166": "lb", lat: 33.83333333, lng: 35.83333333 },
  Malaysia: { id: 1141268, "ISO-3166": "my", lat: 2.5, lng: 112.5 },
  Mexico: { id: 110978, "ISO-3166": "mx", lat: 23, lng: -102 },
  Netherlands: { id: 726874, "ISO-3166": "nl", lat: 52.5, lng: 5.75 },
  "New Zealand": { id: 2348079, "ISO-3166": "nz", lat: -41, lng: 174 },
  Nigeria: { id: 1387660, "ISO-3166": "ng", lat: 10, lng: 8 },
  Norway: { id: 857105, "ISO-3166": "no", lat: 62, lng: 10 },
  Oman: { id: 2268284, "ISO-3166": "om", lat: 21, lng: 57 },
  Pakistan: { id: 2211096, "ISO-3166": "pk", lat: 30, lng: 70 },
  Panama: { id: 23424924, "ISO-3166": "pa", lat: 9, lng: -80 },
  Peru: { id: 418440, "ISO-3166": "pe", lat: -10, lng: -76 },
  Philippines: { id: 1167715, "ISO-3166": "ph", lat: 13, lng: 122 },
  Poland: { id: 493417, "ISO-3166": "pl", lat: 52, lng: 20 },
  Portugal: { id: 23424925, "ISO-3166": "pt", lat: 39.5, lng: -8 },
  "Puerto Rico": { id: 23424935, "ISO-3166": "pr", lat: 18.25, lng: -66.5 },
  Qatar: { id: 23424930, "ISO-3166": "qa", lat: 25.5, lng: 51.25 },
  "Saudi Arabia": { id: 1937801, "ISO-3166": "sa", lat: 25, lng: 45 },
  Singapore: { id: 1062617, "ISO-3166": "sg", lat: 1.36666666, lng: 103.8 },
  "South Africa": { id: 1580913, "ISO-3166": "za", lat: -29, lng: 24 },
  Spain: { id: 753692, "ISO-3166": "es", lat: 40, lng: -4 },
  Sweden: { id: 890869, "ISO-3166": "se", lat: 62, lng: 15 },
  Switzerland: { id: 782538, "ISO-3166": "ch", lat: 47, lng: 8 },
  Thailand: { id: 1225448, "ISO-3166": "th", lat: 15, lng: 100 },
  Turkey: { id: 2323778, "ISO-3166": "tr", lat: 39, lng: 35 },
  Ukraine: { id: 918981, "ISO-3166": "ua", lat: 49, lng: 32 },
  "United Arab Emirates": { id: 1940119, "ISO-3166": "ae", lat: 24, lng: 54 }
};

const countriesInitialState = {
  current: "Singapore",
  available: lookupCountries
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

const newsInitialState = {
  pending: false,
  data: [],
  error: null
};

const news = (state = newsInitialState, action) => {
  switch (action.type) {
    case FETCH_NEWS_PENDING:
      return { ...state, pending: true };
    case FETCH_NEWS_SUCCESS:
      return { ...state, pending: false, data: action.payload, receivedAt: action.receivedAt };
    case FETCH_NEWS_ERROR:
      return { ...state, pending: false, error: action.error };
    default:
      return state;
  }
};

const googleTrendsInitialState = {
  pending: false,
  data: [],
  error: null
};

const googleTrends = (state = googleTrendsInitialState, action) => {
  switch (action.type) {
    case FETCH_GOOGLE_TRENDS_PENDING:
      return { ...state, pending: true, error: null };
    case FETCH_GOOGLE_TRENDS_SUCCESS:
      return { ...state, pending: false, data: action.payload, receivedAt: action.receivedAt, error: null };
    case FETCH_GOOGLE_TRENDS_ERROR:
      return { ...state, pending: false, error: action.error };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  countries,
  tweets,
  news,
  googleTrends
});

export default rootReducer;
