//npx hardhat run scripts/deploy.js --network Goerli
const main = async () => {
  const FundraisingPlatform = await hre.ethers.getContractFactory(
    "fundraisingPlatform"
  );
  const fundraisingPlatform = await FundraisingPlatform.deploy(
    1000,
    "0x2A46E4F841D92293274BdA482A3Fe74BbEEF01f7"
  );

  await fundraisingPlatform.deployed();

  console.log("Transactions deployed to: ", fundraisingPlatform.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
