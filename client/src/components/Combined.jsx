/** @jsx jsx */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { css, jsx } from "@emotion/core";
import { Card } from "@blueprintjs/core";
import { fetchGoogleTrends } from "actions/actions";
import { Spinner } from "@blueprintjs/core";

let titleStyle = css`
  font-weight: 700;
  font-size: 16px;
`;

const combinedCardStyle = css`
  background-color: #273d56;
  opacity: 0.75;
  color: #fff;
  position: absolute;
  top: 50px;
  width: 100%;
  height: calc(100% - 50px);
  overflow-y: auto;
  @media (min-width: 1024px) {
    display: none;
  }
`;

const articleStyle = css`
  margin: 12px 0 24px 0;
`;

const articleAuthorStyle = css`
  font-style: italic;
  opacity: 0.7;
`;

const googleTrendsCountStyle = css`
  font-style: italic;
  opacity: 0.7;
`;

const News = props => {
  const { news } = props;
  const { pending, error, data } = news;
  //   console.log(news.data);
  if (pending) {
    return <Spinner />;
  }
  if (error) {
    return `Unable to fetch news for this country.`;
  }
  if (data.length === 0) {
    return "There were no articles for this country.";
  }
  return data.map((article, index) => {
    const { title: temp } = article;
    const [title, author] = temp.split(" - ");
    return (
      <div key={index} css={articleStyle}>
        <div>{title}</div>
        <div css={articleAuthorStyle}>{author}</div>
      </div>
    );
  });
};

const Tweets = props => {
  const { tweets } = props;
  const { pending, error, data } = tweets;

  if (pending) {
    return <Spinner />;
  }
  if (error) {
    return `Unable to fetch tweets for this country.`;
  }

  return data.map((tweet, index) => (
    <div
      key={index}
      css={css`
        margin: 12px 0;
      `}
    >
      {tweet.name}
    </div>
  ));
};

const Trends = props => {
  const { googleTrends } = props;
  const { pending, error, data } = googleTrends;

  if (pending) {
    return <Spinner />;
  }
  if (error) {
    return `Unable to fetch trends for this country.`;
  }

  return data.map(({ title, count }, index) => {
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
  });
};

const GoogleTrends = props => {
  const { googleTrends, news, tweets } = props;

  return (
    <Card css={combinedCardStyle}>
      <section>
        <p css={titleStyle}>Latest News</p>
        <News news={news} />
      </section>
      <section
        css={css`
          padding-top: 16px;
        `}
      >
        <p css={titleStyle}>Latest Tweets</p>
        <Tweets tweets={tweets} />
      </section>
      <section
        css={css`
          padding-top: 16px;
        `}
      >
        <p css={titleStyle}>Google Trends</p>
        <Trends googleTrends={googleTrends} />
      </section>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    countries: state.countries,
    googleTrends: state.googleTrends,
    news: state.news,
    tweets: state.tweets
  };
};

export default connect(mapStateToProps)(GoogleTrends);
