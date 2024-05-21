const { GraphQLNonNull, GraphQLID } = require("graphql");
const { UserType } = require("../../types");
const { User } = require("../../../../database/models").models;

module.exports = {
  type: UserType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  async resolve(_, { id }, context) {
    await context();
    return User.findByPk(id);
  },
};
