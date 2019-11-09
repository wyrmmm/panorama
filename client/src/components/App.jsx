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

const newsCardStyle = css`
  top: 72px;
  left: 24px;
  width: 320px;
  height: 500px;
`;

const tweetsCardStyle = css`
  top: 72px;
  right: 24px;
  width: 250px;
  height: 300px;
`;

const googleTrendsCardStyle = css`
  right: 24px;
  bottom: 48px;
  width: 250px;
  height: 300px;
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

const fetchNews = async () => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=d23fe148e1be4ca994302165dc4bf4b4`
  );
  const json = await response.json();
  return json.articles;
};

const fetchCountries = async () => {
  const response = await fetch(`http://localhost:3001/tweets/trends/available`);
  const json = await response.json();
  const countries = {};
  json.forEach(e => {
    const { country, id } = e;
    countries[country] = id;
  });
  return countries;
};

const fetchTrendingTweets = async id => {
  const response = await fetch(`http://localhost:3001/tweets/trends/${id}`);
  const json = await response.json();
  return json[0].trends;
};

const fetchGoogleTrends = async location => {
  const response = await fetch(`http://localhost:3001/googletrends/?location=US`);
  const json = await response.json();
  return json;
};

function App() {
  const [viewport, setViewport] = useState({
    zoom: 1.5
  });
  const [latestNews, setLatestNews] = useState([]);
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState();
  const [trendingTweets, setTrendingTweets] = useState([]);
  const [googleTrends, setGoogleTrends] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      const latestNews = await fetchNews();
      const countries = await fetchCountries();
      const googleTrends = await fetchGoogleTrends();
      setLatestNews(latestNews);
      setCountries(countries);
      setCurrentCountry("");
      setGoogleTrends(googleTrends);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (currentCountry !== undefined) {
        const trendingTweets = await fetchTrendingTweets(countries[currentCountry]);
        setTrendingTweets(trendingTweets);
      }
    };
    fetchData();
  }, [currentCountry]);

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
      <MapCard css={tweetsCardStyle} title="Trending Tweets">
        {trendingTweets.map((tweet, index) => (
          <div
            key={index}
            css={css`
              margin: 12px 0;
            `}
          >
            {tweet.name}
          </div>
        ))}
      </MapCard>
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
    </div>
  );
}

export default App;
