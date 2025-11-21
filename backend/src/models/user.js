const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
module.exports = sequelize.define('User',{id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},name:DataTypes.STRING,email:{type:DataTypes.STRING,unique:true,allowNull:false},passwordHash:{type:DataTypes.STRING,allowNull:false},role:{type:DataTypes.STRING,defaultValue:'customer'}});