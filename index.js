require("dotenv").config()
const express = require("express")
const app = express();
const conn = require("./db/conn")
const User = require("./models/User")
const exphbs = require("express-handlebars")

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

app.use(express.static("public"))

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