import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import CaseService from "../../services/case.service";
import { useStateContext } from "../../context";
import { ethers } from "ethers";

import {
  Loader,
  ChangeAlert,
  CustomAlert,
  PageLoading,
} from "../../components";

const AdminCheckCase = (props) => {
  let { currentUser } = props;
  const [userCases, setUserCases] = useState({});
  const [pageLoading, setPageLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showDonationAlert, setShowDonationAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [donationAlertCallback, setDonationAlertCallback] = useState(null);
  const [alertAmount, setAlertAmount] = useState(null);

  //alert
  const [showCusAlert, setShowCusAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [alertType, setAlertType] = useState();
  const [alertIcon, setAlertIcon] = useState();

  const navigate = useNavigate();
  const {
    donate,
    getDonations,
    contract,
    address,
    fetchNumberOfCampaigns,
    createCampaign,
  } = useStateContext();
  //台幣兌換美金即時匯率
  const [exchangeRate, setExchangeRate] = useState(null);
  const [amountUSD, setAmountUSD] = useState(null);

  const fetchExchangeRate = async (amountTWD) => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: {
          apikey: "F3BOVFd97oEBIyGu3t8xQF1SEa0erhpg", // Replace with your API key
        },
      };

      const response = await fetch(
        `https://api.apilayer.com/exchangerates_data/convert?to=USD&from=TWD&amount=${amountTWD}`,
        requestOptions
      );
      const result = await response.json();

      if (result.success) {
        setExchangeRate(result.result);
        setAmountUSD(result.result);
        return result.result;
      } else {
        console.error("Error fetching exchange rate:", result.error);
        return null;
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      return null;
    }
  };

  const handleBlockChainClick = async (state) => {
    try {
      setIsLoading(true);
      console.log("開始獲取即時匯率");
      const fetchedAmountUSD = await fetchExchangeRate(state.target);
      console.log("獲取即時匯率成功", fetchedAmountUSD);

      const proceedBlockChain = async () => {
        try {
          setShowDonationAlert(false);
          const _hash = await createCampaign(
            state.title,
            state.description,
            ethers.utils.parseUnits(String(fetchedAmountUSD), 18).toString(),
            state.deadline,
            state.image
          );

          console.log("_hash", _hash);

          setIsLoading(false);

          const _bId = await fetchNumberOfCampaigns();
          await CaseService.verifiedCase(state._id, _bId, _hash).then(() => {
            setAlertMessage("成功驗證");
            setAlertIcon("sucess");
            setAlertType("sucess");
            setShowCusAlert(true);
            setTimeout(() => {
              setShowCusAlert(fakse);
            }, 1500);
            window.location.reload();
          });
        } catch (err) {
          setAlertMessage("驗證失敗");
          setAlertIcon("error");
          setAlertType("error");
          setShowCusAlert(true);

          setTimeout(() => {
            setShowCusAlert;
            false;
          }, 1500);
          console.log(err);
        }
      };

      setAlertAmount(fetchedAmountUSD);

      setShowDonationAlert(true);
      setDonationAlertCallback(() => proceedBlockChain);
    } catch (error) {
      setIsLoading(false);
      console.error("Error in handleClick:", error);
      alert("發生錯誤，請查看控制台以獲取更多信息。");
    }
  };

  useEffect(() => {
    setPageLoading(true);
    CaseService.getAllFalse()
      .then((data) => {
        setUserCases(data.data);
      })
      .catch((error) => {
        console.log("抓取我的提案失敗", error);
      })
      .finally(() => {
        setPageLoading(false);
      });
  }, []);
  console.log("找尋到的我的提案：", userCases);

  const handleClick = (userCase) => {
    navigate(`/admincheckcase/${userCase.title}`, { state: userCase });
  };

  const handleUpdateClick = (userCase) => {
    navigate("/UpdatePage", { state: userCase });
  };

  if (pageLoading) {
    return <PageLoading />;
  }

  if (userCases.length === 0) {
    return <h1>尚未有提案</h1>;
  }

  return (
    <div className="flex justify-center h-screen">
      {isLoading && <Loader />}
      {showDonationAlert && (
        <ChangeAlert
          onClose={() => {
            setShowDonationAlert(false);
            setIsLoading(false);
          }}
          onConfirm={donationAlertCallback}
          amount={alertAmount}
        />
      )}
      {showCusAlert && (
        <CustomAlert message={alertMessage} type={alertType} icon={alertIcon} />
      )}
      <div className="overflow-x-auto w-9/12 border rounded-xl my-20">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>提案名稱</th>
              <th>目標金額</th>
              <th>提案組織</th>
              <th>組織資料</th>
              <th>提案帳號</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(userCases) &&
              userCases.map((userCase, index) => {
                console.log("userCase的type:", typeof userCase.Verified);
                return (
                  <tr>
                    <th>{index + 1}</th>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => handleClick(userCase)}
                      key={userCase._id}
                      className="flex"
                    >
                      <div className="flex flex-col items-center">
                        <img
                          className="h-[100px] rounded-2xl"
                          src={userCase.image}
                        />
                        {userCase.title}
                      </div>
                    </td>
                    <td>${new Intl.NumberFormat().format(userCase.target)}</td>
                    <td>
                      <div className="flex flex-col">
                        <img
                          className="rounded-full h-10 w-10 mb-5"
                          src={userCase && userCase.organize.organizeImage}
                        />

                        {userCase.organize && userCase.organize.organizeName}
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <div className="flex">
                          <div className="text-gray-400">姓名： </div>
                          {userCase.organize.personName}
                        </div>
                        <div className="flex">
                          <div className="text-gray-400">信箱： </div>
                          {userCase.organize.email}
                        </div>
                        <div className="flex">
                          <div className="text-gray-400">電話： </div>
                          {userCase.organize.phoneNumber}
                        </div>
                        <div className="flex">
                          <div className="text-gray-400">介紹： </div>
                          {userCase.organize.introduction}
                        </div>
                      </div>
                    </td>

                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => handleClick(userCase)}
                      key={userCase.proposer._id}
                      className="flex"
                    >
                      <div className="flex flex-col items-center">
                        <img
                          className="h-[100px] rounded-2xl"
                          src={userCase.proposer.picture}
                        />
                        {userCase.proposer.username}
                      </div>
                    </td>
                    <td>
                      {userCase.Verified && (
                        <button
                          onClick={() => handleUpdateClick(userCase)}
                          className="btn btn-primary"
                        >
                          更新進度
                        </button>
                      )}
                      {!userCase.Verified && (
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleBlockChainClick(userCase)}
                        >
                          <div className="flex flex-col gap-1">
                            <div>審核通過</div>
                          </div>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCheckCase;
