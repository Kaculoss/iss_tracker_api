require("dotenv").config({ path: __dirname + "/../.env" });

const commonConfig = {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
};

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: "postgres",
    logging: console.log,
  },
  staging: {
    url: process.env.DATABASE_URL,
    ...commonConfig,
    logging: console.log,
  },
  production: {
    url: process.env.DATABASE_URL,
    ...commonConfig,
    logging: false,
  },
};
