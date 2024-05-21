const { GraphQLNonNull, GraphQLString, GraphQLInt } = require("graphql");
const { Asset, AuditLog } = require("../../../../database/models").models;
const { AssetType } = require("../../types");
const RequestError = require("../../../utils/RequestError.ts");

async function validate(args) {
  const errors = [];

  if (!args.name.length) {
    errors.push({ field: "name", message: `Invalid Asset Name` });
  }

  if (!args.type.length) {
    errors.push({ field: "type", message: `Invalid Asset Type` });
  }

  if (!args.price || args.price < 1) {
    errors.push({ field: "price", message: `Invalid Asset Price` });
  }

  return errors;
}

module.exports = {
  type: AssetType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
    price: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    location: {
      type: GraphQLString,
    },
    vendor: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
  },
  async resolve(_, args, context) {
    const { user } = await context();

    const { name, type, price, location, vendor, description } = args;

    const errors = await validate(args);

    if (errors.length) throw new RequestError(errors);

    if (!user.isAssetManager() && !user.isSuperAdmin())
      throw new Error("Only Asset Managers can create assets");

    const allAssets = await Asset.findAll();

    const code = `ABC-${(allAssets.length + 1).toString().padStart(4, "0")}`;

    const asset = await Asset.create(
      {
        type,
        code,
        name,
        price,
        description,
        vendor,
        location,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { user_id: user.id }
    );

    await AuditLog.create({
      type: "create",
      user_id: user.id,
      event: `${user.fullName()} created asset ${asset.code}`,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    });

    return asset;
  },
};
