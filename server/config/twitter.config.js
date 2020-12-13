const Twit = require("twit");

const {
  CONSUMER_KEY,
  CONSUMER_SECRET,
  ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET,
} = require("../config/keys.config").API_CONFIGS;

const Twitter = new Twit({
  consumer_key: `${CONSUMER_KEY}`,
  consumer_secret: `${CONSUMER_SECRET}`,
  access_token: `${ACCESS_TOKEN}`,
  access_token_secret: `${ACCESS_TOKEN_SECRET}`,
});

module.exports = Twitter;
