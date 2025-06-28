require("dotenv").config()
const express = require("express")
const app = express();
const conn = require("./db/conn")
const User = require("./models/User")
const exphbs = require("express-handlebars")
const Address = require("./models/Address")

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.post("/adduser", async(req,res)=>{
    const name = req.body.name
    const occupation = req.body.occupation
    const user = {name, occupation}

    await User.create(user)
    res.redirect("/")
})

app.get("/allusers", async (req,res)=>{
    const users = await User.findAll({raw:true})
    console.log(users)
    res.render("allusers", {users})
})

app.get("/adduser", async (req,res)=>{
    res.render("adduser")
})

app.get("/", async(req,res)=>{
    res.render("home")
})

conn.sync()
.then(()=>{
    app.listen(process.env.PORT)
})
.catch((err)=>{
    console.log(err)
})