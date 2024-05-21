const { GraphQLList } = require("graphql");

const { AssetType } = require("../../types");
const { Asset } = require("../../../../database/models").models;

module.exports = {
  type: new GraphQLList(AssetType),
  async resolve(_, __, context) {
    const { user } = await context();

    if (!user.isAdmin() && !user.isAssetManager() && !user.isSuperAdmin())
      throw new Error("Only Admins and Asset managers can read all assets");

    return Asset.findAll({ order: [["code", "ASC"]] });
  },
};
