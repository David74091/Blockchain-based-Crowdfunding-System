import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CaseService from "../../services/case.service";

const ProfileCampaign = (props) => {
  let { currentUser } = props;
  const [userCases, setUserCases] = useState({});
  const [pageLoading, setPageLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setPageLoading(true);
    CaseService.get(currentUser.user._id)
      .then((data) => {
        setUserCases(data.data);
        console.log("找尋到的我的提案：", userCases);
      })
      .catch((error) => {
        console.log("抓取我的提案失敗", error);
      })
      .finally(() => {
        setPageLoading(false);
      });
  }, []);

  const handleClick = (userCase) => {
    navigate(userCase.title, { state: userCase });
  };

  if (pageLoading) {
    return (
      <div className="w-full h-[720px] flex flex-col justify-center items-center">
        <progress className="progress progress-primary w-56"></progress>
        <h1 className="mt-3">請稍等...</h1>
      </div>
    );
  }

  if (userCases.length === 0) {
    return <h1>尚未有提案</h1>;
  }

  return (
    <div className="flex justify-center h-screen">
      <div className="overflow-x-auto w-9/12 border rounded-xl my-20">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>提案名稱</th>
              <th>提案金額</th>
              <th>狀態</th>
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
                    >
                      {userCase.title}
                    </td>
                    <td>{userCase.target}</td>
                    <td>{userCase.Verified ? "已驗證" : "管理員驗證中"}</td>
                    <td>
                      {userCase.Verified && (
                        <button className="btn btn-primary">編輯提案</button>
                      )}
                      {!userCase.Verified && (
                        <button className="btn btn-primary">申請撤銷</button>
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

export default ProfileCampaign;
