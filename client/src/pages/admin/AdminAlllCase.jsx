import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useStateContext } from "../../context";

import { Loader, PageLoading, CustomAlert } from "../../components";

import CaseService from "../../services/case.service";

const AdminAllCase = (props) => {
  const { withdraw } = useStateContext();

  const [loader, setLoader] = useState(false);

  //alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [alertType, setAlertType] = useState();
  const [alertIcon, setAlertIcon] = useState();

  const [buttonLoadings, setButtonLoadings] = useState({});

  let { currentUser, setInCampaignPage } = props;
  const [userCases, setUserCases] = useState({});
  const [pageLoading, setPageLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setInCampaignPage(false);
    setPageLoading(true);
    CaseService.getAllTrue()
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
    if (!userCase.Verified) {
      alert("管理員尚未驗證");
      return;
    }
    navigate(userCase.title, { state: userCase });
  };

  const handleUpdateClick = (userCase) => {
    navigate("/UpdatePage", { state: userCase });
  };

  const handleDownCase = async (_id) => {
    setButtonLoadings((prevState) => ({ ...prevState, [_id]: true }));

    console.log("三小");
    try {
      await CaseService.downCase(_id);

      setAlertMessage("成功下架");
      setAlertIcon("sucess");
      setAlertType("sucess");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1500);
    } catch (err) {
      setAlertMessage("下架失敗");
      setAlertIcon("error");
      setAlertType("error");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1500);
      console.log(err);
    } finally {
      setButtonLoadings((prevState) => ({ ...prevState, [_id]: false }));
      window.location.reload();
    }
  };

  const handleWithdraw = async (bId, _id) => {
    setLoader(true);
    let n = parseInt(bId) - 1;
    let newbId = n.toString();

    try {
      const _hash = await withdraw(newbId);

      await CaseService.putWithdrawHash(_id, _hash);

      setAlertMessage("成功提領");
      setAlertIcon("sucess");
      setAlertType("sucess");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1500);
    } catch (err) {
      setAlertMessage("提領失敗");
      setAlertIcon("error");
      setAlertType("error");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1500);
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  if (pageLoading) {
    return <PageLoading />;
  }

  if (userCases.length === 0) {
    return <h1>尚未有提案</h1>;
  }

  return (
    <div className="flex justify-center h-screen">
      {loader && <Loader />}
      {showAlert && (
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
              <th>已募金額</th>
              <th>募款進度</th>
              <th>狀態</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(userCases) &&
              userCases.map((userCase, index) => {
                const totalDonationAmount = userCase.donations.reduce(
                  (accumulator, donation) => {
                    return accumulator + donation.amount;
                  },
                  0
                );

                console.log(
                  "userCase的type:",
                  (totalDonationAmount /
                    (totalDonationAmount + userCase.target)) *
                    100
                );
                return (
                  <tr
                    className={`${
                      userCase.withdrawHash
                        ? "bg-gray-300 opacity-30"
                        : "bg-gray-500"
                    }`}
                  >
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
                      ${new Intl.NumberFormat().format(totalDonationAmount)}
                    </td>

                    <td>
                      {Math.round(
                        (totalDonationAmount / userCase.target) * 100
                      )}
                      %
                    </td>
                    <td>
                      {userCase.withdrawHash ? (
                        <div className="">已提領</div>
                      ) : totalDonationAmount >= userCase.target ? (
                        <div className="text-success font-bold">可提領</div>
                      ) : (
                        <div className="text-error font-bold">募款中</div>
                      )}
                    </td>
                    <td>
                      {totalDonationAmount >= userCase.target ? (
                        <button
                          onClick={() =>
                            handleWithdraw(userCase.bId, userCase._id)
                          }
                          className="btn btn-primary"
                          disabled={!!userCase.withdrawHash}
                        >
                          提領代幣
                        </button>
                      ) : (
                        <button
                          className={`btn btn-secondary ${
                            buttonLoadings[userCase._id] ? "loading" : ""
                          }`}
                          disabled={
                            !!userCase.withdrawHash ||
                            buttonLoadings[userCase._id]
                          }
                          onClick={() => handleDownCase(userCase._id)}
                        >
                          下架提案
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

export default AdminAllCase;
