// require('dotenv').config()
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || '7545'
const url = `http://${host}:${port}`
const Web3 = require('web3')
let web3 = new Web3(new Web3.providers.HttpProvider(url))

const ProxyJson = require('../build/contracts/Proxy')
const ProxyAdminJson = require('../build/contracts/ProxyAdmin')
const ImplementationJson = require('../build/contracts/Sample1')
const ProjectJson = require('../.sexydynamite/deployed')

const integrationTest = async () => {
    const Proxy = new web3.eth.Contract(ProxyJson.abi, ProjectJson.proxyAddress)
    const ProxyAdmin = new web3.eth.Contract(ProxyAdminJson.abi, ProjectJson.proxyAdminAddress)
    const Implementation = new web3.eth.Contract(ImplementationJson.abi, ProjectJson.implementationAddress)
    console.log(Proxy, ProxyAdmin, Implementation)
}

integrationTest()
