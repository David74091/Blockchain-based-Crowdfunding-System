import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import FundCard from "./FundCard";

// import { calculateBarPercentage, daysLeft } from "../utils";

const DisplayCases = ({ title, isLoading, caseData }) => {
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = (cases) => {
    navigate(cases.title, { state: cases });
  };
  console.log("display:", caseData);

  if (caseData == null) {
    return <div>沒有資料</div>;
  }
  return (
    <div className=" mt-[50px]">
      <h1 className="font-epilogue font-semibold text-[18px] text-left ml-[50px]">
        提案數量：({caseData.length})
      </h1>
      <div className="container mx-auto flex flex-wrap gap-[50px] place-content-center">
        {caseData &&
          caseData.length > 0 &&
          caseData
            .map((cases) => (
              <FundCard
                key={cases.id}
                {...cases}
                handleClick={() => handleNavigate(cases)}
              />
            ))
            .reverse()}
        <br />
      </div>
    </div>
  );
};

export default DisplayCases;
