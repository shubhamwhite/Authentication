import driverResponse from './driver/responceCode.js'
import general from './general/general_message.js'

export default {
  DRIVER_CODE: {
    driverResponse 
  },
  HTTP_STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    CONFLICT: 409,
  },
  MESSAGES: {
    OK: 'Ok',
    USER_CREATED: 'User created successfully',
    BAD_REQUEST: 'Bad request',
    ACCEPTED : {
      ACCEPTED_P : 'accepted but pending',
      ACCEPTED : 'accepted'
    },
    NOT_FOUND: 'User not found',
    UNAUTHORIZED_USER: 'Unauthorized user',
    FORBIDDEN: 'Invalid format',
    LOGIN_SUCCESSFUL: 'Login successful',
    LOGIN_FAILED: 'Login failed. Check your credentials.',
    INVALID_LOGIN_TYPE: 'Invalid login type',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    CONFLIT:{
      USER_ALREADY_EXISTED: 'already existed'
    },
    
    // general Message
    general
  }
}   
