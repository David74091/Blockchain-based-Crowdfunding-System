import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import CaseService from "../../services/case.service";

import { useStateContext } from "../../context";
import { CountBox, CustomButton, Loader } from "../../components";
import { calculateBarPercentage, daysLeft } from "../../utils";

const AdminCaseDetails = (props) => {
  let { currentUser } = props;
  const { state } = useLocation();
  const [form, setForm] = useState({
    title: state.title,
    description: state.description,
    target: state.target.toString(),
    deadline: state.deadline,
    image: state.image,
  });

  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);
  const { createCampaign } = useStateContext();

  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    CaseService.verifiedCase(state._id)
      .then(() => {
        alert("已成功驗證");
      })
      .catch((err) => {
        alert(err);
      });
    // await createCampaign({
    //   ...form,
    //   target: ethers.utils.parseUnits(form.target, 18),
    // });
    setIsLoading(false);
    // navigate("/");
  };

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  return (
    <div className="container mx-auto">
      {isLoading && <Loader />}
      <div className="flex justify-center text-[30px] font-epilogue font-semibold">
        {state.title}
      </div>
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl"
          />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#46A3FF]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>
        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="剩餘時間" value={remainingDays} />
          <CountBox title={`需求金額 `} value={state.target} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] uppercase">
              提案單位
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div>
                <img
                  className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer"
                  src={state.organizeImage}
                  alt="提案單位照片"
                />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] break-all">
                  {state.organizeName}
                </h4>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] uppercase">
              提案介紹
            </h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] uppercase">
              提案分類
            </h4>

            <div className="mt-[20px] flex gap-2 w-full">
              {state.category.map((categories) => (
                <div>{categories}</div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] uppercase">
              提案單位資料
            </h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                1.聯絡人姓名：{state.personName}
                <br />
                2.聯絡人身分證字號：{state.idNumber}
                <br />
                3.提案聯絡人電話：{state.phoneNumber}
                <br />
                3.提案聯絡人信箱：{state.email}
                <br />
                4.提案人自我介紹：{state.introduction}
              </p>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: state.details }}></div>
        </div>

        <div className="flex-1">
          <button className="btn btn-accent h-[60px]" onClick={handleClick}>
            通過審核 <br />
            <br />
            進行上鏈
          </button>
          {isLoading && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default AdminCaseDetails;
