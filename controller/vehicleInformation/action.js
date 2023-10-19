import { Op } from 'sequelize'
import RESPONSE from '../../constant/response.js'
import SlotBooking from '../../models/slotBooking.js'
import User from '../../models/user.js'
import VehicleInformation from '../../models/vehicleInfo.js'

let matchCityAndCapacites = []

const actionRequest = async (req, res) => {
  try {
    const { driver_id, booking_id, action } = req.body


    
    const ifExist = await User.findOne({
      where: {
        id: driver_id,
        role: 'driver',
      },
    })

    // Check if not existed
    if (!ifExist) {
      console.log('driver is not available in User table') 
      return res.status(RESPONSE.HTTP_STATUS_CODES.NOT_FOUND).json({
        MESSAGE: RESPONSE.MESSAGES.NOT_FOUND,
      })
    }

    const ifDriverExist = await SlotBooking.findOne({
      where: {
        driverId: driver_id,
      },
    })

    // Check inserted id is present in driver table or not
    if (!ifDriverExist) {
      console.log('driver is not available in booking table')
      return res.status(RESPONSE.HTTP_STATUS_CODES.NOT_FOUND).json({
        MESSAGE: RESPONSE.MESSAGES.NOT_FOUND,
      })
    }

    // Find id and apply algorithm
    const slotBooking = await SlotBooking.findOne(
      {
        where: {
          id: booking_id,
          driverId : driver_id
        },
      })
    const driverNotFound = slotBooking
    if (!driverNotFound) {
      return res.status(RESPONSE.HTTP_STATUS_CODES.NOT_FOUND).json({
        MESSAGE: 'driver not found',
      })
    }

    // perform action reject or accept
    const updateAction = await SlotBooking.update(
      {
        status: action, // 2, 1
      },
      {
        where: {
          id: booking_id, // 1, 2, 3
        },
      }
    )

    // match information
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
          [Op.eq]: slotBooking.city,
        },
        capacity: {
          [Op.gte]: slotBooking.capacity,
        },
      },
      order: [['capacity', 'ASC']],
    })

    matchCityAndCapacites = matchCityAndCapacity // assign the value

    if (matchCityAndCapacity.length === 0) {
      return res.status(RESPONSE.HTTP_STATUS_CODES.NOT_FOUND).json({
        MESSAGES:
          RESPONSE.DRIVER_CODE.driverResponse.DRIVER_CODE.DRIVER_NOT_FOUND,
      })
    }
   

    // create algorithm next driver assign
    if (action === 2) {
      
      const lastArray = []
      const lastDriver = matchCityAndCapacites[matchCityAndCapacites.length - 1]
      lastArray.push(lastDriver)
    
      for (let driver of matchCityAndCapacites) {

        if (driver.User.id === driver_id) {
          
          const nextDriverIndex = matchCityAndCapacites.indexOf(driver) //
   
          if (nextDriverIndex === -1) {
            return res.status(400).json({
              MESSAGES: 'Driver not found in the list.',
            })
          }

          const nextDriver =
            driver === lastDriver ? null : matchCityAndCapacites[
              (matchCityAndCapacites.indexOf(driver) + 1) %
                    matchCityAndCapacites.length
            ]
            
          if (nextDriver === 2) {
            return res.status(400).json({
              MESSAGE: ' ',
            })
          }
           
          try {
            if (nextDriver) {
              await SlotBooking.update(
                {
                  driverId: nextDriver.User.id,
                  status: 0,
                },
                {
                  where: {
                    id: booking_id,
                  },
                }
              )
            }             
          } catch (err) {
            console.log('not update: ', err)
          }
        }
      }
    }
    
    if (updateAction) {
      return res.status(400).json({
        MESSAGE: 'send Action successfully ',
      })
    }
    
  } catch (err) {
    console.log(err)
    return res
      .status(RESPONSE.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ MESSAGE: RESPONSE.MESSAGES.INTERNAL_SERVER_ERROR })
  }
}

export { actionRequest }
