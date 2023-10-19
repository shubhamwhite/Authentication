import { Op } from 'sequelize'
import RESPONSE from '../../constant/response.js'
import User from '../../models/user.js'
import vehicleInfo from '../../models/vehicleInfo.js'

// vehicle information update
const vehicleInfoUpdate = async (req,res) => {
  try {
    // Get data from the request body
    const { id, capacity, vehicleName, vehicleNumber, city } = req.body

    // Check if the user exists and has the 'driver' role
    const user = await User.findOne({ where: { id, role: 'driver' } })
    
    if (!user) {
      return res
        .status(RESPONSE.HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ message: RESPONSE.MESSAGES.UNAUTHORIZED_USER })
    }
   
    // check if capacity is number formate or not
    const capacityInNumber = Number(capacity)

    if (isNaN (capacityInNumber)) {
      return res.status(RESPONSE.HTTP_STATUS_CODES.FORBIDDEN).json({ message: `Capacity in must be number format, ${RESPONSE.MESSAGES.FORBIDDEN}` })
    } 

    // user id is existed or not
    const existingVehicleInfo = await vehicleInfo.findOne({
      where: { 
        userId: id,
      },
    }) 

    if (!existingVehicleInfo) { 
      return res.status(RESPONSE.HTTP_STATUS_CODES.NOT_FOUND).json({
        message: RESPONSE.MESSAGES.NOT_FOUND,
      })
    }

    // check vehicle number is existed or not 
    const vehicleNumberExisted = await vehicleInfo.findAll({
      where: {
        vehicleNumber: vehicleNumber,
        userId: {
          [Op.notIn] : [id]
        },
      },
    })
    
    console.log(vehicleNumberExisted)
    if (vehicleNumberExisted.length > 0) {
      return res.status(RESPONSE.HTTP_STATUS_CODES.CONFLICT).json({
        message :`Vehicle Number is ${RESPONSE.MESSAGES.CONFLIT.USER_ALREADY_EXISTED}`
      })
    }
    

    // Update the existing vehicle information
    await existingVehicleInfo.update({
      capacity: capacityInNumber,
      vehicleName,
      vehicleNumber,
      city
    })
    
    res.status(RESPONSE.HTTP_STATUS_CODES.OK).json({
      message: RESPONSE.MESSAGES.OK, 
      driverInfo:  existingVehicleInfo
    })
  } catch (error) {
    console.error(error)
    res
      .status(RESPONSE.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: RESPONSE.MESSAGES.INTERNAL_SERVER_ERROR })
  }
}

export { vehicleInfoUpdate }