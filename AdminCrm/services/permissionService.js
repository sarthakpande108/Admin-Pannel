const db = require("../models");

const Permission = db.permission;

exports.addPermission = async (name) => {
  try {
    const newPermission = await Permission.create({name});
    return newPermission;
  } catch (error) {
    throw new Error("Error adding permission" + error.message);
  }
};
exports.deletePermission = async (id) => {
  try {
    await Permission.destroy({
      where: {
        id:id
      }
    });
    return true;
  } catch (error) {
    throw new Error("Error fetching permission" + error.message);
  }
};
exports.getAllPermissions = async () => {
  try {
    const allPermissions = await Permission.findAll();
    return allPermissions;
  } catch (error) {
    throw new Error("Error fetching permission" + error.message);
  }
};