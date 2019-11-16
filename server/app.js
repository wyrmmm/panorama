require("dotenv").config();
const express = require("express");
const Twit = require("twit");
const cors = require("cors");
const puppeteer = require("puppeteer");
const request = require("request-promise");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../client/build")));

const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

T.get(
  "account/verify_credentials",
  { include_entities: false, skip_status: true, include_email: false },
  (err, res) => {
    if (err) throw err;
    console.log("Authentication successful.");
  }
);

app.get("/news/", async (req, res) => {
  const { country } = req.query;
  const options = {
    method: "GET",
    uri: `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.GOOGLE_NEWS_API_KEY}`,
    json: true
  };
  request(options).then(response => {
    res.send(response);
  });
});

app.get("/tweets/trends/available", (req, res) => {
  T.get(`https://api.twitter.com/1.1/trends/available.json`, (err, data, response) => {
    const allCountries = new Set();
    const result = [];
    data.forEach(e => {
      const { country, name, woeid } = e;
      if (!allCountries.has(country)) {
        allCountries.add(country);
        result.push({ country, id: woeid });
      }
    });
    result.sort((a, b) => {
      return a.country.localeCompare(b.country);
    });

    res.send(JSON.stringify(result));
  });
});

app.get("/tweets/trends/:id", (req, res) => {
  const { id } = req.params;
  T.get(`https://api.twitter.com/1.1/trends/place.json?id=${id}`, (err, data, response) => {
    res.send(data);
  });
});

app.get("/googletrends/", async (req, res) => {
  const { location } = req.query;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://trends.google.com/trends/?geo=${location}`);
  let texts = await page.evaluate(() => {
    let data = [];
    let titles = document.getElementsByClassName("list-item-title");
    const searches = document.getElementsByClassName("list-item-searches");
    for (let i = 0; i < titles.length; i++) {
      data.push({ title: titles[i].textContent, count: searches[i].textContent });
    }
    return data;
  });
  res.send(texts);
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));
