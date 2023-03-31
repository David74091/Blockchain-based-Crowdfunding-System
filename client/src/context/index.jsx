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

//   這段代碼中，export const StateContextProvider = ({ chirldren }) => { 是定義了一個名為 StateContextProvider 的 React 組件，並且使用 export 關鍵字導出了這個組件。在組件函數中，使用了 useContract 和 useContractWrite 這兩個 Hooks 來調用智能合約。其中，useContract Hooks 的作用是獲取指定地址的智能合約實例，而 useContractWrite Hooks 則用來調用智能合約中的寫操作（即修改合約狀態的操作）。

//   在這段代碼中，useContract Hooks 獲取了一個智能合約實例，並將其賦值給了 contract 變量。而 useContractWrite Hooks 則用於調用智能合約中名為 createCampaign 的方法。這個方法用來創建一個新的活動（campaign）。

//   組件的 chirldren 屬性則是一個特殊的屬性，用於傳遞組件的子組件。在這段代碼中，它的作用是將當前組件的子組件作為參數傳遞給了當前組件。

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x9871a6D76A5D11CC0E8F382aA355C1a747Ab0Df4"
  );
  const { mutateAsync: createCampaign, isLoading } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address, // owner
        form.title, // title
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image, // deadline,
      ]);

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
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
    const campaigns = await contract.call("getCampaigns");

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

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  const donate = async (pId, amount) => {
    const data = await contract.call("donateToCampaign", pId, {
      value: ethers.utils.parseEther(amount),
    });

    return data;
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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
