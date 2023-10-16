// models/vehicleInfo.js

import { DataTypes } from 'sequelize'
import User from './user.js' // Import the User model
import { sequelize } from '../config/db.js'

const VehicleInformation = sequelize.define('vehicleInformation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  vehicleName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false, 
  },
  city:{
    type: DataTypes.STRING,
    allowNull: false
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

User.hasOne(VehicleInformation)
VehicleInformation.belongsTo(User)

export default VehicleInformation
