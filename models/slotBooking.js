import { DataTypes } from 'sequelize'
import RESPONCE from '../constant/response.js'
import User from './user.js' // Import the User model
import VehicleInformation from './vehicleInfo.js'
import { sequelize } from '../config/db.js'
const SlotBooking = sequelize.define('slotBook', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  startDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city:{
    type: DataTypes.STRING,
    allowNull: false
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  capacity:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status:{
    type: DataTypes.TINYINT,
    defaultValue: RESPONCE.MESSAGES.general.FLAGES.PENDING
  },
  driverId : {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { 
      model: VehicleInformation, 
      key: 'userId',   
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { 
      model: User, 
      key: 'id',   
    },
  },
}, {
  timestamps: false,
})

User.hasOne(SlotBooking)
SlotBooking.belongsTo(User) 
  
User.hasOne(VehicleInformation, { foreignKey: 'userId' })
VehicleInformation.belongsTo(User, { foreignKey: 'userId' })

SlotBooking.belongsTo(User, { foreignKey: 'userId', as: 'user' }) // using display all data aliasing only
SlotBooking.belongsTo(User, { foreignKey: 'driverId', as: 'driver' }) // using display all data aliasing only

SlotBooking.belongsTo(VehicleInformation, { foreignKey: 'driverId', targetKey: 'userId', as: 'vehicleInformation' })


export default SlotBooking 