require("dotenv").config();

const { GraphQLNonNull, GraphQLBoolean, GraphQLID } = require("graphql");
const { User, AuditLog, Role } = require("../../../../database/models").models;

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

      const found = await User.findByPk(args.id);

      if (!found) {
        throw new Error("User not found");
      }

      await found.update({ active: false }, { user_id: user.id });

      const role = await Role.findByPk(user.role_id);

      await AuditLog.create({
        type: "logout",
        user_id: user.id,
        user_role: role.name,
        event: `${user.fullName()} logged out`,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      });

      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};
