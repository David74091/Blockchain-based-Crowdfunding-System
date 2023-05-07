// "0x2C8bEA2DB895152e5F6eF317055D82d0EC9a54f2"

import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";

import { ethers } from "ethers";

const StateContext = createContext();

//   這段代碼中，export const StateContextProvider = ({ children }) => { 是定義了一個名為 StateContextProvider 的 React 組件，並且使用 export 關鍵字導出了這個組件。在組件函數中，使用了 useContract 和 useContractWrite 這兩個 Hooks 來調用智能合約。其中，useContract Hooks 的作用是獲取指定地址的智能合約實例，而 useContractWrite Hooks 則用來調用智能合約中的寫操作（即修改合約狀態的操作）。

//   在這段代碼中，useContract Hooks 獲取了一個智能合約實例，並將其賦值給了 contract 變量。而 useContractWrite Hooks 則用於調用智能合約中名為 createCampaign 的方法。這個方法用來創建一個新的活動（campaign）。

//   組件的 chirldren 屬性則是一個特殊的屬性，用於傳遞組件的子組件。在這段代碼中，它的作用是將當前組件的子組件作為參數傳遞給了當前組件。

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xbE772979E57f8e00BE23b50c02fdE429125F039A"
  );
  const { mutateAsync: createCampaign, isLoading } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (
    title,
    description,
    target,
    deadline,
    image
  ) => {
    try {
      const data = await createCampaign([
        title,
        description,
        target,
        // 将毫秒时间戳转换为秒时间戳
        Math.round(new Date(deadline).getTime() / 1000),
        image,
      ]);

      console.log("contract call success", data);
      return data.receipt.transactionHash;
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const withdraw = async (pId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await contract.call("withdraw", pId);
        console.log("Withdraw success", data);
        resolve(data.receipt.transactionHash);
      } catch (error) {
        console.log("Withdraw failure", error);
        reject(error);
      }
    });
  };

  const searchCampaigns = async (searchTerm) => {
    const campaigns = await contract.call("searchCampaigns", searchTerm);
    //整理從智能合約上得到的數據
    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: i,
    }));
    return parsedCampaings;
  };

  const getCampaigns = async () => {
    if (!contract) {
      throw new Error("Contract is not initialized");
    }

    const campaigns = await contract.call("getCampaigns");

    //整理從智能合約上得到的數據
    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: new Date(campaign.deadline.toNumber()),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: i,
    }));

    return parsedCampaings;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  const donate = async (pId, amount) => {
    console.log("context donate收到", pId, amount);
    const data = await contract.call(
      "donateToCampaign",
      pId,
      ethers.utils.parseEther(amount)
    );
    console.log("donate完後的訊息：", data.receipt.transactionHash);

    return data.receipt.transactionHash;
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }
    return parsedDonations;
  };

  const fetchNumberOfCampaigns = async () => {
    if (!contract) {
      throw new Error("Contract is not initialized");
    }

    const campaignCount = await contract.call("numberOfCampaigns");
    return campaignCount.toNumber();
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        searchCampaigns,
        withdraw, // Add the new withdraw function to the context
        fetchNumberOfCampaigns, // Add the new fetchNumberOfCampaigns function to the context
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
