const adminService = require('../services/adminService');
const {buildResponce} = require('../helpers/buildResponce');
const { admin } = require('../models');
const bcrypt = require('bcryptjs');

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// const bcrypt = require('bcrypt');
// const saltRounds = 10; 



exports.getAllAdmins = async (req, res) => {
    try {
        const data = await adminService.getAllAdmins();
        if (data != false) {
            buildResponce(res, 200,
                {
                    error: false,
                    message: "Admins Data Found!",
                    data: data
                })
        } else {
            buildResponce(res, 200,
                {
                    error: true,
                    message: "Admins Data Not Found!",
                    data: ''
                })
        }
        return data;
    } catch (error) {
        buildResponce(res, 500,
            {
                error: true,
                message: "Internal Server Error"+error.message,
                data: ''
            })
    }
}


exports.addAdmin = async (req, res) => {

    try {
        const { first_name, last_name, email, phone_number, password, admin_permissions} = req.body;
        const { filename } = req.file || "";

        console.log(req.body);

        const hashedPassword = bcrypt.hashSync(password, salt);

        

        const adminDetails = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone_number: phone_number,
            password: hashedPassword,
            admin_permissions:admin_permissions,
            file: filename,
            is_active: true,
        }
        const data = await adminService.addAdmin(adminDetails);
        if (data != false) {
            buildResponce(res, 200,
                {
                    error: false,
                    message: "Admin added successfully! ",
                    data: data
                })
        } else {
            buildResponce(res, 200,
                {
                    error: true,
                    message: "Admin already exists!",
                    data: ''
                })
        }
    } catch (error) {
        console.log(error);

        buildResponce(res, 500,
            {
                error: true,
                message: "Internal Server Error : "+error.message,
                data: ''
            })
    }

}

exports.updateAdmin = async (req, res) => {

    try {
        const { id } = req.params;
        const { first_name, last_name, phone_number, admin_permissions } = req.body;
        const { filename } = req.file || "";
        
        console.log(req.body);
        console.log(filename)

        // const hashedPassword = bcrypt.hashSync(password, salt);

        const adminDetails = {
            id: id,
            first_name: first_name, 
            last_name: last_name,
            phone_number: phone_number, 
            admin_permissions: admin_permissions,
            file:filename
        }

        console.log(adminDetails);
        const data = await adminService.updateAdmin(adminDetails);
        if (data) {
            buildResponce(res, 200,
                {
                    error: false,
                    message: "Admin updated successfully! ",
                    data: data
                })
        } else {
            buildResponce(res, 200,
                {
                    error: true,
                    message: "Admin does not exists!",
                    data: ''
                })
        }
    } catch (error) {
        console.log(error);

        buildResponce(res, 500,
            {
                error: true,
                message: "Internal Server Error",
                data: ''
            })
    }

}
exports.deleteAdmin = async (req, res) => {

    try {
        const { id } = req.params;
        
        const data = await adminService.deleteAdmin(id);
        if (data != false) {
            buildResponce(res, 200,
                {
                    error: false,
                    message: "Admin deleted successfully! ",
                    data: ''
                })
        } else {
            buildResponce(res, 200,
                {
                    error: true,
                    message: "Admin does not exists!",
                    data: ''
                })
        }
    } catch (error) {
        console.log(error);

        buildResponce(res, 500,
            {
                error: true,
                message: "Internal Server Error",
                data: ''
            })
    }

}




exports.resetAdminPassword = async (req, res) => {

    try {
        const { id } = req.params;
        const { password } = req.body;

        
        const hashedPassword = bcrypt.hashSync(password, salt);
        
        const adminDetails = {
            id: id,
            password: hashedPassword, 
        }

        const data = await adminService.resetAdminPassword(adminDetails);
        if (data != false) {
            buildResponce(res, 200,
                {
                    error: false,
                    message: "Admin password updated successfully! ",
                    data: ''
                })
        } else {
            buildResponce(res, 200,
                {
                    error: true,
                    message: "Admin does not exists!",
                    data: ''
                })
        }
    } catch (error) {
        console.log(error);

        buildResponce(res, 500,
            {
                error: true,
                message: "Internal Server Error",
                data: ''
            })
    }

}
exports.verifyAdminPassword = async (req, res) => {

    try {
        const { id } = req.params;
        // const data = req.body;
        
        const adminDetails = {
            id: id,
            password: req.body.current_password, 
        }

        const data = await adminService.verifyAdminPassword(adminDetails);
        console.log("data : ");
        console.log(data);
        if (data == true) {
            buildResponce(res, 200,
                {
                    error: false,
                    message: "Admin password verified successfully! ",
                    data: true
                })
        } else {
            buildResponce(res, 200,
                {
                    error: true,
                    message: "Admin does not exists!",
                    data: false
                })
        }
    } catch (error) {
        console.log(error);

        buildResponce(res, 500,
            {
                error: true,
                message: "Internal Server Error",
                data: false
            })
    }

}