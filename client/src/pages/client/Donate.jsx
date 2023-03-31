import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CaseService from "../../services/case.service";

const EnrollComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);
  const handleTakeToLogin = () => {
    navigate("/login");
  };

  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    CaseService.getCaseByName(searchInput)
      .then((response) => {
        console.log(response);
        setSearchResult(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEnroll = (e) => {
    CaseService.donate(e.target.id, currentUser.user._id)
      .then(() => {
        window.alert("註冊成功");
        navigate("/case");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>請先登入</p>
          <button class="btn btn-primary btn-lg" onClick={handleTakeToLogin}>
            前往登入
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "proposer" && (
        <div>
          <h1>Only students can enroll in cases.</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "donor" && (
        <div className="search input-group mb-3">
          <input
            onChange={handleChangeInput}
            type="text"
            class="form-control"
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>
      )}
      {currentUser && searchResult && searchResult.length != 0 && (
        <div>
          {searchResult.map((cases) => (
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
                <a
                  onClick={handleEnroll}
                  href="#"
                  className="card-text btn btn-primary"
                  id={cases._id}
                  style={{ marginTop: "20px" }}
                >
                  捐贈
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default EnrollComponent;
