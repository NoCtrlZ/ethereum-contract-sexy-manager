const Sample2 = artifacts.require("Sample2")

contract('Deploy & Test', (accounts) => {
    let sample2

    before(async () => {
        sample2 = await Sample2.new({from: accounts[0]})
    })

    describe('Check Sample Contract Function', () => {
        it('Check Number', async () => {
            await sample2.add(1, 1, {from: accounts[0]})
            const number = await sample2.number({from: accounts[0]})
            assert.equal(number, 1 + 1, "result of calculation is correct")
        })

        it('Check Num', async () => {
            await sample2.add(1, 1, {from: accounts[0]})
            const number = await sample2.number({from: accounts[0]})
            assert.equal(number, 1 + 1, "result of calculation is correct")

            await sample2.dec(1, {from: accounts[0]})
            const num = await sample2.num({from: accounts[0]})
            assert.equal(num, 1 + 1 - 1, "result of calculation is correct")
        })
    })
})
