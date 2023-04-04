import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DisplayCases } from "../../components";

const Home = (props) => {
  let { currentUser, setCurrentUser, caseData, Loading } = props;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Home CaseData:", caseData);
  }, [caseData]);

  const handleTakeToLogin = () => {
    navigate("/login");
  };

  const handleClick = (cases) => {
    navigate(cases.title, { state: cases });
  };
  if (caseData == null) {
    return (
      <div className="w-full h-[720px] flex flex-col justify-center items-center">
        <progress className="progress progress-accent w-56 "></progress>
        <h1 className="mt-3">請稍等...</h1>
      </div>
    );
  }

  return (
    // <div style={{ padding: "3rem" }}>
    //   {caseData && caseData.length > 0 && (
    //     <div className="flex flex-wrap gap-5 justify-center ">
    //       {caseData.map((cases) => (
    //         <div
    //           className="card bg-base-100 shadow-xl"
    //           style={{ width: "18rem" }}
    //         >
    //           <figure className="h-[250px]">
    //             <img
    //               className="w-full object-cover"
    //               src={cases.image}
    //               alt="caseImage"
    //             />
    //           </figure>
    //           <div className="card-body">
    //             <h1 style={{ fontSize: "1.5rem" }} className="card-title">
    //               {cases.title}
    //             </h1>
    //             <h2 style={{ fontSize: "1.15rem" }}>{cases.description}</h2>
    //             <p style={{ fontSize: "0.5rem" }}>目標金額：{cases.target}</p>
    //             <p style={{ fontSize: "0.5rem" }}>有效日期：{cases.deadline}</p>
    //             <div className="card-actions justify-center mt-4">
    //               <button
    //                 className="btn btn-accent"
    //                 onClick={() => handleClick(cases)}
    //               >
    //                 進行審核
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   )}
    //   {caseData && caseData.length == 0 && <div>目前沒有提案</div>}
    //   //{" "}
    // </div>
    <div>
      <DisplayCases title="All Cases" Loading={Loading} caseData={caseData} />
    </div>
  );
};

export default Home;
