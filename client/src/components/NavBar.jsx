import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useStateContext } from "../context";

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
        <div class="flex-none">
          <ul class="menu menu-horizontal px-1">
            <li className="nav-item font-medium text-[rgba(112,121,139,1)]">
              <Link to="/">瀏覽提案</Link>
            </li>

            {/* {currentUser && currentUser.role && ( */}
            {/* // currentUser.user.role != "admin" && */}
            <li className="nav-item font-medium text-[rgba(112,121,139,1)]">
              <Link className="nav-link" to="/profile">
                我的提案
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
