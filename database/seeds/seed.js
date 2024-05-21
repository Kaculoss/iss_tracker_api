const { Role, Entitlement, Permission, AuditLog, Asset, User } =
  require("../models").models;

// Seed data files
const roles = require("./roles.json");
const entitlements = require("./entitlements.json");
const permissions = require("./permissions.json");
const assets = require("./assets.json");

(async () => {
  // remove old info
  await Permission.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
    force: true,
  });
  await Entitlement.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
    force: true,
  });
  await Asset.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
    force: true,
  });
  await AuditLog.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
    force: true,
  });
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
    force: true,
  });
  await Role.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
    force: true,
  });

  // Add data
  await Role.bulkCreate(roles, { ignoreDuplicates: true });
  await Entitlement.bulkCreate(entitlements, { ignoreDuplicates: true });
  await Permission.bulkCreate(permissions, { ignoreDuplicates: true });
  await Asset.bulkCreate(assets, { ignoreDuplicates: true });
})();
