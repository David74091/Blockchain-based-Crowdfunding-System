import React, { useState, useEffect } from "react";
import { useStateContext } from "../../context";
import DonationService from "../../services/donation.service";
import { PageLoading, Loader } from "../../components";
import { ethers } from "ethers";

const CashFlowDashBoard = () => {
  const { getCampaigns, donate, fetchNumberOfCampaigns } = useStateContext();
  const [blockChainData, setBlockChainData] = useState();
  const [cashFlowData, setCashFlowData] = useState();

  const [loader, setLoader] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [pId, setPId] = useState();
  //台幣兌換美金即時匯率
  const [exchangeRate, setExchangeRate] = useState(null);
  const [amountUSD, setAmountUSD] = useState(null);

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
        setPId(cashFlowData[0].belong.bId);
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
    setLoader(true);
    const fetchedAmountUSD = await fetchExchangeRate(amount);
    console.log("轉成美金數值：", fetchedAmountUSD);

    const userConfirmed = window.confirm(
      `將台幣捐款轉換成: ${fetchedAmountUSD} 美金，確認這筆交易嗎？`
    );

    if (userConfirmed) {
      try {
        let n = parseInt(pId) - 1;
        let newPID = n.toString();
        let hash = await donate(newPID, fetchedAmountUSD.toString());
        console.log("hash:", hash);
        await DonationService.pushHash(donation_id, hash);
        await DonationService.DonationVerified(donation_id);
        setLoader(false);
        location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      setLoader(false);
      console.log("用戶取消了交易。");
    }
  };

  if (pageLoading) {
    return <PageLoading />;
  }

  return (
    <div>
      {loader && <Loader />}
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
                          className="btn btn-primary"
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
