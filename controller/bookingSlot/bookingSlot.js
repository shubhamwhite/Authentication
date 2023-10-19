import { Op } from 'sequelize'
import RESPONSE from '../../constant/response.js'
import User from '../../models/user.js'
import bookingSlotTable from '../../models/slotBooking.js'
import isDateTimeValid from '../../helper/pickupDate.js'
import vehicleinfoTable from '../../models/vehicleInfo.js'

const slotInformation = async (req, res) => {
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
      return res.status(RESPONSE.HTTP_STATUS_CODES.BAD_REQUEST).json({ MESSAGES : RESPONSE.MESSAGES.BAD_REQUEST })
    }
    
    const user = await User.findOne({ where: { id, role: 'user' } })
    
    // Check if the user exists and has the 'user' role
    if (!user) {
      return res
        .status(RESPONSE.HTTP_STATUS_CODES.NOT_FOUND)
        .json({ MESSAGE: RESPONSE.MESSAGES.NOT_FOUND })
    }

    const userInoCheckreapetId = await bookingSlotTable.findOne({
      where: {
        userId: id,
      },
    })

    // check do not repeat the id in creation time
    if (userInoCheckreapetId) {
      return res
        .status(RESPONSE.HTTP_STATUS_CODES.CONFLICT)
        .json({ MESSAGE: RESPONSE.MESSAGES.CONFLIT.USER_ALREADY_EXISTED })
    }

    // Check start date is valid or not
    if (!isDateTimeValid(startDate)) {
      return res
        .status(RESPONSE.HTTP_STATUS_CODES.FORBIDDEN)
        .json({ MESSAGE: RESPONSE.MESSAGES.FORBIDDEN,
          addtional: 'start date format is not valid' })
    }

    // Check end date is valid or not
    if (!isDateTimeValid(endDate)) { 
      return res
        .status(RESPONSE.HTTP_STATUS_CODES.FORBIDDEN)
        .json({ MESSAGE: RESPONSE.MESSAGES.FORBIDDEN, 
          addtional: 'end date format is not valid' })
    }

    // startDate is greater then about endDate
    if (startDate >= endDate) {
      return res.status(400).json({ message: 'greater then error' })
    }

   
    // Match city and capacity
    const matchCityAndCapacity = await vehicleinfoTable.findAll({
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
        
    // Find same location
    if (matchCityAndCapacity.length === 0) {
      return res.status(
        RESPONSE.HTTP_STATUS_CODES.NOT_FOUND).json({
        MESSAGES: RESPONSE.DRIVER_CODE.driverResponse.DRIVER_CODE.DRIVER_NOT_FOUND,
      })
    }
    
    // If existed date     
    const dateChecker = await bookingSlotTable.findAll({
      where: {
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
    
    // Using map for formating object
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
      image: result.image,
    }))

    const userCreated = {
      userId: id,
      startDate,
      endDate,
      city,
      source,
      destination,
      capacity, 
      driverId: matchCityAndCapacity[0].User.id,
    }
    
    const createUserInfo = await bookingSlotTable.create(userCreated)
    
    if (createUserInfo) {
      return res.status(RESPONSE.HTTP_STATUS_CODES.OK).json({
        MESSAGES: RESPONSE.MESSAGES.OK,
        VEHICLEINFORMATION: formatObj[0],
      })
    }
  } catch (err) {
    console.log(err)
    return res
      .status(RESPONSE.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ MESSAGE: RESPONSE.MESSAGES.INTERNAL_SERVER_ERROR })
  }
}

export { slotInformation }
