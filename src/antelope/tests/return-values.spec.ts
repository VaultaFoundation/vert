import fs from "fs";
import { Name } from "@wharfkit/antelope";
import { Blockchain } from "../blockchain";
import {expectToThrow} from "../../helpers";
import {expect} from "chai";

const blockchain = new Blockchain()
const contract = blockchain.createAccount({
    name: Name.from('return.val'),
    wasm: fs.readFileSync('contracts/return.val/return.val.wasm'),
    abi: fs.readFileSync('contracts/return.val/return.val.abi', 'utf8'),
    enableInline:true,
});
blockchain.createAccount('user')

describe('return values', () => {
    it('should be able to get a deserialized return value', async () => {
        const result = await contract.actions.withreturn([1234]).send('user@active');
        expect(result.length).to.equal(1);
        expect(result[0].returnValue.value.toNumber()).to.equal(1234);
        expect(result[0].returnValue.control.toNumber()).to.equal(4321);
    });
    it('should get nothing if there is no return value', async () => {
        const result = await contract.actions.without([]).send('user@active');
        expect(result.length).to.equal(0);
    });
    it('should get 2 return values for an action that inlines another return value action', async () => {
        const result = await contract.actions.inlinedval([1234]).send('user@active');
        expect(result.length).to.equal(2);
        expect(result[0].returnValue.value.toNumber()).to.equal(1234);
        expect(result[1].returnValue.value.toNumber()).to.equal(1235);
    });
    it('should be able to read a readonly the same way as an action', async () => {
        const result = await contract.actions.readreturn([1111]).send('user@active');
        expect(result.length).to.equal(1);
        expect(result[0].returnValue.value.toNumber()).to.equal(1111);
        expect(result[0].returnValue.control.toNumber()).to.equal(3456);
    });
});
