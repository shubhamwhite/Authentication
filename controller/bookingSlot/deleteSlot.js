import slotBooking from '../../models/slotBooking.js'
import User from '../../models/user.js'
import RESPONSE from '../../constant/response.js'


const deleteSlot = async (req, res) => {
  try {
    const { id } = req.body

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
    res.status(RESPONSE.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ MESSAGE : RESPONSE.MESSAGES.INTERNAL_SERVER_ERROR })
  }

}

export { deleteSlot }