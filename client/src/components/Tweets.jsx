/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { css, jsx } from "@emotion/core";
import MapCard from "components/shared/MapCard";
import { fetchTrendingTweets } from "actions/actions";
import { Spinner } from "@blueprintjs/core";

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

  const { pending, error } = tweets;
  if (pending) {
    return (
      <MapCard css={tweetsCardStyle} title="Trending Tweets">
        <Spinner
          css={css`
            height: 100%;
          `}
        />
      </MapCard>
    );
  }

  if (error) {
    return (
      <MapCard css={tweetsCardStyle} title="Trending Tweets">
        Unable to fetch data for this country.
      </MapCard>
    );
  }

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
