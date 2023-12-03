const express = require('express')
const upload = require('./upload')
const { encryptFile, decryptFile } = require('./cryptograhp')
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
    res.send(`${newFilename}<a href="/">home<a><br><a href="/download/${newFilename}">download</a>`)
    
})

app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename
    const filePath = __dirname + '/encrypted-files/' + filename

    res.download(filePath)
})

app.get('/decrypt', (req, res) => {
    res.render('decrypt')
})

app.post('/decrypt', upload.single('myfile'), (req, res) => {
    if(!req.file) {
        return res.status(404).send('No file found')
    }

    const newFilename = req.file.filename

    decryptFile(newFilename)

    res.send(`decrypted file is done`)

})

app.listen(port, hostname, () => {
    console.log(`Server is listening at http://${hostname}:${port}`)
})