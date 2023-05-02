import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CaseService from "../services/case.service";

const Case = (props) => {
  let { currentUser, setCurrentUser, setInCampaignPage } = props;
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  let [caseData, setCaseData] = useState(null);
  useEffect(() => {
    setInCampaignPage(false);
    console.log("Using effect.");
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
    } else {
      _id = "";
    }
    if (currentUser.user.role == "proposer") {
      CaseService.get(_id)
        .then((data) => {
          setCaseData(data.data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          console.log("錯了");
        });
    } else if (currentUser.user.role == "donor") {
      CaseService.getDonatedCases(_id)
        .then((data) => {
          console.log("捐贈者", data);
          setCaseData(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []); //eslint-disable-line

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>請先登入</p>
          <button
            onClick={handleTakeToLogin}
            className="btn btn-primary btn-lg"
          >
            返回首頁
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === "proposer" && (
        <div>
          <h1>案子頁面</h1>
        </div>
      )}
      {currentUser && caseData && caseData.length !== 0 && (
        <div>
          {caseData.map((cases) => (
            <div key={cases.id} className="card" style={{ width: "18rem" }}>
              <div className="card-body" align="center">
                <h5 className="card-title">{cases.title}</h5>
                <p className="card-text">{cases.description}</p>
                <p>捐贈人數:{cases.donor.length} </p>
                <div>
                  <button className="btn btn-primary">
                    目標金額: {cases.need}
                  </button>
                </div>
                <div className="progress " style={{ marginTop: "20px" }}>
                  <div
                    className="progress-bar progress-bar-striped bg-success"
                    role="progressbar"
                    style={{ width: "50%" }}
                    aria-valuenow="10"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    募款進度:50%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {currentUser && currentUser.user.role === "donor" && (
        <div>
          <h1>Welcome to donor's donate page.</h1>
        </div>
      )}
    </div>
  );
};

export default Case;
