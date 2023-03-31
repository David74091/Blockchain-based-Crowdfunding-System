import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useStateContext } from "../context";
import CaseService from "../services/case.service";

import Heart from "../assets/Heart";
import Ellipse1 from "../assets/Ellipse1";
import Line1 from "../assets/Line1";
import ArrowDown from "../assets/ArrowDown";
import Basket from "../assets/Basket";
import Path208 from "../assets/Path208";
import Path5670 from "../assets/Path5670";
import Group7836 from "../assets/Group7836";
import Group7837 from "../assets/Group7837";

const NavBar = (props) => {
  let { setCaseData, setLoading } = props;
  useEffect(() => {
    console.log("Using effect.");
    setLoading(true);
    // let _id;
    // if (currentUser) {
    //   _id = currentUser.user._id;
    // } else {
    //   _id = "";
    // }

    CaseService.getAllTrue()
      .then((data) => {
        console.log("Data", data.data);
        setCaseData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleChange = (e) => {
    setSearchInput(e.target.value);
    console.log(searchInput);
  };
  const [selectedValue, setSelectedValue] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    CaseService.getCaseByName(searchInput, selectedValue)
      .then((data) => {
        console.log("searchInput: ", searchInput);
        console.log("資料在此: ", data);
        setCaseData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const { connect, address } = useStateContext();
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate;
  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    window.alert("登出成功");
    navigate("/");
  };

  return (
    <div>
      <div class="navbar bg-base-100 bg-gray-100 h-[170px] font-['Quicksand']">
        <div class="flex-1">
          <a class="btn btn-ghost normal-case text-xl">區塊鏈募款-Demo</a>
        </div>
        <div className="flex justify-center">
          <div className="dropdown">
            <select
              className="select p-2 shadow bg-base-100 rounded-box w-[100px] bg-info"
              value={selectedValue}
              onChange={handleSelectChange}
            >
              <option disabled>提案類別</option>
              <option value="教育">教育</option>
              <option value="醫療">醫療</option>
              <option value="環境">環境</option>
              <option value="兒少">兒少</option>
              <option value="長者">長者</option>
              <option value="人本關懷">人本關懷</option>
              <option value="動物保育">動物保育</option>
              <option value="翻轉人生">翻轉人生</option>
              <option value="藝術人文">藝術人文</option>
              <option value="地方創生">地方創生</option>
              <option value="國際支援">國際支援</option>
            </select>
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={handleChange}
            placeholder="輸入搜尋文字"
            className="input"
          />
          <button className="btn btn-accent" onClick={handleSearch}>
            搜尋
          </button>
        </div>
        <div class="flex-none">
          <ul class="menu menu-horizontal px-1">
            <li className="nav-item font-medium text-[rgba(112,121,139,1)]">
              <Link to="/">瀏覽提案</Link>
            </li>

            {/* {currentUser && currentUser.role && ( */}
            {/* // currentUser.user.role != "admin" && */}
            <li className="nav-item font-medium text-[rgba(112,121,139,1)]">
              <Link className="nav-link" to="/profile">
                個人資料
              </Link>
            </li>
            {/* )} */}
            {currentUser &&
              currentUser.user.role &&
              currentUser.user.role === "admin" && (
                <li className="nav-item font-medium text-[rgba(112,121,139,1)]">
                  <Link className="nav-link" to="/admincheckcase">
                    審核提案
                  </Link>
                </li>
              )}
            {currentUser &&
              currentUser.user.role &&
              currentUser.user.role === "proposer" && (
                <li className="nav-item font-medium text-[rgba(112,121,139,1)]">
                  <Link className="nav-link" to="/clientpostcase">
                    發布專案
                  </Link>
                </li>
              )}
            <div className="flex border-l-[1px] border-indigo-600 h-1rem">
              {!currentUser && (
                <li className="nav-item font-medium text-[rgba(112,121,139,1)]">
                  <Link className="nav-link" to="/login">
                    登入
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item font-medium text-[rgba(112,121,139,1)]">
                  <Link onClick={handleLogout} className="nav-link" to="/">
                    登出
                  </Link>
                </li>
              )}
              {!currentUser && (
                <li className="nav-item  font-bold leading-[normal] text-[rgba(96,1,211,1)]">
                  <Link className="nav-link" to="/register">
                    註冊
                  </Link>
                </li>
              )}
            </div>

            {/* {currentUser &&
              currentUser.user.role &&
              currentUser.user.role === "proposer" &&
              address && (
                <li className="nav-item">
                  <Link className="nav-link" to="/postcase">
                    發布提案
                  </Link>
                </li>
              )} */}
            {/* {currentUser && currentUser.user.role === "donor" && (
              <li className="nav-item">
                <Link className="nav-link" to="/donate">
                  捐款
                </Link>
              </li>
            )} */}
            {currentUser &&
              currentUser.user.role &&
              currentUser.user.role == "admin" && (
                <li className="nav-item ml-[20px] font-medium text-[rgba(112,121,139,1)]">
                  <button
                    className="btn btn-outline btn-info"
                    onClick={() => {
                      connect();
                    }}
                  >
                    {address ? "已連接錢包" : "連接錢包"}
                  </button>
                </li>
              )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
