const { GraphQLList } = require('graphql')
const { RoleType } = require('../../types')
const { Role } = require('../../../../database/models').models

module.exports = {
  type: new GraphQLList(RoleType),
  async resolve(_, __, context) {
    try {
      await context()

      return Role.findAll()
    } catch (error) {
      return error
    }
  }
}
