const { DataTypes } = require('sequelize');
const sequelize=require('../config/db');const Order=require('./order');const MenuItem=require('./menuItem');
const OrderItem=sequelize.define('OrderItem',{id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},quantity:{type:DataTypes.INTEGER,defaultValue:1},price:DataTypes.INTEGER});
OrderItem.belongsTo(Order);Order.hasMany(OrderItem);OrderItem.belongsTo(MenuItem);MenuItem.hasMany(OrderItem);module.exports=OrderItem;