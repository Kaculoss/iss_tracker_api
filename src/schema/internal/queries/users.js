const { GraphQLList } = require("graphql");

const { UserType } = require("../../types");
const { User } = require("../../../../database/models").models;

module.exports = {
  type: new GraphQLList(UserType),
  async resolve(_, __, context) {
    const { user } = await context();

    if (!user.isAdmin() && !user.isSuperAdmin())
      throw new Error("Only Admins can read all users");

    return User.findAll({ order: [["first_name", "ASC"]] });
  },
};
