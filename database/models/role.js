const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

class Role extends Model {
  static associate(models) {
    Role.hasMany(models.User, { foreignKey: "role_id" });
    Role.hasMany(models.Permission, {
      foreignKey: "role_id",
    });
  }
}

Role.init(
  {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
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
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "Role",
    paranoid: true,
    tableName: "roles",
  }
);

Role.audit = { enabled: true, name: "role", type: "string" };

module.exports = Role;
