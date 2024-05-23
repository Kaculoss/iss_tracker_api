const is = require("is_js");

const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
} = require("graphql");
const { Asset, AuditLog, Role } =
  require("../../../../database/models/index.js").models;
const { AssetType } = require("../../types/index.js");
const RequestError = require("../../../utils/RequestError.ts");

async function validate(args, item = "") {
  const errors = [];

  if (item === null) {
    errors.push({
      field: "id",
      message: `Cannot find asset with id ${args.id}`,
    });
  }

  if (
    is.not.undefined(args.name) &&
    (is.empty(args.name) || is.null(args.name))
  ) {
    errors.push({ field: "name", message: "Asset Name cannot be empty" });
  }

  if (
    is.not.undefined(args.type) &&
    (is.empty(args.type) || is.null(args.type))
  ) {
    errors.push({ field: "type", message: "Asset Type cannot be empty" });
  }

  if (is.not.undefined(args.price) && args.price < 1) {
    errors.push({
      field: "price",
      message: "Asset price cannot be less than 1",
    });
  }

  return errors;
}

module.exports = {
  type: AssetType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    type: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    location: {
      type: GraphQLString,
    },
    price: {
      type: GraphQLInt,
    },
    vendor: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
  },
  async resolve(_, args, context) {
    const { user } = await context();

    const { id, name, type, price, location, vendor, description } = args;

    const found = await Asset.findByPk(id);

    if (!found) {
      throw new Error("Asset not found");
    }

    if (!user.isAssetManager() && !user.isAdmin() && !user.isSuperAdmin())
      throw new Error("Only Asset Managers and Admins can update assets");

    const errors = await validate(args, found);

    if (errors.length) throw new RequestError(errors);

    let params = { updatedAt: new Date() };

    if (is.not.undefined(name)) {
      params = { ...params, name };
    }
    if (is.not.undefined(description)) {
      params = { ...params, description };
    }
    if (is.not.undefined(price)) {
      params = { ...params, price };
    }
    if (is.not.undefined(type)) {
      params = { ...params, type };
    }
    if (is.not.undefined(location)) {
      params = { ...params, location };
    }
    if (is.not.undefined(vendor)) {
      params = { ...params, vendor };
    }
    await found.update(params, { user_id: user.id });

    const role = await Role.findByPk(user.role_id);

    await AuditLog.create({
      type: "update",
      user_id: user.id,
      user_role: role.name,
      event: `${user.fullName()} updated asset ${found.code}`,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    });

    return found;
  },
};
