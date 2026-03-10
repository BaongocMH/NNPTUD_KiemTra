const User = require("../models/User")
const Role = require("../models/Role")

exports.createUser = async(req,res)=>{
try{

const user = new User(req.body)
await user.save()

res.json(user)

}catch(err){
res.status(500).json(err)
}
}

exports.getAllUsers = async(req,res)=>{

try{

let query = {deleted:false}

if(req.query.username){
query.username = {$regex:req.query.username,$options:"i"}
}

const users = await User.find(query).populate("role")

res.json(users)

}catch(err){
res.status(500).json(err)
}
}

exports.getUserById = async(req,res)=>{

try{

const user = await User.findById(req.params.id).populate("role")

res.json(user)

}catch(err){
res.status(500).json(err)
}
}

exports.updateUser = async(req,res)=>{

try{

const user = await User.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
)

res.json(user)

}catch(err){
res.status(500).json(err)
}
}

exports.deleteUser = async(req,res)=>{

try{

const user = await User.findByIdAndUpdate(
req.params.id,
{deleted:true},
{new:true}
)

res.json(user)

}catch(err){
res.status(500).json(err)
}
}

exports.enableUser = async(req,res)=>{

try{

const {email,username} = req.body

const user = await User.findOne({email,username})

if(!user){
return res.status(404).json({message:"User not found"})
}

user.status = true
await user.save()

res.json(user)

}catch(err){
res.status(500).json(err)
}
}

exports.disableUser = async(req,res)=>{

try{

const {email,username} = req.body

const user = await User.findOne({email,username})

if(!user){
return res.status(404).json({message:"User not found"})
}

user.status = false
await user.save()

res.json(user)

}catch(err){
res.status(500).json(err)
}
}

exports.assignRole = async(req,res)=>{

try{

const userId = req.params.id
const {roleId} = req.body

const user = await User.findById(userId)
const role = await Role.findById(roleId)

if(!user || !role){
return res.status(404).json({message:"User or Role not found"})
}

user.role = roleId

await user.save()

res.json({
message:"Role assigned successfully",
user
})

}catch(err){
res.status(500).json(err)
}
}