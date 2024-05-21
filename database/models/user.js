const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../config/sequelize");

class User extends Model {
  static associate(models) {
    User.belongsTo(models.Role, { foreignKey: "role_id" });
  }

  isSuperAdmin() {
    return this.role_id == 1;
  }

  isAdmin() {
    return this.role_id == 2;
  }

  isAssetManager() {
    return this.role_id == 3;
  }

  isRegularUser() {
    return this.role_id == 4;
  }

  fullName() {
    return `${this.first_name} ${this.last_name}`;
  }
}

User.init(
  {
    role_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    email: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    first_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    avatar: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    loginAt: {
      allowNull: true,
      type: DataTypes.DATE,
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
    modelName: "User",
    paranoid: true,
    tableName: "users",
  }
);

User.audit = { enabled: true, name: "fullName", type: "function" };

module.exports = User;
