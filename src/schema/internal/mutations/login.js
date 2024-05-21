require("dotenv").config();

const { GraphQLString, GraphQLNonNull, GraphQLObjectType } = require("graphql");

const bcrypt = require("bcryptjs");

const { UserType } = require("../../types");
const { User, AuditLog } = require("../../../../database/models").models;
const Jwt = require("../../../helpers/jwt");

async function validate(args) {
  const errors = [];

  if (args.email.length <= 8) {
    errors.push({ field: "email", message: `Invalid Email` });
  }

  if (!args.email.endsWith("@abc.com")) {
    errors.push({
      field: "email",
      message: `Only Employees of ABC can login`,
    });
  }

  if (!args.password.length) {
    errors.push({ field: "password", message: `Invalid password` });
  }

  return errors;
}

const AuthUserType = new GraphQLObjectType({
  name: "AuthUser",
  fields: () => ({
    access_token: {
      type: new GraphQLNonNull(GraphQLString),
    },
    user: {
      type: new GraphQLNonNull(UserType),
    },
  }),
});

module.exports = {
  type: AuthUserType,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  async resolve(_, args) {
    try {
      const { email, password } = args;

      const errors = await validate(args);

      if (errors.length) throw new RequestError(errors);

      const user = await User.findOne({ where: { email } });

      if (!user) throw new Error(`No User with email "${email}"`);

      const matchPassword = await bcrypt.compare(password, user.password);

      if (!matchPassword) throw new Error("Wrong Credentials");

      const access_token = Jwt.generateToken(user);

      await AuditLog.create({
        type: "login",
        user_id: user.id,
        event: `${user.fullName()} logged in`,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      });

      return { access_token, user };
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};
