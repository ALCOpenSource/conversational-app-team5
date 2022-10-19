const path = require("path");
require("dotenv").config(path.join(__dirname, ".env"));

const setup = {
  port: process.env.PORT || 3000,
  secretKey: process.env.SECRET_KEY,
  db: {
    url: process.env.DATABASE_URL,
    collections: {
      user: "users",
    },
  },
};

module.exports = setup;