/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.9",
    defaultNetwork: "mumbai",
    networks: {
      hardhat: {},
      Mumbai: {
        url: "mumbai.rpc.thirdweb.com",
        accounts: [`0x${process.env.PRIVATE_KEY}`],
        // tokenAddress: "0xE67A4EECc331005F97Ff66ebA80df63348D66aA8", // Add your ERC20 token address here
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
