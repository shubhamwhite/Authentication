//  This is current format
const currentDate = new Date()
const year = currentDate.getFullYear()
const month = String(currentDate.getMonth() + 1).padStart(2, '0')
const day = String(currentDate.getDate()).padStart(2 || 1, '0')
const hours = String(currentDate.getHours()).padStart(2, '0')
const minutes = String(currentDate.getMinutes()).padStart(2, '0')
const amOrPm = hours >= 12 ? 'PM' : 'AM'

const formattedDate = `${year}-${month}-${day} ${hours}:${minutes} ${amOrPm}`

export default formattedDate