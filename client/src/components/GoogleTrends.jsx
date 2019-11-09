/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { css, jsx } from "@emotion/core";
import MapCard from "components/shared/MapCard";

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

const fetchGoogleTrends = async location => {
  const response = await fetch(`http://localhost:3001/googletrends/?location=US`);
  const json = await response.json();
  return json;
};

const GoogleTrends = () => {
  const [googleTrends, setGoogleTrends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const googleTrends = await fetchGoogleTrends();
      setGoogleTrends(googleTrends);
    };

    fetchData();
  }, []);

  return (
    <MapCard css={googleTrendsCardStyle} title="Google Trends">
      {googleTrends.map(({ title, count }, index) => {
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

export default GoogleTrends;
