import createWeb3 from '../utils/web3'

const deployImplementation = (projectDir :string) => {
    const web3 = createWeb3(projectDir)
    console.log(web3)
}

export default deployImplementation