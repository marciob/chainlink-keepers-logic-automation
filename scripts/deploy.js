const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-etherscan");

async function main() {
  /*
 A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
 so counter here is a factory for instances of our Counter contract.
 */
  const counter = await ethers.getContractFactory("Counter");
  // deploy the contract
  const deployedCounterContract = await counter.deploy(30);

  await deployedCounterContract.deployed();

  // print the address of the deployed contract
  console.log("Verify Contract Address:", deployedCounterContract.address);

  console.log("Waiting for Etherscan verification.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(30000);

  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: deployedCounterContract.address,
    constructorArguments: [30],
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//deployed: 0x31e24e6dd48e91de4424bfab7ea489b5eeb8847b
