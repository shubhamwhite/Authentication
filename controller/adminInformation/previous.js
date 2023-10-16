import RESPONSE from '../../constant/response.js'
import { Sequelize } from 'sequelize'
import SlotBooking from '../../models/slotBooking.js'
import User from '../../models/user.js'
import VehicleInformation from '../../models/vehicleInfo.js'

const previous = async (req, res) => {
  try {
    const { id } = req.body
    
    // check Admin is existed or not
    const ifExist = await User.findOne({
      where:{
        id,
        role: 'admin'
      }
    })
    
    if (!ifExist) {
      return res.status(RESPONSE.HTTP_STATUS_CODES.NOT_FOUND).json({ MESSAGE: 'Admin is not found' })
    }

    // display previous records
    const previousRecords = await SlotBooking.findAll({
      where: {
        status: {
          [Sequelize.Op.in] : [2]
        }
      },
      attributes: [ 'id', 'startDate', 'endDate', 'city', 'source', 'destination', 'capacity', 'status' ],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id','fName', 'lName', 'id', 'email'],
        },
        {
          model: User,
          as: 'driver',
          attributes: ['id','fName', 'lName', 'id', 'email'],
        },
        {
          model: VehicleInformation,
          as: 'vehicleInformation',
          attributes: ['vehicleName','vehicleNumber','capacity','city'],
        }
      ],
    })
    
    if (previousRecords.length <= 0) {
      return res.status(RESPONSE.HTTP_STATUS_CODES.NOT_FOUND).json({ MESSAGE : RESPONSE.MESSAGES.NOT_FOUND })
    }
    
    const resultAfterMapping = previousRecords.map((item) => ({
      userInformation : {
        id : item.user.id,
        fName : item.user.fName,
        lName : item.user.lName,
        email : item.user.email,
        startDate : item.startDate,
        endDate : item.endDate,
        city : item.city,
        source : item.source,
        destination : item.destination,
        capacity  : item.capacity,
        status : item.status
      },
      driverInformation : {
        id : item.driver.id,
        fname : item.driver.fName,
        lName : item.driver.lName,
        email : item.driver.email,
        vehicleName : item.vehicleInformation.vehicleName,
        vehiclenumber : item.vehicleInformation.vehicleNumber,
        capacity : item.vehicleInformation.capacity,
        city: item.vehicleInformation.city
      }
    }))

    if (previousRecords) {
      return res.status(RESPONSE.HTTP_STATUS_CODES.OK).json({ MESSAGE: RESPONSE.MESSAGES.OK, DATA : resultAfterMapping })
    }
  
  } catch (err) {
    console.log(err)
    return res.status(RESPONSE.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      MESSAGE : RESPONSE.MESSAGES.INTERNAL_SERVER_ERROR 
    })
  }
  
}
  
export { previous }