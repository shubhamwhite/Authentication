function validateDateTime(dateTimeStr) {
  const istTimeZone = 'Asia/Kolkata'
  const currentDateTime = new Date(new Date().toLocaleString('en-US', { timeZone: istTimeZone }))

  // Use a regular expression to match the expected date and time format.
  const datePattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/
  if (!datePattern.test(dateTimeStr)) {
    return false
  }

  const userDateTime = new Date(dateTimeStr)

  if (userDateTime >= currentDateTime) {
    // Format the valid user-provided date and time
    const year = userDateTime.getFullYear()
    const month = String(userDateTime.getMonth() + 1).padStart(2, '0')
    const day = String(userDateTime.getDate()).padStart(2, '0')
    const hours = String(userDateTime.getHours()).padStart(2, '0')
    const minutes = String(userDateTime.getMinutes()).padStart(2, '0')
    const period = userDateTime.getHours() < 12 ? 'AM' : 'PM' 

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes} ${period}`
    return formattedDateTime
  } else {
    return false
  }
}

export default validateDateTime