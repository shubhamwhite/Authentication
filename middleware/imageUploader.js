import { fileURLToPath } from 'url'
import multer from 'multer'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Specify the path where uploaded files will be stored
const uploadPath = path.join(__dirname, '..', 'public', 'profileImage')

// Configure Multer to specify where to store uploaded files and file name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

// Create the Multer middleware
const upload = multer({ storage: storage })

export { upload }
