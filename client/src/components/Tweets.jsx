/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { css, jsx } from "@emotion/core";
import MapCard from "components/shared/MapCard";
import { fetchTrendingTweets } from "actions/actions";

const tweetsCardStyle = css`
  top: 72px;
  right: 24px;
  width: 250px;
  height: 300px;
`;

const Tweets = props => {
  const {
    tweets,
    dispatch,
    countries: { current: currentCountry, available: countries }
  } = props;

  useEffect(() => {
    dispatch(fetchTrendingTweets(countries[currentCountry].id));
  }, [currentCountry]);

  return (
    <MapCard css={tweetsCardStyle} title="Trending Tweets">
      {tweets.data.map((tweet, index) => (
        <div
          key={index}
          css={css`
            margin: 12px 0;
          `}
        >
          {tweet.name}
        </div>
      ))}
    </MapCard>
  );
};

const mapStateToProps = state => {
  return {
    countries: state.countries,
    tweets: state.tweets
  };
};

export default connect(mapStateToProps)(Tweets);
