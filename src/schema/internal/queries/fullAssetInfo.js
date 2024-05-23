const { GraphQLNonNull, GraphQLString } = require("graphql");
const { Asset, AuditLog, Role } = require("../../../../database/models").models;
const { AssetType } = require("../../types");

module.exports = {
  type: AssetType,
  args: {
    code: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  async resolve(_, args, context) {
    const { user } = await context();

    if (!user.isAdmin() && !user.isAssetManager() && !user.isSuperAdmin())
      throw new Error(
        "Only Admins and Asset Managers can read Full Asset Info (FAI)"
      );

    const asset = await Asset.findOne({ where: { code: args.code } });

    if (!asset) throw new Error(`Asset "${args.code}" not found`);

    const role = await Role.findByPk(user.role_id);

    await AuditLog.create({
      type: "read",
      user_id: user.id,
      user_role: role.name,
      event: `${user.fullName()} read asset ${asset.code}`,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    });

    return asset;
  },
};
