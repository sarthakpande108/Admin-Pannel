module.exports = (sequelize, DataTypes) => {
    const permission = sequelize.define("permission", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    })
  
    return permission;
  };
  