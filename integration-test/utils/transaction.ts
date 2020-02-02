import { getTypesFromAbi, functionNameForTx, encodeFunction, add0x } from './utilities'
const EthereumjsTx = require('ethereumjs-tx').Transaction
import { ImplementationJson, web3, deployer, privateKey, proxyAddress} from './config'

export default class Transaction {
    static async sendRawTx(functionName, argParams) {
        let Tx = await this.wrapperTx()
        let encodedFunction = await this.encodeFunction(functionName, argParams)
        let signedTx = await this.signTx(Tx, encodedFunction)
        return await web3.eth.sendSignedTransaction(add0x(signedTx)).catch(console.log)
    }

    static async wrapperTx() {
        const nonce = await web3.eth.getTransactionCount(deployer)
        const txParams = {
            to: proxyAddress,
            value: 0,
            nonce: parseInt(String(nonce)),
            gas: 2000000,
            gasPrice: 4000000000,
            gasLimit: 20000000000
          }
          return new EthereumjsTx(txParams)
    }

    static async encodeFunction(functionName, args) {
        let types = await getTypesFromAbi(ImplementationJson.abi, functionName)
        let callFunction = await functionNameForTx(functionName, types)
        return await encodeFunction(callFunction, types, args)
    }

    static async signTx(Tx, encodedFunction) {
        let txParams = {
            to: add0x(Tx.to),
            gasPrice: add0x(Tx.gasPrice),
            gasLimit: add0x(Tx.gasLimit),
            nonce: add0x(Tx.nonce),
            data: add0x(encodedFunction),
            value: add0x(Tx.value)
        }
        let tx = new EthereumjsTx(txParams);
        return await web3.eth.accounts.signTransaction(tx, privateKey).catch(console.log);
    }
}
