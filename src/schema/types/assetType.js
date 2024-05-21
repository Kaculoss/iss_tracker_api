const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} = require("graphql");
const DateType = require("./dateType");

const AssetType = new GraphQLObjectType({
  name: "AssetType",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    code: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
    price: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    vendor: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    location: {
      type: GraphQLString,
    },
    createdAt: {
      type: DateType,
    },
    updatedAt: {
      type: DateType,
    },
    deletedAt: {
      type: DateType,
    },
  }),
});

module.exports = AssetType;
