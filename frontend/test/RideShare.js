const RideShare = artifacts.require('./RideShare.sol')
require('chai')
    .use(require('chai-as-promised'))
    .should()
contract("RideShare",([deployer,driver,rider]) => {
    let rideShare
    before(async() => {
        rideShare = await RideShare.deployed()
    })
    describe('deployment',async () => {
        it('deploys successfully',async () =>{
            const address = await rideShare.address
            assert.notEqual(address,0x0)
            assert.notEqual(address,'')
            assert.notEqual(address,null)
            assert.notEqual(address,undefined)
        })
        it('has a name',async () =>{
            const name = await rideShare.name()
            assert.equal(name,'RideShare')
        })
    })
    describe('posts',async () => {
        let result,rideCount
        it('creates rides', async () => {
            result = await rideShare.createRide("Nakuru","Kericho","200",{from:driver})
            rideCount = await rideShare.rideCount()
            assert.equal(rideCount,1)
            event = result.logs[0].args
            assert.equal(event.id.toNumber(),rideCount.toNumber(),'id is correct')
            assert.equal(event.from,"Nakuru",'from is correct')
            assert.equal(event.destination,'Kericho','dest is correct')
            assert.equal(event.driver,driver,'driver is correct')

            await rideShare.createRide("","","",{from:driver}).should.be.rejected;
        })
        it('lists posts', async () => {
            const ride = await rideShare.rides(rideCount)
            assert.equal(ride.id.toNumber(),rideCount.toNumber(),'id is correct')
            assert.equal(ride.from,"Nakuru",'from is correct')
            assert.equal(ride.destination,'Kericho','dest is correct')
            assert.equal(ride.driver,driver,'driver is correct')
        })
        it('allows user to pay posts', async () => {
            
        })
    })
})