const { GraphQLList } = require("graphql");

const { AuditLogType } = require("../../types");
const { AuditLog } = require("../../../../database/models").models;

module.exports = {
  type: new GraphQLList(AuditLogType),
  async resolve(_, __, context) {
    const { user } = await context();

    if (!user.isAdmin() && !user.isSuperAdmin())
      throw new Error(`Only Admins can read audit logs id:${user.role_id}`);

    return AuditLog.findAll({ order: [["createdAt", "DESC"]] });
  },
};
