'use strict'

const fs = require('fs')
const path = require('path')
const { isEqual, isEmpty } = require('lodash')
const { Sequelize } = require('sequelize')
const sequelize = require('../../config/sequelize')

const basename = path.basename(__filename)

const db = {}

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  })
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const model = require(path.join(__dirname, file))
    db[model.name] = model
  })

const hooks = [
  { name: 'afterCreate', event: 'create' },
  { name: 'afterUpdate', event: 'update' },
  { name: 'afterDestroy', event: 'destroy' }
  // { name: 'afterBulkCreate', event: 'bulkCreate' },
  // { name: 'afterBulkUpdate', event: 'bulkUpdate' }
]

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

module.exports = {
  models: db,
  sequelize,
  Sequelize
}
