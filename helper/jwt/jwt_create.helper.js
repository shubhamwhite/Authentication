import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const secretKey = process.env.JWT_SECRET

const generateTokenRegistration = (user) => { 
  return jwt.sign({ userId: user.id }, secretKey, { expiresIn: '23h' }) 
}

const generateTokenLogin = (user) => { 
  return jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' }) 
}

export { generateTokenRegistration, generateTokenLogin }