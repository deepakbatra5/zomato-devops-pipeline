const { DataTypes } = require('sequelize');
const sequelize=require('../config/db');const User=require('./user');
const Order=sequelize.define('Order',{id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},status:{type:DataTypes.STRING,defaultValue:'placed'},total:DataTypes.INTEGER});
Order.belongsTo(User);User.hasMany(Order);module.exports=Order;