const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } = require('graphql')

const RoleType = new GraphQLObjectType({
  name: 'RoleType',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: GraphQLString
    },
    permissions: {
      type: new GraphQLList(require('./permissionType')),
      async resolve(parent) {
        const permissions = await parent.getPermissions()
        return permissions.map((x) => x.get())
      }
    }
  })
})

module.exports = RoleType
