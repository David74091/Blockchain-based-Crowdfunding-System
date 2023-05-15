import React, { useState, useEffect } from "react";
import CaseService from "../../../services/case.service";
import { PageLoading } from "../../../components";

const Page4 = ({ state }) => {
  const [donations, setDonations] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);

  //處理捐款名單頭像點擊導向至區塊鏈查詢網站hash
  const handleDonorClick = (hash) => {
    if (!hash) {
      alert("該交易待處理中，請稍候管理員上鏈");
      return;
    }
    window.open(`https://mumbai.polygonscan.com/tx/${hash}`);
  };
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setPageLoading(true);
        const data = await CaseService.getAllDonations(state._id);
        setDonations(data.data);
        console.log("Page4 donations:", data.data);
      } catch (err) {
        console.log("Page4獲取捐款名單失敗", err);
      } finally {
        setPageLoading(false);
      }
    };
    fetchDonations();
  }, []);

  if (pageLoading) {
    return <PageLoading />;
  }

  return (
    <div className="max-w-[1024px] ">
      <div className="mt-10 ml-14 text-[1.5rem] font-bold">
        募款總額NT $
        {donations && new Intl.NumberFormat().format(donations.totalAmount)}
      </div>
      <div className="mt-2 ml-14 text-[0.5em] font-light">
        已驗證捐款可點擊至區塊鏈上查看詳細金流
      </div>
      <div className="flex flex-row flex-wrap gap-10 justify-center mt-10">
        {donations &&
          Array.isArray(donations.donorsByTime) &&
          donations.donorsByTime.map((donor) => {
            return (
              <div className="indicator">
                {donor.hash && (
                  <span className="indicator-item badge badge-secondary">
                    已驗證
                  </span>
                )}
                <div
                  className="flex flex-col items-center border-1 rounded-xl p-4 gap-3 bg-base-200 cursor-pointer"
                  key={donor.donor.id}
                  onClick={() => handleDonorClick(donor.hash)}
                >
                  <img
                    className="w-20 h-20 rounded-full"
                    src={donor.donor.picture}
                    alt={donor.donor.username}
                  />
                  <p>{donor.donor.username}</p>
                  <p>$ {new Intl.NumberFormat().format(donor.amount)}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Page4;
