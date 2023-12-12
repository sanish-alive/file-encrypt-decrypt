const express = require('express')
const fs = require('fs')
const upload = require('./upload')
const { encryptFile, decryptFile } = require('./cryptograhp')
const hostname = "127.0.0.1"
const port = 5000
const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))

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
    res.render('file-download', {type:'encrypt', filename:newFilename})
    
})

app.get('/encrypt', (req, res) => {
    res.redirect('/')
})

app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename
    const filePath = __dirname + '/encrypted-files/' + filename

    res.download(filePath, (err) => {
        if(err) {
            console.error(err)
        }
        fs.unlink(filePath, () => {
            console.log('File is deleted from encrypted-files')
        })
        fs.unlink(__dirname+'/uploads/'+filename, () => {
            console.log('File is deleted from uploads')
        })
    })
    
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

    res.render('file-download', {type:'decrypt', filename:newFilename})

})

app.get('/decrypt/download/:filename', (req, res) => {
    const filename = req.params.filename
    const filePath = __dirname + '/decrypted-files/' + filename

    res.download(filePath, (err) => {
        if(err) {
            console.error(err)
        }
        fs.unlink(filePath, () => {
            console.log('File is deleted from decrypted-files')
        })
        fs.unlink(__dirname+'/uploads/'+filename, () => {
            console.log('File is deleted from uploads')
        })
    })
})

app.get('/test/download', (req, res) => {
    res.render('file-download')
})

app.listen(port, hostname, () => {
    console.log(`Server is listening at http://${hostname}:${port}`)
})