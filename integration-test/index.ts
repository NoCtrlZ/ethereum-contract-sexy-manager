import { Proxy, deployer } from './utils/config'

const integrationTest = async () => {
    const res = await sendTransaction()
    console.log(res)
    await testNumber()
}

const sendTransaction = async () => {
    return await Proxy.methods.add(3, 5).send({ from: deployer })
}

const testNumber = async () => {
    const number = await Proxy.methods.number().call({ from: deployer }).catch(console.log)
    console.log(number)
}

integrationTest()
