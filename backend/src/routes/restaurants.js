const express=require('express');const router=express.Router();const {Restaurant,MenuItem}=require('../models');
router.get('/',async(req,res)=>res.json(await Restaurant.findAll({include:MenuItem})));
router.get('/:id',async(req,res)=>{const r=await Restaurant.findByPk(req.params.id,{include:MenuItem});if(!r)return res.status(404).json({error:'Not found'});res.json(r);});
module.exports=router;