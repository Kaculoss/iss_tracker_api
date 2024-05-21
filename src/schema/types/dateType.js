const { GraphQLScalarType } = require('graphql')

const DateType = new GraphQLScalarType({
  name: 'ISODate',
  serialize(value) {
    return value instanceof Date ? value.toISOString() : null
  }
})

module.exports = DateType
