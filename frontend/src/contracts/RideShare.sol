pragma solidity >=0.4.21 <0.7.0;

contract RideShare{
    string public name;
    uint public rideCount = 0;
    mapping(uint => Ride) public rides;
    struct Ride{
        uint id;
        string from;
        string destination;
        uint fareAmount;
        string kms;
        address payable driver;
    }
    event RideCreated(
        uint id,
        string from,
        string destination,
        uint fareAmount,
        string kms,
        address payable  driver
    );
    constructor() public{
        name = "RideShare";
    }
    function createRide(string memory  _from, string memory _destination,string memory _kms) public{
        require(bytes(_from).length > 0,"reuired");
        rideCount ++;
        rides[rideCount] = Ride(rideCount,_from,_destination,0,_kms,msg.sender);
        //trigger event
        emit RideCreated(rideCount,_from,_destination,0,_kms,msg.sender);
    }
    // function payRide(uint _id) public payable {
    //     Ride memory _ride = rides[_id];
    //     address payable _driver = _ride.driver;
    //     address(_driver).transfer(msg.value);
    //     rides[_id] = _ride;
    //     emit RideCreated(msg.sender);
    // }
}