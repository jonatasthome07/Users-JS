require("dotenv").config()
const express = require("express")
const app = express();
const conn = require("./db/conn")
const User = require("./models/User")
const exphbs = require("express-handlebars")


conn.sync()
.then(()=>{
    app.listen(process.env.PORT)
})
.catch((err)=>{
    console.log(err)
})