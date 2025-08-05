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
npm install @robinholmes/vert
```

## Test

```shell
npm run test
```
