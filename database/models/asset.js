const { Model, DataTypes, QueryTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");
const moment = require("moment");

class Asset extends Model {
  static associate(models) {}

  fullName() {
    return `${this.name}`;
  }
}

Asset.init(
  {
    type: {
      type: DataTypes.STRING,
      require: true,
    },
    code: {
      type: DataTypes.STRING,
      require: true,
    },
    name: {
      type: DataTypes.STRING,
      require: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      require: true,
    },
    vendor: {
      type: DataTypes.STRING,
      require: true,
    },
    location: {
      type: DataTypes.STRING,
      require: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    paranoid: true,
    modelName: "Asset",
    tableName: "assets",
  }
);

Asset.audit = { enabled: true, name: "asset", type: "string" };

module.exports = Asset;
