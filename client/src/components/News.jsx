/** @jsx jsx */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { css, jsx } from "@emotion/core";
import MapCard from "components/shared/MapCard";
import { fetchNews } from "actions/actions";
import { Spinner } from "@blueprintjs/core";

const newsCardStyle = css`
  top: 72px;
  left: 24px;
  width: 320px;
  height: 500px;
  display: none;
  @media (min-width: 1024px) {
    display: block;
  }
`;

const articleStyle = css`
  margin: 12px 0 24px 0;
`;

const articleAuthorStyle = css`
  font-style: italic;
  opacity: 0.7;
`;

const News = props => {
  const { news } = props;

  const { pending, error } = news;
  if (pending) {
    return (
      <MapCard css={newsCardStyle} title="Latest News">
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
      <MapCard css={newsCardStyle} title="Latest News">
        Unable to fetch news for this country.
      </MapCard>
    );
  }

  return (
    <MapCard css={newsCardStyle} title="Latest News">
      {news.data.length !== 0 &&
        news.data.map((article, index) => {
          const { title: temp } = article;
          const [title, author] = temp.split(" - ");
          return (
            <div key={index} css={articleStyle}>
              <div>{title}</div>
              <div css={articleAuthorStyle}>{author}</div>
            </div>
          );
        })}
      {news.data.length === 0 && "There were no articles for this country."}
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
