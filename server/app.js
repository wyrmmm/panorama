require("dotenv").config();
const express = require("express");
const Twit = require("twit");
const app = express();
app.use(express.json());

const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

T.get(
  "account/verify_credentials",
  {
    include_entities: false,
    skip_status: true,
    include_email: false
  },
  () => {
    console.log("Authentication successful.");
  }
);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));
