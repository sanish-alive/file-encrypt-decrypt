const crypto = require('crypto')
const fs = require('fs')

const secretKey = crypto
    .createHash('sha512')
    .update('iloveyou')
    .digest('hex')
    .substring(0, 32)
const iv = crypto
    .createHash('sha512')
    .update('16')
    .digest('hex')
    .substring(0, 16)

const inputFilePath = 'uploads/'
const outputFilePath = 'encrypted-files/'

function encryptFile(fileName) {
    const inputBuffer = fs.readFileSync(inputFilePath+fileName)

    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv)
    const encryptedBuffer = Buffer.concat([cipher.update(inputBuffer), cipher.final()]).toString('base64')
    fs.writeFileSync(outputFilePath+fileName, encryptedBuffer)

    console.log('File encrypted successfully')
}

module.exports = encryptFile