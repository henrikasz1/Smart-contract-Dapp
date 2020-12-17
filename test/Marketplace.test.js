const Marketplace = artifacts.require('./Marketplace.sol')

contract('Marketplace', ([deployer, seller, buyer]) => {
  let marketplace

  before(async () => {
    marketplace = await Marketplace.deployed()
  })

  describe('Deployment tests', async () => {
    it('1) Deploys successfully', async () => {
      const address = await marketplace.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
      })
    })

  describe('Products tests', async () => {
    let result, result2, counter;

    before(async () => {
      result = await marketplace.addProduct('HP Zbook 15 G5', web3.utils.toWei('2', 'Ether'), { from: seller})
      counter = await marketplace.countProducts()
    })

    it ('2) Adds a product', async () => {
      //checking by the event
      assert.equal(counter, 1)
      const e = result.logs[0].args
      assert.equal(e.id.toNumber(), counter)
      assert.equal(e.name, 'HP Zbook 15 G5')
      assert.equal(e.price, web3.utils.toWei('2', 'Ether'))
      assert.equal(e.owner, seller)
      assert.equal(e.purchased, false)
    })

    it ('2) Gives the list of products', async () => {
      //checking by the mapping container
      const pr = await marketplace.products(counter)
      assert.equal(pr.id.toNumber(), counter)
      assert.equal(pr.name, 'HP Zbook 15 G5')
      assert.equal(pr.price, web3.utils.toWei('2', 'Ether'))
      assert.equal(pr.owner, seller)
      assert.equal(pr.purchased, false)
    })
    it ('3) Sells a product', async () => {
      let balanceBefore = await web3.eth.getBalance(seller)
      balanceBefore = new web3.utils.BN(balanceBefore)

      result2 = await marketplace.buyProduct(counter, {from: buyer, value: web3.utils.toWei('2', 'Ether')})
      const e = result2.logs[0].args;
      assert.equal(e.id.toNumber(), counter)
      assert.equal(e.name, 'HP Zbook 15 G5')
      assert.equal(e.price, web3.utils.toWei('2', 'Ether'))
      assert.equal(e.owner, buyer)
      assert.equal(e.purchased, true)

      let balanceNew = await web3.eth.getBalance(seller)
      balanceNew = new web3.utils.BN(balanceNew)

      let price = web3.utils.toWei('2', 'Ether')
      price = new web3.utils.BN(price)

      const check = balanceBefore.add(price)

      assert.equal(check.toString(), balanceNew.toString())
    })
  })
})
