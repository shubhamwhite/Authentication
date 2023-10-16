import express from 'express'
import { verifyToken } from '../middleware/userAuth.js'
import { 
  registration,
  login, 
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
} from '../controller/index.js'

const router = express.Router()

// registration and loin route
router.route('/user/sign-up').post(registration)
router.route('/user/sign-in').post(verifyToken,login)

// vehicle information, delete, update, notification, request api route
router.route('/vehicle/information').post(vehicleInformations)
router.route('/vehicle/info/update').post(vehicleInfoUpdate)
router.route('/vehicle/info/delete').post(vehicleInfodelete)
router.route('/list/notification').post(notification)
router.route('/action/request').post(actionRequest)

// user information, delete, update, status api route
router.route('/slot/information').post(slotInformation)
router.route('/slot/update').post(updateSlot)
router.route('/slot/delete').post(deleteSlot)
router.route('/list/status').post(status)

// admin display, previous, upcoming api route
router.route('/display-all/records').post(displayAll)
router.route('/previous/records').post(previous)
router.route('/upcoming/records').post(upcoming)


export default router     