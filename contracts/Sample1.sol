pragma solidity 0.6.0;

contract Sample1 {
    uint8 public number;

    function add(uint8 a, uint8 b) public {
        number = a + b;
    }

    function getNumber() public view returns (uint8) {
        return number;
    }
}
