const host = process.env.HOST || 'localhost'
const port = process.env.PORT || '7545'
const url = `http://${host}:${port}`
const Web3 = require('web3')
let web3 = new Web3(new Web3.providers.HttpProvider(url))