export const provider = require('../config').name
export const version = require('../config').version
export const defaultNetwork = require('../config').networks
export const defaultTxParams = {
    from: '0x17a4dc4af1faf9c3db0515a170491c37eb0373dc',
    gas: 1500000,
    gasPrice: '30000000000'
}
export const deployer = require('../../.sexydynamite/deployed.json').deployer
export const proxyAdminAddress = require('../../.sexydynamite/deployed.json').proxyAdminAddress
export const proxyAddress = require('../../.sexydynamite/deployed.json').proxyAddress
