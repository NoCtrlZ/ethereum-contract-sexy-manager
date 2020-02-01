const Sample1 = artifacts.require("Sample1")

contract('Deploy & Test', (accounts) => {
    let sample1

    before(async () => {
        sample1 = await Sample1.new({from: accounts[0]})
    })

    describe('Check Sample Contract Function', () => {
        it('Check Number', async () => {
            await sample1.add(1, 1, {from: accounts[0]})
            const number =await sample1.number({from: accounts[0]})
            assert.equal(number, 1 + 1, "result of calculation is correct")
        })
    })
})
