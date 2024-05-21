const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");
const moment = require("moment");

class AuditLog extends Model {
  static associate(models) {
    AuditLog.belongsTo(models.User, { as: "Changer", foreignKey: "user_id" });
  }
}

AuditLog.init(
  {
    type: {
      type: DataTypes.STRING,
      require: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      require: true,
    },
    event: {
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
    paranoid: true,
    modelName: "AuditLog",
    tableName: "audit_logs",
  }
);

module.exports = AuditLog;
