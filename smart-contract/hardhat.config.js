//https://eth-goerli.g.alchemy.com/v2/9C72PGCLWIwrblTmDM2vgSTq9lkrpddp

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    Goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/9C72PGCLWIwrblTmDM2vgSTq9lkrpddp",
      accounts: [
        "5330f02286799640eed2335d718e3423754d49f4095695b4a6405c45e0bc51ab",
      ],
    },
  },
};
