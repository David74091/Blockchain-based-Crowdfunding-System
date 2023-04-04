import React, { useState } from "react";
import { useStateContext } from "../context";
import { calculateBarPercentage, daysLeft } from "../utils";
import { tagtype } from "../assets";
const FundCard = ({
  Verified,
  category,
  deadline,
  description,
  details,
  donor,
  email,
  idNumber,
  image,
  introduction,
  organizeImage,
  organizeName,
  personName,
  phoneNumber,
  proposer,
  target,
  title,
  handleClick,
}) => {
  const remainingDays = daysLeft(deadline);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // let checkEnabled = true;
  // if (remainingDays <= 0) {
  //   checkEnabled = false;
  // }
  const handleDonate = async () => {
    setIsLoading(true);

    await donate(pId, amount);

    navigate("/");
    setIsLoading(false);
  };

  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-white shadow-2xl cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={image}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />
      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <img
            src={tagtype}
            alt="tag"
            className="w-[17px] h-[17px] object-contain"
          />
          <div className="flex flex-row items-center ml-[4px]">
            {category.map((categoryItem, index) => (
              <div key={index} className="flex items-center">
                <p className="mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
                  {categoryItem}
                  {index <= category.length - 2 ? "、" : ""}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="block">
          <h3 className="fiont-epilogue font-semibold text-[16px] leading-[26px] truncate">
            {title}
          </h3>
          <p className="text-[#808191] mt-[5px] font-epilogue font-normal text-left leadiing-[18px] truncate">
            {description}
          </p>
        </div>
        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px]">
              已募金額：0
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              需求金額：{target}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px]">
              {remainingDays}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              剩餘天數
            </p>
          </div>
        </div>
        <div className="flex items-center mt-[20px] gap-[12px]">
          <div class="w-6 h-6 rounded-full flex items-center justify-center">
            <img
              class="object-cover w-full h-full rounded-full"
              src={organizeImage}
              alt="your-image-alt"
            />
          </div>

          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            提案人：<span className="text-[#b2b3bd]">{organizeName}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
