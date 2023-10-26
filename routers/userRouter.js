import {
  actionRequest,
  blockUser,
  deleteSlot,
  displayAll,
  login,
  notification,
  previous,
  registration,
  slotInformation,
  status,
  upcoming,
  updateSlot,
  vehicleInfoUpdate,
  vehicleInfodelete,
  vehicleInformations
} from '../controller/index.js'

import express from 'express'
import { upload } from '../helper/imageUploadService/imageUploader.js'
// import { verifyToken } from '../middleware/userAuth.middleware.js' // using authentication 
import { verifyTokenBody } from '../middleware/userAuthBody.middleware.js'

const router = express.Router() 

// registration and loin route 
router.route('/user/sign-up').post(upload.single('image'),registration)   
router.route('/user/sign-in').post(login) 

// vehicle information, delete, update, notification, request api route
router.route('/vehicle/information').post(vehicleInformations)
router.route('/vehicle/info/update').post(vehicleInfoUpdate)
router.route('/vehicle/info/delete').post(vehicleInfodelete)
router.route('/list/notification').post(notification)
router.route('/action/request').post(actionRequest)
 
// user information, delete, update, status api route
router.route('/slot/information').post(verifyTokenBody,slotInformation) 
router.route('/slot/update').post(verifyTokenBody,updateSlot)
router.route('/slot/delete').post(verifyTokenBody,deleteSlot)
router.route('/list/status').post(verifyTokenBody,status) 

// admin display, previous, upcoming api route
router.route('/display-all/records').post(displayAll)
router.route('/previous/records').post(previous)
router.route('/upcoming/records').post(upcoming)
router.route('/block/user').post(blockUser)

export default router