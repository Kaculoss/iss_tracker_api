require("dotenv").config();

const bcrypt = require("bcryptjs");

const { GraphQLString, GraphQLNonNull, GraphQLObjectType } = require("graphql");

const { UserType } = require("../../types");
const { User, AuditLog } = require("../../../../database/models").models;
const Jwt = require("../../../helpers/jwt");
const RequestError = require("../../../utils/RequestError.ts");

async function validate(args, item) {
  const errors = [];

  if (args.email.length <= 8) {
    errors.push({ field: "email", message: `Invalid Email` });
  }

  if (!args.email.endsWith("@abc.com")) {
    errors.push({
      field: "email",
      message: `Only Employees of ABC can register`,
    });
  }

  if (!args.first_name.length) {
    errors.push({ field: "first_name", message: `Invalid first name` });
  }

  if (!args.last_name.length) {
    errors.push({ field: "last_name", message: `Invalid last name` });
  }

  if (!args.password.length) {
    errors.push({ field: "password", message: `Invalid password` });
  }

  if (args.password !== args.confirm_password) {
    errors.push({ field: "confirm_password", message: `Passwords must match` });
  }

  return errors;
}

const SignUpType = new GraphQLObjectType({
  name: "SignUpType",
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
  type: SignUpType,
  args: {
    first_name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    last_name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    confirm_password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  async resolve(_, args) {
    try {
      const { first_name, last_name, email, password } = args;

      const found = await User.findOne({ where: { email } });

      if (found) throw new Error(`${email} alread exists ${found.email}`);

      const errors = await validate(args, found);

      if (errors.length) throw new RequestError(errors);

      const encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        email,
        first_name,
        last_name,
        role_id: 4,
        avatar: "",
        password: encryptedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });

      const access_token = Jwt.generateToken(newUser);

      await AuditLog.create({
        type: "signup",
        user_id: newUser.id,
        event: `${newUser.fullName()} signed up`,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      });

      return { access_token, user: newUser };
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};
