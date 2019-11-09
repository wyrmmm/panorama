/** @jsx jsx */
import React, { useState } from "react";
import { connect } from "react-redux";
import { css, jsx } from "@emotion/core";
import { Navbar, Alignment } from "@blueprintjs/core";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import News from "components/News";
import Tweets from "components/Tweets";
import GoogleTrends from "components/GoogleTrends";

const divStyle = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const App = props => {
  const { locations } = props;
  const [viewport, setViewport] = useState({
    zoom: 1.5
  });

  return (
    <div css={divStyle}>
      <Navbar className="bp3-dark">
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Panorama</Navbar.Heading>
          <span
            css={css`
              margin-left: 48px;
              margin-right: 12px;
            `}
          >
            Location
          </span>
          <div class="bp3-select">
            <select>
              {locations.map(location => (
                <option>{location}</option>
              ))}
            </select>
          </div>
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
      <News />
      <Tweets />
      <GoogleTrends />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    locations: state.locations
  };
};

export default connect(mapStateToProps)(App);
