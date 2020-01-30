import Web3 from 'web3'

const createWeb3 = (endpoint :string) => {
    return new Web3(new Web3.providers.HttpProvider(endpoint))
}

export default createWeb3
