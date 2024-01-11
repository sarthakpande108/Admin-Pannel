module.exports = (sequelize, DataTypes)=>{
    
    const admin = sequelize.define('admin', {
        
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        admin_permissions: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: {
                permissions: []
            },
        },
        file: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        } 
              
    });
 
    return admin;
}