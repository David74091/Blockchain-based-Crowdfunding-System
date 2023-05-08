import React, { useState, useEffect } from "react";
import { useStateContext } from "../../context";
import DonationService from "../../services/donation.service";
import {
  PageLoading,
  Loader,
  CustomAlert,
  CashFlowAlert,
} from "../../components";
import { ethers } from "ethers";

const CashFlowDashBoard = () => {
  const { getCampaigns, donate, fetchNumberOfCampaigns } = useStateContext();
  const [blockChainData, setBlockChainData] = useState();
  const [cashFlowData, setCashFlowData] = useState();
  const [isDonating, setIsDonating] = useState(false);

  const [loader, setLoader] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [pId, setPId] = useState();
  //台幣兌換美金即時匯率
  const [exchangeRate, setExchangeRate] = useState(null);
  const [amountUSD, setAmountUSD] = useState(null);

  //alert
  const [showDonationAlert, setShowDonationAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [donationAlertCallback, setDonationAlertCallback] = useState(null);
  const [alertAmount, setAlertAmount] = useState(null);

  const [showCusAlert, setShowCusAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [alertType, setAlertType] = useState();
  const [alertIcon, setAlertIcon] = useState();

  const [amount, setAmount] = useState(null); // Replace with your custom TWD amount

  const fetchExchangeRate = async (amount) => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: {
          apikey: "F3BOVFd97oEBIyGu3t8xQF1SEa0erhpg", // Replace with your API key
        },
      };

      console.log(typeof amount);

      const response = await fetch(
        `https://api.apilayer.com/exchangerates_data/convert?to=USD&from=TWD&amount=${amount}`,
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

  useEffect(() => {
    setPageLoading(true);
    const getCashFlowData = async () => {
      try {
        const data = await DonationService.getDonationsFalse();
        console.log("現金流資料：", data.data);
        setCashFlowData(data.data);
      } catch (err) {
        console.log("現金流資料獲取失敗", err);
      } finally {
        setPageLoading(false);
      }
    };
    getCashFlowData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await getCampaigns();
  //       setBlockChainData(data);
  //       console.log("區塊鏈資訊：", data);
  //     } catch (error) {
  //       console.log("取得區塊鏈上資訊失敗!", error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  const handleDonate = async (pId, amount, donation_id) => {
    if (isDonating) {
      return; // 如果已经在捐赠过程中，直接返回，不执行后续操作
    }
    try {
      setIsDonating(true);
      setLoader(true);
      const fetchedAmountUSD = await fetchExchangeRate(amount);
      console.log("轉成美金數值：", fetchedAmountUSD);

      const proceedBlockChain = async () => {
        try {
          setShowDonationAlert(false);
          let n = parseInt(pId) - 1;
          let newPID = n.toString();
          let hash = await donate(newPID, fetchedAmountUSD.toString());
          console.log("hash:", hash);
          await DonationService.pushHash(donation_id, hash);
          await DonationService.DonationVerified(donation_id);
          setLoader(false);
          setAlertMessage("成功驗證");
          setAlertIcon("sucess");
          setAlertType("sucess");
          setShowCusAlert(true);
          setTimeout(() => {
            setShowCusAlert(false);
          }, 1500);
          window.location.reload();
        } catch (err) {
          setLoader(false);
          setAlertMessage("驗證失敗");
          setAlertIcon("error");
          setAlertType("error");
          setShowCusAlert(true);

          setTimeout(() => {
            setShowCusAlert(false);
          }, 1500);

          console.log(err);
          setIsDonating(false);
        }
      };
      setAlertAmount(fetchedAmountUSD);
      setShowDonationAlert(true);
      setShowDonationAlert(true);
      setDonationAlertCallback(() => proceedBlockChain);
    } catch (error) {
      setIsLoading(false);
      console.error("Error in handleClick:", error);
      alert("發生錯誤，請查看控制台以獲取更多信息。");
    }
  };
  if (pageLoading) {
    return <PageLoading />;
  }

  return (
    <div>
      {loader && <Loader />}
      {showDonationAlert && (
        <CashFlowAlert
          onClose={() => {
            setShowDonationAlert(false);
            setLoader(false); // Set the loader to false when the user clicks "Cancel"
            console.log("Cancel button clicked"); // Add this line to see if the code is executed
          }}
          onConfirm={donationAlertCallback}
          amount={alertAmount}
        />
      )}

      {showCusAlert && (
        <CustomAlert message={alertMessage} type={alertType} icon={alertIcon} />
      )}
      <div className="flex justify-center h-screen">
        <div className="overflow-x-auto w-9/12 border rounded-xl my-20">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>所屬提案</th>
                <th>捐款金額</th>
                <th>捐款日期</th>
                <th>區塊鏈操作</th>
              </tr>
            </thead>
            <tbody>
              {cashFlowData &&
                cashFlowData.map((flow, index) => {
                  return (
                    <tr>
                      <th>{index + 1}</th>
                      <th>
                        <div className="flex items-center gap-1">
                          <div className="h-10 w-10 rounded-full">
                            <img
                              className="rounded-full"
                              src={flow.belong.image}
                            />
                          </div>
                          {flow.belong.title}
                        </div>
                      </th>

                      <td>{flow.amount}</td>
                      <td>
                        {new Date(flow.donateDate).toLocaleString("zh-TW", {
                          timeZone: "Asia/Taipei",
                        })}
                      </td>
                      <td>
                        <button
                          className="btn btn-secondary"
                          disabled={isDonating} // 当 isDonating 为 true 时，禁用按钮
                          onClick={() =>
                            handleDonate(flow.belong.bId, flow.amount, flow._id)
                          }
                        >
                          執行交易
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CashFlowDashBoard;
