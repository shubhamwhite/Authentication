function DateAndTime(inputDateTimeStr) {
  const [dateStr, timeStr] = inputDateTimeStr.split(' ')
  const inputDate = new Date(dateStr)
  const currentDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
  
  if (inputDate < currentDate) return false
  
  const [time, period] = timeStr.split(' ')[0].split(':')
  let inputHours = parseInt(time)
  const inputMinutes = parseInt(period)
  const inputSeconds = parseInt(timeStr.split(' ')[1])
  
  if (/PM/i.test(timeStr) && inputHours !== 12) inputHours += 12
  if (/AM/i.test(timeStr) && inputHours === 12) inputHours = 0
  
  const currentTime = currentDate.split(' ')[1].split(':')
  const [currentHours, currentMinutes, currentSeconds] = currentTime.map(Number)
  
  return (
    inputHours > currentHours ||
      (inputHours === currentHours && inputMinutes > currentMinutes) ||
      (inputHours === currentHours && inputMinutes === currentMinutes && inputSeconds > currentSeconds)
  )
}
  
export default DateAndTime
