const ProxyAdmin = artifacts.require("ProxyAdmin")

contract('Deploy & Test', (accounts) => {
    let proxyAdmin

    before(async () => {
        proxyAdmin = await ProxyAdmin.new({from: accounts[0]})
    })

    describe('Check Proxy Admin Data', () => {
        it('Check Owner Address', async () => {
            const ownerAddress = await proxyAdmin.getOwner({from: accounts[0]})
            assert.equal(ownerAddress, accounts[0], "owner should be same as sender")
        })
    })
})
