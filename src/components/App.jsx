/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { css, jsx } from "@emotion/core";
import { Navbar, Alignment } from "@blueprintjs/core";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import MapCard from "components/shared/MapCard";

const divStyle = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const mapCardStyle = css`
  top: 72px;
  left: 24px;
  width: 320px;
`;

const articleStyle = css`
  margin: 12px 0 24px 0;
`;

const articleAuthorStyle = css`
  font-style: italic;
  opacity: 0.7;
`;

function App() {
  const [viewport, setViewport] = useState({
    zoom: 1.5
  });
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=d23fe148e1be4ca994302165dc4bf4b4`
      );
      const json = await response.json();
      setLatestNews(json.articles);
    };
    fetchData();
  }, []);

  return (
    <div css={divStyle}>
      <Navbar className="bp3-dark">
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Panorama</Navbar.Heading>
        </Navbar.Group>
      </Navbar>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      />
      <MapCard css={mapCardStyle} title="Latest News">
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
    </div>
  );
}

export default App;
