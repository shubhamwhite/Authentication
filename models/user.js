import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fName: { 
    type: DataTypes.STRING,
    allowNull: false
  },  
  lName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { 
      isEmail: true
    } 
  },
  gmail_id: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isStrongPassword: function (value) {
        if (!/[A-Z]/.test(value)) {
          throw new Error('Password must contain at least one uppercase letter')
        }
        if (!/[a-z]/.test(value)) {
          throw new Error('Password must contain at least one lowercase letter')
        }
        if (!/[0-9]/.test(value)) {
          throw new Error('Password must contain at least one digit')
        }
        if (value.length < 8) {
          throw new Error('Password must be at least 8 characters long')
        }
      },
    },
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  block : {
    type: DataTypes.TINYINT,
    allowNull: true
  }
},{
  timestamps: false,
})

export default User