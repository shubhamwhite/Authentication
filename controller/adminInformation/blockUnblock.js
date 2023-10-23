import ErrorHandler from '../../util/errorHandler.js'
import RESPONSE from '../../constant/response.js'
import User from '../../models/user.js'

const blockUser = async (req,res) => {
  
  try {
    const { admin_id, user_id, status } = req.body
    
    // type conversion of status (number)
    const statusOf = Number(status)
    const userOf = Number(user_id)
    
    // if check admin is login or not
    const ifExist = await User.findOne({ 
      where : {
        id : admin_id,
        role: 'admin' 
      }
    })
    
    if (ifExist <= 0) {
      return res.status(RESPONSE.HTTP_STATUS_CODES.NOT_FOUND).json({ MESSAGE : RESPONSE.MESSAGES.NOT_FOUND })
    }
  
    // not self block 
    if (userOf === 6) {
      return res.status(RESPONSE.HTTP_STATUS_CODES.BAD_REQUEST).json({ MESSAGE : RESPONSE.MESSAGES.BAD_REQUEST })
    }
    
    // block User
    if (statusOf === RESPONSE.MESSAGES.general.FLAGES.BLOCK) {
      const blockedUser = await User.update(
        {
          block : status
        },
        {
          where: {
            id : user_id
          }
        })
      
      if (blockedUser) {
        return res.status(RESPONSE.HTTP_STATUS_CODES.OK).json({ MESSAGE : RESPONSE.MESSAGES.OK , BLOCK_ID : user_id })
      }
    }

    // unblock User
    if (statusOf === RESPONSE.MESSAGES.general.FLAGES.UNBLOCK) {
      const blockedUser = await User.update(
        {
          block : null
        },
        {
          where: {
            id : user_id
          }
        })
      
      if (blockedUser) {
        return res.status(RESPONSE.HTTP_STATUS_CODES.OK).json({ MESSAGE : RESPONSE.MESSAGES.OK , UNBLOCK_ID : user_id })
      }
    }
    
  } catch (err) {
    console.error(err)
    ErrorHandler.handleServerError(err,res)
  }
} 

export { blockUser }