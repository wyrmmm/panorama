/** @jsx jsx */
import React, { useState } from "react";
import { connect } from "react-redux";
import { css, jsx } from "@emotion/core";
import { Navbar, Alignment } from "@blueprintjs/core";
import ReactMapGL, { FlyToInterpolator } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import News from "components/News";
import Tweets from "components/Tweets";
import GoogleTrends from "components/GoogleTrends";
import { setCountry } from "actions/actions";

const divStyle = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const App = props => {
  const {
    countries: { current: currentCountry, available: countries },
    dispatch
  } = props;

  const [viewport, setViewport] = useState({
    latitude: countries[currentCountry]["lat"],
    longitude: countries[currentCountry]["lng"],
    zoom: 5,
    bearing: 0,
    pitch: 0,
    transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
    transitionDuration: 2000
  });

  const [previousCountry, setPreviousCountry] = useState(currentCountry);

  if (currentCountry !== previousCountry) {
    setPreviousCountry(currentCountry);
    const latitude = countries[currentCountry]["lat"];
    const longitude = countries[currentCountry]["lng"];
    setViewport({ ...viewport, latitude, longitude });
  }

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
          <div className="bp3-select">
            <select defaultValue={currentCountry}>
              {Object.keys(countries).map((country, index) => (
                <option key={index} onClick={() => dispatch(setCountry(country))}>
                  {country}
                </option>
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
    countries: state.countries
  };
};

export default connect(mapStateToProps)(App);
