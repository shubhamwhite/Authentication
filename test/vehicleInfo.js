import vehicleInfo from '../models/vehicleInfo.js'

const data = 
[
  {
    'capacity': 1000,
    'vehicleName': 'Truck',
    'vehicleNumber': 'GJ01AB1234',
    'city': 'Ahmedabad',
    'userId': 1
  },
  {
    'capacity': 1500,
    'vehicleName': 'Van',
    'vehicleNumber': 'GJ02CD5678',
    'city': 'Surat',
    'userId': 4
  },
  {
    'capacity': 2500,
    'vehicleName': 'Truck',
    'vehicleNumber': 'GJ04GH3456',
    'city': 'Rajkot',
    'userId': 8
  },
  {
    'capacity': 3000,
    'vehicleName': 'Van',
    'vehicleNumber': 'GJ05IJ7890',
    'city': 'Bhavnagar',
    'userId': 12
  },
  {
    'capacity': 3500,
    'vehicleName': 'SUV',
    'vehicleNumber': 'GJ06KL1234',
    'city': 'Jamnagar',
    'userId': 14
  },
  {
    'capacity': 4000,
    'vehicleName': 'Truck',
    'vehicleNumber': 'GJ07MN5678',
    'city': 'Gandhinagar',
    'userId': 18
  },
  {
    'capacity': 4500,
    'vehicleName': 'Van',
    'vehicleNumber': 'GJ08OP9012',
    'city': 'Junagadh',
    'userId': 20
  },
  {
    'capacity': 5000,
    'vehicleName': 'SUV',
    'vehicleNumber': 'GJ09QR3456',
    'city': 'Ahmedabad',
    'userId': 24
  },
  {
    'capacity': 5500,
    'vehicleName': 'Truck',
    'vehicleNumber': 'GJ10ST7890',
    'city': 'Surat',
    'userId': 27
  },
  {
    'capacity': 6000,
    'vehicleName': 'Van',
    'vehicleNumber': 'GJ11UV1234',
    'city': 'Vadodara',
    'userId': 35
  },
  {
    'capacity': 6500,
    'vehicleName': 'SUV',
    'vehicleNumber': 'GJ12WX5678',
    'city': 'Rajkot',
    'userId': 38
  },
  {
    'capacity': 7000,
    'vehicleName': 'Truck',
    'vehicleNumber': 'GJ13YZ9012',
    'city': 'Bhavnagar',
    'userId': 41
  },
  {
    'capacity': 1500,
    'vehicleName': 'Van',
    'vehicleNumber': 'GJ14AB1234',
    'city': 'Jamnagar',
    'userId': 43
  },
  {
    'capacity': 2000,
    'vehicleName': 'SUV',
    'vehicleNumber': 'GJ15CD5678',
    'city': 'Gandhinagar',
    'userId': 48
  },
  {
    'capacity': 2500,
    'vehicleName': 'Truck',
    'vehicleNumber': 'GJ16EF9012',
    'city': 'Junagadh',
    'userId': 51
  },
  {
    'capacity': 3000,
    'vehicleName': 'Van',
    'vehicleNumber': 'GJ17GH3456',
    'city': 'Ahmedabad',
    'userId': 55
  },
  {
    'capacity': 3500,
    'vehicleName': 'SUV',
    'vehicleNumber': 'GJ18IJ7890',
    'city': 'Surat',
    'userId': 57
  },
  {
    'capacity': 4000,
    'vehicleName': 'Truck',
    'vehicleNumber': 'GJ19KL1234',
    'city': 'Vadodara',
    'userId': 59
  }
]

  

const bulkInsertUsers = async () => {
  for (const userObj of data) {
    try {
      const { userId, capacity, vehicleName, vehicleNumber, city } = userObj


      // Create a user object
      const newUser = {
        userId,
        capacity,
        vehicleNumber,
        vehicleName,
        city
      }


      // Create user in the database
      const user = await vehicleInfo.create(newUser)


      console.log(`created ${user}`)
    } catch (error) {
      console.error(`Error creating user: ${error.message}`)
    }
  }
}

bulkInsertUsers()
