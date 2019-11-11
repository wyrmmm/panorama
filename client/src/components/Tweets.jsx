/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { css, jsx } from "@emotion/core";
import MapCard from "components/shared/MapCard";
import { fetchTwitterCountries } from "actions/actions";

const tweetsCardStyle = css`
  top: 72px;
  right: 24px;
  width: 250px;
  height: 300px;
`;

const fetchTrendingTweets = async id => {
  const response = await fetch(`http://localhost:3001/tweets/trends/${id}`);
  const json = await response.json();
  return json[0].trends;
};

const Tweets = props => {
  const { tweets, dispatch, currentLocation } = props;
  console.log(tweets);
  console.log(`currentLocation: ${currentLocation}`);
  // const [countries, setCountries] = useState([]);
  // const [currentCountry, setCurrentCountry] = useState();
  // const [trendingTweets, setTrendingTweets] = useState([]);

  useEffect(() => {
    dispatch(fetchTwitterCountries());
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (currentCountry !== undefined) {
  //       const trendingTweets = await fetchTrendingTweets(countries[currentCountry]);
  //       setTrendingTweets(trendingTweets);
  //     }
  //   };
  //   fetchData();
  // }, [currentCountry]);

  return (
    <MapCard css={tweetsCardStyle} title="Trending Tweets">
      {/* {trendingTweets.map((tweet, index) => (
        <div
          key={index}
          css={css`
            margin: 12px 0;
          `}
        >
          {tweet.name}
        </div>
      ))} */}
    </MapCard>
  );
};

const mapStateToProps = state => {
  return {
    currentLocation: state.location.current,
    tweets: state.tweets
  };
};

export default connect(mapStateToProps)(Tweets);
