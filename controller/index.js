import { login, registration } from './registrationAndLogin/userController.js'

import { actionRequest } from './vehicleInformation/action.js'
import { blockUser } from './adminInformation/blockUnblock.js'
import { deleteSlot } from './bookingSlot/deleteSlot.js'
import { displayAll } from './adminInformation/display.js'
import { notification } from './vehicleInformation/notification.js'
import { previous } from './adminInformation/previous.js'
import { slotInformation } from './bookingSlot/bookingSlot.js'
import { status } from './bookingSlot/status.js'
import { upcoming } from './adminInformation/upcoming.js'
import { updateSlot } from './bookingSlot/updateSlot.js'
import { vehicleInfoUpdate } from './vehicleInformation/vehicleInfoUpdate.js'
import { vehicleInfodelete } from './vehicleInformation/vehicleInfoDelete.js'
import { vehicleInformations } from './vehicleInformation/vehicleinformation.js'

export {
  login,
  registration,
  vehicleInformations, 
  vehicleInfoUpdate,
  vehicleInfodelete,
  slotInformation,
  updateSlot,
  deleteSlot,
  notification,
  actionRequest,
  status,
  displayAll,
  previous,
  upcoming,
  blockUser,
}
