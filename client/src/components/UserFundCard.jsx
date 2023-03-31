import React, { useState } from "react";
import { useStateContext } from "../context";
import { calculateBarPercentage, daysLeft } from "../utils";

const UserFundCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
  pId,
}) => {
  const { donate, getDonations, contract, address } = useStateContext();
  const remainingDays = daysLeft(deadline);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let checkEnabled = true;
  if (remainingDays <= 0) {
    checkEnabled = false;
  }
  const handleDonate = async () => {
    setIsLoading(true);

    await donate(pId, amount);

    navigate("/");
    setIsLoading(false);
  };
  return (
    <div>
      {checkEnabled && (
        //沒有過期的提案
        <div class="card w-96 bg-base-100 shadow-xl image-full">
          <figure>
            <img src={image} alt="image" />
          </figure>
          <div class="card-body">
            <h1 class="card-title text-[2rem]">{title}</h1>
            <h3 className="card-content">剩餘時間：{remainingDays} 天</h3>
            <div class="card-actions justify-end">
              <button class="btn btn-primary" onClick={handleClick}>
                詳細資料
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFundCard;
