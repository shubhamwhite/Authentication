// driver side notification
import RESPONSE from '../../constant/response.js'
import SlotBooking from '../../models/slotBooking.js'
import User from '../../models/user.js'
import currentDateFormate from '../../helper/dateAndTime/current_dateAndTime.helper.js'

// Notification API
const notification = async (req, res) => {
  try {
    const { id } = req.body // driver id pass by body

    // check diver id existed in user table or not
    const checkDriverOrNot = await User.findOne({
      where: {
        id,
        role: 'driver',
      },
    })

    if (!checkDriverOrNot) {
      return res
        .status(RESPONSE.HTTP_STATUS_CODES.NOT_FOUND)
        .json({ MESSAGE: RESPONSE.DRIVER_CODE.driverResponse.DRIVER_CODE.NOT_DRIVER })
    }

    //  check driver id existed or not in slot booking table
    const checkBookTableExistedOr = await SlotBooking.findAll({
      where: {
        driverId: id,
      },
    })
 
    if (checkBookTableExistedOr <= 0) {
      return res 
        .status(RESPONSE.HTTP_STATUS_CODES.NOT_FOUND)
        .json({ MESSAGE: RESPONSE.DRIVER_CODE.driverResponse.DRIVER_CODE.NOT_ANY_REQUEST })
    }

    // get all information about user
    const getFullInformation = await SlotBooking.findAll({
      include: {
        model: User,
        attributes: [['id','user_id'], 'fName', 'lName', 'email', 'role'],
      },
      where: { 
        driverId: id, 
      },  
      attributes: [['id','booking_id'],'startDate','endDate', 'city', 'capacity', 'status']
    })  

    // if less than date about present date 
    //   2023-10-15 09:46 AM                             2023-10-18 17:17 PM
    if ((checkBookTableExistedOr[0].dataValues.endDate) < currentDateFormate) {
      return res.status(RESPONSE.HTTP_STATUS_CODES.NOT_FOUND).json({ 
        MESSAGE : RESPONSE.DRIVER_CODE.driverResponse.DRIVER_CODE.OUTDATED
      })
    }
    
    // If not available any request in the notification
    if (
      (Array.isArray(getFullInformation) && getFullInformation.length === 0)
    ) {
      return res.status(RESPONSE.HTTP_STATUS_CODES.NOT_FOUND).json({
        MESSAGE: RESPONSE.DRIVER_CODE.driverResponse.DRIVER_CODE.NOT_ANY_REQUEST,
      })
    }

    // Everything is ok then execute this code
    if (getFullInformation) {
      return res
        .status(RESPONSE.HTTP_STATUS_CODES.OK)
        .json({ 
          MESSAGE: RESPONSE.MESSAGES.OK, 
          DATA : getFullInformation 
        })
    }
  } catch (err) {
    console.log(err)
    return res.status(RESPONSE.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      MESSAGE: RESPONSE.MESSAGES.INTERNAL_SERVER_ERROR,
    })
  }
}

export { notification }
