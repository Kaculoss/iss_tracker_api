const fs = require('fs')
const path = require('path')

const fields = {}

const dir = fs.readdirSync(__dirname).filter((x) => x !== 'index.js')

dir.forEach((file) => {
  const n = file.split('.')[0]
  const capitalized = n.charAt(0).toUpperCase() + n.slice(1)
  const m = require(path.join(__dirname, file))
  fields[capitalized] = m
})

module.exports = fields
