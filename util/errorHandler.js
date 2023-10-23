import statusCodes from '../constant/response.js'

class ErrorHandler {
  static handleServerError(err, res) {
    console.error(err)
    res.status(statusCodes.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(statusCodes.MESSAGES.INTERNAL_SERVER_ERROR)
  }

  static handleClientError(err, res, statusCodes = statusCodes.HTTP_STATUS_CODES.BAD_REQUEST) {
    console.error(err)
    res.status(statusCodes.HTTP_STATUS_CODES.BAD_REQUEST).json(statusCodes.MESSAGES.BAD_REQUEST)
  }
}

export default ErrorHandler