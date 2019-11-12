import { combineReducers } from "redux";
import {
  SET_LOCATION,
  FETCH_TRENDING_TWEETS_PENDING,
  FETCH_TRENDING_TWEETS_SUCCESS,
  FETCH_TRENDING_TWEETS_ERROR
} from "actions/actions";

const lookupCountries = {
  Worldwide: { id: 1 },
  Algeria: { id: 1253079, "ISO-3166": "DZ" },
  Argentina: { id: 332471, "ISO-3166": "AR" },
  Australia: { id: 1098081, "ISO-3166": "AU" },
  Austria: { id: 551801, "ISO-3166": "AT" },
  Bahrain: { id: 23424753, "ISO-3166": "BH" },
  Belarus: { id: 824382, "ISO-3166": "BY" },
  Belgium: { id: 23424757, "ISO-3166": "BE" },
  Brazil: { id: 455819, "ISO-3166": "BR" },
  Canada: { id: 2972, "ISO-3166": "CA" },
  Chile: { id: 349859, "ISO-3166": "CL" },
  Colombia: { id: 368148, "ISO-3166": "CO" },
  Denmark: { id: 23424796, "ISO-3166": "DK" },
  "Dominican Republic": { id: 76456, "ISO-3166": "DO" },
  Ecuador: { id: 375732, "ISO-3166": "EC" },
  Egypt: { id: 1521643, "ISO-3166": "EG" },
  France: { id: 580778, "ISO-3166": "FR" },
  Germany: { id: 638242, "ISO-3166": "DE" },
  Ghana: { id: 1326075, "ISO-3166": "GH" },
  Greece: { id: 946738, "ISO-3166": "GR" },
  Guatemala: { id: 83123, "ISO-3166": "GT" },
  India: { id: 2282863, "ISO-3166": "IN" },
  Indonesia: { id: 1030077, "ISO-3166": "ID" },
  Ireland: { id: 560472, "ISO-3166": "IE" },
  Israel: { id: 1967449, "ISO-3166": "IL" },
  Italy: { id: 711080, "ISO-3166": "IT" },
  Japan: { id: 1110809, "ISO-3166": "JP" },
  Jordan: { id: 1968902, "ISO-3166": "JO" },
  Kenya: { id: 1528335, "ISO-3166": "KE" },
  Kuwait: { id: 23424870, "ISO-3166": "KW" },
  Latvia: { id: 854823, "ISO-3166": "LV" },
  Lebanon: { id: 23424873, "ISO-3166": "LB" },
  Malaysia: { id: 1141268, "ISO-3166": "MY" },
  Mexico: { id: 110978, "ISO-3166": "MX" },
  Netherlands: { id: 726874, "ISO-3166": "NL" },
  "New Zealand": { id: 2348079, "ISO-3166": "NZ" },
  Nigeria: { id: 1387660, "ISO-3166": "NG" },
  Norway: { id: 857105, "ISO-3166": "NO" },
  Oman: { id: 2268284, "ISO-3166": "OM" },
  Pakistan: { id: 2211096, "ISO-3166": "PK" },
  Panama: { id: 23424924, "ISO-3166": "PA" },
  Peru: { id: 418440, "ISO-3166": "PE" },
  Philippines: { id: 1167715, "ISO-3166": "PH" },
  Poland: { id: 493417, "ISO-3166": "PL" },
  Portugal: { id: 23424925, "ISO-3166": "PT" },
  "Puerto Rico": { id: 23424935, "ISO-3166": "PR" },
  Qatar: { id: 23424930, "ISO-3166": "QA" },
  "Saudi Arabia": { id: 1937801, "ISO-3166": "SA" },
  Singapore: { id: 1062617, "ISO-3166": "SG" },
  "South Africa": { id: 1580913, "ISO-3166": "ZA" },
  Spain: { id: 753692, "ISO-3166": "ES" },
  Sweden: { id: 890869, "ISO-3166": "SE" },
  Switzerland: { id: 782538, "ISO-3166": "CH" },
  Thailand: { id: 1225448, "ISO-3166": "TH" },
  Turkey: { id: 2323778, "ISO-3166": "TR" },
  Ukraine: { id: 918981, "ISO-3166": "UA" },
  "United Arab Emirates": { id: 1940119, "ISO-3166": "AE" }
};

const countriesInitialState = {
  current: "Worldwide",
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

const rootReducer = combineReducers({
  countries,
  tweets
});

export default rootReducer;
