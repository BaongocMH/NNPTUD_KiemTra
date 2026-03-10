
const Role = require("../models/Role")
const User = require("../models/User")

exports.createRole = async(req,res)=>{

try{

const role = new Role(req.body)
await role.save()

res.json(role)

}catch(err){
res.status(500).json(err)
}
}

exports.getAllRoles = async(req,res)=>{

try{

const roles = await Role.find()

res.json(roles)

}catch(err){
res.status(500).json(err)
}
}

exports.getRoleById = async(req,res)=>{

try{

const role = await Role.findById(req.params.id)

res.json(role)

}catch(err){
res.status(500).json(err)
}
}

exports.updateRole = async(req,res)=>{

try{

const role = await Role.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
)

res.json(role)

}catch(err){
res.status(500).json(err)
}
}

exports.deleteRole = async(req,res)=>{

try{

const role = await Role.findByIdAndDelete(req.params.id)

res.json(role)

}catch(err){
res.status(500).json(err)
}
}

exports.getUsersByRole = async(req,res)=>{

try{

const roleId = req.params.id

const users = await User.find({role:roleId,deleted:false})

res.json(users)

}catch(err){
res.status(500).json(err)
}
}
