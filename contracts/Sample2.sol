pragma solidity 0.6.0;

contract Sample2 {
    uint8 public number;
    uint8 public num;

    function add(uint8 a, uint8 b) public {
        number = a + b;
    }

    function dec(uint8 a) public {
        num = number - a;
    }
}
