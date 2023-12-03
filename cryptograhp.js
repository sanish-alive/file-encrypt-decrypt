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
const encryptedFilePath = 'encrypted-files/'
const decryptedFilePath = 'decrypted-files/'

function encryptFile(fileName) {
    const inputBuffer = fs.readFileSync(inputFilePath+fileName)

    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv)
    cipher.setAutoPadding(true)
    const encryptedBuffer = Buffer.concat([cipher.update(inputBuffer), cipher.final()]).toString('base64')
    fs.writeFileSync(encryptedFilePath + fileName, encryptedBuffer)

    console.log('File encrypted successfully')
}

function decryptFile(filename) {
    const inputFile = inputFilePath+filename
    if(!fs.existsSync(inputFile)){
        console.error('Error: File not found!')
    }
    try {
        const encryptedBuffer = Buffer.from(fs.readFileSync(inputFile, 'utf-8'), 'base64')
        const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv)
        decipher.setAutoPadding(true)
        const decryptedBuffer = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()])

        fs.writeFileSync(decryptedFilePath + filename, decryptedBuffer)
        
        console.log('File decrypted successfully')
    } catch (error) {
        console.error("Error reading encrypted file: ", error.message)
    }
    
}
module.exports = { encryptFile, decryptFile }