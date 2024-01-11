const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(
    config.DB_DATABASE,
    config.DB_USERNAME,
    config.DB_PASSWORD,
    {
    host: config.DB_HOST,
    dialect: config.DB_DIALECT ,
    dialectModule: require('mysql2')
  });

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admin = require('./admin')(sequelize, Sequelize);
db.permission = require('./permission')(sequelize, Sequelize);

module.exports = db;