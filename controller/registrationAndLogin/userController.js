import { generateTokenLogin, generateTokenRegistration } from '../../helper/jwt/jwt_create.helper.js'

import ErrorHandler from '../../util/errorHandler.js'
import RESPONSE from '../../constant/response.js'
import Sequelize from 'sequelize'
import User from '../../models/user.js'
import bcrypt from 'bcrypt'

// registration api
const registration = async (req, res) => {
  try {
    // getting data from body
    const { fName, lName, email, gmail_id, password, role } = req.body

    // image upload with multer
    const path = req.file.path
    const splitCheckType = path.split('/')

    let imageUploadWithPath = []

    for (let getIndex = 0; getIndex < splitCheckType.length; getIndex++) {
      if (
        getIndex === 4 ||
        getIndex === 3 ||
        getIndex === 2 ||
        getIndex === 1 ||
        getIndex === 0
      ) {
        continue
      }
      imageUploadWithPath.push(splitCheckType[getIndex])
    } 
    
    //find email or gmail_id
    const ifExistingUser = await User.findOne({
      where: {
        [Sequelize.Op.or]: [ 
          { email },
          {
            [Sequelize.Op.and]: [
              { gmail_id: { [Sequelize.Op.not]: '' } },
              { gmail_id },
            ],
          }, 
        ],
      },
    })

    // check condition user is exist or not
    if (ifExistingUser) {
      return res
        .status(RESPONSE.HTTP_STATUS_CODES.CONFLICT)
        .json({ MESSAGES: RESPONSE.MESSAGES.CONFLIT.USER_ALREADY_EXISTED })
    }

    // password hashing
    const hashPassword = await bcrypt.hash(password, 10)

    // Create a user object without gmail_id if it's not provided
    const userObj = {
      fName,
      lName,
      email,
      gmail_id: '',
      password: hashPassword,
      role,
    }

    if (gmail_id) {
      userObj.gmail_id = gmail_id
    }

    // create user in database
    const user = await User.create(userObj)  
    
    // logic is inserted id in between image name
    imageUploadWithPath.splice(2,1,`${user.id}-${'profile_picture'}-${imageUploadWithPath[2]}`) // array in middle of putting
    const joinWithSlash = imageUploadWithPath.join('/')
    user.image = joinWithSlash // insert in user table #field name is image
    
    await user.save()
    
    // generate user token
    const token = generateTokenRegistration(user)
    
    res.status(RESPONSE.HTTP_STATUS_CODES.CREATED).json({
      MESSAGES: RESPONSE.MESSAGES.USER_CREATED,
      DATA: user,
      token: token,
    })
    
  } catch (error) {
    console.error(error)
    ErrorHandler.handleServerError(error,res)
  }
}

// login api
const login = async (req, res) => {
  try {
    // getting data from body
    const { type, email, gmail_id, password } = req.body

    const ifCheck = await User.findAll({
      where: {
        block: 1,
        ...(email && { email: email }),
        ...(gmail_id && { gmail_id: gmail_id }),
      },
    })

    // check user block or not
    if (ifCheck.length >= 1) {
      return res
        .status(RESPONSE.HTTP_STATUS_CODES.BAD_REQUEST)
        .json({ MESSAGES: RESPONSE.MESSAGES.BAD_REQUEST })
    }

    let user
    // type check email or gmail_id
    if (type === 'email') {
      user = await User.findOne({ where: { email } })
    } else if (type === 'gmail_id') {
      user = await User.findOne({ where: { gmail_id } })
    } else {
      return res
        .status(RESPONSE.HTTP_STATUS_CODES.BAD_REQUEST)
        .json({ MESSAGES: RESPONSE.MESSAGES.INVALID_LOGIN_TYPE })
    }

    // is not gmail id or email
    if (!user) {
      return res
        .status(RESPONSE.HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ MESSAGES: RESPONSE.MESSAGES.UNAUTHORIZED_USER })
    }

    // bcrypt matching like (password === user.password)
    const passwordMatch = await bcrypt.compare(password, user.password)

    // bcrypt password match to (password === user.password) pass message
    if (passwordMatch) {
      const token = generateTokenLogin(user)
      res.status(RESPONSE.HTTP_STATUS_CODES.OK).json({
        MESSAGES: RESPONSE.MESSAGES.OK,
        user: user,
        token: token,
      })
      
      console.log('user id is',user.id)
      
    } else {
      return res
        .status(RESPONSE.HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ MESSAGES: RESPONSE.MESSAGES.UNAUTHORIZED_USER })
    }
  } catch (error) {
    console.error(error)
    ErrorHandler.handleServerError(error,res)
  }
}

export { registration, login }
