const { GraphQLList } = require("graphql");
const { EntitlementType } = require("../../types");
const { Entitlement } = require("../../../../database/models").models;

module.exports = {
  type: new GraphQLList(EntitlementType),
  async resolve(_, __, context) {
    try {
      await context();

      return Entitlement.findAll();
    } catch (error) {
      return error;
    }
  },
};
