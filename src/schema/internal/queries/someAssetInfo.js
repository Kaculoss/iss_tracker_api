const {
  GraphQLNonNull,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} = require("graphql");
const { Asset, AuditLog } = require("../../../../database/models").models;

const SomeAssetInfoType = new GraphQLObjectType({
  name: "SomeAssetInfoType",
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
    description: {
      type: GraphQLString,
    },
    location: {
      type: GraphQLString,
    },
  }),
});

module.exports = {
  type: SomeAssetInfoType,
  args: {
    code: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  async resolve(_, args, context) {
    const { user } = await context();

    const asset = await Asset.findOne({ where: { code: args.code } });

    if (!asset) throw new Error("Asset not found");

    const { id, code, name, type, description, location } = asset;

    await AuditLog.create({
      type: "read",
      user_id: user.id,
      event: `${user.fullName()} read asset ${code}`,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    });

    return { id, code, name, type, description, location };
  },
};
