const { GraphQLSchema } = require('graphql')
const RootMutation = require('./mutations')
const RootQuery = require('./queries')

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
})
