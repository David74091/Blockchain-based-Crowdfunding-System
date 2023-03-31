import React from "react";
import { useNavigate } from "react-router-dom";

import UserFundCard from "./UserFundCard";
import { loader } from "../assets";
import { calculateBarPercentage, daysLeft } from "../utils";

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();
  const handleNavigate = (campaign) => {
    navigate(campaign.title, { state: campaign });
  };

  return (
    <div className=" mt-[50px]">
      <div className="flex flex-wrap place-content-center gap-[50px] center">
        {!isLoading &&
          campaigns.length > 0 &&
          campaigns
            .map((campaign) => (
              <UserFundCard
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
