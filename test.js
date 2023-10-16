const { Sequelize, DataTypes, Op } = require('sequelize')

// Initialize Sequelize with your database connection details
const sequelize = new Sequelize('slotbook', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
})

// Define your models (VehicleInformation and User) here
const VehicleInformation = sequelize.define('VehicleInformation', {
  vehicleName: {
    type: DataTypes.STRING,
  },
  vehicleNumber: {
    type: DataTypes.STRING,
  },
  capacity: {
    type: DataTypes.INTEGER,
  },
  city: {
    type: DataTypes.STRING,
  },
})

const User = sequelize.define('User', {
  fName: {
    type: DataTypes.STRING,
  },
  lName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
  },
})

// Define your update logic based on the input from Postman
app.post('/updateDriver', async (req, res) => {
  const { id, driver_id, action } = req.body

  // Check if the action is 'reject'
  if (action === 2) {
    for (const driver of drivers) {
      if (driver.id === driver_id) {
        // Find the next available driver in the array
        const nextDriver = drivers[(drivers.indexOf(driver) + 1) % drivers.length]

        // Update the database with the next driver's ID
        try {
          await VehicleInformation.update(
            { UserId: nextDriver.id },
            {
              where: {
                id: id,
                city: {
                  [Op.eq]: slotBooking.city,
                },
                capacity: {
                  [Op.gte]: slotBooking.capacity,
                },
              },
            }
          )

          // Send a success response
          return res.status(200).json({ message: 'Driver updated successfully' })
        } catch (error) {
          // Handle database update error
          return res.status(500).json({ error: 'Failed to update driver' })
        }
      }
    }

    // If the provided driver_id is not found in the array, send an error response
    return res.status(400).json({ error: 'Driver not found' })
  } else {
    // Handle other actions if needed
    // ...
  }
})

// Start your Express server
app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
