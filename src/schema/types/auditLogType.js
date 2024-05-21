const { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString } = require('graphql')
const DateType = require('./dateType')

const AuditLogType = new GraphQLObjectType({
  name: "AuditLogType",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    event: {
      type: new GraphQLNonNull(GraphQLString),
    },
    user: {
      type: new GraphQLNonNull(require("./userType")),
      async resolve(parent) {
        return parent.getUser();
      },
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
    createdAt: {
      type: DateType,
    },
  }),
});

module.exports = AuditLogType
