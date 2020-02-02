import Web3 from 'web3'
// require('dotenv').config()
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || '7545'
const url = `http://${host}:${port}`

const ProxyAdminJson = require('../../build/contracts/ProxyAdmin')
const ProxyJson = require('../../build/contracts/Proxy')
const ProjectJson = require('../../.sexydynamite/deployed')
const implementationAddress = ProjectJson.implementationAddress
const proxyAdminAddress = ProjectJson.proxyAdminAddress

export const proxyAddress = ProjectJson.proxyAddress
export const ImplementationJson = require('../../build/contracts/Sample1')
export const web3 = new Web3(new Web3.providers.HttpProvider(url))
export const deployer = ProjectJson.deployer
export const privateKey = require('../../.sexydynamite/admin').owner_private_key
export const Proxy = new web3.eth.Contract(ImplementationJson.abi, proxyAddress)
