import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DisplayCases, PageLoading } from "../../components";
import { notion } from "../../assets";

const CampaignPage = (props) => {
  let {
    setOnHome,
    onHome,
    currentUser,
    setCurrentUser,
    caseData,
    Loading,
    setInCampaignPage,
  } = props;
  const navigate = useNavigate();

  useEffect(() => {
    setOnHome(!onHome);
    setInCampaignPage(true);
  }, []);

  const handleTakeToLogin = () => {
    navigate("/login");
  };

  const handleClick = (cases) => {
    navigate(cases.title, { state: cases });
  };
  if (caseData == null) {
    return <PageLoading />;
  }
  return (
    <div>
      <div className="flex flex-col items-center">
        <DisplayCases title="All Cases" Loading={Loading} caseData={caseData} />
      </div>
    </div>
  );
};

export default CampaignPage;
