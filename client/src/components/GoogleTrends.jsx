/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { css, jsx } from "@emotion/core";
import MapCard from "components/shared/MapCard";
import { fetchGoogleTrends } from "actions/actions";
import { Spinner } from "@blueprintjs/core";

const googleTrendsCardStyle = css`
  right: 24px;
  bottom: 48px;
  width: 250px;
  height: 300px;
`;

const googleTrendsCountStyle = css`
  font-style: italic;
  opacity: 0.7;
`;

const GoogleTrends = props => {
  const {
    googleTrends,
    dispatch,
    countries: { current: currentCountry, available: countries }
  } = props;

  useEffect(() => {
    const countryCode = countries[currentCountry]["ISO-3166"].toUpperCase();
    dispatch(fetchGoogleTrends(countryCode));
  }, [currentCountry]);

  const { pending, error } = googleTrends;
  if (pending) {
    return (
      <MapCard css={googleTrendsCardStyle} title="Trending Tweets">
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
      <MapCard css={googleTrendsCardStyle} title="Trending Tweets">
        Unable to fetch data for this country.
      </MapCard>
    );
  }

  return (
    <MapCard css={googleTrendsCardStyle} title="Google Trends">
      {googleTrends.data.map(({ title, count }, index) => {
        return (
          <div
            key={index}
            css={css`
              margin: 12px 0;
            `}
          >
            <div>{title}</div>
            <div css={googleTrendsCountStyle}>{count}</div>
          </div>
        );
      })}
    </MapCard>
  );
};

const mapStateToProps = state => {
  return {
    countries: state.countries,
    googleTrends: state.googleTrends
  };
};

export default connect(mapStateToProps)(GoogleTrends);
