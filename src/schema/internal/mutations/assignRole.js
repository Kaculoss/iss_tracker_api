const { GraphQLNonNull, GraphQLID } = require("graphql");
const { User, Role, AuditLog } = require("../../../../database/models").models;
const { UserType } = require("../../types");
const RequestError = require("../../../utils/RequestError.ts");

async function validate(args, item) {
  const errors = [];

  if (item === null) {
    errors.push({
      field: "user_id",
      message: `Cannot find User with id ${args.user_id}`,
    });
  }

  if (!["2", "3", "4"].includes(args.role_id)) {
    errors.push({
      field: "role_id",
      message: `Invalid Role Id ${args.role_id}`,
    });
  }

  return errors;
}

module.exports = {
  type: UserType,
  args: {
    user_id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    role_id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  async resolve(_, args, context) {
    const { user } = await context();
    const { role_id, user_id } = args;

    const foundUser = await User.findByPk(user_id);

    const errors = await validate(args, foundUser);

    if (errors.length) throw new RequestError(errors);

    if (!user.isAdmin() && !user.isSuperAdmin())
      throw new Error("Only Admins can assign roles");

    await foundUser.update(
      { role_id, updatedAt: new Date() },
      { user_id: user.id }
    );

    const role = await Role.findByPk(role_id);

    await AuditLog.create({
      type: "assignment",
      user_id: user.id,
      user_role: role.name,
      event: `${user.fullName()} assigned ${foundUser.fullName()} to the ${
        role.name
      } Role`,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    });

    return foundUser;
  },
};
