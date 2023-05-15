import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import axios from "axios";

import CaseService from "../../services/case.service";

import { useStateContext } from "../../context";
import { CountBox, CustomButton, Loader } from "../../components";
import { calculateBarPercentage, daysLeft } from "../../utils";

const AdminCaseDetails = (props) => {
  let { currentUser } = props;
  const { state } = useLocation();
  // const [form, setForm] = useState({
  //   title: state.title,
  //   description: state.description,
  //   target: state.target.toString(),
  //   deadline: state.deadline,
  //   image: state.image,
  // });

  const navigate = useNavigate();
  const { donate, getDonations, contract, address, fetchNumberOfCampaigns } =
    useStateContext();

  console.log(state);

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);
  const { createCampaign } = useStateContext();

  //台幣兌換美金即時匯率
  // const [exchangeRate, setExchangeRate] = useState(null);
  // const [amountUSD, setAmountUSD] = useState(null);
  // const [amountTWD, setAmountTWD] = useState(state.target); // Replace with your custom TWD amount

  // const fetchExchangeRate = async () => {
  //   try {
  //     const requestOptions = {
  //       method: "GET",
  //       redirect: "follow",
  //       headers: {
  //         apikey: "F3BOVFd97oEBIyGu3t8xQF1SEa0erhpg", // Replace with your API key
  //       },
  //     };

  //     const response = await fetch(
  //       `https://api.apilayer.com/exchangerates_data/convert?to=USD&from=TWD&amount=${amountTWD}`,
  //       requestOptions
  //     );
  //     const result = await response.json();

  //     if (result.success) {
  //       setExchangeRate(result.result);
  //       setAmountUSD(result.result);
  //       return result.result;
  //     } else {
  //       console.error("Error fetching exchange rate:", result.error);
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Error fetching exchange rate:", error);
  //     return null;
  //   }
  // };

  const handleClick = async () => {
    try {
      setIsLoading(true);

      const fetchedAmountUSD = await fetchExchangeRate();

      await createCampaign(
        state.title,
        state.description,
        ethers.utils.parseUnits(String(fetchedAmountUSD), 18).toString(),
        state.deadline,
        state.image
      );

      const _bId = await fetchNumberOfCampaigns();
      await CaseService.verifiedCase(state._id, _bId).then(() => {
        alert("已成功驗證");
      });

      setIsLoading(false);
      // navigate("/");

      console.log(state);
    } catch (error) {
      setIsLoading(false);
      console.error("Error in handleClick:", error);
      alert("發生錯誤，請查看控制台以獲取更多信息。");
    }
  };

  // const fetchDonators = async () => {
  //   const data = await getDonations(state.pId);

  //   setDonators(data);
  // };

  // useEffect(() => {
  //   if (contract) fetchDonators();
  // }, [contract, address]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {isLoading && <Loader />}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">{state.title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <img
              src={state.image}
              alt="campaign"
              className="w-full h-[410px] object-cover rounded-xl"
            />
            <div className="mt-4">
              <h4 className="text-xl font-semibold mb-2">提案身份</h4>
              <div className="flex items-center gap-4">
                <img
                  className="w-14 h-14 rounded-full object-cover"
                  src={state.organize.organizeImage}
                  alt="提案身份照片"
                />
                <h4 className="font-semibold text-lg">
                  {state.organize.organizeName}
                </h4>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-2">提案介紹</h4>
              <p className="text-gray-700 text-justify">{state.description}</p>
            </div>
            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-2">提案分類</h4>
              <div className="flex gap-4 flex-wrap">
                {state.category.map((categories) => (
                  <span className="bg-blue-500 text-white rounded-full py-1 px-4">
                    {categories}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-2">提案身份資料</h4>
              <ul className="list-disc pl-6">
                <li>聯絡人姓名：{state.organize.personName}</li>
                <li>聯絡人身分證字號：{state.organize.idNumber}</li>
                <li>提案聯絡人電話：{state.organize.phoneNumber}</li>
                <li>提案聯絡人信箱：{state.organize.email}</li>
                <li>提案人自我介紹：{state.organize.introduction}</li>
              </ul>
            </div>
            <div
              className="mt-8"
              dangerouslySetInnerHTML={{ __html: state.details }}
            ></div>
          </div>
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl p-4 shadow">
              <h4 className="text-xl font-semibold mb-4">案件概況</h4>
              <CountBox title="剩餘時間" value={remainingDays} />
              <CountBox title={`需求金額`} value={state.target} />
              <div className="w-full mt-4">
                <button
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl"
                  onClick={handleClick}
                >
                  通過審核並進行上 行上鏈
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCaseDetails;
