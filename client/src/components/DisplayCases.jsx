import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FundCard from "./FundCard";
import { donate } from "../assets";

// import { calculateBarPercentage, daysLeft } from "../utils";

const DisplayCases = (props) => {
  let { title, isLoading, caseData } = props;
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
    <div className="mt-10">
      <div className="container mx-auto flex flex-col flex-wrap place-content-center">
        <div className="flex animate-fade-in-from-left-forwards opacity-0 -translate-x-16">
          <div className="">
            <p className="font-bold text-[2rem] mt-10">瀏覽募款提案</p>
            <p className="font-light text-[1.5rem] mt-2">
              世界各地的人們 為他們的所需 募集資金
            </p>
            <Link to="/clientpostcase" className="btn btn-primary mt-5">
              我也需要募集資金
            </Link>
          </div>
          <div className="ml-[15vw]">
            <img src={donate} className="w-[400px]  mt-12 rounded-md " />
          </div>
        </div>

        <div className="divider mt-20"></div>
        <p className="font-bold text-[2rem] mt-10 mb-10 opacity-0 transition-opacity duration-500 animate-fade-in-forwards">
          熱門提案
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 opacity-0 transition-opacity duration-500 animate-fade-in-forwards">
          {caseData &&
            caseData.length > 0 &&
            caseData
              .map((cases) => (
                <FundCard
                  key={cases.id}
                  cases={cases} //等同於：<FundCard id={cases.id} title={cases.title} description={cases.description} />
                  handleClick={() => handleNavigate(cases)}
                />
              ))
              .reverse()}
        </div>

        <br />
        <div className="w-full flex items-center justify-center mt-20 ">
          <div className="btn-group">
            <button className="btn btn-ghost bg-base-300  btn-active">1</button>
            <button className="btn btn-ghost bg-base-300">2</button>
            <button className="btn btn-ghost bg-base-300">3</button>
            <button className="btn btn-ghost bg-base-300">4</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayCases;
