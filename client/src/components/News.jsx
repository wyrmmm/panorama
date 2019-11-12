/** @jsx jsx */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { css, jsx } from "@emotion/core";
import MapCard from "components/shared/MapCard";
import { fetchNews } from "actions/actions";

const newsCardStyle = css`
  top: 72px;
  left: 24px;
  width: 320px;
  height: 500px;
`;

const articleStyle = css`
  margin: 12px 0 24px 0;
`;

const articleAuthorStyle = css`
  font-style: italic;
  opacity: 0.7;
`;

const News = props => {
  const {
    dispatch,
    countries: { current: currentCountry, available: countries },
    news
  } = props;

  useEffect(() => {
    const countryCode = countries[currentCountry]["ISO-3166"];
    dispatch(fetchNews(countryCode));
  }, [currentCountry]);

  return (
    <MapCard css={newsCardStyle} title="Latest News">
      {news.data.map((article, index) => {
        const { title: temp } = article;
        const [title, author] = temp.split(" - ");
        return (
          <div key={index} css={articleStyle}>
            <div>{title}</div>
            <div css={articleAuthorStyle}>{author}</div>
          </div>
        );
      })}
    </MapCard>
  );
};

const mapStateToProps = state => {
  return {
    countries: state.countries,
    news: state.news
  };
};

export default connect(mapStateToProps)(News);
