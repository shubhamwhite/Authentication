import vehicleInfo from '../../models/vehicleInfo.js'
import User from '../../models/user.js'
import RESPONSE from '../../constant/response.js'

//  vehicle information delete api 
const vehicleInfodelete = async (req,res) => {
  try {
    // Get the id from the request body
    const { id } = req.body

    // Check if the user exists and has the 'driver' role
    const user = await User.findOne({ where: { id, role: 'driver' } })

    if (!user) {
      return res
        .status(RESPONSE.HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ message: RESPONSE.MESSAGES.UNAUTHORIZED_USER })
    }

    // Check if a vehicle information entry with the given id exists
    const existingVehicleInfo = await vehicleInfo.findOne({
      where:{
        userid: id
      }
    })

    if (!existingVehicleInfo) {
      console.log('Vehicle information not found:', id)
      return res.status(RESPONSE.HTTP_STATUS_CODES.NOT_FOUND).json({
        message: RESPONSE.MESSAGES.NOT_FOUND,
      })
    }

    // Delete the vehicle information entry
    await existingVehicleInfo.destroy()

    res.status(RESPONSE.HTTP_STATUS_CODES.OK).json({
      message: RESPONSE.MESSAGES.OK,
    })
  } catch (error) {
    console.error(error)
    res
      .status(RESPONSE.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: RESPONSE.MESSAGES.INTERNAL_SERVER_ERROR })
  }
}

export { vehicleInfodelete }