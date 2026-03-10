
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const userRoutes = require("./routes/userRoutes")
const roleRoutes = require("./routes/roleRoutes")

const app = express()

app.use(bodyParser.json())

mongoose.connect("mongodb://127.0.0.1:27017/userrole")
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err))

app.use("/users", userRoutes)
app.use("/roles", roleRoutes)

app.listen(3000,()=>{
    console.log("Server running at http://localhost:3000")
})
