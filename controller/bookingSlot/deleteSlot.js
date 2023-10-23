import ErrorHandler from '../../util/errorHandler.js'
import RESPONSE from '../../constant/response.js'
import User from '../../models/user.js'
import slotBooking from '../../models/slotBooking.js'

const deleteSlot = async (req, res) => {
  try {
    const { id } = req.body


    const ifCheck = await User.findAll({
      where: {
        block: 1,
        id : id
      }
    })
    
    // check user block or not
    if (ifCheck.length >= 1) {
      return res.status(RESPONSE.HTTP_STATUS_CODES.BAD_REQUEST).json({ MESSAGE : RESPONSE.MESSAGES.BAD_REQUEST })
    }
    

    // match user id with role
    const matchedOrNot = await User.findOne({
      where: {
        id,
        role: 'user'
      }
    })
      
    if (!matchedOrNot) {
      return res.status(RESPONSE.HTTP_STATUS_CODES.NOT_FOUND).json({ MESSAGE : RESPONSE.MESSAGES.NOT_FOUND })
    }
      
    // check id is existed or not 
    const ifExistedOrNot = await slotBooking.findOne({
      where: {
        userId : id
      }
    })
      
    if (!ifExistedOrNot) {
      return res.status(RESPONSE.HTTP_STATUS_CODES.NOT_FOUND).json({ MESSAGE: RESPONSE.MESSAGES.NOT_FOUND })
    }
      
    const destroyed = await ifExistedOrNot.destroy(id)
    if (destroyed) {
      return res.status(RESPONSE.HTTP_STATUS_CODES.OK).json({ MESSAGE: RESPONSE.MESSAGES.general.GENERAL.DELETE })
    }
  } catch (err) {
    console.log(err)
    ErrorHandler.handleServerError(err, res)
  }

}

export { deleteSlot }