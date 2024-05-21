const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/sequelize");

class Permission extends Model {
  static associate(models) {
    Permission.belongsTo(models.Role, {
      foreignKey: "role_id",
    });
    Permission.belongsTo(models.Entitlement, {
      foreignKey: "entitlement_id",
    });
  }
}

Permission.init(
  {
    role_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    entitlement_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
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
    tableName: "permissions",
    modelName: "Permission",
  }
);

Permission.audit = { enabled: true, name: "permission", type: "string" };

module.exports = Permission;
