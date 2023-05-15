import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import CaseService from "../../services/case.service";
import { PageLoading } from "../../components";

const ProfileCampaign = (props) => {
  let { currentUser, setInCampaignPage } = props;
  const [userCases, setUserCases] = useState({});
  const [pageLoading, setPageLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setInCampaignPage(false);
    setPageLoading(true);
    CaseService.get(currentUser.user._id)
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

  if (pageLoading) {
    return <PageLoading />;
  }

  if (userCases.length === 0) {
    return <h1>尚未有提案</h1>;
  }

  return (
    <div className="flex justify-center h-screen opacity-0 transition-opacity duration-500 animate-fade-in-forwards">
      <div className="overflow-x-auto w-9/12 border rounded-xl my-20">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>提案名稱</th>
              <th>目標金額</th>
              <th>已募金額</th>
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
                    <td>{userCase.target}</td>
                    <td>{userCase.totalAmount}</td>

                    <td>{userCase.Verified ? "已驗證" : "管理員驗證中"}</td>
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
                        <button className="btn btn-secondary">申請撤消</button>
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
