import Transaction from './utils/transaction'

const integrationTest = async () => {
    await sendTransaction()
}

const sendTransaction = async () => {
    const functionName = 'add'
    const args = [
        '3',
        '5'
    ]
    return await Transaction.sendRawTx(functionName, args)
}

integrationTest()
