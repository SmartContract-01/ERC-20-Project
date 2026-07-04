const {ethers} = require("hardhat");

async function main() {
    const provider=await ethers.getContractFactory("ERC");
    const run=await provider.deploy(1000000);
    await run.waitForDeployment();

    const [deployer] = await ethers.getSigners();

    console.log("Deployer Address:", deployer.address);

    console.log("Contract Address :",await run.getAddress());
    
}
main()