//Imports
require("dotenv").config()
const express = require("express")
const app = express();
const conn = require("./db/conn")
const User = require("./models/User")
const exphbs = require("express-handlebars")
const Address = require("./models/Address");
const { where } = require("sequelize");

//Configurações e middleware
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//Rotas
app.post("/adduser", async(req,res)=>{
    const name = req.body.name
    const occupation = req.body.occupation
    const user = {name, occupation}

    await User.create(user)
    res.redirect("/allusers")
})

app.get("/allusers", async (req,res)=>{
    const users = await User.findAll({raw:true})
    console.log(users)
    res.render("allusers", {users})
})

app.get("/edit/user/:id", async (req,res)=>{
    const id = req.params.id
    const user = await User.findOne({raw:true, where:{id:id}})
    res.render("edituser", {user})
})

app.post("/edit/user/:id", async (req,res)=>{
    const id = req.params.id
    const name = req.body.name
    const occupation = req.body.occupation

    const user = {name, occupation}
    await User.update(user, {where:{id:id}})
    res.redirect("/allusers")
})

app.post("/address/create", async (req,res)=>{
    const UserId = req.body.UserId
    const street = req.body.street
    const number = req.body.number
    const city = req.body.city

    const address = {UserId, street, number, city}
    await Address.create(address)
    res.redirect("/allusers")
})

app.get("/user/:id", async (req,res)=>{
    const id = req.params.id
    const user = await User.findOne({include:Address,where:{id:id}})
    res.render("user", {user: user.get({plain:true})})
})

app.post("/address/delete", async (req,res)=>{
    const userId = req.body.UserId
    const id = req.body.id
    await Address.destroy({where:{id:id}})
    res.redirect(`/user/${userId}`)
})

app.get("/address/update/:id", async (req,res)=>{
    const id = req.params.id
    const address = await Address.findOne({raw:true, where:{id:id}})
    res.render("editaddress", {address})
})

app.post("/address/update/:id", async (req,res)=>{
    const id = req.params.id
    const userId = req.body.UserId
    const street = req.body.street
    const number = req.body.number
    const city = req.body.city

    const address = {street, number, city}
    await Address.update(address, {where:{id:id}})
    res.redirect(`/user/${userId}`)
    
})

app.get("/adduser", async (req,res)=>{
    res.render("adduser")
})

app.get("/", async(req,res)=>{
    res.render("home")
})

//Conexão com banco
conn.sync()
.then(()=>{
    app.listen(process.env.PORT)
})
.catch((err)=>{
    console.log(err)
})