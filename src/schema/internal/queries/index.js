const fs = require('fs')
const path = require('path')
const { GraphQLObjectType } = require('graphql')

const fields = {}

const dir = fs.readdirSync(__dirname).filter((x) => x !== 'index.js')

dir.forEach((file) => {
  const n = file.split('.')[0]
  const m = require(path.join(__dirname, file))
  fields[n] = m
})

const query = new GraphQLObjectType({
  name: 'RootQuery',
  fields
})

module.exports = query
