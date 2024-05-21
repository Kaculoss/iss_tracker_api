const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLID, GraphQLString, GraphQLBoolean } = require('graphql')
const { Entitlement } = require('../../../database/models').models
const { Role } = require('../../../database/models').models

const PermissionType = new GraphQLObjectType({
  name: "PermissionType",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    entitlement: {
      type: new GraphQLNonNull(require("./entitlementType")),
      async resolve(parent) {
        return await Entitlement.findByPk(parent.entitlement_id);
      },
    },
    // role: {
    //   type: new GraphQLNonNull(require("./roleType")),
    //   async resolve(parent) {
    //     return await Role.findByPk(parent.role_id);
    //   },
    // },
  }),
});

module.exports = PermissionType
