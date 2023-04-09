import React, { useState, useEffect } from "react";
import OrganizeService from "../../services/organize.service";

const Organize = (props) => {
  let { currentUser } = props;
  const [pageLoading, setPageLoading] = useState(false);
  const [organizeData, setOrganizeData] = useState({});
  useEffect(() => {
    setPageLoading(true);
    OrganizeService.getOrganize(currentUser.user._id)
      .then((data) => {
        console.log("OrganizeData: ", data);
        setOrganizeData(data.data);
      })
      .catch((error) => {
        console.log("獲取organizeData失敗！", error);
      })
      .finally(() => {
        setPageLoading(false);
      });
  }, []);

  if (pageLoading) {
    return (
      <div className="w-full h-[720px] flex flex-col justify-center items-center">
        <progress className="progress progress-accent w-56 "></progress>
        <h1 className="mt-3">請稍等...</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-row max-w-[1024px]">
        <div className="w-1/4">
          <img src={organizeData.organizeImage} />
        </div>
        <div className="w-3/4">
          <div>{organizeData.organizeName}</div>
          <div>{organizeData.introduction}</div>
        </div>
      </div>
    </div>
  );
};

export default Organize;
