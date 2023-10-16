// Import necessary libraries and models
import vehicleInfo from '../../models/vehicleInfo.js'
import User from '../../models/user.js'
import RESPONSE from '../../constant/response.js'

// Fill in vehicle information API
const vehicleInformations = async (req, res) => {
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
    
    // Check if capacity is number formate or not
    const capacityInNumber = Number(capacity)

    if (isNaN (capacityInNumber)) {
      return res.status(RESPONSE.HTTP_STATUS_CODES.FORBIDDEN).json({ message: `Capacity in must be number format, ${RESPONSE.MESSAGES.FORBIDDEN}` })
    } 

    // User create data one time 
    const ifIdisExisted = await vehicleInfo.findOne({
      where:{
        userId : id
      }
    })

    if (ifIdisExisted) {
      return res.status(RESPONSE.HTTP_STATUS_CODES.CONFLICT).json({ message : RESPONSE.MESSAGES.CONFLIT.USER_ALREADY_EXISTED })
    }

    // Vehicle number is existed or not
    const vehicleNumExisted = await vehicleInfo.findOne({
      where:{
        vehicleNumber
      }
    })

    if (vehicleNumExisted) {
      return res.status(RESPONSE.HTTP_STATUS_CODES.CONFLICT).json({ message : RESPONSE.MESSAGES.CONFLIT.USER_ALREADY_EXISTED })
    }
    
    // Create a driver information object
    const driverInfo = {
      userId: id,
      capacity,
      vehicleNumber,
      vehicleName,
      city
    }


    // Create or update the driver information in the DriverInformation table
    await vehicleInfo.create(driverInfo)

    res.status(RESPONSE.HTTP_STATUS_CODES.OK).json({
      message: RESPONSE.MESSAGES.OK, 
      driverInfo
    })
  } catch (error) {
    console.error(error)
    res
      .status(RESPONSE.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: RESPONSE.MESSAGES.INTERNAL_SERVER_ERROR })
  }
}

export { vehicleInformations }
