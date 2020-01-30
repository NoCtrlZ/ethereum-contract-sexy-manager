pragma solidity 0.6.0;

import './Proxy.sol';

contract ProxyAdmin {
    address internal _owner;

    constructor() public {
        _setOwner(msg.sender);
    }

    modifier onlyOwner {
        require(
            msg.sender == _owner,
            "Only admin contract can call this function."
        );
        _;
    }

    function _setOwner(address ownerAddress) internal {
        _owner = ownerAddress;
    }

    function getImplementation(Proxy proxy) public view onlyOwner returns (address) {
        (bool success, bytes memory data) = address(proxy).staticcall(abi.encodeWithSignature("implementation()"));
        require(success);
        return abi.decode(data, (address));
    }

    function upgradeImplementation(Proxy proxy, address newImplementation) public onlyOwner {
        proxy.upgradeImplementation(newImplementation);
    }

    function changeProxyAdmin(Proxy proxy, address newProxyAdmin) public onlyOwner {
        proxy.changeProxyAdmin(newProxyAdmin);
    }
}
