import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import color from 'colors'
dotenv.config()

const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  logging: false,
  dialect: 'mysql' 
})

const checkDBConnection = async() => {
  try {
    await sequelize.authenticate()
    console.log(color.black.bgCyan(' Database connection has been estabilished successfully '))
  } catch (error) {
    console.error(color.red('Unable to connect to the database:'), error)
  }
} 

export { sequelize , checkDBConnection }