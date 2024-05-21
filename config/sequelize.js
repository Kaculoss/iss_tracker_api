require('dotenv').config({ path: __dirname + '/../.env' })
const { Sequelize } = require('sequelize')

const env = process.env.NODE_ENV || 'development'
const config = require('./db')[env]

let sequelize
if (config.url) {
  sequelize = new Sequelize(config.url, config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

module.exports = sequelize
