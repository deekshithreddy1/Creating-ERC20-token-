async function main() {
    const [  deployer ] = await ethers.getSigners() ;

    console.log("Depling contract with the account:" , deployer.address);

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

   