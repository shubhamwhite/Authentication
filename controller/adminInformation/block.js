import RESPONSE from '../../constant/response.js'
import User from '../../models/user.js'

const blockUser = async (req,res) => {
  try {
    const { admin_id, user_id, status } = req.body
    
    // type conversion of status
    const statusOf = +status
    
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
    
    // block User
    if (statusOf === 1) {
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
    if (statusOf === 0) {
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
    console.log(err) 
    return res.status(RESPONSE.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ MESSAGE : RESPONSE.MESSAGES.INTERNAL_SERVER_ERROR })
  }
} 

export { blockUser }