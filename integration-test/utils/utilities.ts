import { web3 } from './config'

export const getTypesFromAbi = (abi, functionName) => {

    const matchesFunctionName = (json) => {
    return (json.name === functionName && json.type === 'function');
    }

    let funcJson = abi.filter(matchesFunctionName)[0];

    return (funcJson.inputs).map(getTypes);
}

export const functionNameForTx = (functionName, types) => {
    return functionName + "(" + types.join() + ")"
}

export const encodeFunction = async (callFunction, types, args) => {
    const signature = String(web3.utils.sha3(callFunction)).toString().slice(0, 8);
    return signature + rm0x(web3.eth.abi.encodeParameters(types, args))
}

export const add0x = (input) => {
    if (typeof (input) !== 'string') {
        return input;
    }
    else if (input.length < 2 || input.slice(0, 2) !== '0x') {
        return '0x' + input;
    }
    else {
        return input;
    }
}

export const rm0x = (input) => {
    if (typeof (input) !== 'string') {
        return input;
    }
    else if (input.length < 2 || input.slice(0, 2) == '0x') {
        return input.slice(2);
    }
    else {
        return input;
    }
}

const getTypes = (json) => {
    return json.type;
}