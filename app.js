const express = require('express')
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

app.post('/', (req, res) => {
    res.send('<a href="/">home<a>')
})

app.listen(port, hostname, () => {
    console.log(`Server is listening at http://${hostname}:${port}`)
})