import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import response from '../constant/response.js'

dotenv.config() 

// Your secret key for JWT
const secretKey = process.env.JWT_SECRET

// Middleware to verify JWT token
const verifyTokenBody = (req, res, next) => { 
  
  const token = req.body.token
  const id = req.body.id
  const ifOfNumber = Number(id)
  // console.log(typeof ifOfNumber)

  if (!token) { 
    return res.status(response.HTTP_STATUS_CODES.UNAUTHORIZED).json({ message: response.MESSAGES.UNAUTHORIZED_USER, ERR : 'user is unauthorized using token' })
  } 
  try {
    const decoded = jwt.verify(token, secretKey)    
    req.userId = decoded.userId
    // console.log('middleware body',typeof req.userId)
    if (ifOfNumber !== req.userId) {
      return res.status(403).json({ message: 'unauthorized user with this token' })
    }
    next()
  } catch (error) { 
    console.log(error)
    return res.status(response.HTTP_STATUS_CODES.FORBIDDEN).json({ message: response.MESSAGES.FORBIDDEN, ERR : 'invalid token format' })
  }
}

export { verifyTokenBody }