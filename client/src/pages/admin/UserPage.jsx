import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import { Loader, PageLoading, CustomAlert } from "../../components";
import { account } from "../../assets";

const UserPage = () => {
  const [userData, setUserData] = useState();
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
  useEffect(() => {
    const fetchUser = async () => {
      const data = await UserService.getAllUser();

      setUserData(data.data);
    };

    fetchUser();
  }, []);
  console.log("userData", userData);
  return (
    <div>
      {loader && <Loader />}

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
                <th>頭像</th>
                <th>暱稱</th>
                <th>姓名</th>
                <th>信箱</th>
                <th>電話</th>
                <th>身份</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {userData &&
                userData
                  .map((user, index) => {
                    return (
                      <tr>
                        <th>{userData.length - index}</th>
                        <th>
                          <div className="flex items-center gap-1">
                            {user.picture ? (
                              <div className="h-10 w-10 rounded-full">
                                <img
                                  className="rounded-full"
                                  src={user.picture}
                                />
                              </div>
                            ) : (
                              <div className="h-10 w-10 rounded-full">
                                <img className="rounded-full" src={account} />
                              </div>
                            )}
                          </div>
                        </th>
                        <td>{user ? user.username : "未填寫"}</td>
                        <td>
                          {user.organize ? user.organize.personName : "未填寫"}
                        </td>

                        <td>{user.email}</td>
                        <td>
                          {user.organize ? user.organize.phoneNumber : "未填寫"}
                        </td>
                        <td>
                          {user.organize ? (
                            <img
                              className="rounded-full h-10 w-10"
                              src={user.organize && user.organize.organizeImage}
                            />
                          ) : (
                            "未創建"
                          )}

                          {user.organize ? user.organize.organizeName : ""}
                        </td>
                        <td>
                          <button className="btn btn-primary">編輯用戶</button>
                        </td>
                      </tr>
                    );
                  })
                  .reverse()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
