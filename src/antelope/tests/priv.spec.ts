import fs from "fs";
import { Name } from "@wharfkit/antelope";
import { Blockchain } from "../blockchain";
import {expectToThrow} from "../../helpers";

const blockchain = new Blockchain()
const privContract = blockchain.createAccount({
    name: Name.from('auth.require'),
    wasm: fs.readFileSync('contracts/auth.require/auth.require.wasm'),
    abi: fs.readFileSync('contracts/auth.require/auth.require.abi', 'utf8'),
    privileged: true
});
const inlineContract = blockchain.createAccount({
    name: Name.from('inline'),
    wasm: fs.readFileSync('contracts/auth.require/auth.require.wasm'),
    abi: fs.readFileSync('contracts/auth.require/auth.require.abi', 'utf8'),
});
blockchain.createAccount('notuser')
blockchain.createAccount('user')

describe('priv users', () => {
    it('should fail without authorization', async () => {
        await expectToThrow(
            inlineContract.actions.test(['user']).send('notuser@active'),
            'missing required authority user'
        );
    });
    it('should be able to call an inline from a privileged account', async () => {
        await privContract.actions.inlinetest(['user', 'auth.require']).send('notuser@active');
    });
});
