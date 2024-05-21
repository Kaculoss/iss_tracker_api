const { GraphQLSchema } = require('graphql')
const ExternalRootQuery = require('./queries')
const ExternalRootMuntation = require('./mutations')

module.exports = new GraphQLSchema({
    mutation: ExternalRootMuntation,
    query: ExternalRootQuery
})