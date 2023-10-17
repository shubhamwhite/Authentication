import dotenv from 'dotenv'
// using jwt token verification
import jwt from 'jsonwebtoken'
import response from '../constant/response.js'

dotenv.config() 

// Your secret key for JWT
const secretKey = process.env.JWT_SECRET

// Middleware to generate a JWT token
const generateToken = (user) => {
  return jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' }) 
}
 
// Middleware to verify JWT token
const verifyToken = (req, res, next) => { 
  
  const token = req.header('Authorization')
  const split_token = token.split(' ') 
  const tokenOne = split_token[1]

  if (!tokenOne) { 
    return res.status(response.HTTP_STATUS_CODES.UNAUTHORIZED).json({ message: response.MESSAGES.UNAUTHORIZED_USER })
  }
  try {
    const decoded = jwt.verify(tokenOne, secretKey)
    req.userId = decoded.userId
    next()
  } catch (error) { 
    console.log(error)
    return res.status(response.HTTP_STATUS_CODES.FORBIDDEN).json({ message: response.MESSAGES.FORBIDDEN })
  }
}

export { generateToken, verifyToken }