require("dotenv").config({ path: __dirname + "/../.env" });

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: "postgres",
    logging: console.log,
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    logging: console.log,
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    logging: false,
  },
};
