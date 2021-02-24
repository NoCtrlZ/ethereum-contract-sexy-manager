# Ethereum Contract Upgrade Manager
![npm version](https://badge.fury.io/js/ethereum-contract-sexy-manager.svg)
![badge](https://action-badges.now.sh/NoCtrlZ/ethereum-contract-sexy-manager?action=test)  
  
This is CLI to deploy your contract with upgradeable architecture.  
  

## Install
```
$ npm install -g ethereum-contract-sexy-manager
```

## Architecture
![architecture diagram](./diagram/architecture.png)

### Terminology
#### Implementation
```
The implementation is one or more contracts to be deployed. This repository has a [sample contract](https://github.com/NoCtrlZ/ethereum-contract-sexy-manager/blob/master/contracts/Sample1.sol).
```
#### Proxy
```
This contract uses delegate call for implementation contract when it is called by user.
```
#### Proxy Admin
```
This contract manages Proxy contract. This contract changes the implementation address stored on Proxy contract and the administrator.
```

## Commands
```
$ sexydynamite init
```
Creating `.sexydynamite` directory and `admin.json` you can set your wallet and private key here, and add `admin.json` file to `.gitignore` in order not to push your private information.

```
$ sexydynamite create -c {Contract Name V1}
```
Deploying your contract with above architecture. The contract needs to be compiled `build/contracts` directory. The project information is emited on `.sexydynamite/deployed.json`.

```
$ sexydynamite upgrade -c {Contract Name V2}
```
Upgrading your implementation to indicated contract. Your new implementation will be deployed and Proxy will use delegate call for new implementation.

### Detail
There are three actions executed when you run `sexydynamite` command.

1. Deploy the implementation you indicate with option.

2. Deploy the Proxy Admin contract and store your address as the administrator.

3. Deploy the Proxy and store the Proxy Admin address as manager.

## Structure
```text
(ProjectRoot)
--/.sexydynamite
    |--admin.json   <- Please fill in address and pribate key information.
    |--deployed.json    <- This will be emited when new implementation is deployed. This has contract address and owner of this architecture.
```

## Test
```
$ ganache-cli -p 7545
$ npm run test:unit
```
