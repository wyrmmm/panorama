/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { css, jsx } from "@emotion/core";
import MapCard from "components/shared/MapCard";

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

const fetchNews = async () => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=d23fe148e1be4ca994302165dc4bf4b4`
  );
  const json = await response.json();
  return json.articles;
};

const News = () => {
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const latestNews = await fetchNews();
      setLatestNews(latestNews);
    };

    fetchData();
  }, []);

  return (
    <MapCard css={newsCardStyle} title="Latest News">
      {latestNews.map((article, index) => {
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

export default News;
