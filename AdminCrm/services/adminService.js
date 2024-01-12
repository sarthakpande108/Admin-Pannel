const db = require('../models');
const Admin  = db.admin;
// const Sequelize = require('sequelize');

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

exports.getAllAdmins = async ()=>{
    try {
        const data = await Admin.findAll();
        return data;
    } catch (error) {
        throw new Error(" Error fetching admins data "+error.message);
    }
}

exports.addAdmin = async (adminDetails)=>{

    try {

        const findAdminByEmail = await Admin.findOne({
            where: {
                email: adminDetails.email
            }
        });
        const findAdminByPhone = await Admin.findOne({
            where: {
                phone_number: adminDetails.phone_number
            }
        });
        if(findAdminByEmail != null || findAdminByPhone != null){
            return false;
        }
        const data = await Admin.create(adminDetails)
        return data;
    } catch (error) {
        throw new Error("Error adding user enquiry"+error.message);
    }
}

exports.updateAdmin = async (adminDetails)=>{

    try {

        const findAdminById = await Admin.findOne({
            where: {
                id: adminDetails.id
            }
        });
        if(findAdminById == null){
            return false;
        }

        await Admin.update({
            first_name: adminDetails.first_name,
            last_name: adminDetails.last_name,
            phone_number: adminDetails.phone_number,
            password: adminDetails.password,
            admin_permissions: adminDetails.admin_permissions
        },{
            where: {
                id: adminDetails.id
            }
        })
        return true;
    } catch (error) {
        throw new Error("Error adding user enquiry"+error.message);
    }
}

exports.resetAdminPassword = async (adminDetails)=>{

    try {

        const findAdminById = await Admin.findOne({
            where: {
                id: adminDetails.id
            }
        });
        if(findAdminById == null){
            return false;
        }

        await Admin.update({
            password: adminDetails.password,
        },{
            where: {
                id: adminDetails.id
            }
        })
        return true;
    } catch (error) {
        throw new Error("Error adding user enquiry"+error.message);
    }
}
exports.verifyAdminPassword = async (adminDetails) => {
    try {
      const findAdminById = await Admin.findOne({
        where: {
          id: adminDetails.id
        }
      });
  
      if (findAdminById == null) {
        return { data: false }; // Return an object with a data property
      }

      console.log("db body: ")
      console.log(findAdminById.password)
      console.log("req.body")
      console.log(adminDetails.password)
  
      if (findAdminById.password === adminDetails.password) {
        return true; // Return an object with a data property
      } else {
        return false; // Return an object with a data property
      }
    } catch (error) {
      throw new Error("Error adding user enquiry" + error.message);
    }
  };
  

exports.deleteAdmin = async (id)=>{

    try {

        const findAdminById = await Admin.findOne({
            where: {
                id: id
            }
        });
        if(findAdminById == null){
            return false;
        }
        // await Admin.destroy({
        //     where: {
        //         id: id
        //     }
        // })
        await Admin.update({
            is_active: false
        },{
            where: {
                id: id
            }
        })
        return true;
    } catch (error) {
        throw new Error("Error adding user enquiry"+error.message);
    }
}