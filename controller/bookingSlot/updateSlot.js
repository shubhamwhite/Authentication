import { Op } from 'sequelize'
import RESPONSE from '../../constant/response.js'
import SlotBooking from '../../models/slotBooking.js'
import User from '../../models/user.js'
import VehicleInformation from '../../models/vehicleInfo.js'
import isDateTimeValid from '../../helper/dateAndTime/date_format.helper.js'

const updateSlot = async (req, res) => {
  
  try {
    const { id, startDate, endDate, city, source, destination, capacity } = req.body

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

    const user = await User.findOne({ 
      include: [{
        model : SlotBooking,
        where : {
          userId : id
        }
      }],
      where: { 
        id, 
        role: 'user' 
      } 
    })

    // Check if the user exists and has the 'user' role
    if (!user) {
      return res
        .status(RESPONSE.HTTP_STATUS_CODES.NOT_FOUND)
        .json({ MESSAGE: RESPONSE.MESSAGES.NOT_FOUND })
    }  

    // Check start date is valid or not (function)
    if (!isDateTimeValid(startDate)) {
      console.log('hi')
      return res
        .status(RESPONSE.HTTP_STATUS_CODES.FORBIDDEN)
        .json({ MESSAGE: RESPONSE.MESSAGES.FORBIDDEN,
          ERR: 'start date format is not valid' })
    }

    // Check end date is valid or not (function)
    if (!isDateTimeValid(endDate)) { 
      return res
        .status(RESPONSE.HTTP_STATUS_CODES.FORBIDDEN)
        .json({ MESSAGE: RESPONSE.MESSAGES.FORBIDDEN, 
          ERR: 'end date format is not valid' })
    }
    
    // StartDate is greater then about endDate  
    if (startDate >= endDate) {
      return res.status(400).json({ message: 'greater then error' })
    }
     

    // Match data for vehicle information to user create area
    const matchCityAndCapacity = await VehicleInformation.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'fName', 'lName', 'email', 'role'],
        },
      ],
      attributes: ['vehicleName', 'vehicleNumber', 'capacity', 'city'],
      where: {
        city: {
          [Op.eq]: city,
        },
        capacity: {
          [Op.gte]: capacity,
        },
      },
      order: [['capacity', 'ASC']],
    })

    
    // When given data in [] array throw this MESSAGE
    if (matchCityAndCapacity.length === 0) {
      return res.status(RESPONSE.HTTP_STATUS_CODES.NOT_FOUND).json({
        MESSAGES:
          RESPONSE.DRIVER_CODE.driverResponse.DRIVER_CODE.DRIVER_NOT_FOUND,
      })
    }

    // If existed date in that case not consider self date
    const dateChecker = await SlotBooking.findAll({
      where: {
        userId: {
          [Op.notIn] : [id]
        },
        driverId: matchCityAndCapacity[0].User.dataValues.id,
        [Op.or]: [
          {
            [Op.and]: [
              {
                startDate: {
                  [Op.lte]: endDate, 
                },
                endDate: {
                  [Op.gte]: startDate, 
                },
              },
            ],
          },
        ],
      },
    })
    
    if (dateChecker.length > 0) {
      return res.status(RESPONSE.HTTP_STATUS_CODES.BAD_REQUEST).json({
        MESSAGE : RESPONSE.MESSAGES.BAD_REQUEST,
        message : 'date is already book'
      })
    } 
    
    // Format Data
    const formatObj = matchCityAndCapacity.map((result) => ({
      v_id: result.User.id,
      fName: result.User.fName,
      lName: result.User.lName,
      email: result.User.email,
      role: result.User.role,
      vehicleName: result.vehicleName,
      vehicleNumber: result.vehicleNumber,
      capacity: result.capacity,
      city: result.city,
    }))

    const userUpdate = {
      userId: id,
      startDate: isDateTimeValid(startDate),
      endDate: isDateTimeValid(endDate),
      city,
      source,
      destination,
      capacity,
      driverId : matchCityAndCapacity[0].User.id
    }

    // In this case pass id and and update specific data
    const updateSuccessful = await SlotBooking.update(userUpdate, {
      where: {
        userId: id,
      },
    })

    if (updateSuccessful) {
      return res.status(RESPONSE.HTTP_STATUS_CODES.OK).json({
        MESSAGES: RESPONSE.MESSAGES.OK,
        VEHICLEINFORMATION: formatObj[0],
      })
    }
    
  } catch (err) {
    console.log(`Error is: ${err}`)
    return res
      .status(RESPONSE.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ MESSAGES: RESPONSE.MESSAGES.INTERNAL_SERVER_ERROR })
  }
}

export { updateSlot }
