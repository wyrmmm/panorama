import { combineReducers } from "redux";
import {
  SET_LOCATION,
  FETCH_TRENDING_TWEETS_PENDING,
  FETCH_TRENDING_TWEETS_SUCCESS,
  FETCH_TRENDING_TWEETS_ERROR,
  FETCH_NEWS_PENDING,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_ERROR
} from "actions/actions";

const lookupCountries = {
  Algeria: { id: 1253079, "ISO-3166": "dz" },
  Argentina: { id: 332471, "ISO-3166": "ar" },
  Australia: { id: 1098081, "ISO-3166": "au" },
  Austria: { id: 551801, "ISO-3166": "at" },
  Bahrain: { id: 23424753, "ISO-3166": "bh" },
  Belarus: { id: 824382, "ISO-3166": "by" },
  Belgium: { id: 23424757, "ISO-3166": "be" },
  Brazil: { id: 455819, "ISO-3166": "br" },
  Canada: { id: 2972, "ISO-3166": "ca" },
  Chile: { id: 349859, "ISO-3166": "cl" },
  Colombia: { id: 368148, "ISO-3166": "co" },
  Denmark: { id: 23424796, "ISO-3166": "dk" },
  "Dominican Republic": { id: 76456, "ISO-3166": "do" },
  Ecuador: { id: 375732, "ISO-3166": "ec" },
  Egypt: { id: 1521643, "ISO-3166": "eg" },
  France: { id: 580778, "ISO-3166": "fr" },
  Germany: { id: 638242, "ISO-3166": "de" },
  Ghana: { id: 1326075, "ISO-3166": "gh" },
  Greece: { id: 946738, "ISO-3166": "gr" },
  Guatemala: { id: 83123, "ISO-3166": "gt" },
  India: { id: 2282863, "ISO-3166": "in" },
  Indonesia: { id: 1030077, "ISO-3166": "id" },
  Ireland: { id: 560472, "ISO-3166": "ie" },
  Israel: { id: 1967449, "ISO-3166": "il" },
  Italy: { id: 711080, "ISO-3166": "it" },
  Japan: { id: 1110809, "ISO-3166": "jp" },
  Jordan: { id: 1968902, "ISO-3166": "jo" },
  Kenya: { id: 1528335, "ISO-3166": "ke" },
  Kuwait: { id: 23424870, "ISO-3166": "kw" },
  Latvia: { id: 854823, "ISO-3166": "lv" },
  Lebanon: { id: 23424873, "ISO-3166": "lb" },
  Malaysia: { id: 1141268, "ISO-3166": "my" },
  Mexico: { id: 110978, "ISO-3166": "mx" },
  Netherlands: { id: 726874, "ISO-3166": "nl" },
  "New Zealand": { id: 2348079, "ISO-3166": "nz" },
  Nigeria: { id: 1387660, "ISO-3166": "ng" },
  Norway: { id: 857105, "ISO-3166": "no" },
  Oman: { id: 2268284, "ISO-3166": "om" },
  Pakistan: { id: 2211096, "ISO-3166": "pk" },
  Panama: { id: 23424924, "ISO-3166": "pa" },
  Peru: { id: 418440, "ISO-3166": "pe" },
  Philippines: { id: 1167715, "ISO-3166": "ph" },
  Poland: { id: 493417, "ISO-3166": "pl" },
  Portugal: { id: 23424925, "ISO-3166": "pt" },
  "Puerto Rico": { id: 23424935, "ISO-3166": "pr" },
  Qatar: { id: 23424930, "ISO-3166": "qa" },
  "Saudi Arabia": { id: 1937801, "ISO-3166": "sa" },
  Singapore: { id: 1062617, "ISO-3166": "sg" },
  "South Africa": { id: 1580913, "ISO-3166": "za" },
  Spain: { id: 753692, "ISO-3166": "es" },
  Sweden: { id: 890869, "ISO-3166": "se" },
  Switzerland: { id: 782538, "ISO-3166": "ch" },
  Thailand: { id: 1225448, "ISO-3166": "th" },
  Turkey: { id: 2323778, "ISO-3166": "tr" },
  Ukraine: { id: 918981, "ISO-3166": "ua" },
  "United Arab Emirates": { id: 1940119, "ISO-3166": "ae" }
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

const rootReducer = combineReducers({
  countries,
  tweets,
  news
});

export default rootReducer;
