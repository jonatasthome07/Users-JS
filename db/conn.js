const {Sequelize} = require("sequelize")
const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql"
  }
)

async function Connection() {
  try {
    await db.authenticate()
    console.log("Conectado com sucesso!")
  } catch (error) {
    console.log(error)
  }
}

Connection();
module.exports = db;