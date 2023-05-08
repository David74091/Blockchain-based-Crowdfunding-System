import React, { useState, useEffect } from "react";
import DonationService from "../../services/donation.service";
import { PageLoading, Loader } from "../../components";

const DonationHistory = (props) => {
  const { currentUser } = props;
  const [histories, setHistories] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  const handleHashClick = (hash) => {
    if (!hash) {
      alert("請等待管理員驗證至區塊鏈");
      return;
    }
    window.open(`https://mumbai.polygonscan.com/tx/${hash}`);
  };

  useEffect(() => {
    let getHistory = async () => {
      try {
        setPageLoading(true);
        let data = await DonationService.getDonationHistory(
          currentUser.user._id
        );
        setHistories(data.data);
      } catch (err) {
        console.log("獲取history錯誤", err);
      } finally {
        setPageLoading(false);
      }
    };
    getHistory();
  }, []);
  console.log("history", histories);

  if (pageLoading) {
    return <PageLoading />;
  }
  return (
    <div className="flex justify-center h-screen">
      <div className="overflow-x-auto w-9/12 border rounded-xl my-20">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>提案名稱</th>
              <th>捐款金額</th>
              <th>捐款日期</th>
              <th>狀態</th>
            </tr>
          </thead>
          <tbody>
            {histories &&
              histories
                .slice()
                .reverse()
                .map((history, index) => {
                  return (
                    <tr>
                      <th>{index + 1}</th>
                      <td style={{ cursor: "pointer" }} key={history._id}>
                        <div className="flex items-center gap-1">
                          <div className="flex flex-col items-center">
                            <img
                              className="h-[100px] rounded-2xl"
                              src={history.belong.image}
                            />
                            {history.belong.title}
                          </div>
                        </div>
                      </td>
                      <td>{history.amount} $TWD</td>
                      <td>
                        {" "}
                        {new Date(history.donateDate).toLocaleString("zh-TW", {
                          timeZone: "Asia/Taipei",
                        })}
                      </td>
                      <td>
                        <button
                          onClick={() => handleHashClick(history.hash)}
                          class={`btn ${
                            history.Verified ? "btn-accent" : "btn-error"
                          }`}
                        >
                          {history.Verified
                            ? "已驗證至區塊鏈"
                            : "待驗證至區塊鏈"}
                        </button>
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

export default DonationHistory;
