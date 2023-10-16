import slotBookingTable from '../models/slotBooking.js'

const data = 
[
  {
    'userId': 3,
    'pickupDateTime': '2023-09-27 10:00 AM',
    'city': 'Ahmedabad',
    'source': 'Area1',
    'destination': 'Area2',
    'capacity': 1000
  },
  {
    'userId': 5,
    'pickupDateTime': '2023-09-28 02:30 PM',
    'city': 'Surat',
    'source': 'Area3',
    'destination': 'Area4',
    'capacity': 1500
  },
  {
    'userId': 10,
    'pickupDateTime': '2023-09-30 04:45 PM',
    'city': 'Rajkot',
    'source': 'Area7',
    'destination': 'Area8',
    'capacity': 2500
  },
  {
    'userId': 22,
    'pickupDateTime': '2023-10-04 01:10 PM',
    'city': 'Junagadh',
    'source': 'Area15',
    'destination': 'Area16',
    'capacity': 4500
  },
  {
    'userId': 29,
    'pickupDateTime': '2023-10-06 02:40 PM',
    'city': 'Surat',
    'source': 'Area19',
    'destination': 'Area20',
    'capacity': 5500
  },
  {
    'userId': 36,
    'pickupDateTime': '2023-10-09 11:00 AM',
    'city': 'Bhavnagar',
    'source': 'Area25',
    'destination': 'Area26',
    'capacity': 7000
  },
  {
    'userId': 46,
    'pickupDateTime': '2023-10-12 01:25 PM',
    'city': 'Junagadh',
    'source': 'Area31',
    'destination': 'Area32',
    'capacity': 2500
  },
  {
    'userId': 49,
    'pickupDateTime': '2023-10-13 07:10 AM',
    'city': 'Ahmedabad',
    'source': 'Area33',
    'destination': 'Area34',
    'capacity': 3000
  },
  {
    'userId': 58,
    'pickupDateTime': '2023-10-15 09:45 AM',
    'city': 'Vadodara',
    'source': 'Area37',
    'destination': 'Area38',
    'capacity': 4000
  }
]
  
    
const bulkInsertUsers = async () => {
  for (const slotBooking of data) {
    try {
      const { userId, pickupDateTime, city, source, destination, capacity } = slotBooking

      // Create a user object
      const newUser = {
        userId,
        capacity,
        pickupDateTime, 
        city, 
        source, 
        destination,
      }

      // Create user in the database
      const user = await slotBookingTable.create(newUser)
      console.log(`created ${user}`)
      
    } catch (error) {
      console.error(`Error creating user: ${error.message}`)
    }
  }
}

bulkInsertUsers()
