# Donation smart contract sample project

for educational purposes

## Fulfilled steps

- added hardhat dependencies to empty project:
```shell
  npm install --save-dev hardhat
```
- added contract logic, including methods for:
    - making a donation;
    - transferring from the contract balance specified amount to the specified account (only for contract owner);
    - getting list of participants (contributors);
    - getting the donation amount of the specified account;
    
- added unit tests
- added solidity-coverage:
```shell
  npx hardhat coverage --network hardhat
```
- added `rinkeby` test network config to `hardhat.config.ts`. To achieve this:
    - created a project on Alchemy;
    - created accounts via Metamask plugin in rinkeby testnet;
    - requested test ether [here](https://faucets.chain.link/rinkeby);
- adjusted deploy script and deployed contract via command:
```shell
  npx hardhat run scripts/deploy.ts --network rinkeby
```
- created etherscan account and configured `hardhat.config.ts` accordingly to verify the contract:
```shell
npx hardhat verify --network rinkeby DEPLOYED_CONTRACT_ADDRESS
```
- added tasks to interact with deployed contract
  

## Additional commands

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```
