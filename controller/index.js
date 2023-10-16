import { login, registration } from './registrationAndLogin/userController.js'
import { vehicleInformations } from './vehicleInformation/vehicleinformation.js'
import { vehicleInfoUpdate } from './vehicleInformation/vehicleInfoUpdate.js'
import { vehicleInfodelete } from './vehicleInformation/vehicleInfoDelete.js'
import { slotInformation } from './bookingSlot/bookingSlot.js'
import { updateSlot } from './bookingSlot/updateSlot.js'
import { deleteSlot } from './bookingSlot/deleteSlot.js'
import { notification } from './vehicleInformation/notification.js'
import { actionRequest } from './vehicleInformation/action.js'
import { status } from './bookingSlot/status.js'
import { displayAll } from './adminInformation/display.js'
import { previous } from './adminInformation/previous.js'
import { upcoming } from './adminInformation/upcoming.js'

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
  upcoming
}
