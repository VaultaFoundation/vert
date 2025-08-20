# VeRT

**VM emulation RunTime for WASM-based blockchain contracts**

VeRT is a virtual machine emulator for Antelope blockchains.
It uses the built-in WebAssembly object in JavaScript, so can be executed on any modern browsers or runtime environments without additional dependencies.
It doesn't support the full specification of each blockchain state-machine, but can be used to run and test smart contracts before deployment.
The focus of VeRT is on the better compatibility than the performance, so it can be integrated with development pipelines.

- Run and test smart contracts
- Minimum dependencies (No native wrapper, docker or remote connection)
- Volatile key-value store with state rollback 

## Requirement

- WebAssembly binary with exported memory
- Nodejs v16 or higher (JavaScript runtime with WebAssembly BigInt support)

## Installation

```shell
npm install @vaulta/vert
```

## Example usage

```typescript
import { Blockchain, nameToBigInt, expectToThrow } from "@vaulta/vert";
import { assert } from "chai";

// instantiate the blockchain emulator
const blockchain = new Blockchain()

// Load a contract
const contract = blockchain.createContract(
    // The account to set the contract on
    'accountname', 
    // The path to the contract's wasm/abi
    // both wasm and abi files should be named yourcontract.wasm and yourcontract.abi
    'build/yourcontract' 
)


// You can clear the tables in the 
// contract before each test
beforeEach(async () => {
    blockchain.resetTables()
})

describe('Testing Suite', () => {
    it('should do X', async () => {
        // Create some accounts to work with
        const [alice, bob] = blockchain.createAccounts('alice', 'bob')
        
        // Will call a normal action. 
        // Returns an array of results if the action returns a value (array since inlines can also return values)
        const result = await contract.actions.youraction([param1, param2]).send();
        // You can also specify the authorization for the action
        // .send('alice@active')
        // default is the contract's account itself with 'active' permission
        
        // Will call a normal action, or a readonly action.
        // Returns a return value from the action, or null (no array)
        const readonlyResult = await contract.actions.youraction([param]).read();

        // You can get table data from the contract, though readonly actions 
        // are the preferred way to get data from external sources (web apps, apis, etc)
        const rows = contract.tables.yourtable(
            nameToBigInt('scope')
        ).getTableRow(
            nameToBigInt('primary.key')
        );

        // if you called 'print' in your contract, you can access the console output
        // after the action is executed
        console.log(contract.bc.console);

        // You can verify that an action throws an error
        expectToThrow(
            contract.actions.badaction([]).send(),
            'This will be "some error" from inside check(false, "some error")'
        )
    });
});
```



## Test

```shell
npm run test
```

