/** @jsx jsx */
import React, { useState, useEffect } from "react";
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

function App() {
  const [viewport, setViewport] = useState({
    zoom: 1.5
  });

  const locations = [
    "Afghanistan",
    "Åland Islands",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua & Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia & Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory",
    "British Virgin Islands",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Caribbean Netherlands",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands",
    "Colombia",
    "Comoros",
    "Congo - Brazzaville",
    "Congo - Kinshasa",
    "Cook Islands",
    "Costa Rica",
    "Côte d’Ivoire",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czechia",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Falkland Islands (Islas Malvinas)",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard & McDonald Islands",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar (Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "North Korea",
    "North Macedonia",
    "Northern Mariana Islands",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Pitcairn Islands",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Réunion",
    "Romania",
    "Russia",
    "Rwanda",
    "Samoa",
    "San Marino",
    "São Tomé & Príncipe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia & South Sandwich Islands",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "St. Barthélemy",
    "St. Helena",
    "St. Kitts & Nevis",
    "St. Lucia",
    "St. Martin",
    "St. Pierre & Miquelon",
    "St. Vincent & Grenadines",
    "Sudan",
    "Suriname",
    "Svalbard & Jan Mayen",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad & Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks & Caicos Islands",
    "Tuvalu",
    "U.S. Outlying Islands",
    "U.S. Virgin Islands",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Wallis & Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe"
  ];

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
}

export default App;
