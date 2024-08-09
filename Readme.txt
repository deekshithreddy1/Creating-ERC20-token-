
Step by step to build the ERC20 token 

Creating ERC20 token Using Hardhat, Solidity, Openzeppelin, Alchemy, sepolia, Metamask. (Latest Tutorial Dated August 09, 2024)

Make sure you create Alchemy account , Metamask account in your Browser. And Meatmask Sepolia should have some tokens take it from https://www.alchemy.com/faucets/ethereum-sepolia

it gives dummy token if we have some of Real Ethers in the Metamask account. 

I have bought 0.001 worth of tokens from ROBINHOOD. and transferred it to Metamask account. (you can also but some in Metamask account). 

first 
Create a folder 
mkdir reddy

reddy>> npm init 

this will create a package.json file 

then we need to install hardhat

>>npm install --save-dev hardhat

this will create node_modules which are node files and it also creates a new file called
package.lock.json


Then we need to create the Hardhat project 
 
to create a project we need to use this command 

>>npx hardhat init

after this command is executed we can select which type of project is created 
i have selected a create a empty hardhat.config.js

it will create a hardhat.config.js file in the folder

As we have created a empty project so we need to add the contracts folder and scripts folder

>> mkdir contracts
>>mkdir scripts

contract folder  wil have contracts file which are eg: hello.sol

scripts folder willl have the deployment scripts eg: deploy.js

All the above steps are same for any project 

I'm creating a  ERC20 token 

we want to inherit some of the openzeppelin pluginns to use the ERC20.sol from openzeppelin

lets install the Openzeppelin conrtract 

>>npm install @openzeppelin/contracts

We write the ERC20 initial code in the contract folder by creating a .sol file (MyToken.sol)

this is the code for MyToken.sol

//code
//SPDX-License-Identifier:MIT

pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20{ 

    uint constant _initial_supply = 10000 * (10** 18);

    constructor() ERC20("MyToken" , "MKT") {
        _mint(msg.sender, _initial_supply);

    }

}
//code

as we have the contract we need to compile the file to compile we need the compiler to work 

we create a .env file to store some secure data  to do that we need to use CMD to install it into the project

>>npm install doteve --save

after this is done we can see this dependencie in the package.json file 

now Create a .env file in the project folder 

IN .env file we need to add the

API_URL= "https: //eth-sepolia.g. alchemy.com/ v2/our-api-key" this key is found when you create a account in alchemy and then create a project and from thet project you will find created app open the created app
the you will find the overview , Network and settings. 
go to Network and in the network you will find the ethereum mainnet but change it to sepolia then you will find the end point below. That endpoint look like  "https: //eth-sepolia.g. alchemy.com/ v2/dhhsaghdgahgdhavcfdgddggdg  
this is the end point required .
and 

PRIVATE_KEY = "metamask sepolia private key " go to metamask wallet in your browser then go the sepolia test net then find the account details you  will see a QR code under that your will 
find the Private key button then copy the key and past in here. 


now need to install ethers  in the project because we are using it 

>> npm install ethers@5.7.2

also need it in the hardhatconfig file 

>>npm install --save-dev @nomiclabs/hardhat-ethers


now its time to update the hardat.config.js file 

after updating the file the file looks like this
//code

require('dotenv').config();
require("@nomiclabs/hardhat-ethers'");



const { API_URL, PRIVATE_KEY } = process.env;
module.exports = {
  solidity: "0.8.0",
  defaultNetwork : "sepolia" ,
  network : {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`] // IMPORTANT - KNOW the Difference between ('') and the (``)  they both are different. This ('') single quots and (``) this is Backtick. I had the problem to find the difference between them and took 2 days to find the bug in the hardhat.config.js  file. 
    }
  },
}

//code

now its time to compile this
 
>>npx hardhat compile

there was an error where i have used solidity vesion as 0.8.0 but  the openzeppelin contract which is ERC.sol is written is Solidity version ^0.8.20;

so i change the compiler version in .sol file and in the config file, to 0.8.20;

the smart contract is compiled success fully 

now its time to write the deploy script 

Add a file to scripts folder 
scripts/ deploy.js

 deploy.js file consist of the code to deploy the code into to the network 

the Deployment file look like this 
// code 
async function main() {
    const [  deployer ] = await ethers.getSigners() ;

    console.log("Deploing contract with the account:" , deployer.address);

    const weiAmount = (await deployer.getBalance()).toString();

    console.log("Account Balance:", (await ethers.utils.formatEther(weiAmount)));
    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy();

    console.log("Token address:" , token.address);

}

main ()
   .then(() => process.exit(0))
   .catch((error) => {
    console.error(error);
    process.exit(1);
   });

//code 



Now its time to deploy the code into sepolia test network

>> npx hardhat run scripts/deploy.js --network sepolia

after you run this command 
you will see the 

Deploying contract with the account : 0xa700000000000000000000000000000000

account balance : 

token address: xe90s0s00ss00s0f0dfsd0gs0g0s0( this address will have the created tokens to see the tokens 
go to metamask-> sepolia-> then import token 

Add the token address you can import your created token in the metamask.

you can transfer the tokens to any one.


I have create a one more account is Metamask send the 50 tokens for 1st account to second account.




after we send the MKT tokens from one account to another account we will not see any tokens in the second account thats is because the send account 
has no idea what is the token address so we need to go to the import token and add the token address 
token address which we got when we deployed 

adding that token address will show the token which we have send from address one to address 2 

