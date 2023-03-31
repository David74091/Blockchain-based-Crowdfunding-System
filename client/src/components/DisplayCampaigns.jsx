import React from "react";
import { useNavigate } from "react-router-dom";

import FundCard from "./FundCard";
import { loader } from "../assets";
import { calculateBarPercentage, daysLeft } from "../utils";

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();
  const handleNavigate = (campaign) => {
    navigate(campaign.title, { state: campaign });
  };

  return (
    <div className=" mt-[50px]">
      <h1 className="font-epilogue font-semibold text-[18px] text-left ml-[50px]">
        提案數量：({campaigns.length})
      </h1>
      <div className="container mx-auto flex flex-wrap gap-[50px] place-content-center">
        {!isLoading &&
          campaigns.length > 0 &&
          campaigns
            .map((campaign) => (
              <FundCard
                key={campaign.id}
                {...campaign}
                handleClick={() => handleNavigate(campaign)}
              />
            ))
            .reverse()}
        <br />
      </div>
    </div>
  );
};

export default DisplayCampaigns;
