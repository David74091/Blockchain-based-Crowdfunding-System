import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CaseService from "../../services/case.service";

const AdminCheckCase = (props) => {
  let { currentUser, setCurrentUser } = props;
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };

  let [caseData, setCaseData] = useState(null);
  useEffect(() => {
    console.log("Using effect.");
    setLoading(true);
    // let _id;
    // if (currentUser) {
    //   _id = currentUser.user._id;
    // } else {
    //   _id = "";
    // }

    if (currentUser.user.role == "admin") {
      CaseService.getAllFalse()
        .then((data) => {
          console.log(data);
          setCaseData(data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleClick = (cases) => {
    navigate(cases.title, { state: cases });
  };
  if (Loading) {
    return (
      <div className="w-full h-[720px] flex flex-col justify-center items-center">
        <progress className="progress progress-accent w-56 "></progress>
        <h1 className="mt-3">請稍等...</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You must login before seeing your Cases.</p>
          <button
            onClick={handleTakeToLogin}
            className="btn btn-primary btn-lg"
          >
            Take me to login page
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "proposer" && (
        <div>
          <h1>Welcome to instructor's Case page.</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "donor" && (
        <div>
          <h1>Welcome to student's Case page.</h1>
        </div>
      )}
      {currentUser && caseData && caseData.length != 0 && (
        <div className="flex flex-wrap gap-5 justify-center ">
          {caseData.map((cases) => (
            <div
              className="card bg-base-100 shadow-xl"
              style={{ width: "18rem" }}
            >
              <figure className="h-[250px]">
                <img
                  className="w-full object-cover"
                  src={cases.image}
                  alt="caseImage"
                />
              </figure>
              <div className="card-body">
                <h1 style={{ fontSize: "1.5rem" }} className="card-title">
                  {cases.title}
                </h1>
                <h2 style={{ fontSize: "1.15rem" }}>{cases.description}</h2>
                <p style={{ fontSize: "0.5rem" }}>目標金額：{cases.target}</p>
                <p style={{ fontSize: "0.5rem" }}>有效日期：{cases.deadline}</p>
                <div className="card-actions justify-center mt-4">
                  <button
                    className="btn btn-accent"
                    onClick={() => handleClick(cases)}
                  >
                    進行審核
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCheckCase;
