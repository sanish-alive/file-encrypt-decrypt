const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.originalname)
    }
})

const extensionFilter = (req, file, cb) => {
    if (file.mimetype === 'text/plain') {
        cb(null, true)
    } else {
        cb(new Error('Only txt files are allowed'), false)
    }
}

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024},
    fileFilter: extensionFilter
})

module.exports = upload