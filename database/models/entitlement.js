const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");
const Permission = require("./permission");

class Entitlement extends Model {
  static associate(models) {}

  fullName() {
    return `${this.name}`;
  }
}

Entitlement.init(
  {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "Entitlement",
    tableName: "entitlements",
  }
);

Entitlement.audit = { enabled: true, name: "fullName", type: "function" };

module.exports = Entitlement;
