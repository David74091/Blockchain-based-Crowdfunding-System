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
        console.log("找尋到的我的提案：", userCases[0].title);
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
        <progress className="progress progress-primary w-56 "></progress>
        <h1 className="mt-3">請稍等...</h1>
      </div>
    );
  }

  if (userCases.length === 0) {
    return <h1>尚未有提案</h1>;
  }

  return (
    <div>
      {Array.isArray(userCases) &&
        userCases.map((userCase) => {
          return (
            <div onClick={() => handleClick(userCase)} key={userCase._id}>
              {userCase.title}
            </div>
          );
        })}
    </div>
  );
};

export default ProfileCampaign;
