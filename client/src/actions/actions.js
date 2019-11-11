export const SET_LOCATION = "SET_LOCATION";
export const FETCH_TWITTER_COUNTRIES_PENDING = "FETCH_TWITTER_COUNTRIES_PENDING";
export const FETCH_TWITTER_COUNTRIES_SUCCESS = "FETCH_TWITTER_COUNTRIES_SUCCESS";
export const FETCH_TWITTER_COUNTRIES_ERROR = "FETCH_TWITTER_COUNTRIES_ERROR";

export const setLocation = location => {
  return { type: SET_LOCATION, location };
};

export const fetchTwitterCountriesPending = () => {
  return { type: FETCH_TWITTER_COUNTRIES_PENDING };
};

export const fetchTwitterCountriesSuccess = countries => {
  return { type: FETCH_TWITTER_COUNTRIES_SUCCESS, payload: countries, receivedAt: Date.now() };
};

export const fetchTwitterCountriesError = error => {
  return { type: FETCH_TWITTER_COUNTRIES_ERROR, error: error };
};

export const fetchTwitterCountries = () => {
  return async dispatch => {
    dispatch(fetchTwitterCountriesPending);

    try {
      const response = await fetch(`http://localhost:3001/tweets/trends/available`);
      const json = await response.json();
      const countries = {};
      json.forEach(e => {
        const { country, id } = e;
        countries[country] = id;
      });
      dispatch(fetchTwitterCountriesSuccess(countries));
    } catch (error) {
      dispatch(fetchTwitterCountriesError(error));
    }
  };
};
