const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLID, GraphQLString, GraphQLBoolean } = require('graphql')

const EntitlementType = new GraphQLObjectType({
  name: 'EntitlementType',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
  })
})

module.exports = EntitlementType
