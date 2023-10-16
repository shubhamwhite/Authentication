function isDateTimeValid(inputDateTimeStr) {
  
  // Split the input string into date and time components
  const [dateStr, timeStr] = inputDateTimeStr.split(' ')

  // Convert the input date string to a Date object
  const inputDate = new Date(dateStr)

  // Get the current date and time adjusted for the Indian time zone
  const currentDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))

  // Check if the input date (year, month, and date) is greater than or equal to the current date
  if (
    inputDate.getFullYear() < currentDate.getFullYear() ||
    (inputDate.getFullYear() === currentDate.getFullYear() &&
      inputDate.getMonth() < currentDate.getMonth()) ||
    (inputDate.getFullYear() === currentDate.getFullYear() &&
      inputDate.getMonth() === currentDate.getMonth() &&
      inputDate.getDate() < currentDate.getDate())
  ) {
    return false
  }

  // Parse the time component based on the format (12-hour or 24-hour)
  let inputHours, inputMinutes, inputSeconds

  // Check if the time format is in 12-hour format (e.g., "07:00:00 AM" or "07:00:00 PM")
  if (/(AM|PM)$/i.test(timeStr)) {
    const timeParts = timeStr.split(' ')
    const [time, period] = timeParts[0].split(':')
    inputHours = parseInt(time)
    inputMinutes = parseInt(period)
    inputSeconds = parseInt(timeParts[1])
    
    if (/PM/i.test(timeStr) && inputHours !== 12) {
      inputHours += 12
    } else if (/AM/i.test(timeStr) && inputHours === 12) {
      inputHours = 0
    }
  } else {
    // Assume 24-hour format if not in 12-hour format
    const [hours, minutes, seconds] = timeStr.split(':')
    inputHours = parseInt(hours)
    inputMinutes = parseInt(minutes)
    inputSeconds = parseInt(seconds)
  }

  // Check if the input time (hour, minute, and second) is greater than or equal to the current time
  if (
    inputDate.getFullYear() === currentDate.getFullYear() &&
    inputDate.getMonth() === currentDate.getMonth() &&
    inputDate.getDate() === currentDate.getDate() &&
    inputHours < currentDate.getHours()
  ) {
    return false
  }

  if (
    inputDate.getFullYear() === currentDate.getFullYear() &&
    inputDate.getMonth() === currentDate.getMonth() &&
    inputDate.getDate() === currentDate.getDate() &&
    inputHours === currentDate.getHours() &&
    inputMinutes < currentDate.getMinutes()
  ) {
    return false
  }

  if (
    inputDate.getFullYear() === currentDate.getFullYear() &&
    inputDate.getMonth() === currentDate.getMonth() &&
    inputDate.getDate() === currentDate.getDate() &&
    inputHours === currentDate.getHours() &&
    inputMinutes === currentDate.getMinutes() &&
    inputSeconds < currentDate.getSeconds()
  ) {
    return false
  }

  // If all conditions pass, the input date and time is valid
  return true
}

export default isDateTimeValid