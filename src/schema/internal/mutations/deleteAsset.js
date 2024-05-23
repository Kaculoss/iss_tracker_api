const { GraphQLNonNull, GraphQLID, GraphQLBoolean } = require("graphql");
const { Asset, AuditLog, Role } =
  require("../../../../database/models/index.js").models;

module.exports = {
  type: GraphQLBoolean,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  async resolve(_, args, context) {
    try {
      const { user } = await context();

      if (!user.isAssetManager() && !user.isAdmin() && !user.isSuperAdmin())
        throw new Error("Only Asset Managers and Admins can delete assets");

      const found = await Asset.findByPk(args.id);

      if (!found) {
        throw new Error("Asset not found");
      }
      await Asset.destroy({ where: { id: args.id } }, { user_id: user.id });

      const role = await Role.findByPk(user.role_id);

      await AuditLog.create({
        type: "delete",
        user_id: user.id,
        user_role: role.name,
        event: `${user.fullName()} deleted asset ${found.code}`,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      });

      return true;
    } catch (error) {
      return error;
    }
  },
};
