pragma solidity 0.6.0;

contract Proxy {
    address internal _implementation;
    address internal _proxyAdmin;

    event UpgradeImplementation(address newImplementation);
    event ChangeProxyAdmin(address newProxyAdmin);

    constructor(address implementation, address proxyAdmin, bytes memory initialCall) public {
        require(implementation != address(0) && proxyAdmin != address(0));
        _setImplementation(implementation);
        _setProxyAdmin(proxyAdmin);
        if(initialCall.length > 0) {
            (bool success,) = implementation.delegatecall(initialCall);
            require(success, "Fail to execute delegatecall");
        }
    }

    modifier onlyProxyAdmin {
        require(
            msg.sender == _proxyAdmin,
            "Only admin contract can call this function."
        );
        _;
    }

    function _setImplementation(address implementation) internal {
        _implementation = implementation;
    }

    function _setProxyAdmin(address proxyAdmin) internal {
        _proxyAdmin = proxyAdmin;
    }

    function upgradeImplementation(address newImplementation) public onlyProxyAdmin {
        _implementation = newImplementation;
        emit UpgradeImplementation(_implementation);
    }

    function changeProxyAdmin(address newProxyAdmin) public onlyProxyAdmin {
        _proxyAdmin = newProxyAdmin;
        emit ChangeProxyAdmin(_proxyAdmin);
    }

    function implementation() public view onlyProxyAdmin returns (address) {
        return _implementation;
    }

    function proxyAdmin() public view onlyProxyAdmin returns (address) {
        return _proxyAdmin;
    }

    fallback() payable external {
        _fallback();
    }

    function _fallback() internal {
        _delegate(_implementation);
    }

  function _delegate(address dest) internal {
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), dest, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }
}