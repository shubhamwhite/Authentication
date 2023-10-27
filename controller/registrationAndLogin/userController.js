import {
  generateTokenLogin,
  generateTokenRegistration,
} from '../../helper/jwt/jwt_create.helper.js'

import ErrorHandler from '../../util/errorHandler.js'
import RESPONSE from '../../constant/response.js'
import Sequelize from 'sequelize'
import User from '../../models/user.js'
import bcrypt from 'bcrypt'

// registration api
const registration = async (req, res) => {
  try {
    // getting data from body
    const { fName, lName, email, gmail_id, password, role, edit } = req.body
    const editNumber = Number(edit)
    const path = req.file.path // image upload with multer
    

    // This function is only insert 'id' in image name format
    const insertIdInUrl = (path_URL) => {
      const format = path_URL
      const id = user.id 
      const regexPattern = /\/(\d+)-/
      const formattedString = format.replace(regexPattern, `/${id}-profile-pic-$1-`)
      console.log(formattedString)
      return formattedString
    }

    // ############### image upload functionality ########################################################
    let URL_ARRAY = []
    const uploadImage = (getPath) => {
      const splitURL = getPath.split('/')
      for (let getIndex = 0; getIndex < splitURL.length; getIndex++) {
        if (
          getIndex === 4 ||
          getIndex === 3 ||
          getIndex === 2 || 
          getIndex === 1 ||
          getIndex === 0
        ) {
          continue
        }
        const splitedURL = splitURL[getIndex]
        URL_ARRAY.push(splitedURL)
      }
      const ARRAY_URL_GET = URL_ARRAY
      const ARRAY_JOIN = ARRAY_URL_GET.join('/')
      return ARRAY_JOIN
    }
    // console.log(uploadImage(path))
    const path_URL = uploadImage(path)
    
    // ############# edit image upload functionality ######################################################
    if (editNumber === 1) {
      const findId = await User.findOne({
        where: {
          gmail_id: req.body.gmail_id, 
        },
      })
      
      /** update image **/
      const editImage = await User.update({
        image: path_URL
      }, {
        where:{
          id: findId.id,
        } 
      }
      )
      return res.status(400).json({ MESSAGE: 'success upload profile image' })
    }
    
    //  ####################### end work ###################################################################

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
 
    // call format function 
    user.image = insertIdInUrl(path_URL)
    
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
    ErrorHandler.handleServerError(error, res)
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

      console.log('user id is', user.id)
    } else {
      return res
        .status(RESPONSE.HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ MESSAGES: RESPONSE.MESSAGES.UNAUTHORIZED_USER })
    }
  } catch (error) {
    console.error(error)
    ErrorHandler.handleServerError(error, res)
  }
}

export { registration, login }
