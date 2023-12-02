const express = require('express')
const upload = require('./upload')
const encryptFile = require('./cryptograhp')
const hostname = "127.0.0.1"
const port = 5000
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    const info = {
        'name': 'sanish'
    }
    res.render('index', info)
})

app.post('/', upload.single('myfile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded')
    }
    const newFilename = req.file.filename

    encryptFile(newFilename)

    res.send(newFilename+'<a href="/">home<a>')
})

app.listen(port, hostname, () => {
    console.log(`Server is listening at http://${hostname}:${port}`)
})