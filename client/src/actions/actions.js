export const SET_LOCATION = "SET_LOCATION";
export const FETCH_TRENDING_TWEETS_PENDING = "FETCH_TRENDING_TWEETS_PENDING";
export const FETCH_TRENDING_TWEETS_SUCCESS = "FETCH_TRENDING_TWEETS_SUCCESS";
export const FETCH_TRENDING_TWEETS_ERROR = "FETCH_TRENDING_TWEETS_ERROR";

export const setCountry = country => {
  return { type: SET_LOCATION, payload: country };
};

export const fetchTrendingTweetsPending = () => {
  return { type: FETCH_TRENDING_TWEETS_PENDING };
};

export const fetchTrendingTweetsSuccess = tweets => {
  return { type: FETCH_TRENDING_TWEETS_SUCCESS, payload: tweets, receivedAt: Date.now() };
};

export const fetchTrendingTweetsError = error => {
  return { type: FETCH_TRENDING_TWEETS_ERROR, error: error };
};

export const fetchTrendingTweets = id => {
  return async dispatch => {
    dispatch(fetchTrendingTweetsPending);

    try {
      const response = await fetch(`http://localhost:3001/tweets/trends/${id}`);
      const json = await response.json();
      const tweets = json[0].trends;
      dispatch(fetchTrendingTweetsSuccess(tweets));
    } catch (error) {
      dispatch(fetchTrendingTweetsError(error));
    }
  };
};
