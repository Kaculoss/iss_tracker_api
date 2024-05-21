const { GraphQLObjectType } = require('graphql')

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {}
})

module.exports = RootQuery
