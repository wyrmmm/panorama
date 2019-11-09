/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { css, jsx } from "@emotion/core";
import MapCard from "components/shared/MapCard";

const tweetsCardStyle = css`
  top: 72px;
  right: 24px;
  width: 250px;
  height: 300px;
`;

const fetchCountries = async () => {
  const response = await fetch(`http://localhost:3001/tweets/trends/available`);
  const json = await response.json();
  const countries = {};
  json.forEach(e => {
    const { country, id } = e;
    countries[country] = id;
  });
  return countries;
};

const fetchTrendingTweets = async id => {
  const response = await fetch(`http://localhost:3001/tweets/trends/${id}`);
  const json = await response.json();
  return json[0].trends;
};

const Tweets = () => {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState();
  const [trendingTweets, setTrendingTweets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const countries = await fetchCountries();
      setCountries(countries);
      setCurrentCountry("");
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (currentCountry !== undefined) {
        const trendingTweets = await fetchTrendingTweets(countries[currentCountry]);
        setTrendingTweets(trendingTweets);
      }
    };
    fetchData();
  }, [currentCountry]);

  return (
    <MapCard css={tweetsCardStyle} title="Trending Tweets">
      {trendingTweets.map((tweet, index) => (
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

export default Tweets;
