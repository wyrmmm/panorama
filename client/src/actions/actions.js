export const SET_LOCATION = "SET_LOCATION";
export const FETCH_TRENDING_TWEETS_PENDING = "FETCH_TRENDING_TWEETS_PENDING";
export const FETCH_TRENDING_TWEETS_SUCCESS = "FETCH_TRENDING_TWEETS_SUCCESS";
export const FETCH_TRENDING_TWEETS_ERROR = "FETCH_TRENDING_TWEETS_ERROR";
export const FETCH_NEWS_PENDING = "FETCH_NEWS_PENDING";
export const FETCH_NEWS_SUCCESS = "FETCH_NEWS_SUCCESS";
export const FETCH_NEWS_ERROR = "FETCH_NEWS_ERROR";

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

export const fetchNewsPending = () => {
  return { type: FETCH_NEWS_PENDING, pending: true };
};

export const fetchNewsSuccess = news => {
  return { type: FETCH_NEWS_SUCCESS, pending: false, payload: news, receivedAt: Date.now() };
};

export const fetchNewsError = error => {
  return { type: FETCH_NEWS_ERROR, pending: false, error: error };
};

export const fetchNews = countryCode => {
  return async dispatch => {
    dispatch(fetchNewsPending());
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=d23fe148e1be4ca994302165dc4bf4b4`
      );
      const json = await response.json();
      const articles = json.articles;
      dispatch(fetchNewsSuccess(articles));
    } catch (error) {
      dispatch(fetchNewsError(error));
    }
  };
};
