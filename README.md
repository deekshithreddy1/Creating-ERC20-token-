# 🚀 Creating ERC20 Token with Hardhat & OpenZeppelin

![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

> 🎯 **A complete step-by-step guide to building and deploying ERC20 tokens on Ethereum Sepolia testnet using modern blockchain development tools.**

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📚 Prerequisites](#-prerequisites)
- [⚙️ Installation](#️-installation)
- [🔧 Configuration](#-configuration)
- [📄 Smart Contract](#-smart-contract)
- [🚀 Deployment](#-deployment)
- [🔍 Verification](#-verification)
- [📱 MetaMask Integration](#-metamask-integration)
- [💸 Token Transfer](#-token-transfer)
- [🐛 Troubleshooting](#-troubleshooting)
- [📝 License](#-license)

## 🌟 Features

✅ **ERC20 Standard Compliance** - Fully compatible with ERC20 token standard  
✅ **OpenZeppelin Security** - Built using battle-tested OpenZeppelin contracts  
✅ **Hardhat Framework** - Modern development and testing framework  
✅ **Sepolia Testnet** - Safe testing environment before mainnet deployment  
✅ **MetaMask Integration** - Seamless wallet integration  
✅ **Gas Optimized** - Efficient smart contract deployment  

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Solidity** | ^0.8.20 | Smart Contract Language |
| **Hardhat** | Latest | Development Framework |
| **OpenZeppelin** | Latest | Security Standards |
| **Ethers.js** | 5.7.2 | Ethereum Interaction |
| **Alchemy** | API | Blockchain Infrastructure |
| **MetaMask** | Latest | Wallet Integration |

## 📚 Prerequisites

Before starting, ensure you have:

- 🌐 **Node.js** (v14 or higher)
- 🦊 **MetaMask** browser extension
- 🔗 **Alchemy** account ([Create here](https://alchemy.com))
- 💰 **Sepolia ETH** from [Alchemy Faucet](https://www.alchemy.com/faucets/ethereum-sepolia)
- 📝 Basic knowledge of JavaScript and Solidity

> 💡 **Pro Tip**: Having some real ETH in your MetaMask helps with faucet access!

## ⚙️ Installation

### 1. 📁 Initialize Project

```bash
# Create project directory
mkdir erc20-token-project
cd erc20-token-project

# Initialize npm project
npm init -y
```

### 2. 📦 Install Dependencies

```bash
# Install Hardhat development framework
npm install --save-dev hardhat

# Install OpenZeppelin contracts
npm install @openzeppelin/contracts

# Install environment variables handler
npm install dotenv --save

# Install Ethers.js for blockchain interaction
npm install ethers@5.7.2
npm install --save-dev @nomiclabs/hardhat-ethers
```

### 3. 🏗️ Setup Hardhat

```bash
# Initialize Hardhat project
npx hardhat init
# Select: "Create an empty hardhat.config.js"

# Create necessary directories
mkdir contracts scripts
```

## 🔧 Configuration

### 1. 🔐 Environment Variables

Create `.env` file in root directory:

```env
# Alchemy API URL (Sepolia Testnet)
API_URL="https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY"

# MetaMask Private Key (Sepolia Account)
PRIVATE_KEY="your_metamask_private_key_here"
```

> ⚠️ **Security Warning**: Never commit your `.env` file to GitHub!

### 2. ⚙️ Hardhat Configuration

Update `hardhat.config.js`:

```javascript
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.20",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`] // Note: Backticks, not single quotes!
    }
  },
}
```

## 📄 Smart Contract

Create `contracts/MyToken.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title MyToken
 * @dev ERC20 Token with initial supply minted to deployer
 */
contract MyToken is ERC20 {
    uint256 constant INITIAL_SUPPLY = 10000 * (10**18); // 10,000 tokens

    constructor() ERC20("MyToken", "MKT") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
```

### 🔍 Contract Features

| Feature | Description |
|---------|-------------|
| **Name** | MyToken |
| **Symbol** | MKT |
| **Decimals** | 18 (standard) |
| **Initial Supply** | 10,000 tokens |
| **Owner** | Contract deployer |

## 🚀 Deployment

### 1. 📝 Deployment Script

Create `scripts/deploy.js`:

```javascript
async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("🚀 Deploying contract with account:", deployer.address);

    const weiAmount = (await deployer.getBalance()).toString();
    console.log("💰 Account Balance:", (await ethers.utils.formatEther(weiAmount)), "ETH");

    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy();

    console.log("📄 Token address:", token.address);
    console.log("✅ Deployment successful!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Deployment failed:", error);
        process.exit(1);
    });
```

### 2. 🔨 Compile Contract

```bash
npx hardhat compile
```

### 3. 🌐 Deploy to Sepolia

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

**Expected Output:**
```
🚀 Deploying contract with account: 0xa700000000000000000000000000000000
💰 Account Balance: 0.05 ETH
📄 Token address: 0xe90s0s00ss00s0f0dfsd0gs0g0s0g
✅ Deployment successful!
```

## 🔍 Verification

### Verify on Etherscan

1. Visit [Sepolia Etherscan](https://sepolia.etherscan.io)
2. Search for your token contract address
3. View contract details and transactions

## 📱 MetaMask Integration

### 1. 🔗 Add Token to MetaMask

1. Open MetaMask and switch to **Sepolia Test Network**
2. Click **"Import tokens"**
3. Enter your **Token Contract Address**
4. Token symbol and decimals should auto-populate
5. Click **"Add Custom Token"**

### 2. 👀 View Your Tokens

Your 10,000 MKT tokens should now be visible in MetaMask!

## 💸 Token Transfer

### Transfer Between Accounts

```javascript
// In MetaMask
// 1. Select your MKT tokens
// 2. Click "Send"
// 3. Enter recipient address
// 4. Enter amount (e.g., 50 MKT)
// 5. Confirm transaction
```

> 📝 **Note**: Recipients must also import the token using the contract address to see their balance.

## 🐛 Troubleshooting

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| **Compilation Error** | Ensure Solidity versions match in contract and config |
| **Deployment Fails** | Check Sepolia ETH balance and API_URL |
| **Private Key Error** | Use backticks (\`\`) not single quotes in config |
| **Token Not Visible** | Import token using contract address in MetaMask |
| **Gas Estimation Failed** | Increase gas limit or check network congestion |

### 🔧 Debug Commands

```bash
# Check Hardhat version
npx hardhat --version

# Test compilation
npx hardhat compile

# Verify network connection
npx hardhat console --network sepolia
```

## 📊 Project Structure

```
erc20-token-project/
├── 📁 contracts/
│   └── 📄 MyToken.sol
├── 📁 scripts/
│   └── 📄 deploy.js
├── 📁 node_modules/
├── 📄 hardhat.config.js
├── 📄 package.json
├── 📄 .env
└── 📄 README.md
```

## 🎯 Next Steps

- 🔒 **Add Security Features**: Implement pausable, burnable tokens
- 🏛️ **Governance**: Add voting mechanisms
- 🔄 **Upgradeable Contracts**: Use proxy patterns
- 🌐 **Frontend Integration**: Build a web interface
- 📈 **DeFi Integration**: Add liquidity pool functionality

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenZeppelin** for secure smart contract standards
- **Hardhat** for excellent development framework
- **Alchemy** for reliable blockchain infrastructure
- **Ethereum Community** for continuous innovation

---

<div align="center">

### 🌟 Star this repo if it helped you! 🌟

**Made with ❤️ by [Your Name]**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yourusername)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/yourprofile)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/yourhandle)

</div>

---

> 💡 **Educational Purpose**: This project is for learning blockchain development. Always audit smart contracts before mainnet deployment!