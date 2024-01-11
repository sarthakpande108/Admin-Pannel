const permissionService = require("../services/permissionService");
const { buildResponce } = require("../helpers/buildResponce");

exports.addPermission = async (req, res) => {
  try {
    const { name } = req.body;
    const data = await permissionService.addPermission(name);
    if (data != null) {
      buildResponce(res, 200, {
        error: false,
        message: "Permission added successfully",
        data: "",
      });
    } else {
      buildResponce(res, 200, {
        error: true,
        message: "Unable to add permission, please try again",
        data: "",
      });
    }
  } catch (error) {
    console.log(error);

    buildResponce(res, 500, {
      error: true,
      message: "Internal Server Error",
      data: "",
    });
  }
};
exports.deletePermission = async (req, res) => {
  try {
    const {id} = req.params;
    const data = await permissionService.deletePermission(id);
    if (data != null) {
      buildResponce(res, 200, {
        error: false,
        message: "Permission deleted successfully",
        data: "",
      });
    } else {
      buildResponce(res, 200, {
        error: true,
        message: "Unable to delete permission, please try again",
        data: "",
      });
    }
  } catch (error) {
    console.log(error);

    buildResponce(res, 500, {
      error: true,
      message: "Internal Server Error",
      data: "",
    });
  }
};
exports.getAllPermissions = async (req, res) => {
  try {
    // const contactDetails = req.body;
    const data = await permissionService.getAllPermissions();
    if (data != null) {
      buildResponce(res, 200, {
        error: false,
        message: "Fetched all permissions successfully",
        data: data,
      });
    } else {
      buildResponce(res, 200, {
        error: true,
        message: "Unable to fetch permissions, please try again",
        data: "",
      });
    }
  } catch (error) {
    console.log(error);

    buildResponce(res, 500, {
      error: true,
      message: "Internal Server Error",
      data: "",
    });
  }
};