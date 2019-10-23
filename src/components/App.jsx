/** @jsx jsx */
import React, { useState } from "react";
import { css, jsx } from "@emotion/core";
import { Navbar, Alignment } from "@blueprintjs/core";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import MapCard from "components/shared/MapCard";

let divStyle = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  const [viewport, setViewport] = useState({
    zoom: 1.5
  });
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
      <MapCard title="Tweets">Hello there</MapCard>
    </div>
  );
}

export default App;
