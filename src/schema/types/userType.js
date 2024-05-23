const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} = require("graphql");
const DateType = require("./dateType");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    role: {
      type: new GraphQLNonNull(require("./roleType")),
      async resolve(parent) {
        return parent.getRole();
      },
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    full_name: {
      type: new GraphQLNonNull(GraphQLString),
      async resolve(parent) {
        return parent.fullName();
      },
    },
    first_name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    last_name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    avatar: {
      type: GraphQLString,
    },
    active: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    createdAt: {
      type: DateType,
    },
  }),
});

module.exports = UserType;
