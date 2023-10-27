import User from './models/user.js'
import { checkDBConnection } from './config/db.js'
import color from 'colors'
import dotenv from 'dotenv'
import express from 'express'
import router from './routers/userRouter.js'
import slotBooking from './models/slotBooking.js'
import vehicleInformation from './models/vehicleInfo.js'

const app = express()
dotenv.config() 
  
// getting data json and urlencoded
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
   
const PORT = process.env.PORT || 3001
 
// use router 
app.use('/api/v1',router)  
  
// sync database   
User.sync({ force: false })      
vehicleInformation.sync({ force :  false })   
slotBooking.sync({ force: false })
    
// create server 
app.listen(PORT,(err) => { 
  checkDBConnection() 
  if (err) {
    console.log(color.red(` server not run on ${PORT} port number `),err)
  } else {
    console.log(color.blue(` server run on ${PORT} port number`))
  } 
})    