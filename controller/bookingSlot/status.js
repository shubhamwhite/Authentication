// User side notification
import User from '../../models/user.js'
import SlotBooking from '../../models/slotBooking.js'
import VehicleInformation from '../../models/vehicleInfo.js'
import RESPONSE from '../../constant/response.js'

const status = async (req, res) => {
  try {
    
    const { id } = req.body
    
    // If existed and they user or not
    const ifExisted = await User.findOne({
      where: {
        id,
        role: 'user'
      }
    })

    if (!ifExisted) {
      return res.status(RESPONSE.HTTP_STATUS_CODES.NOT_FOUND).json({
        MESSEGE : RESPONSE.MESSAGES.NOT_FOUND
      })
    }
    
    // If user exited in Slotbooking table 
    const ifSlotBookingExistOrNot = await SlotBooking.findOne({
      where : {
        userId : id
      }
    })
    if (!ifSlotBookingExistOrNot) {
      return res.status(RESPONSE.HTTP_STATUS_CODES.NOT_FOUND).json({
        MESSEGE : RESPONSE.MESSAGES.NOT_FOUND
      })
    }
    
    // get status which like 0,1,2
    const getStatus = await SlotBooking.findOne({
      where: { 
        userId: id,
        status: ifSlotBookingExistOrNot.status
      }
    })

    // get information accepted driver information
    const information = await VehicleInformation.findAll({
      attributes: ['vehicleName','vehicleNumber','capacity','city'],
      include: [{
        model : User,
        attributes : ['id','fName','lName','email','role'],
      }],
      where:{
        userId : getStatus.driverId
      }
    })

    const fomatData = information.map((result) => ({
      id : result.User.id,
      fName : result.User.fName,
      lName : result.User.lName,
      email : result.User.email,
      role : result.User.role,
      vehicleName : result.vehicleName,
      vehicleNumber : result.vehicleNumber,
      capacity : result.capacity,
      city : result.city
    }))

    // create switch case and find 0, 1, 2
    switch (getStatus.status) {
      case 0:
        return res.status(RESPONSE.HTTP_STATUS_CODES.ACCEPTED).json({
          MESSAGE : RESPONSE.MESSAGES.ACCEPTED.ACCEPTED_P
        })
      case 1:
        return res.status(RESPONSE.HTTP_STATUS_CODES.OK).json({
          MESSAGE : RESPONSE.MESSAGES.OK,
          Data : fomatData
        }) 
      case 2:
        return res.status(RESPONSE.HTTP_STATUS_CODES.FORBIDDEN).json({
          MESSAGE : 'request is Rejected'
        })
      default: 
        console.log('somthing went wrong')
    }

  } catch (err) {
    console.log(err)
    return res.status(RESPONSE.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ MESSAGE : RESPONSE.MESSAGES.INTERNAL_SERVER_ERROR })
  }
}

export { status }