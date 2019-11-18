/** @jsx jsx */
import React from "react";
import { connect } from "react-redux";
import { css, jsx } from "@emotion/core";
import MapCard from "components/shared/MapCard";
import { Spinner } from "@blueprintjs/core";

const googleTrendsCardStyle = css`
  right: 24px;
  bottom: 48px;
  width: 250px;
  height: 300px;
  display: none;
  @media (min-width: 1024px) {
    display: block;
  }
`;

const googleTrendsCountStyle = css`
  font-style: italic;
  opacity: 0.7;
`;

const GoogleTrends = props => {
  const { googleTrends } = props;

  const { pending, error } = googleTrends;
  if (pending) {
    return (
      <MapCard css={googleTrendsCardStyle} title="Google Trends">
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
      <MapCard css={googleTrendsCardStyle} title="Google Trends">
        Unable to fetch trends for this country.
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
