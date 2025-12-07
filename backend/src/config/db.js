const { Sequelize } = require('sequelize');
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:postgres@db:5432/zomato';
module.exports = new Sequelize(DATABASE_URL,{logging:false,dialectOptions:{connectTimeout:60000}});