import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { calculateBarPercentage, daysLeft } from "../utils";
import CaseService from "../services/case.service";
import { tagtype } from "../assets";
const FundCard = ({ cases, handleClick }) => {
  console.log("fundCard Cases:", cases);

  const [donations, setDonations] = useState();
  useEffect(() => {
    let fetchAllDonations = async () => {
      try {
        let data = await CaseService.getAllDonations(cases._id);
        setDonations(data.data);
      } catch (err) {
        console.log("獲取捐款資訊失敗", err);
      }
    };
    fetchAllDonations();
  }, [cases.image]);

  const remainingDays = daysLeft(cases.deadline);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // let checkEnabled = true;
  // if (remainingDays <= 0) {
  //   checkEnabled = false;
  // }
  // const handleDonate = async () => {
  //   setIsLoading(true);

  //   await donate(pId, amount);

  //   navigate("/");
  //   setIsLoading(false);
  // };

  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-white shadow-2xl cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={cases.image}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />
      <div className="flex flex-col p-4">
        <div className="block">
          <h3 className="fiont-epilogue font-semibold text-[20px] leading-[26px] truncate">
            {cases.title}
          </h3>
          <p className="text-[#808191] mt-[5px] font-epilogue font-normal text-left leadiing-[18px] truncate ml-0.5">
            {cases.description}
          </p>
        </div>
        <div className="flex flex-row items-center mt-[15px] mb-[20px] w-full">
          <div className="flex flex-row items-center ml-[4px] w-full">
            <div className="relative w-full h-[15px] bg-gray-200 mt-2 flex-2 rounded-md">
              <div
                className="absolute h-full bg-[#65C3C8] rounded-md"
                style={
                  donations && {
                    width: `${calculateBarPercentage(
                      cases.target,
                      donations.totalAmount
                    )}%`,
                    maxWidth: "100%",
                  }
                }
              ></div>
            </div>
          </div>
        </div>

        <div className="flex justify-between flex-wrap gap-2">
          <div className="flex flex-col">
            <p className="font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              需求：NT $
              {donations && new Intl.NumberFormat().format(cases.target)}
            </p>
            <h4 className="mt-[3px] font-semibold text-[12px] leading-[18px] text-[#291334] sm:max-w-[120px]">
              已募：NT $
              {donations &&
                new Intl.NumberFormat().format(donations.totalAmount)}
            </h4>
          </div>
          <div className="flex flex-col">
            <p className="font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              剩餘天數
            </p>
            <h4 className="mt-[3px] font-epilogue font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px]">
              {remainingDays} 天
            </h4>
          </div>
        </div>
        <div className="flex items-center mt-[20px] gap-[12px]">
          <div class="w-6 h-6 rounded-full flex items-center justify-center">
            <img
              class="object-cover w-full h-full rounded-full"
              src={cases.organize.organizeImage}
              alt="your-image-alt"
            />
          </div>

          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            提案人：
            <span className="text-[#b2b3bd]">
              {cases.organize.organizeName}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
